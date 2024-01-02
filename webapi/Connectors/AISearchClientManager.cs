using Azure;
using Azure.Search.Documents;
using System;
using System.Collections.Concurrent;
using System.Net.Http;
using Azure.Search.Documents.Indexes;
using Azure.Core.Pipeline;

namespace AzureVideoChat.Connectors.Memory.AzureCognitiveSearchVector
{
    public class AISearchClientManager
    {
        private readonly SearchIndexClient _searchIndexClient;
        private readonly ConcurrentDictionary<string, SearchClient> _clientsByIndex = new();

        public AISearchClientManager(string endpoint, string apiKey, HttpClient? httpClient = null)
        {
            if (string.IsNullOrEmpty(endpoint))
                throw new ArgumentNullException(nameof(endpoint));
            if (string.IsNullOrEmpty(apiKey))
                throw new ArgumentNullException(nameof(apiKey));

            AzureKeyCredential credentials = new AzureKeyCredential(apiKey);

            var options = new SearchClientOptions();
            if (httpClient != null)
            {
                options.Transport = new HttpClientTransport(httpClient);
            }

            _searchIndexClient = new SearchIndexClient(new Uri(endpoint), credentials, options);
        }

        public SearchClient GetSearchClient(string indexName)
        {
            if (string.IsNullOrEmpty(indexName))
                throw new ArgumentNullException(nameof(indexName));

            if (!_clientsByIndex.TryGetValue(indexName, out SearchClient client))
            {
                client = _searchIndexClient.GetSearchClient(indexName);

                _clientsByIndex[indexName] = client;
            }

            return client;
        }
    }
}
