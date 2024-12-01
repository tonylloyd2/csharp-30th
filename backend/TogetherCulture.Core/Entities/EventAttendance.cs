namespace TogetherCulture.Core.Entities
{
    public class EventAttendance : BaseEntity
    {
        public int MemberId { get; set; }
        public Member Member { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
        public bool HasAttended { get; set; }
    }
}