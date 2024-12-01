// TogetherCulture.Core/DTOs/MemberSearchDto.cs
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Core.DTOs
{
    public class MemberSearchDto
    {
        public string? SearchTerm { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public int? EventId { get; set; }
        public MembershipType? MembershipType { get; set; }
        public InterestType? Interest { get; set; }
        public int? PageSize { get; set; }
        public int? PageNumber { get; set; }
    }
}