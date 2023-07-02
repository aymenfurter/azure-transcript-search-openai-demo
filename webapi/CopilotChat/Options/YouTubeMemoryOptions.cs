using System.ComponentModel.DataAnnotations;
using SemanticKernel.Service.Options;

namespace SemanticKernel.Service.CopilotChat.Options;

public class YouTubeMemoryOptions
{
    public const string PropertyName = "YouTubeMemory";

    [Required, NotEmptyOrWhitespace]
    public string GlobalDocumentCollectionName { get; set; } = "embeddings";
}
