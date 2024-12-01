using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet("conversations")]
        public async Task<ActionResult<IEnumerable<ConversationDto>>> GetConversations()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var conversations = await _chatService.GetConversationsAsync(userId);
            return Ok(conversations);
        }

        [HttpGet("conversations/{id}")]
        public async Task<ActionResult<ConversationDto>> GetConversation(int id)
        {
            var conversation = await _chatService.GetConversationAsync(id);
            if (conversation == null)
                return NotFound();
            return Ok(conversation);
        }

        [HttpGet("conversations/{id}/messages")]
        public async Task<ActionResult<IEnumerable<ChatMessageDto>>> GetMessages(int id)
        {
            var messages = await _chatService.GetMessagesAsync(id);
            return Ok(messages);
        }

        [HttpPost("messages")]
        public async Task<ActionResult> SendMessage([FromBody] ChatMessageDto message)
        {
            var result = await _chatService.SendMessageAsync(message);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok();
        }
    }
}