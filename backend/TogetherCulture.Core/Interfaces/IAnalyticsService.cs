using TogetherCulture.Core.DTOs;
using Microsoft.AspNetCore.Http;  // For IFormFile
namespace TogetherCulture.Core.Interfaces
{
    public interface IAnalyticsService
    {
        Task<FunnelAnalyticsDto> GetFunnelAnalyticsAsync();
        Task<IEnumerable<TrendAnalyticsDto>> GetTrendsAsync(DateTime startDate, DateTime endDate);
        Task<IEnumerable<InterestShiftDto>> GetInterestShiftsAsync();
        Task<EngagementMetricsDto> GetEngagementMetricsAsync();
    }
}