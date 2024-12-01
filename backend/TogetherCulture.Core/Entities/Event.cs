using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TogetherCulture.Core.Entities
{
    public class Event : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public DateTime StartDate { get; set; }
        
        public DateTime? EndDate { get; set; }
        
        public int MaxAttendees { get; set; }
        
        public ICollection<EventAttendance> Attendees { get; set; } = new List<EventAttendance>();
        
        public int CurrentAttendees { get; set; }
        
        public bool IsCancelled { get; set; }
        
        // Navigation properties
        public ICollection<EventAttendance> Attendances { get; set; } = new List<EventAttendance>();
    }
}