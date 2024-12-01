namespace TogetherCulture.Core.Entities
{
    public class ModuleBooking : BaseEntity
    {
        public int MemberId { get; set; }
        public Member Member { get; set; }
        public int ContentModuleId { get; set; }
        public ContentModule ContentModule { get; set; }
        public DateTime BookedAt { get; set; } = DateTime.UtcNow;
        public bool IsCompleted { get; set; }
    }
}