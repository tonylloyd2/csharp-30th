using Microsoft.EntityFrameworkCore;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;
using TogetherCulture.Core.Entities.Enums;
using TogetherCulture.Infrastructure.Data;

namespace TogetherCulture.Infrastructure.Services
{
    public class AnalyticsService : IAnalyticsService
    {
        private readonly ApplicationDbContext _context;

        public AnalyticsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<FunnelAnalyticsDto> GetFunnelAnalyticsAsync()
        {
            var totalVisitors = await _context.Users.CountAsync();
            var registeredMembers = await _context.Members.CountAsync();
            var activeMembers = await _context.Members
                .Where(m => m.LastLogin >= DateTime.UtcNow.AddDays(-30))
                .CountAsync();

            var interestedMembers = await _context.Members
                .Where(m => m.Interests != null && m.Interests.Any())
                .CountAsync();

            return new FunnelAnalyticsDto
            {
                TotalVisitors = totalVisitors,
                InterestedMembers = interestedMembers,
                RegisteredMembers = registeredMembers,
                ActiveMembers = activeMembers
            };
        }

        public async Task<IEnumerable<TrendAnalyticsDto>> GetTrendsAsync(DateTime startDate, DateTime endDate)
        {
            var trends = new List<TrendAnalyticsDto>();
            var currentDate = startDate.Date;

            while (currentDate <= endDate.Date)
            {
                var nextDate = currentDate.AddDays(1);

                var eventAttendance = await _context.EventAttendances
                    .CountAsync(a => a.RegisteredAt >= currentDate && a.RegisteredAt < nextDate);

                var memberActivity = await _context.Members
                    .CountAsync(m => m.LastLogin >= currentDate && m.LastLogin < nextDate);

                var moduleProgress = await _context.ContentModules
                    .SelectMany(m => m.UserProgress)
                    .CountAsync(p => p.Status == ModuleCompletionStatus.Completed && 
                                   p.CompletedAt >= currentDate && 
                                   p.CompletedAt < nextDate);

                trends.Add(new TrendAnalyticsDto
                {
                    Date = currentDate,
                    EventAttendance = eventAttendance,
                    MemberActivity = memberActivity,
                    ModuleProgress = moduleProgress
                });

                currentDate = nextDate;
            }

            return trends;
        }

        public async Task<IEnumerable<InterestShiftDto>> GetInterestShiftsAsync()
        {
            var shifts = new List<InterestShiftDto>();
            var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);

            foreach (InterestType interest in Enum.GetValues(typeof(InterestType)))
            {
                var initialCount = await _context.Members
                    .Where(m => m.CreatedAt < thirtyDaysAgo && m.Interests.Contains(interest))
                    .CountAsync();

                var currentCount = await _context.Members
                    .Where(m => m.Interests.Contains(interest))
                    .CountAsync();

                var percentageChange = initialCount > 0 
                    ? ((double)(currentCount - initialCount) / initialCount) * 100 
                    : 0;

                shifts.Add(new InterestShiftDto
                {
                    Interest = interest,
                    InitialCount = initialCount,
                    CurrentCount = currentCount,
                    PercentageChange = percentageChange
                });
            }

            return shifts;
        }

        public async Task<EngagementMetricsDto> GetEngagementMetricsAsync()
        {
            var totalMembers = await _context.Members.CountAsync();
            var totalEvents = await _context.Events.CountAsync();
            var totalAttendances = await _context.EventAttendances.CountAsync();
            var totalModules = await _context.ContentModules.CountAsync();
            var completedModules = await _context.ContentModules
                .SelectMany(m => m.UserProgress)
                .Where(p => p.Status == ModuleCompletionStatus.Completed)
                .CountAsync();

            var totalConnections = await _context.Connections.CountAsync();
            var activeDiscussions = await _context.Conversations
                .Where(c => c.Messages.Any(m => m.SentAt >= DateTime.UtcNow.AddDays(-7)))
                .CountAsync();

            return new EngagementMetricsDto
            {
                AverageEventsPerMember = totalMembers > 0 
                    ? (double)totalAttendances / totalMembers 
                    : 0,
                ContentModuleCompletionRate = totalModules > 0 
                    ? (double)completedModules / totalModules * 100 
                    : 0,
                TotalConnections = totalConnections,
                ActiveDiscussions = activeDiscussions
            };
        }
    }
}