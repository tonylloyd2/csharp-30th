using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("benefits")]
        public async Task<ActionResult> GetBenefits()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var benefits = await _dashboardService.GetMemberBenefitsAsync(userId);
            return Ok(benefits);
        }

        [HttpGet("suggestions")]
        public async Task<ActionResult> GetSuggestions()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var suggestions = await _dashboardService.GetPersonalizedSuggestionsAsync(userId);
            return Ok(suggestions);
        }
    }
}