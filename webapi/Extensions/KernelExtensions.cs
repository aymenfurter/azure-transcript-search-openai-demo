using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.Memory.AzureCognitiveSearch;
using Microsoft.SemanticKernel.Plugins.Core;
using AzureVideoChat.Options;
using AzureVideoChat.Plugins.ChatPlugins;

namespace AzureVideoChat.Extensions;

public static class KernelServiceExtensions
{
    private const string AzureOpenAIChatCompletionServiceDeploymentName = "AZURE_OPENAI_DEPLOYMENT_NAME";
    private const string AzureOpenAIChatCompletionServiceEndpoint = "AZURE_OPENAI_ENDPOINT";
    private const string AzureOpenAIChatCompletionServiceApiKey = "AZURE_OPENAI_API_KEY";

    public static IKernel RegisterSkills(this IKernel kernel, IServiceProvider serviceProvider)
    {
        if (kernel == null) throw new ArgumentNullException(nameof(kernel));
        if (serviceProvider == null) throw new ArgumentNullException(nameof(serviceProvider));

        RegisterChatPlugin(kernel, serviceProvider);
        RegisterTimePlugin(kernel);

        return kernel;
    }

    private static void RegisterChatPlugin(IKernel kernel, IServiceProvider serviceProvider)
    {
        var chatPlugin = new ChatPlugin(
            kernel,
            serviceProvider.GetRequiredService<IOptions<PromptsOptions>>(),
            serviceProvider.GetRequiredService<IOptions<YouTubeMemoryOptions>>());

        kernel.ImportSkill(chatPlugin, nameof(ChatPlugin));
    }

    private static void RegisterTimePlugin(IKernel kernel)
    {
        kernel.ImportSkill(new TimePlugin(), nameof(TimePlugin));
    }
}
