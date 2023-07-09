using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using CopilotChat.Skills.YouTube;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AI.TextCompletion;
using Microsoft.SemanticKernel.Orchestration;
using Microsoft.SemanticKernel.Planning;
using Microsoft.SemanticKernel.SkillDefinition;
using Microsoft.SemanticKernel.TemplateEngine;
using SemanticKernel.Service.CopilotChat.Options;

namespace SemanticKernel.Service.CopilotChat.Skills.ChatSkills;

public class ChatSkill
{
    private readonly IKernel _kernel;
    private readonly PromptsOptions _promptOptions;
    private readonly YouTubeMemorySkill _youTubeMemorySkill;
    private readonly YouTubePlugin _youtubePlugin;
    private readonly IKernel _plannerKernel;


    public ChatSkill(
        IKernel kernel,
        IOptions<PromptsOptions> promptOptions,
        IOptions<YouTubeMemoryOptions> documentImportOptions,
        Planner planner,
        ILogger logger)
    {
        this._kernel = kernel;
        this._plannerKernel = planner.Kernel;
        this._promptOptions = promptOptions.Value;
        this._youTubeMemorySkill = new YouTubeMemorySkill(
            promptOptions,
            documentImportOptions);
    }


    [SKFunction("Extract user intent")]
    [SKFunctionName("ExtractUserIntent")]
    [SKFunctionContextParameter(Name = "audience", Description = "The audience the chat bot is interacting with.")]
    public async Task<string> ExtractUserIntentAsync(SKContext context)
    {
        var tokenLimit = this._promptOptions.CompletionTokenLimit;
        var historyTokenBudget =
            tokenLimit -
            this._promptOptions.ResponseTokenLimit -
            Utilities.TokenCount(string.Join("\n", new string[]
                {
                    this._promptOptions.SystemDescription,
                    this._promptOptions.SystemIntent,
                    this._promptOptions.SystemIntentContinuation
                })
            );

        var intentExtractionContext = Utilities.CopyContextWithVariablesClone(context);
        intentExtractionContext.Variables.Set("tokenLimit", historyTokenBudget.ToString(new NumberFormatInfo()));

        var completionFunction = this._kernel.CreateSemanticFunction(
            this._promptOptions.SystemIntentExtraction,
            skillName: nameof(ChatSkill),
            description: "Complete the prompt.");

        var result = await completionFunction.InvokeAsync(
            intentExtractionContext,
            settings: this.CreateIntentCompletionSettings()
        );

        if (result.ErrorOccurred)
        {
            context.Log.LogError("{0}: {1}", result.LastErrorDescription, result.LastException);
            context.Fail(result.LastErrorDescription);
            return string.Empty;
        }

        return $"User intent: {result}";
    }

    [SKFunction("Extract chat history")]
    [SKFunctionName("ExtractChatHistory")]
    [SKFunctionContextParameter(Name = "tokenLimit", Description = "Maximum number of tokens")]
    public async Task<string> ExtractChatHistoryAsync(SKContext context)
    {
        var history = context.Variables["History"].ToString();
        var tokenLimit = int.Parse(context["tokenLimit"], new NumberFormatInfo());

        if (history.Length > tokenLimit)
        {
            history = history.Substring(history.Length - tokenLimit);
        }

        return $"Chat history:\n{history}";
    }


  
    [SKFunction("Get chat response")]
    [SKFunctionName("Chat")]
    [SKFunctionInput(Description = "The new message")]
    [SKFunctionContextParameter(Name = "userId", Description = "Unique and persistent identifier for the user")]
    [SKFunctionContextParameter(Name = "userName", Description = "Name of the user")]
    [SKFunctionContextParameter(Name = "proposedPlan", Description = "Previously proposed plan that is approved")]
    public async Task<SKContext> ChatAsync(string message, SKContext context)
    {
        var chatContext = Utilities.CopyContextWithVariablesClone(context);
        chatContext.Variables.Set("History", chatContext["History"] + "\n" + message);


        var response = chatContext.Variables.ContainsKey("userCancelledPlan")
            ? "I am sorry the plan did not meet your goals."
            : await this.GetChatResponseAsync(chatContext);

        if (chatContext.ErrorOccurred)
        {
            context.Fail(chatContext.LastErrorDescription);
            return context;
        }

        var prompt = chatContext.Variables.ContainsKey("prompt")
            ? chatContext.Variables["prompt"]
            : string.Empty;
        context.Variables.Set("prompt", prompt);

        var link = chatContext.Variables.ContainsKey("link")
            ? chatContext.Variables["link"]
            : string.Empty;
        context.Variables.Set("link", link);

        context.Variables.Update(response);
        return context;
    }

    #region Private

