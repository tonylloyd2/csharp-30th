using TogetherCulture.Core.DTOs;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TogetherCulture.Core.Interfaces
{
    public interface IChatService
    {
        Task<ServiceResult<IEnumerable<ConversationDto>>> GetConversationsAsync(int userId);
        Task<ServiceResult<ConversationDto>> GetConversationAsync(int conversationId);
        Task<ServiceResult<ChatMessageDto>> SendMessageAsync(ChatMessageDto message);
        Task<ServiceResult<IEnumerable<ChatMessageDto>>> GetMessagesAsync(int conversationId);
    }
}