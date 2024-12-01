using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TogetherCulture.Core.Entities
{
    public class ContentModule : BaseEntity
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        
        [Required]
        [Url]
        public string ContentUrl { get; set; } = string.Empty;
        
        public bool IsActive { get; set; } = true;
        
        public int? MaxBookings { get; set; }
        
        public int CurrentBookings { get; set; }
        
        public ICollection<ModuleProgress> UserProgress { get; set; } = new List<ModuleProgress>();
        
        // Navigation properties
        public ICollection<ModuleBooking> Bookings { get; set; } = new List<ModuleBooking>();
    }
}