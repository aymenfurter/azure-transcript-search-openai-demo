using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly ChatService _chatService;

        public ChatMessageController(ILogger<ChatMessageController> logger, ChatService chatService)
        {
            this.logger = logger;
            _chatService = chatService ?? throw new ArgumentNullException(nameof(chatService));
        }

        [HttpPost]
        [Route("chat")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> HandleChatAsync([FromBody] ChatRequest chatRequest)
        {
            logger.LogDebug("Chat request received.");

            SKContext chatResult = null;
            try
            {
                chatResult = await _chatService.ExecuteChatAsync(chatRequest);
            }
            catch (KernelException ke)
            {
                logger.LogError($"Failed to find {ChatService.SkillName}/{ChatService.FunctionName} on server: {ke}");
                return NotFound($"Failed to find {ChatService.SkillName}/{ChatService.FunctionName} on server");
            }
            catch
            {
                if (chatResult == null)
                {
                    return BadRequest("Chat error.");
                }
                return BadRequest(CreateErrorResponse(chatResult));
            }

            return Ok(CreateChatResponse(chatResult));
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