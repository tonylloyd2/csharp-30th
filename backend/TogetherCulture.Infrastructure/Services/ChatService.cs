using Microsoft.EntityFrameworkCore;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;
using TogetherCulture.Infrastructure.Data;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace TogetherCulture.Infrastructure.Services
{
    public class ChatService : IChatService
    {
        private readonly ApplicationDbContext _context;

        public ChatService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResult<IEnumerable<ConversationDto>>> GetConversationsAsync(int userId)
        {
            try
            {
                var conversations = await _context.ConversationParticipants
                    .Where(p => p.MemberId == userId)
                    .Include(p => p.Conversation)
                        .ThenInclude(c => c.Messages.OrderByDescending(m => m.SentAt).Take(1))
                    .Include(p => p.Conversation)
                        .ThenInclude(c => c.Participants)
                            .ThenInclude(p => p.Member)
                    .Select(p => new ConversationDto
                    {
                        Id = p.ConversationId,
                        Title = p.Conversation.Title,
                        ParticipantIds = p.Conversation.Participants.Select(p => p.MemberId).ToList(),
                        CreatedAt = p.Conversation.CreatedAt,
                        LastMessage = p.Conversation.Messages
                            .OrderByDescending(m => m.SentAt)
                            .Select(m => new ChatMessageDto
                            {
                                Id = m.Id,
                                Content = m.Content,
                                SenderId = m.SenderId,
                                ConversationId = m.ConversationId,
                                SentAt = m.SentAt
                            })
                            .FirstOrDefault()
                    })
                    .OrderByDescending(c => c.LastMessage != null ? c.LastMessage.SentAt : c.CreatedAt)
                    .ToListAsync();

                return new ServiceResult<IEnumerable<ConversationDto>> { Data = conversations, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<ConversationDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<ConversationDto>> GetConversationAsync(int conversationId)
        {
            try
            {
                var conversation = await _context.Conversations
                    .Include(c => c.Participants)
                        .ThenInclude(p => p.Member)
                    .Include(c => c.Messages.OrderByDescending(m => m.SentAt).Take(1))
                    .FirstOrDefaultAsync(c => c.Id == conversationId);

                if (conversation == null)
                    return new ServiceResult<ConversationDto> { Success = false, Message = "Conversation not found" };

                var dto = new ConversationDto
                {
                    Id = conversation.Id,
                    Title = conversation.Title,
                    ParticipantIds = conversation.Participants.Select(p => p.MemberId).ToList(),
                    CreatedAt = conversation.CreatedAt,
                    LastMessage = conversation.Messages
                        .OrderByDescending(m => m.SentAt)
                        .Select(m => new ChatMessageDto
                        {
                            Id = m.Id,
                            Content = m.Content,
                            SenderId = m.SenderId,
                            ConversationId = m.ConversationId,
                            SentAt = m.SentAt
                        })
                        .FirstOrDefault()
                };

                return new ServiceResult<ConversationDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<ConversationDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<ChatMessageDto>>> GetMessagesAsync(int conversationId)
        {
            try
            {
                var messages = await _context.ChatMessages
                    .Where(m => m.ConversationId == conversationId)
                    .OrderByDescending(m => m.SentAt)
                    .Select(m => new ChatMessageDto
                    {
                        Id = m.Id,
                        Content = m.Content,
                        SenderId = m.SenderId,
                        ConversationId = m.ConversationId,
                        SentAt = m.SentAt
                    })
                    .ToListAsync();

                return new ServiceResult<IEnumerable<ChatMessageDto>> { Data = messages, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<ChatMessageDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<ChatMessageDto>> SendMessageAsync(ChatMessageDto message)
        {
            try
            {
                // Verify the conversation exists and sender is a participant
                var isParticipant = await _context.ConversationParticipants
                    .AnyAsync(p => p.ConversationId == message.ConversationId && p.MemberId == message.SenderId);

                if (!isParticipant)
                    return new ServiceResult<ChatMessageDto> { Success = false, Message = "User is not a participant in this conversation" };

                var chatMessage = new ChatMessage
                {
                    Content = message.Content,
                    SenderId = message.SenderId,
                    ConversationId = message.ConversationId,
                    SentAt = DateTime.UtcNow
                };

                _context.ChatMessages.Add(chatMessage);
                await _context.SaveChangesAsync();

                message.Id = chatMessage.Id;
                message.SentAt = chatMessage.SentAt;

                return new ServiceResult<ChatMessageDto> { Data = message, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<ChatMessageDto> { Success = false, Message = ex.Message };
            }
        }
    }
}