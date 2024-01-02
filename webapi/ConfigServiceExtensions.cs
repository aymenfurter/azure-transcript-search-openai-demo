// Copyright (c) Microsoft. All rights reserved.

using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AzureVideoChat.Options;
using AzureVideoChat.Extensions;

internal static class ConfigServicesExtensions
{
  
    internal static IServiceCollection AddOptions(this IServiceCollection services, ConfigurationManager configuration)
    {
        // General configuration
        services.AddOptions<ServiceOptions>()
            .Bind(configuration.GetSection(ServiceOptions.PropertyName))
            .ValidateDataAnnotations()
            .ValidateOnStart()
            .PostConfigure(options => PropertyTrimmer.TrimStringProperties(options));

        return services;
    }

    internal static IServiceCollection AddCors(this IServiceCollection services)
    {
        IConfiguration configuration = services.BuildServiceProvider().GetRequiredService<IConfiguration>();
        string[] allowedOrigins = configuration.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
        if (allowedOrigins.Length > 0)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    policy =>
                    {
                        policy.WithOrigins(allowedOrigins)
                            .AllowAnyHeader();
                    });
            });
        }

        return services;
    }
}