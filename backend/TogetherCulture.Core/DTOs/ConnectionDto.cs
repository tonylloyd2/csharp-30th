using System;
using System.ComponentModel.DataAnnotations;

namespace TogetherCulture.Core.DTOs
{
    public class ConnectionDto
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsNeed { get; set; }
        public DateTime CreatedAt { get; set; }
        public int CreatedById { get; set; }
    }
}