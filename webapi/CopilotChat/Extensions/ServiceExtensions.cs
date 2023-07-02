// Copyright (c) Microsoft. All rights reserved.

using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SemanticKernel.Service.CopilotChat.Options;
using SemanticKernel.Service.Options;

namespace SemanticKernel.Service.CopilotChat.Extensions;

public static class ServiceExtensions
{

    public static IServiceCollection AddChatOptions(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddOptions<YouTubeMemoryOptions>()
            .Bind(configuration.GetSection(YouTubeMemoryOptions.PropertyName))
            .ValidateOnStart()
            .PostConfigure(TrimStringProperties);

        services.AddOptions<PromptsOptions>()
            .Bind(configuration.GetSection(PromptsOptions.PropertyName))
            .ValidateOnStart()
            .PostConfigure(TrimStringProperties);

        return services;
    }

    private static void TrimStringProperties<T>(T options) where T : class
    {
        Queue<object> targets = new();
        targets.Enqueue(options);

        while (targets.Count > 0)
        {
            object target = targets.Dequeue();
            Type targetType = target.GetType();
            foreach (PropertyInfo property in targetType.GetProperties())
            {
                if (property.PropertyType.IsEnum)
                {
                    continue;
                }

                if (property.PropertyType.Namespace == "System" &&
                    property.CanRead &&
                    property.CanWrite)
                {
                    if (property.PropertyType == typeof(string) &&
                        property.GetValue(target) != null)
                    {
                        property.SetValue(target, property.GetValue(target)!.ToString()!.Trim());
                    }
                }
                else
                {
                    if (property.GetValue(target) != null)
                    {
                        targets.Enqueue(property.GetValue(target)!);
                    }
                }
            }
        }
    }
}
