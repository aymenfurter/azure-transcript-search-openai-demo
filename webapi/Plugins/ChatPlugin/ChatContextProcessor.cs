using System.Threading.Tasks;
using Microsoft.SemanticKernel;
using AzureVideoChat.Options;
using Microsoft.SemanticKernel.Orchestration;
using System.Collections.Generic;
using System.Globalization;
using AzureVideoChat.Plugins.SortPlugin;
using System.Linq;

namespace AzureVideoChat.Plugins.ChatPlugins;

public class ChatContextProcessor
{
    private readonly PromptsOptions _promptOptions;
    private readonly YouTubeMemoryPlugin _videoMemorySkill;
    private readonly SortHandler _sortHandler;

    public ChatContextProcessor(PromptsOptions promptOptions, YouTubeMemoryPlugin videoMemorySkill, IKernel kernel)
    {
        _promptOptions = promptOptions;
        _videoMemorySkill = videoMemorySkill;
        _sortHandler = new SortPlugin.SortHandler(kernel);
    }

    public async Task<string> ProcessChatContextAsync(SKContext context, string userIntent)
    {
        int remainingToken = GetChatContextTokenLimit(userIntent);

        var videoTransscriptContextTokenLimit = (int)(remainingToken * _promptOptions.DocumentContextWeight);
        var videoMemories = await QueryTransscriptsAsync(context, userIntent, videoTransscriptContextTokenLimit);

        var chatContextComponents = new List<string>() { videoMemories };
        var chatContextText = string.Join("\n\n", chatContextComponents.Where(c => !string.IsNullOrEmpty(c)));
        var chatContextTextTokenCount = remainingToken - Utilities.TokenCount(chatContextText);

        if (chatContextTextTokenCount > 0)
        {
            var chatHistory = await GetChatHistoryAsync(context, chatContextTextTokenCount);
            chatContextText = $"{chatContextText}\n{chatHistory}";
        }

        return chatContextText;
    }

    private async Task<string> GetChatHistoryAsync(SKContext context, int tokenLimit)
    {
        string history = context.Variables.ContainsKey("History") ? context.Variables["History"] : string.Empty;
        return ChatPluginUtilities.ExtractChatHistory(history, tokenLimit);
    }


    private async Task<string> QueryTransscriptsAsync(SKContext context, string userIntent, int tokenLimit)
    {
        var videoMemoriesContext = context.Clone();
        videoMemoriesContext.Variables.Set("tokenLimit", tokenLimit.ToString(new NumberFormatInfo()));

        var sortType = await _sortHandler.ProcessUserIntent(userIntent);
        return await _videoMemorySkill.QueryYouTubeVideosAsync(userIntent, videoMemoriesContext, sortType);
    }

    private int GetChatContextTokenLimit(string userIntent)
    {
        var tokenLimit = _promptOptions.CompletionTokenLimit;
        var remainingToken = tokenLimit - Utilities.TokenCount(userIntent) - _promptOptions.ResponseTokenLimit - Utilities.TokenCount(string.Join("\n", new string[]
        {
            _promptOptions.SystemDescription,
            _promptOptions.SystemResponse,
            _promptOptions.SystemChatContinuation
        }));

        return remainingToken;
    }
}
