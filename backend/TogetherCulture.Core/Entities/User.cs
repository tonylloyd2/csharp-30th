using System.ComponentModel.DataAnnotations;

namespace TogetherCulture.Core.Entities
{
    public class User : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        
        [Required]
        public string PasswordHash { get; set; }
        
        [MaxLength(50)]
        public string FirstName { get; set; }
        
        [MaxLength(50)]
        public string LastName { get; set; }
        
        public bool IsAdmin { get; set; }
        
        public bool IsActive { get; set; } = true;

        // Navigation property
        public Member Member { get; set; }
    }
}