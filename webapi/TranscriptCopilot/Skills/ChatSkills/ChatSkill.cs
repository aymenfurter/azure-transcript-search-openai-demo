using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AI.TextCompletion;
using Microsoft.SemanticKernel.Orchestration;
using Microsoft.SemanticKernel.Planning;
using Microsoft.SemanticKernel.SkillDefinition;
using Microsoft.SemanticKernel.TemplateEngine;
using SemanticKernel.Service.CopilotChat.Options;
using System.Text.RegularExpressions;
using System.IO;
using System;
using Microsoft.ApplicationInsights.AspNetCore.TelemetryInitializers;
using SemanticKernel.Service.CopilotChat.Skills.SortSkill;

namespace SemanticKernel.Service.CopilotChat.Skills.ChatSkills;

public class ChatSkill
{
    private readonly IKernel _kernel;
    private readonly PromptsOptions _promptOptions;
    private readonly YouTubeMemorySkill _youTubeMemorySkill;
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


    [SKFunction, Description("Extract user intent")]
    [SKParameter("chatId", "Chat ID to extract history from")]
    [SKParameter("audience", "The audience the chat bot is interacting with.")]
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

        var intentExtractionContext = context.Clone(); 
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
    
    [SKFunction, Description("Extract chat history")]
    public async Task<string> ExtractChatHistoryAsync(
        [Description("Chat history")] string history,
        [Description("Maximum number of tokens")] int tokenLimit)
    {
        if (history.Length > tokenLimit)
        {
            history = history.Substring(history.Length - tokenLimit);
        }

        return $"Chat history:\n{history}";
    }


     [SKFunction, Description("Get chat response")]
    public async Task<SKContext> ChatAsync(
        [Description("The new message")] string message,
        [Description("Previously proposed plan that is approved"), DefaultValue(null), SKName("proposedPlan")] string? planJson,
        [Description("ID of the response message for planner"), DefaultValue(null), SKName("responseMessageId")] string? messageId,
        SKContext context)
    {
        var chatContext = context.Clone();
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

        var sortHandler = new SortHandler(this._kernel);
        var sortType = await sortHandler.ProcessUserIntent(userIntent);

        var youTubeTransscriptContextTokenLimit = (int)(remainingToken * this._promptOptions.DocumentContextWeight);
        var youTubeMemories = await this.QueryTransscriptsAsync(chatContext, userIntent, youTubeTransscriptContextTokenLimit, _kernel, sortType);
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
        
        List<string> youtubeLinks = extractLinks(chatContext.Result, chatContextText);
        var result = replaceLinks(chatContext.Result, youtubeLinks);
        chatContext.Variables.Set("link", string.Join("\n", youtubeLinks));
        
        chatContext.Log.LogInformation("Prompt: {0}", renderedPrompt);

        if (chatContext.ErrorOccurred)
        {
            return string.Empty;
        }


        return result;
    }

 
    private static string replaceLinks(string result, List<string> youtubeLinks) {
        if (result.Contains("https://")) return result;
        string updatedResult = result;
        foreach (string youtubeLink in youtubeLinks)
        {
            Match match = Regex.Match(youtubeLink, @"https://www\.youtube\.com/embed/(?<youtubeid>[^?]+)");
            if (!match.Success) continue; 
            string youtubeId = match.Groups["youtubeid"].Value;
            string pattern = $@"(?<!=""|')(?<!<a href[^>]*?){Regex.Escape(youtubeId)}(?!=""|')(?!.*?</a>)";
            string replacement = $@"<a target=""_blank"" href=""{youtubeLink.Replace("/embed/", "/v/")}"">{youtubeId}</a>";

            updatedResult = Regex.Replace(updatedResult, pattern, replacement);
        }
        return updatedResult;
    }

    private static List<string> extractLinks(string result, string chatContextText)
    {
        var lines = chatContextText.Split("\n");
        var youtubeLinks = new List<string>();
        string pattern = @"YouTube ID: (\w+)-(\d{2}_\d{2}_\d{2})";
        foreach (var line in lines)
        {
            if (line.Contains("Transcript from YouTube ID:"))
            {
                Match match = Regex.Match(line, pattern);
                if (match.Success)
                {
                    string youtubeid = match.Groups[1].Value;
                    string timecode = match.Groups[2].Value;
                    var timeParts = timecode.Split('_').Select(int.Parse).ToArray();
                    int totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
                    var link = $"https://www.youtube.com/embed/{youtubeid}?start={totalSeconds}";

                    if (result.Contains(youtubeid)) {
                        youtubeLinks.Add(link);
                    }
                }
            }
        }

        return youtubeLinks;
    }

    private async Task<string> GetUserIntentAsync(SKContext context)
    {
        if (!context.Variables.TryGetValue("planUserIntent", out string? userIntent))
        {
            var contextVariables = new ContextVariables();

            SKContext intentContext = context.Clone();
            intentContext.Variables.Set("History", context["History"]);

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
        return this.ExtractChatHistoryAsync(context["History"], tokenLimit);
    }



    private Task<string> QueryTransscriptsAsync(SKContext context, string userIntent, int tokenLimit, IKernel kernel, SortSkill.SortType sortType)
    {
        var youTubeMemoriesContext = context.Clone();
        youTubeMemoriesContext.Variables.Set("tokenLimit", tokenLimit.ToString(new NumberFormatInfo()));        

        var youtubeMemories = this._youTubeMemorySkill.QueryYouTubeVideosAsync(userIntent, youTubeMemoriesContext, kernel, sortType);

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