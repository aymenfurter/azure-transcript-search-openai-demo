using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.SemanticKernel.Memory;
using AzureVideoChat.Plugins.SortPlugin;

namespace AzureVideoChat.Connectors.Memory.AzureCognitiveSearchVector
{
    public class AISearchMemoryClient
    {
        private readonly AISearchService _searchService;

        public AISearchMemoryClient(string endpoint, string apiKey, HttpClient? httpClient = null)
        {
            var clientManager = new AISearchClientManager(endpoint, apiKey, httpClient);
            var embeddingService = new AISearchEmbeddingService(endpoint, apiKey);
            _searchService = new AISearchService(clientManager, embeddingService);
        }

        public IAsyncEnumerable<MemoryQueryResult> SearchAsync(
            string collection,
            string query,
            SortType sortType = SortType.NONE,
            bool withEmbeddings = false,
            CancellationToken cancellationToken = default)
        {
            return _searchService.SearchAsync(collection, query, sortType, withEmbeddings, cancellationToken);
        }
    }
}
