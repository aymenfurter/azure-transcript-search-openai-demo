using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AI;
using Microsoft.SemanticKernel.Orchestration;
using Microsoft.SemanticKernel.SkillDefinition;
using SemanticKernel.Service.CopilotChat.Controllers;
using SemanticKernel.Service.CopilotChat.Skills.ChatSkills;
using SemanticKernel.Service.Models;
public class ChatService
{
    private readonly IKernel _chatKernel;
    private readonly Planner _chatPlanner;

    public const string SkillName = "ChatSkill";
    public const string FunctionName = "Chat";

    public ChatService(IKernel chatKernel, Planner chatPlanner)
    {
        _chatKernel = chatKernel ?? throw new ArgumentNullException(nameof(chatKernel));
        _chatPlanner = chatPlanner ?? throw new ArgumentNullException(nameof(chatPlanner));
    }

    public async Task<SKContext> ExecuteChatAsync(ChatRequest chatRequest)
    {
        var chatContext = CreateChatContext(chatRequest);

        ISKFunction? functionToInvoke = GetFunctionToInvoke(_chatKernel);
        if (functionToInvoke is null)
        {
            throw new Exception("Function to invoke is null.");
        }
        SKContext chatResult = await ExecuteChatFunctionAsync(_chatKernel, chatContext, functionToInvoke);
        if (chatResult.ErrorOccurred)
        {
            throw new Exception("Error occurred while executing chat function: " + CreateErrorResponse(chatResult));
        }

        return chatResult;
    }

    private ContextVariables CreateChatContext(ChatRequest chatRequest)
    {
        var chatContext = new ContextVariables(chatRequest.Input);
        foreach (var variable in chatRequest.Variables)
        {
            chatContext.Set(variable.Key, variable.Value);
        }

        return chatContext;
    }


    private ISKFunction? GetFunctionToInvoke(IKernel chatKernel)
    {
        try
        {
            return chatKernel.Skills.GetFunction(SkillName, FunctionName);
        }
        catch (KernelException ke)
        {
            return null;
        }
    }

    private async Task<SKContext> ExecuteChatFunctionAsync(IKernel chatKernel, ContextVariables chatContext, ISKFunction functionToInvoke)
    {
        return await chatKernel.RunAsync(chatContext, functionToInvoke);
    }

    private string CreateErrorResponse(SKContext chatResult)
    {
        if (chatResult.LastException is AIException aiException && aiException.Detail is not null)
        {
            return string.Concat(aiException.Message, " - Detail: ", aiException.Detail);
        }

        return chatResult.LastErrorDescription;
    }

    public ChatResponse CreateChatResponse(SKContext chatResult)
    {
        return new ChatResponse { Value = chatResult.Result, Variables = chatResult.Variables.Select(v => new KeyValuePair<string, string>(v.Key, v.Value)) };
    }
}