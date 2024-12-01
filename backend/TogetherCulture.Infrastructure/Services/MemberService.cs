using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace TogetherCulture.Infrastructure.Services
{
    public class MemberService : IMemberService
    {
        private readonly IGenericRepository<Member> _memberRepository;
        private readonly IMapper _mapper;

        public MemberService(IGenericRepository<Member> memberRepository, IMapper mapper)
        {
            _memberRepository = memberRepository;
            _mapper = mapper;
        }

        public async Task<ServiceResult<MemberProfileDto>> GetMemberAsync(int id)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(id);
                if (member == null)
                    return new ServiceResult<MemberProfileDto> { Success = false, Message = "Member not found" };

                var dto = _mapper.Map<MemberProfileDto>(member);
                return new ServiceResult<MemberProfileDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberProfileDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<MemberProfileDto>>> GetMembersAsync(MemberFilterDto filter)
        {
            try
            {
                var members = await _memberRepository.FindAllAsync(m =>
                    (string.IsNullOrEmpty(filter.SearchTerm) || 
                     (m.User.FirstName + " " + m.User.LastName).Contains(filter.SearchTerm)) &&
                    (!filter.MembershipType.HasValue || m.MembershipType == filter.MembershipType.Value));

                var dtos = _mapper.Map<IEnumerable<MemberProfileDto>>(members);
                return new ServiceResult<IEnumerable<MemberProfileDto>> { Data = dtos, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<MemberProfileDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<DashboardDto>> GetDashboardAsync(int userId)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(userId);
                if (member == null)
                    return new ServiceResult<DashboardDto> { Success = false, Message = "Member not found" };

                var dashboard = new DashboardDto
                {
                    UsedBenefits = _mapper.Map<List<BenefitsDto>>(member.Benefits.Where(b => b.IsUsed)),
                    UnusedBenefits = _mapper.Map<List<BenefitsDto>>(member.Benefits.Where(b => !b.IsUsed)),
                    UpcomingEvents = _mapper.Map<List<EventWithAttendeesDto>>(member.EventAttendances
                        .Where(ea => ea.Event.StartDate > DateTime.UtcNow)
                        .Select(ea => ea.Event)),
                    AvailableModules = new List<ModuleDto>()  // To be implemented
                };

                return new ServiceResult<DashboardDto> { Data = dashboard, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<DashboardDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberProfileDto>> CreateMemberAsync(CreateMemberDto createMemberDto)
        {
            try
            {
                var member = _mapper.Map<Member>(createMemberDto);
                await _memberRepository.AddAsync(member);
                await _memberRepository.SaveChangesAsync();

                var dto = _mapper.Map<MemberProfileDto>(member);
                return new ServiceResult<MemberProfileDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberProfileDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberProfileDto>> UpdateMemberAsync(int id, UpdateMemberDto updateMemberDto)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(id);
                if (member == null)
                    return new ServiceResult<MemberProfileDto> { Success = false, Message = "Member not found" };

                _mapper.Map(updateMemberDto, member);
                await _memberRepository.SaveChangesAsync();

                var dto = _mapper.Map<MemberProfileDto>(member);
                return new ServiceResult<MemberProfileDto> { Data = dto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberProfileDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<InterestDto>>> GetInterestsAsync(int userId)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(userId);
                if (member == null)
                    return new ServiceResult<IEnumerable<InterestDto>> { Success = false, Message = "Member not found" };

                var interests = _mapper.Map<IEnumerable<InterestDto>>(member.Interests);
                return new ServiceResult<IEnumerable<InterestDto>> { Data = interests, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<InterestDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<BenefitsDto>>> GetBenefitsAsync(int userId)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(userId);
                if (member == null)
                    return new ServiceResult<IEnumerable<BenefitsDto>> { Success = false, Message = "Member not found" };

                var benefits = _mapper.Map<IEnumerable<BenefitsDto>>(member.Benefits);
                return new ServiceResult<IEnumerable<BenefitsDto>> { Data = benefits, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<BenefitsDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<SuggestionDto>>> GetSuggestionsAsync(int userId)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(userId);
                if (member == null)
                    return new ServiceResult<IEnumerable<SuggestionDto>> { Success = false, Message = "Member not found" };

                // TODO: Implement suggestion logic based on member's interests and activity
                var suggestions = new List<SuggestionDto>();
                return new ServiceResult<IEnumerable<SuggestionDto>> { Data = suggestions, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<SuggestionDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberDto>> AddMemberAsync(CreateMemberDto createMemberDto)
        {
            try
            {
                var member = _mapper.Map<Member>(createMemberDto);
                await _memberRepository.AddAsync(member);
                await _memberRepository.SaveChangesAsync();
                
                return new ServiceResult<MemberDto> 
                { 
                    Data = _mapper.Map<MemberDto>(member),
                    Success = true 
                };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberProfileDto>> GetProfileAsync(int memberId)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(memberId);
                if (member == null)
                    return new ServiceResult<MemberProfileDto> { Success = false, Message = "Member not found" };

                var profileDto = _mapper.Map<MemberProfileDto>(member);
                return new ServiceResult<MemberProfileDto> { Data = profileDto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberProfileDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberProfileDto>> UpdateProfileAsync(int memberId, UpdateProfileDto updateProfileDto)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(memberId);
                if (member == null)
                    return new ServiceResult<MemberProfileDto> { Success = false, Message = "Member not found" };

                _mapper.Map(updateProfileDto, member);
                await _memberRepository.UpdateAsync(member);
                await _memberRepository.SaveChangesAsync();

                return new ServiceResult<MemberProfileDto> 
                { 
                    Data = _mapper.Map<MemberProfileDto>(member),
                    Success = true 
                };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberProfileDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<BenefitsUtilizationDto>> GetBenefitsUtilizationAsync(int memberId)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(memberId);
                if (member == null)
                    return new ServiceResult<BenefitsUtilizationDto> { Success = false, Message = "Member not found" };

                var utilizationDto = _mapper.Map<BenefitsUtilizationDto>(member);
                return new ServiceResult<BenefitsUtilizationDto> { Data = utilizationDto, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<BenefitsUtilizationDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<SuggestionDto>>> GetPersonalizedSuggestionsAsync(int memberId)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(memberId);
                if (member == null)
                    return new ServiceResult<IEnumerable<SuggestionDto>> { Success = false, Message = "Member not found" };

                // TODO: Implement personalization logic based on member interests and history
                var suggestions = new List<SuggestionDto>();
                return new ServiceResult<IEnumerable<SuggestionDto>> { Data = suggestions, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<SuggestionDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberDto>> UpdateMembershipTypeAsync(int memberId, UpdateMembershipTypeDto updateTypeDto)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(memberId);
                if (member == null)
                    return new ServiceResult<MemberDto> { Success = false, Message = "Member not found" };

                member.MembershipType = updateTypeDto.NewMembershipType;
                await _memberRepository.UpdateAsync(member);
                await _memberRepository.SaveChangesAsync();

                return new ServiceResult<MemberDto> 
                { 
                    Data = _mapper.Map<MemberDto>(member),
                    Success = true 
                };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<IEnumerable<MemberDto>>> SearchMembersAsync(MemberSearchDto searchDto)
        {
            try
            {
                var members = await _memberRepository.FindAllAsync(m =>
                    (string.IsNullOrEmpty(searchDto.SearchTerm) || 
                     (m.User.FirstName + " " + m.User.LastName).Contains(searchDto.SearchTerm)) &&
                    (!searchDto.MembershipType.HasValue || m.MembershipType == searchDto.MembershipType));

                var memberDtos = _mapper.Map<IEnumerable<MemberDto>>(members);
                return new ServiceResult<IEnumerable<MemberDto>> { Data = memberDtos, Success = true };
            }
            catch (Exception ex)
            {
                return new ServiceResult<IEnumerable<MemberDto>> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberDto>> ExpressInterestAsync(int memberId, ExpressInterestDto interestDto)
        {
            try
            {
                var member = await _memberRepository.GetByIdAsync(memberId);
                if (member == null)
                    return new ServiceResult<MemberDto> { Success = false, Message = "Member not found" };

                // TODO: Implement interest expression logic
                await _memberRepository.SaveChangesAsync();

                return new ServiceResult<MemberDto> 
                { 
                    Data = _mapper.Map<MemberDto>(member),
                    Success = true 
                };
            }
            catch (Exception ex)
            {
                return new ServiceResult<MemberDto> { Success = false, Message = ex.Message };
            }
        }

        public async Task<ServiceResult<MemberDto>> UpdateMemberTypeAsync(int memberId, UpdateMembershipTypeDto updateTypeDto)
        {
            return await UpdateMembershipTypeAsync(memberId, updateTypeDto);
        }
    }
}