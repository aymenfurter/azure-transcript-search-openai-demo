using Azure;
using Azure.AI.OpenAI;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzureVideoChat.Connectors.Memory.AzureCognitiveSearchVector
{
    public class AISearchEmbeddingService
    {
        private readonly OpenAIClient _openAIClient;

        public AISearchEmbeddingService(string endpoint, string apiKey)
        {
            if (string.IsNullOrEmpty(endpoint))
                throw new ArgumentNullException(nameof(endpoint));
            if (string.IsNullOrEmpty(apiKey))
                throw new ArgumentNullException(nameof(apiKey));

            AzureKeyCredential cred = new AzureKeyCredential(apiKey);
            _openAIClient = new OpenAIClient(new Uri(endpoint), cred);
        }

        public async Task<IReadOnlyList<float>> GenerateEmbeddings(string text)
        {
            if (string.IsNullOrEmpty(text))
                throw new ArgumentNullException(nameof(text));

            try
            {
                var response = await _openAIClient.GetEmbeddingsAsync("text-embedding-ada-002", new EmbeddingsOptions(text));
                return response.Value.Data[0].Embedding;
            }
            catch (RequestFailedException e)
            {
                throw new InvalidOperationException($"Failed to generate embeddings: {e.Message}", e);
            }
        }
    }
}
