using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MembersController : ControllerBase
    {
        private readonly IGenericRepository<Member> _memberRepository;
        private readonly IMemberService _memberService;

        public MembersController(
            IGenericRepository<Member> memberRepository,
            IMemberService memberService)
        {
            _memberRepository = memberRepository;
            _memberService = memberService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Member>>> GetMembers()
        {
            var members = await _memberRepository.GetAllAsync();
            return Ok(members);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Member>> GetMember(int id)
        {
            var member = await _memberRepository.GetByIdAsync(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(member);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Member>> CreateMember([FromBody] CreateMemberDto createMemberDto)
        {
            var result = await _memberService.CreateMemberAsync(createMemberDto);
            if (!result.Success)
                return BadRequest(result.Message);

            return CreatedAtAction(nameof(GetMember), new { id = result.Data.Id }, result.Data);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateMember(int id, [FromBody] UpdateMemberDto updateMemberDto)
        {
            var result = await _memberService.UpdateMemberAsync(id, updateMemberDto);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok();
        }

        [HttpGet("profile")]
        public async Task<ActionResult<MemberProfileDto>> GetProfile()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var profile = await _memberService.GetProfileAsync(userId);
            return Ok(profile);
        }

        [HttpPut("profile")]
        public async Task<ActionResult> UpdateProfile([FromBody] UpdateProfileDto updateProfileDto)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var result = await _memberService.UpdateProfileAsync(userId, updateProfileDto);
            
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok();
        }

        [HttpGet("dashboard")]
        public async Task<ActionResult<DashboardDto>> GetDashboard()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var dashboard = await _memberService.GetDashboardAsync(userId);
            return Ok(dashboard);
        }

        [HttpGet("benefits")]
        public async Task<ActionResult<BenefitsUtilizationDto>> GetBenefits()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var benefits = await _memberService.GetBenefitsUtilizationAsync(userId);
            return Ok(benefits);
        }

        [HttpGet("interests")]
        public async Task<ActionResult<IEnumerable<InterestDto>>> GetInterests()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var interests = await _memberService.GetInterestsAsync(userId);
            return Ok(interests);
        }

        [HttpGet("suggestions")]
        public async Task<ActionResult<IEnumerable<SuggestionDto>>> GetSuggestions()
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var suggestions = await _memberService.GetPersonalizedSuggestionsAsync(userId);
            return Ok(suggestions);
        }

        [HttpPut("{id}/type")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateMembershipType(int id, [FromBody] UpdateMembershipTypeDto updateTypeDto)
        {
            var result = await _memberService.UpdateMembershipTypeAsync(id, updateTypeDto);
            
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok();
        }

        [HttpGet("search")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> SearchMembers([FromQuery] MemberSearchDto searchDto)
        {
            var members = await _memberService.SearchMembersAsync(searchDto);
            return Ok(members);
        }

        [Authorize]
        [HttpPost("express-interest")]
        public async Task<ActionResult> ExpressInterest([FromBody] ExpressInterestDto interestDto)
        {
            var memberId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var result = await _memberService.ExpressInterestAsync(memberId, interestDto);
            
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok();
        }
    }
}