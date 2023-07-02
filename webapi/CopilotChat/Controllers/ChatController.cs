using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CopilotChat.Skills.YouTube;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.AI;
using Microsoft.SemanticKernel.Orchestration;
using Microsoft.SemanticKernel.SkillDefinition;
using SemanticKernel.Service.CopilotChat.Skills.ChatSkills;
using SemanticKernel.Service.Models;

namespace SemanticKernel.Service.CopilotChat.Controllers
{
    [ApiController]
    public class ChatMessageController : ControllerBase 
    {
        private readonly ILogger<ChatMessageController> logger;
        private const string SkillName = "ChatSkill";
        private const string FunctionName = "Chat";

        public ChatMessageController(ILogger<ChatMessageController> logger)
        {
            this.logger = logger;
        }

        [HttpPost]
        [Route("chat")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> HandleChatAsync(
            [FromServices] IKernel chatKernel,
            [FromServices] Planner chatPlanner,
            [FromBody] ChatRequest chatRequest)
        {
            logger.LogDebug("Chat request received.");

            var chatContext = CreateChatContext(chatRequest);

            await RegisterSkillsAsync(chatPlanner, chatContext);

            ISKFunction? functionToInvoke = GetFunctionToInvoke(chatKernel);
            if (functionToInvoke == null)
            {
                return NotFound($"Failed to find {SkillName}/{FunctionName} on server");
            }

            SKContext chatResult = await ExecuteChatFunctionAsync(chatKernel, chatContext, functionToInvoke);
            if (chatResult.ErrorOccurred)
            {
                return BadRequest(CreateErrorResponse(chatResult));
            }

            return Ok(CreateChatResponse(chatResult));
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

        private async Task RegisterSkillsAsync(Planner planner, ContextVariables variables)
        {
            planner.Kernel.ImportSkill(new YouTubePlugin(), "YouTube");
        }

        private ISKFunction? GetFunctionToInvoke(IKernel chatKernel)
        {
            try
            {
                return chatKernel.Skills.GetFunction(SkillName, FunctionName);
            }
            catch (KernelException ke)
            {
                logger.LogError($"Failed to find {SkillName}/{FunctionName} on server: {ke}");
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

        private ChatResponse CreateChatResponse(SKContext chatResult)
        {
            return new ChatResponse { Value = chatResult.Result, Variables = chatResult.Variables.Select(v => new KeyValuePair<string, string>(v.Key, v.Value)) };
        }
    }
}