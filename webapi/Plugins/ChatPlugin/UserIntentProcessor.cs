using System.Globalization;
using System.Threading.Tasks;
using Microsoft.SemanticKernel;
using AzureVideoChat.Options;
using Microsoft.SemanticKernel.Connectors.AI.OpenAI;
using Microsoft.SemanticKernel.Orchestration;

namespace AzureVideoChat.Plugins.ChatPlugins;

public class UserIntentProcessor
{
    private readonly PromptsOptions _promptOptions;
    private readonly IKernel _kernel;

    public UserIntentProcessor(PromptsOptions promptOptions, IKernel kernel)
    {
        _promptOptions = promptOptions;
        _kernel = kernel;
    }

    public async Task<string> ExtractUserIntentAsync(SKContext context)
    {
        var tokenLimit = _promptOptions.CompletionTokenLimit;
        var historyTokenBudget = CalculateTokenBudget(tokenLimit);

        var intentExtractionContext = context.Clone();
        intentExtractionContext.Variables.Set("tokenLimit", historyTokenBudget.ToString(new NumberFormatInfo()));

        var completionFunction = _kernel.CreateSemanticFunction(
            _promptOptions.SystemIntentExtraction,
            pluginName: nameof(ChatPlugin),
            description: "Complete the prompt.");

        var result = await completionFunction.InvokeAsync(
            intentExtractionContext,
            CreateIntentCompletionSettings()
        );

        return $"User intent: {result}";
    }

    private int CalculateTokenBudget(int tokenLimit)
    {
        return tokenLimit - _promptOptions.ResponseTokenLimit - Utilities.TokenCount(string.Join("\n", new string[]
        {
            _promptOptions.SystemDescription,
            _promptOptions.SystemIntent,
            _promptOptions.SystemIntentContinuation
        }));
    }

    private OpenAIRequestSettings CreateIntentCompletionSettings()
    {
        return new OpenAIRequestSettings
        {
            MaxTokens = _promptOptions.ResponseTokenLimit,
            Temperature = _promptOptions.IntentTemperature,
            TopP = _promptOptions.IntentTopP,
            FrequencyPenalty = _promptOptions.IntentFrequencyPenalty,
            PresencePenalty = _promptOptions.IntentPresencePenalty,
            StopSequences = new string[] { "] bot:" }
        };
    }
}
