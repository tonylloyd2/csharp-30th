namespace TogetherCulture.Core.DTOs
{
    public class ChatMessageDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int SenderId { get; set; }
        public int ConversationId { get; set; }
        public DateTime SentAt { get; set; }
    }

    public class ConversationDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<int> ParticipantIds { get; set; }
        public DateTime CreatedAt { get; set; }
        public ChatMessageDto LastMessage { get; set; }
    }
}