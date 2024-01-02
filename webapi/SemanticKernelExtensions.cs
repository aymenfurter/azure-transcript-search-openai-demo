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
using AzureVideoChat.Extensions;
using AzureVideoChat.Options;

namespace SemanticKernel.Service;

internal static class SemanticKernelExtensions
{
    public delegate Task RegisterSkillsWithKernel(IServiceProvider sp, IKernel kernel);

    internal static IServiceCollection AddSemanticKernelServices(this IServiceCollection services)
    {
        services.AddScoped<IKernel>(sp =>
        {

            IKernel kernel;
            kernel = Kernel.Builder
            .WithAzureOpenAIChatCompletionService(Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME")!, Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")!, Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY")!)
            .Build();

            sp.GetRequiredService<RegisterSkillsWithKernel>()(sp, kernel);
            return kernel;
        });

        services.AddScoped<RegisterSkillsWithKernel>(sp => RegisterSkillsAsync);

        return services;
    }

    private static Task RegisterSkillsAsync(IServiceProvider sp, IKernel kernel)
    {
        kernel.RegisterSkills(sp);

        ServiceOptions options = sp.GetRequiredService<IOptions<ServiceOptions>>().Value;
        if (!string.IsNullOrWhiteSpace(options.SemanticSkillsDirectory))
        {
            foreach (string subDir in Directory.GetDirectories(options.SemanticSkillsDirectory))
            {
                kernel.ImportSemanticSkillFromDirectory(options.SemanticSkillsDirectory, Path.GetFileName(subDir)!);
            }
        }

        return Task.CompletedTask;
    }
}