using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Core.Entities
{
    public class Member : BaseEntity
    {
        private List<InterestType> _interests = new();

        public int UserId { get; set; }
        public User User { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }

        public MembershipType MembershipType { get; set; }
        public MembershipStatus Status { get; set; }

        [NotMapped]
        public List<InterestType> Interests
        {
            get
            {
                if (_interests.Count == 0 && !string.IsNullOrEmpty(InterestsJson))
                {
                    _interests = JsonSerializer.Deserialize<List<InterestType>>(InterestsJson) ?? new List<InterestType>();
                }
                return _interests;
            }
            set
            {
                _interests = value;
                InterestsJson = JsonSerializer.Serialize(value);
            }
        }

        public string InterestsJson { get; set; }

        public DateTime? LastLogin { get; set; }

        public List<MemberBenefit> Benefits { get; set; } = new();
        public List<EventAttendance> EventAttendances { get; set; } = new();
        public List<ModuleProgress> ModuleProgresses { get; set; } = new();
    }
}