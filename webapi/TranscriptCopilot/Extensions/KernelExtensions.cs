using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.Memory.AzureCognitiveSearch;
using Microsoft.SemanticKernel.Skills.Core;
using SemanticKernel.Service.CopilotChat.Options;
using SemanticKernel.Service.CopilotChat.Skills.ChatSkills;
using SemanticKernel.Service.Options;

namespace SemanticKernel.Service.CopilotChat.Extensions;


public static class KernelExtensions
{

    public static IServiceCollection AddPlannerServices(this IServiceCollection services)
    {
        services.AddScoped<Planner>(sp => new Planner(Kernel.Builder
            .WithLogger(sp.GetRequiredService<ILogger<IKernel>>())
            .WithPlannerBackend()
            .Build()));

        return services;
    }


    public static IKernel RegisterSkills(this IKernel kernel, IServiceProvider sp)
    {
        kernel.ImportSkill(new ChatSkill(
                kernel: kernel,
                promptOptions: sp.GetRequiredService<IOptions<PromptsOptions>>(),
                documentImportOptions: sp.GetRequiredService<IOptions<YouTubeMemoryOptions>>(),
                planner: sp.GetRequiredService<Planner>(),
                logger: sp.GetRequiredService<ILogger<ChatSkill>>()),
            nameof(ChatSkill));

        kernel.ImportSkill(new TimeSkill(), nameof(TimeSkill));
        return kernel;
    }


    private static KernelBuilder WithPlannerBackend(this KernelBuilder kernelBuilder)
    {
        kernelBuilder.WithAzureChatCompletionService(Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME"), Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT"), Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY"));
        return kernelBuilder;
    }
}