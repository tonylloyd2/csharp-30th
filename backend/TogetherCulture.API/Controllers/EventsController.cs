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
    public class EventsController : ControllerBase
    {
        private readonly IGenericRepository<Event> _eventRepository;
        private readonly IGenericRepository<EventAttendance> _attendanceRepository;

        public EventsController(
            IGenericRepository<Event> eventRepository,
            IGenericRepository<EventAttendance> attendanceRepository)
        {
            _eventRepository = eventRepository;
            _attendanceRepository = attendanceRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _eventRepository.GetAllAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var @event = await _eventRepository.GetByIdAsync(id);
            if (@event == null)
            {
                return NotFound();
            }
            return Ok(@event);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Event>>> SearchEvents([FromQuery] EventSearchDto searchDto)
        {
            var events = await _eventRepository.FindAsync(e =>
                (!searchDto.StartDate.HasValue || e.StartDate >= searchDto.StartDate) &&
                (!searchDto.EndDate.HasValue || e.EndDate <= searchDto.EndDate) &&
                (!searchDto.MinGuests.HasValue || e.MaxAttendees >= searchDto.MinGuests) &&
                (!searchDto.MaxGuests.HasValue || e.MaxAttendees <= searchDto.MaxGuests)
            );
            return Ok(events);
        }

        [HttpGet("{id}/attendees")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetEventAttendees(int id)
        {
            var @event = await _eventRepository.GetByIdAsync(id);
            if (@event == null)
            {
                return NotFound("Event not found");
            }

            var attendees = await _attendanceRepository.FindAllAsync(a => a.EventId == id);

            var attendeeDtos = attendees.Select(a => new MemberDto
            {
                Id = a.Member.Id,
                FirstName = a.Member.User.FirstName,
                LastName = a.Member.User.LastName,
                Email = a.Member.User.Email,
                RegisteredAt = a.CreatedAt
            });

            return Ok(attendeeDtos);
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult> AttendEvent(int id)
        {
            var @event = await _eventRepository.GetByIdAsync(id);
            if (@event == null)
            {
                return NotFound("Event not found");
            }

            if (@event.IsCancelled)
            {
                return BadRequest("Event has been cancelled");
            }

            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var existingAttendance = await _attendanceRepository.FindOneAsync(
                a => a.EventId == id && a.MemberId == userId
            );

            if (existingAttendance != null)
            {
                return BadRequest("Already registered for this event");
            }

            var currentAttendees = await _attendanceRepository.CountAsync(a => a.EventId == id);
            if (currentAttendees >= @event.MaxAttendees)
            {
                return BadRequest("Event is full");
            }

            var attendance = new EventAttendance
            {
                EventId = id,
                MemberId = userId,
                RegisteredAt = DateTime.UtcNow
            };

            await _attendanceRepository.AddAsync(attendance);
            return Ok();
        }

        [HttpDelete("{id}/attend")]
        public async Task<ActionResult> CancelAttendance(int id)
        {
            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            var attendance = await _attendanceRepository.FindOneAsync(
                a => a.EventId == id && a.MemberId == userId
            );

            if (attendance == null)
            {
                return NotFound("Not registered for this event");
            }

            await _attendanceRepository.DeleteAsync(attendance);
            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Event>> CreateEvent([FromBody] Event @event)
        {
            await _eventRepository.AddAsync(@event);
            return CreatedAtAction(nameof(GetEvent), new { id = @event.Id }, @event);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> UpdateEvent(int id, [FromBody] Event @event)
        {
            if (id != @event.Id)
            {
                return BadRequest();
            }

            var existingEvent = await _eventRepository.GetByIdAsync(id);
            if (existingEvent == null)
            {
                return NotFound();
            }

            await _eventRepository.UpdateAsync(@event);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var @event = await _eventRepository.GetByIdAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            await _eventRepository.DeleteAsync(@event);
            return NoContent();
        }
    }
}