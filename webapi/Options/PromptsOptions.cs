using System.ComponentModel.DataAnnotations;

namespace AzureVideoChat.Options;

public class PromptsOptions
{
    public const string PropertyName = "Prompts";

    [Required, Range(0, int.MaxValue)] public int CompletionTokenLimit { get; set; }

    [Required, Range(0, int.MaxValue)] public int ResponseTokenLimit { get; set; }

    internal double MemoriesResponseContextWeight { get; } = 0.5;

    internal double DocumentContextWeight { get; } = 0.5;
    // System
    [Required, NotEmptyOrWhitespace] public string KnowledgeCutoffDate { get; set; } = string.Empty;
    [Required, NotEmptyOrWhitespace] public string SystemDescription { get; set; } = string.Empty;
    [Required, NotEmptyOrWhitespace] public string SystemResponse { get; set; } = string.Empty;

    internal string[] SystemIntentPromptComponents => new string[]
    {
        this.SystemDescription,
        this.SystemIntent,
        "{{ChatPlugin.ExtractChatHistory}}",
        this.SystemIntentContinuation
    };

    internal string SystemIntentExtraction => string.Join("\n", this.SystemIntentPromptComponents);

    [Required, NotEmptyOrWhitespace] public string SystemIntent { get; set; } = string.Empty;
    [Required, NotEmptyOrWhitespace] public string SystemIntentContinuation { get; set; } = string.Empty;

    internal string SystemChatContinuation = "SINGLE RESPONSE FROM BOT TO USER:\n[{{TimePlugin.Now}} {{timePlugin.Second}}] bot:";

    internal string[] SystemChatPromptComponents => new string[]
    {
        this.SystemDescription,
        this.SystemResponse,
        "{{$userIntent}}",
        "{{$chatContext}}",
        this.SystemChatContinuation
    };

    internal string SystemChatPrompt => string.Join("\n\n", this.SystemChatPromptComponents);

    internal double ResponseTemperature { get; } = 0.1;
    internal double ResponseTopP { get; } = 1;
    internal double ResponsePresencePenalty { get; } = 0.5;
    internal double ResponseFrequencyPenalty { get; } = 0.5;

    internal double IntentTemperature { get; } = 0.1;
    internal double IntentTopP { get; } = 1;
    internal double IntentPresencePenalty { get; } = 0.5;
    internal double IntentFrequencyPenalty { get; } = 0.5;
}
