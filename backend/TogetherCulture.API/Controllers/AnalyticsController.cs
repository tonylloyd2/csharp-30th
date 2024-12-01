using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        private readonly IAnalyticsService _analyticsService;

        public AnalyticsController(IAnalyticsService analyticsService)
        {
            _analyticsService = analyticsService;
        }

        [HttpGet("funnel")]
        public async Task<ActionResult<FunnelAnalyticsDto>> GetFunnelAnalytics()
        {
            var analytics = await _analyticsService.GetFunnelAnalyticsAsync();
            return Ok(analytics);
        }

        [HttpGet("trends")]
        public async Task<ActionResult<IEnumerable<TrendAnalyticsDto>>> GetTrends(
            [FromQuery] DateTime startDate,
            [FromQuery] DateTime endDate)
        {
            var trends = await _analyticsService.GetTrendsAsync(startDate, endDate);
            return Ok(trends);
        }

        [HttpGet("interests")]
        public async Task<ActionResult<IEnumerable<InterestShiftDto>>> GetInterestShifts()
        {
            var shifts = await _analyticsService.GetInterestShiftsAsync();
            return Ok(shifts);
        }

        [HttpGet("engagement")]
        public async Task<ActionResult<EngagementMetricsDto>> GetEngagementMetrics()
        {
            var metrics = await _analyticsService.GetEngagementMetricsAsync();
            return Ok(metrics);
        }
    }
}