    private async Task<string> GetChatResponseAsync(SKContext chatContext)
    {
        var userIntent = await this.GetUserIntentAsync(chatContext);
        if (chatContext.ErrorOccurred)
        {
            return string.Empty;
        }

        var remainingToken = this.GetChatContextTokenLimit(userIntent);
        
        var youTubeTransscriptContextTokenLimit = (int)(remainingToken * this._promptOptions.DocumentContextWeight);
        var youTubeMemories = await this.QueryTransscriptsAsync(chatContext, userIntent, youTubeTransscriptContextTokenLimit);
        if (chatContext.ErrorOccurred)
        {
            return string.Empty;
        }
        
        // Fill in chat history
        var chatContextComponents = new List<string>() { youTubeMemories };
        var chatContextText = string.Join("\n\n", chatContextComponents.Where(c => !string.IsNullOrEmpty(c)));
        var chatContextTextTokenCount = remainingToken - Utilities.TokenCount(chatContextText);
        if (chatContextTextTokenCount > 0)
        {
            var chatHistory = await this.GetChatHistoryAsync(chatContext, chatContextTextTokenCount);
            if (chatContext.ErrorOccurred)
            {
                return string.Empty;
            }
            chatContextText = $"{chatContextText}\n{chatHistory}";
        }


        // Invoke the model
        chatContext.Variables.Set("UserIntent", userIntent);
        chatContext.Variables.Set("ChatContext", chatContextText);

        var promptRenderer = new PromptTemplateEngine();
        var renderedPrompt = await promptRenderer.RenderAsync(
            this._promptOptions.SystemChatPrompt,
            chatContext);


        var completionFunction = this._kernel.CreateSemanticFunction(
            renderedPrompt,
            skillName: nameof(ChatSkill),
            description: "Complete the prompt.");

        chatContext = await completionFunction.InvokeAsync(
            context: chatContext,
            settings: this.CreateChatResponseCompletionSettings()
        );
        
        // Use planner to get list of YouTube links 
        var actionPlanner = new SequentialPlanner(this._plannerKernel);
        var ask = "Given the following statement by a chatbot, use youtube skill to generate most relevant youtube links:" + chatContext.Result;
        var plan = await actionPlanner.CreatePlanAsync(ask);
        var result = await plan.InvokeAsync();

        chatContext.Variables.Set("link", result.Result);

        // Log prompt
        chatContext.Log.LogInformation("Prompt: {0}", renderedPrompt);

        if (chatContext.ErrorOccurred)
        {
            return string.Empty;
        }

        return chatContext.Result;
    }

    private async Task<string> GetUserIntentAsync(SKContext context)
    {
        if (!context.Variables.TryGetValue("planUserIntent", out string? userIntent))
        {
            var contextVariables = new ContextVariables();
            contextVariables.Set("History", context["History"]);

            var intentContext = new SKContext(
                contextVariables,
                context.Memory,
                context.Skills,
                context.Log,
                context.CancellationToken
            );

            userIntent = await this.ExtractUserIntentAsync(intentContext);
            // Propagate the error
            if (intentContext.ErrorOccurred)
            {
                context.Fail(intentContext.LastErrorDescription);
            }
        }

        // log user intent
        context.Log.LogInformation("User intent: {0}", userIntent);

        return userIntent;
    }


    private Task<string> GetChatHistoryAsync(SKContext context, int tokenLimit)
    {
        var contextVariables = new ContextVariables();
        contextVariables.Set("tokenLimit", tokenLimit.ToString(new NumberFormatInfo()));
        contextVariables.Set("History", context.Variables["History"]);

        var chatHistoryContext = new SKContext(
            contextVariables,
            context.Memory,
            context.Skills,
            context.Log,
            context.CancellationToken
        );

        var chatHistory = this.ExtractChatHistoryAsync(chatHistoryContext);

        // Propagate the error
        if (chatHistoryContext.ErrorOccurred)
        {
            context.Fail(chatHistoryContext.LastErrorDescription);
        }

        return chatHistory;
    }



    private Task<string> QueryTransscriptsAsync(SKContext context, string userIntent, int tokenLimit)
    {
        var contextVariables = new ContextVariables();
        contextVariables.Set("tokenLimit", tokenLimit.ToString(new NumberFormatInfo()));

        var youTubeMemoriesContext = new SKContext(
            contextVariables,
            context.Memory,
            context.Skills,
            context.Log,
            context.CancellationToken
        );

        var youtubeMemories = this._youTubeMemorySkill.QueryYouTubeVideosAsync(userIntent, youTubeMemoriesContext);

        // Propagate the error
        if (youTubeMemoriesContext.ErrorOccurred)
        {
            context.Fail(youTubeMemoriesContext.LastErrorDescription);
        }

        return youtubeMemories;
    }

 
    private CompleteRequestSettings CreateChatResponseCompletionSettings()
    {
        var completionSettings = new CompleteRequestSettings
        {
            MaxTokens = this._promptOptions.ResponseTokenLimit,
            Temperature = this._promptOptions.ResponseTemperature,
            TopP = this._promptOptions.ResponseTopP,
            FrequencyPenalty = this._promptOptions.ResponseFrequencyPenalty,
            PresencePenalty = this._promptOptions.ResponsePresencePenalty
        };

        return completionSettings;
    }


    private CompleteRequestSettings CreateIntentCompletionSettings()
    {
        var completionSettings = new CompleteRequestSettings
        {
            MaxTokens = this._promptOptions.ResponseTokenLimit,
            Temperature = this._promptOptions.IntentTemperature,
            TopP = this._promptOptions.IntentTopP,
            FrequencyPenalty = this._promptOptions.IntentFrequencyPenalty,
            PresencePenalty = this._promptOptions.IntentPresencePenalty,
            StopSequences = new string[] { "] bot:" }
        };

        return completionSettings;
    }


    private int GetChatContextTokenLimit(string userIntent)
    {
        var tokenLimit = this._promptOptions.CompletionTokenLimit;
        var remainingToken =
            tokenLimit -
            Utilities.TokenCount(userIntent) -
            this._promptOptions.ResponseTokenLimit -
            Utilities.TokenCount(string.Join("\n", new string[]
                {
                            this._promptOptions.SystemDescription,
                            this._promptOptions.SystemResponse,
                            this._promptOptions.SystemChatContinuation
                })
            );

        return remainingToken;
    }

    # endregion
}
