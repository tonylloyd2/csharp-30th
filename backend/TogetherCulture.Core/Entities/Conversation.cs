using System;
using System.Collections.Generic;

namespace TogetherCulture.Core.Entities
{
    public class Conversation : BaseEntity
    {
        public string Title { get; set; }
        public ICollection<ChatMessage> Messages { get; set; }
        public ICollection<ConversationParticipant> Participants { get; set; }
    }

    public class ChatMessage : BaseEntity
    {
        public string Content { get; set; }
        public int SenderId { get; set; }
        public Member Sender { get; set; }
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public DateTime SentAt { get; set; }
    }

    public class ConversationParticipant : BaseEntity
    {
        public int MemberId { get; set; }
        public Member Member { get; set; }
        public int ConversationId { get; set; }
        public Conversation Conversation { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}