// Copyright (c) Microsoft. All rights reserved.

using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.Memory.AzureCognitiveSearch;
using Microsoft.SemanticKernel.TemplateEngine;
using SemanticKernel.Service.CopilotChat.Extensions;
using SemanticKernel.Service.Options;

namespace SemanticKernel.Service;

/// <summary>
/// Extension methods for registering Semantic Kernel related services.
/// </summary>
internal static class SemanticKernelExtensions
{
    /// <summary>
    /// Delegate to register skills with a Semantic Kernel
    /// </summary>
    public delegate Task RegisterSkillsWithKernel(IServiceProvider sp, IKernel kernel);

    /// <summary>
    /// Add Semantic Kernel services
    /// </summary>
    internal static IServiceCollection AddSemanticKernelServices(this IServiceCollection services)
    {
        // Semantic Kernel
        services.AddScoped<IKernel>(sp =>
        {

            IKernel kernel;
            var openAIKey = Environment.GetEnvironmentVariable("OPEN_AI_KEY");

            if (string.IsNullOrWhiteSpace(openAIKey))
            {
                kernel = Kernel.Builder
                .WithLogger(sp.GetRequiredService<ILogger<IKernel>>())
                .WithAzureChatCompletionService(Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME")!, Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")!, Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY")!)
                .Build();
            } else {
                kernel = Kernel.Builder
                .WithLogger(sp.GetRequiredService<ILogger<IKernel>>())
                .WithOpenAIChatCompletionService("gpt-3.5-turbo", openAIKey)
                .Build();
            }

            sp.GetRequiredService<RegisterSkillsWithKernel>()(sp, kernel);
            return kernel;
        });

        // Register skills
        services.AddScoped<RegisterSkillsWithKernel>(sp => RegisterSkillsAsync);

        return services;
    }

    /// <summary>
    /// Register the skills with the kernel.
    /// </summary>
    private static Task RegisterSkillsAsync(IServiceProvider sp, IKernel kernel)
    {
        // Copilot chat skills
        kernel.RegisterSkills(sp);

        // Semantic skills
        ServiceOptions options = sp.GetRequiredService<IOptions<ServiceOptions>>().Value;
        if (!string.IsNullOrWhiteSpace(options.SemanticSkillsDirectory))
        {
            foreach (string subDir in Directory.GetDirectories(options.SemanticSkillsDirectory))
            {
                try
                {
                    kernel.ImportSemanticSkillFromDirectory(options.SemanticSkillsDirectory, Path.GetFileName(subDir)!);
                }
                catch (TemplateException e)
                {
                    kernel.Log.LogError("Could not load skill from {Directory}: {Message}", subDir, e.Message);
                }
            }
        }

        return Task.CompletedTask;
    }
}
