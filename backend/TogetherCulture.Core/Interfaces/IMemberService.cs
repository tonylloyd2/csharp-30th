using System.Collections.Generic;
using System.Threading.Tasks;
using TogetherCulture.Core.DTOs;

namespace TogetherCulture.Core.Interfaces
{
    public interface IMemberService
    {
        Task<ServiceResult<MemberProfileDto>> GetMemberAsync(int id);
        Task<ServiceResult<IEnumerable<MemberProfileDto>>> GetMembersAsync(MemberFilterDto filter);
        Task<ServiceResult<DashboardDto>> GetDashboardAsync(int userId);
        Task<ServiceResult<MemberProfileDto>> CreateMemberAsync(CreateMemberDto createMemberDto);
        Task<ServiceResult<MemberProfileDto>> UpdateMemberAsync(int id, UpdateMemberDto updateMemberDto);
        Task<ServiceResult<IEnumerable<InterestDto>>> GetInterestsAsync(int userId);
        Task<ServiceResult<IEnumerable<BenefitsDto>>> GetBenefitsAsync(int userId);
        Task<ServiceResult<IEnumerable<SuggestionDto>>> GetSuggestionsAsync(int userId);
        
        // Additional methods
        Task<ServiceResult<MemberDto>> AddMemberAsync(CreateMemberDto createMemberDto);
        Task<ServiceResult<MemberProfileDto>> GetProfileAsync(int memberId);
        Task<ServiceResult<MemberProfileDto>> UpdateProfileAsync(int memberId, UpdateProfileDto updateProfileDto);
        Task<ServiceResult<BenefitsUtilizationDto>> GetBenefitsUtilizationAsync(int memberId);
        Task<ServiceResult<IEnumerable<SuggestionDto>>> GetPersonalizedSuggestionsAsync(int memberId);
        Task<ServiceResult<MemberDto>> UpdateMembershipTypeAsync(int memberId, UpdateMembershipTypeDto updateTypeDto);
        Task<ServiceResult<IEnumerable<MemberDto>>> SearchMembersAsync(MemberSearchDto searchDto);
        Task<ServiceResult<MemberDto>> ExpressInterestAsync(int memberId, ExpressInterestDto interestDto);
        Task<ServiceResult<MemberDto>> UpdateMemberTypeAsync(int memberId, UpdateMembershipTypeDto updateTypeDto);
    }
}