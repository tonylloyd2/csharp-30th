using System;
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Core.Entities
{
    public class Connection : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsNeed { get; set; }
        public int CreatedById { get; set; }
        public Member CreatedBy { get; set; }
    }
}