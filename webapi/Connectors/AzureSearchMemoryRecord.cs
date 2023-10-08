using System;
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;

namespace Microsoft.SemanticKernel.Connectors.Memory.AzureCognitiveSearchVector
{
    public class AzureSearchMemoryRecord
    {
        [SimpleField(IsKey = true, IsFilterable = false)]
        public string Id { get; set; } = string.Empty;

        [SearchableField(AnalyzerName = LexicalAnalyzerName.Values.StandardLucene)]
        public string? Text { get; set; } = string.Empty;

        [SearchableField(AnalyzerName = LexicalAnalyzerName.Values.StandardLucene)]
        public string? Description { get; set; } = string.Empty;

        [SearchableField(AnalyzerName = LexicalAnalyzerName.Values.StandardLucene)]
        public string? AdditionalMetadata { get; set; } = string.Empty;

        [SimpleField(IsFilterable = false)]
        public DateTime? CreatedAt { get; set; }

        [SimpleField(IsFilterable = false)]
        public string ExternalSourceName { get; set; } = string.Empty;

        [SimpleField(IsFilterable = false)]
        public bool IsReference { get; set; } = false;

        public float[] Vector { get; set; } = Array.Empty<float>();
    }
}