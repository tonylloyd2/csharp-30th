// TogetherCulture.Core/Interfaces/IEventService.cs
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TogetherCulture.Core.Interfaces
{
    public interface IEventService
    {
        Task<PaginatedResult<EventWithAttendeesDto>> SearchEventsAsync(EventSearchDto dto);
        Task<ServiceResult<EventWithAttendeesDto>> GetEventByIdAsync(int eventId);
        Task<ServiceResult<EventWithAttendeesDto>> CreateEventAsync(CreateEventDto dto);
        Task<ServiceResult<bool>> UpdateEventAsync(int eventId, UpdateEventDto dto);
        Task<ServiceResult<bool>> CancelEventAsync(int eventId);
        Task<ServiceResult<bool>> RegisterAttendeeAsync(int eventId, int memberId);
        Task<ServiceResult<bool>> RemoveAttendeeAsync(int eventId, int memberId);
    }

    public class PaginatedResult<T>
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
    }
}