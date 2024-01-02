using Azure;
using Azure.Search.Documents;
using Azure.Search.Documents.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.SemanticKernel.Memory;
using AzureVideoChat.Plugins.SortPlugin;

namespace AzureVideoChat.Connectors.Memory.AzureCognitiveSearchVector
{
    public class AISearchService
    {
        private readonly AISearchClientManager _clientManager;
        private readonly AISearchEmbeddingService _embeddingService;

        public AISearchService(AISearchClientManager clientManager, AISearchEmbeddingService embeddingService)
        {
            _clientManager = clientManager ?? throw new ArgumentNullException(nameof(clientManager));
            _embeddingService = embeddingService ?? throw new ArgumentNullException(nameof(embeddingService));
        }

        public async IAsyncEnumerable<MemoryQueryResult> SearchAsync(
            string collection,
            string query,
            SortType sortType = SortType.NONE,
            bool withEmbeddings = false,
            [System.Runtime.CompilerServices.EnumeratorCancellation] CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrEmpty(collection))
                throw new ArgumentNullException(nameof(collection));
            if (string.IsNullOrEmpty(query))
                throw new ArgumentNullException(nameof(query));

            var client = _clientManager.GetSearchClient(collection);
            IReadOnlyList<float> queryEmbeddings = null;

            if (withEmbeddings)
            {
                queryEmbeddings = await _embeddingService.GenerateEmbeddings(query);
            }

            var options = new SearchOptions
            {
                Size = 10,
                Select = { "Text", "Description", "ExternalSourceName", "Id"}
            };

            if (withEmbeddings && queryEmbeddings != null)
            {
                options.VectorSearch = new VectorSearchOptions()
                {
                    Queries = { new VectorizedQuery(queryEmbeddings.ToArray()) { KNearestNeighborsCount = 5, Fields = { "Vector" } } }
                };
            }

            switch (sortType)
            {
                case SortType.MONTH:
                    DateTime fourWeeksAgo = DateTime.UtcNow.AddDays(-28);
                    options.Filter = $"CreatedAt ge {fourWeeksAgo:o}";
                    options.Size = 25;
                    break;
                
                case SortType.RECENT:
                    DateTime recent = DateTime.UtcNow.AddDays(-28 * 3);
                    options.Filter = $"CreatedAt ge {recent:o}";
                    options.Size = 25;
                    break;

                case SortType.YEAR:
                    DateTime oneYearAgo = DateTime.UtcNow.AddDays(-365);
                    options.Filter = $"CreatedAt ge {oneYearAgo:o}";
                    break;

                case SortType.NONE:
                    break;

                default:
                    throw new ArgumentException($"Unknown sort type: {sortType}");
            }

            await foreach (var result in ExecuteSearch(client, query, options, cancellationToken))
            {
                yield return result;
            }
        }

        private async IAsyncEnumerable<MemoryQueryResult> ExecuteSearch(
            SearchClient client,
            string query,
            SearchOptions options,
            CancellationToken cancellationToken)
        {
            Response<SearchResults<AISearchMemoryRecord>> searchResult;
            try
            {
                searchResult = await client.SearchAsync<AISearchMemoryRecord>(query, options, cancellationToken: cancellationToken);
            }
            catch (RequestFailedException e) when (e.Status == 404)
            {
                yield break;
            }

            if (searchResult.Value.TotalCount <= 10)
            {
                await foreach (var doc in searchResult.Value.GetResultsAsync())
                {
                    yield return ToMemoryQueryResult(doc);
                }
            }
            else
            {
                var allResults = await searchResult.Value.GetResultsAsync().ToListAsync(cancellationToken);
                var sortedResults = allResults.OrderByDescending(r => r.Document.CreatedAt).Take(10);

                foreach (var doc in sortedResults)
                {
                    yield return ToMemoryQueryResult(doc);
                }
            }
        }

        private MemoryQueryResult ToMemoryQueryResult(SearchResult<AISearchMemoryRecord> searchResult)
        {
            return new MemoryQueryResult(
                ToMemoryRecordMetadata(searchResult.Document),
                searchResult.SemanticSearch.RerankerScore ?? 1,
                null); // Adjust null as per actual requirement
        }

        private static MemoryRecordMetadata ToMemoryRecordMetadata(AISearchMemoryRecord data)
        {
            return new MemoryRecordMetadata(
                isReference: data.IsReference,
                id: data.Id,
                text: data.Text ?? string.Empty,
                description: data.Description ?? string.Empty,
                externalSourceName: data.ExternalSourceName,
                additionalMetadata: data.AdditionalMetadata ?? string.Empty);
        }
    }
}
