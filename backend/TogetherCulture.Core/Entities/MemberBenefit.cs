namespace TogetherCulture.Core.Entities
{
    public class MemberBenefit : BaseEntity
    {
        public int MemberId { get; set; }
        public Member Member { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsUsed { get; set; }
    }
}