using System.Collections.Generic;
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Core.DTOs
{
    public class MemberFilterDto
    {
        public string? SearchTerm { get; set; }
        public MembershipType? MembershipType { get; set; }
        public List<InterestType>? Interests { get; set; }
    }
}