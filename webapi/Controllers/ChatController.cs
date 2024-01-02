using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.SemanticKernel.Orchestration;
using AzureVideoChat.Models;
using AzureVideoChat.Services;

namespace AzureVideoChat.Controllers
{
    [ApiController]
    public class ChatMessageController : ControllerBase 
    {
        private const string ChatErrorMessage = "Chat error occurred.";
        private readonly ILogger<ChatMessageController> _logger;
        private readonly ChatService _chatService;

        public ChatMessageController(ILogger<ChatMessageController> logger, ChatService chatService)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _chatService = chatService ?? throw new ArgumentNullException(nameof(chatService));
        }

        [HttpPost]
        [Route("chat")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostChatMessageAsync([FromBody] ChatRequest chatRequest)
        {
            _logger.LogDebug("Received chat request.");
            try
            {
                var chatResult = await _chatService.ExecuteChatAsync(chatRequest);

                if (chatResult.Result is null)
                {
                    _logger.LogError("Error processing chat request: Result is null.");
                    return BadRequest(ChatErrorMessage);
                }

                return Ok(ConvertToChatResponse(chatResult.Result, chatResult.ContextVariables));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred while processing chat request.");
                return StatusCode(StatusCodes.Status500InternalServerError, ChatErrorMessage);
            }
        }

        private ChatResponse ConvertToChatResponse(KernelResult chatResult, ContextVariables vars)
        {
            return new ChatResponse 
            {
                Value = chatResult.GetValue<string>(),
                Variables = vars.Select(v => new KeyValuePair<string, string>(v.Key, v.Value))
            };
        }
    }
}