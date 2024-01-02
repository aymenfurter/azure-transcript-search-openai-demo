// Copyright (c) Microsoft. All rights reserved.

using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Integration.AspNet.Core;
using Microsoft.Bot.Connector.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AzureVideoChat.Extensions;
using AzureVideoChat.Services;
using AzureVideoChat.Bots;

namespace SemanticKernel.Service;

public sealed class Program
{
    public static async Task Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        // Load in configuration settings from appsettings.json, user-secrets, key vaults, etc...
        builder.Host.AddConfiguration();


        // Add in configuration options and Semantic Kernel services.
        builder.Services
            .AddSingleton<ILogger>(sp => sp.GetRequiredService<ILogger<Program>>()) // some services require an un-templated ILogger
            .AddOptions(builder.Configuration)
            .AddSemanticKernelServices();

        // Add CopilotChat services.
        builder.Services
            .AddChatOptions(builder.Configuration)
            .AddTransient<ChatService>();

        builder.Services
            .AddHttpClient()
            .AddControllers()
            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.MaxDepth = HttpHelper.BotMessageSerializerSettings.MaxDepth;
            });

        builder.Services
            .AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>()
            .AddSingleton<IBotFrameworkHttpAdapter, AdapterWithErrorHandler>()
            .AddSingleton<IStorage, MemoryStorage>()
            .AddSingleton<ConversationState>();

        builder.Services
            .AddApplicationInsightsTelemetry()
            .AddLogging(logBuilder => logBuilder.AddApplicationInsights())
            .AddEndpointsApiExplorer()
            .AddSwaggerGen()
            .AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });


        // Configure middleware and endpoints
        WebApplication app = builder.Build();
        app.UseCors();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        // Enable Swagger for development environments.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Start the service
        Task runTask = app.RunAsync();

        // Log the health probe URL for users to validate the service is running.
        try
        {
            string? address = app.Services.GetRequiredService<IServer>().Features.Get<IServerAddressesFeature>()?.Addresses.FirstOrDefault();
            app.Services.GetRequiredService<ILogger>().LogInformation("Health probe: {0}/probe", address);
        }
        catch (ObjectDisposedException)
        {
            // We likely failed startup which disposes 'app.Services' - don't attempt to display the health probe URL.
        }



        // Wait for the service to complete.
        await runTask;
    }
}