using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using TogetherCulture.Core.Interfaces;

namespace TogetherCulture.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly IEventService _eventService;

        public AdminController(IMemberService memberService, IEventService eventService)
        {
            _memberService = memberService;
            _eventService = eventService;
        }

        [HttpPost("members")]
        public async Task<ActionResult> AddMember([FromBody] CreateMemberDto dto)
        {
            var result = await _memberService.CreateMemberAsync(dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpPut("members/{id}/type")]
        public async Task<ActionResult> UpdateMemberType(int id, [FromBody] UpdateMembershipTypeDto dto)
        {
            var result = await _memberService.UpdateMemberTypeAsync(id, dto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpGet("members/search")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> SearchMembers([FromQuery] MemberSearchDto searchDto)
        {
            var result = await _memberService.SearchMembersAsync(searchDto);
            if (!result.Success)
                return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpGet("events/search")]
        public async Task<ActionResult> SearchEvents([FromQuery] EventSearchDto dto)
        {
            var events = await _eventService.SearchEventsAsync(dto);
            return Ok(events);
        }
    }
}