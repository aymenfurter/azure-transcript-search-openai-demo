using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using AzureVideoChat.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Orchestration;
using System.ComponentModel;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace AzureVideoChat.Plugins.ChatPlugins;

public class ChatPlugin
{
    private readonly IKernel _kernel;
    private readonly PromptsOptions _promptOptions;
    private readonly YouTubeMemoryPlugin _videoMemorySkill;
    private readonly UserIntentProcessor _intentProcessor;
    private readonly ChatContextProcessor _contextProcessor;
    private readonly PromptTemplateRenderer _promptRenderer;

    public ChatPlugin(
        IKernel kernel,
        IOptions<PromptsOptions> promptOptions,
        IOptions<YouTubeMemoryOptions> documentImportOptions)
    {
        this._kernel = kernel;
        this._promptOptions = promptOptions.Value;
        this._videoMemorySkill = new YouTubeMemoryPlugin(promptOptions, documentImportOptions);
        this._intentProcessor = new UserIntentProcessor(this._promptOptions, kernel);
        this._contextProcessor = new ChatContextProcessor(this._promptOptions, this._videoMemorySkill, kernel);
        this._promptRenderer = new PromptTemplateRenderer(this._promptOptions);
    }

    [SKFunction, Description("Get chat response")]
    public async Task<SKContext> ChatAsync(
        [Description("The new message")] string message,
        SKContext chatContext)
    {
        UpdateChatHistory(chatContext, message);

        var response = await GenerateChatResponse(chatContext);

        UpdateContextVariables(chatContext, response);
        return chatContext;
    }

    private async Task<string> GenerateChatResponse(SKContext chatContext)
    {
        string userIntent = await _intentProcessor.ExtractUserIntentAsync(chatContext);
        string chatContextText = await _contextProcessor.ProcessChatContextAsync(chatContext, userIntent);
        chatContext.Variables.Set("ChatContext", chatContextText);

        var renderedPrompt = await _promptRenderer.RenderPromptAsync(chatContext);
        var completionSettings = CompletionSettingsBuilder.CreateChatResponseCompletionSettings(_promptOptions);

        var completionFunction = _kernel.CreateSemanticFunction(
        renderedPrompt,
        pluginName: nameof(ChatPlugin),
        description: "Complete the prompt.");

        FunctionResult functionResult = await completionFunction.InvokeAsync(
        context: chatContext,
        requestSettings: completionSettings
        );
        string functionResponse =  functionResult.GetValue<string>();

        return functionResult.GetValue<string>();
    }

    private void UpdateChatHistory(SKContext chatContext, string message)
    {
        var history = chatContext.Variables.ContainsKey("History")
            ? chatContext.Variables["History"]
            : string.Empty;
        chatContext.Variables.Set("History", history + "\n" + message);
    }

    private void UpdateContextVariables(SKContext chatContext, string response)
    {
        var prompt = chatContext.Variables.ContainsKey("prompt")
            ? chatContext.Variables["prompt"]
            : string.Empty;
        chatContext.Variables.Set("prompt", prompt);

        string chatContextValue;
        chatContext.Variables.TryGetValue("ChatContext", out chatContextValue);
        if (string.IsNullOrEmpty(chatContextValue))
        {
            chatContextValue = string.Empty;
        }
        List<string> videoLinks = ChatPluginUtilities.ExtractLinks(response, chatContextValue);
        var result = ChatPluginUtilities.ReplaceLinks(response, videoLinks);

        chatContext.Variables.Set("link", string.Join("\n", videoLinks));

        chatContext.Variables.Update(result);
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
}
