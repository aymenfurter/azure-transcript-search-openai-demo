// Copyright (c) Microsoft. All rights reserved.

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AzureVideoChat.Options;

namespace AzureVideoChat.Extensions;

public static class ServiceExtensions
{

    public static IServiceCollection AddChatOptions(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddOptions<YouTubeMemoryOptions>()
            .Bind(configuration.GetSection(YouTubeMemoryOptions.PropertyName))
            .ValidateOnStart()
            .PostConfigure(options => PropertyTrimmer.TrimStringProperties(options));

        services.AddOptions<PromptsOptions>()
            .Bind(configuration.GetSection(PromptsOptions.PropertyName))
            .ValidateOnStart()
            .PostConfigure(options => PropertyTrimmer.TrimStringProperties(options));

        return services;
    }
}