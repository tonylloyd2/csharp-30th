using System;

namespace TogetherCulture.Core.DTOs
{
    public class EventSearchDto
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? MinGuests { get; set; }
        public int? MaxGuests { get; set; }
        public bool? IncludeAttendees { get; set; } = false;
        public string? SearchTerm { get; set; }
        public int? PageSize { get; set; } = 10;
        public int? PageNumber { get; set; } = 1;
    }
}
