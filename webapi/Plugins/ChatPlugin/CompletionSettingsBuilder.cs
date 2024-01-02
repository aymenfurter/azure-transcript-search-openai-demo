using Microsoft.SemanticKernel.AI.TextCompletion;
using AzureVideoChat.Options;
using Microsoft.SemanticKernel.Connectors.AI.OpenAI;

namespace AzureVideoChat.Plugins.ChatPlugins;

public static class CompletionSettingsBuilder
{
    public static OpenAIRequestSettings CreateChatResponseCompletionSettings(PromptsOptions promptOptions)
    {
        return new OpenAIRequestSettings
        {
            MaxTokens = promptOptions.ResponseTokenLimit,
            Temperature = promptOptions.ResponseTemperature,
            TopP = promptOptions.ResponseTopP,
            FrequencyPenalty = promptOptions.ResponseFrequencyPenalty,
            PresencePenalty = promptOptions.ResponsePresencePenalty
        };
    }

    public static OpenAIRequestSettings CreateIntentCompletionSettings(PromptsOptions promptOptions)
    {
        return new OpenAIRequestSettings
        {
            MaxTokens = promptOptions.ResponseTokenLimit,
            Temperature = promptOptions.IntentTemperature,
            TopP = promptOptions.IntentTopP,
            FrequencyPenalty = promptOptions.IntentFrequencyPenalty,
            PresencePenalty = promptOptions.IntentPresencePenalty,
            StopSequences = new string[] { "] bot:" }
        };
    }
}
