using System.Collections.Generic;

namespace TogetherCulture.Core.DTOs
{
    public class DashboardDto
    {
        public List<BenefitsDto> UsedBenefits { get; set; }
        public List<BenefitsDto> UnusedBenefits { get; set; }
        public List<EventWithAttendeesDto> UpcomingEvents { get; set; }
        public List<ModuleDto> AvailableModules { get; set; }
    }

    public class ModuleDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}