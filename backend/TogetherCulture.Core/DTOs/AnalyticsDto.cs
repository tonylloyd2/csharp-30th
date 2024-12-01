using System;
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Core.DTOs
{
    public class FunnelAnalyticsDto
    {
        public int TotalVisitors { get; set; }
        public int InterestedMembers { get; set; }
        public int RegisteredMembers { get; set; }
        public int ActiveMembers { get; set; }
    }

    public class TrendAnalyticsDto
    {
        public DateTime Date { get; set; }
        public int EventAttendance { get; set; }
        public int MemberActivity { get; set; }
        public int ModuleProgress { get; set; }
    }

    public class InterestShiftDto
    {
        public InterestType Interest { get; set; }
        public int InitialCount { get; set; }
        public int CurrentCount { get; set; }
        public double PercentageChange { get; set; }
    }

    public class EngagementMetricsDto
    {
        public double AverageEventsPerMember { get; set; }
        public double ContentModuleCompletionRate { get; set; }
        public int TotalConnections { get; set; }
        public int ActiveDiscussions { get; set; }
    }
}