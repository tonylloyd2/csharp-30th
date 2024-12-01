// TogetherCulture.Core/Interfaces/IDashboardService.cs
using TogetherCulture.Core.DTOs;
using Microsoft.AspNetCore.Http;  // For IFormFile
public interface IDashboardService
{
    Task<BenefitsDto> GetMemberBenefitsAsync(int userId);
    Task<List<SuggestionDto>> GetPersonalizedSuggestionsAsync(int userId);
}

