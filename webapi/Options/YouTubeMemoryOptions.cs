using System.ComponentModel.DataAnnotations;
using AzureVideoChat.Options;

namespace AzureVideoChat.Options;

public class YouTubeMemoryOptions
{
    public const string PropertyName = "YouTubeMemory";

    [Required, NotEmptyOrWhitespace]
    public string GlobalDocumentCollectionName { get; set; } = "embeddings";
}
