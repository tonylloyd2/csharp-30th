using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Core.Entities
{
    public class ModuleProgress : BaseEntity
    {
        public int MemberId { get; set; }
        public Member Member { get; set; }
        
        public int ContentModuleId { get; set; }
        public ContentModule ContentModule { get; set; }
        
        public ModuleCompletionStatus Status { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? CompletedAt { get; set; }
    }
}