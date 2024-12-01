using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TogetherCulture.Core.Entities.Enums;

namespace TogetherCulture.Core.DTOs
{
    public class CreateMemberDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
    }

    public class AddMemberDto
    {
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public MembershipType MembershipType { get; set; }

        [Required]
        public List<InterestType> Interests { get; set; }

        public string? PhoneNumber { get; set; }
        public string? Bio { get; set; }
    }

    public class UpdateMemberDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }

    public class MemberProfileDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class MemberDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Name { get => $"{FirstName} {LastName}"; }
        public MembershipType MembershipType { get; set; }
        public MembershipStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime RegisteredAt { get; set; }
        public DateTime? LastLogin { get; set; }
        public List<string> Interests { get; set; }
    }

    public class UpdateProfileDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }

    public class BenefitsUtilizationDto
    {
        public int MemberId { get; set; }
        public List<BenefitUtilization> Benefits { get; set; }
    }

    public class BenefitUtilization
    {
        public string BenefitName { get; set; }
        public int UsageCount { get; set; }
        public DateTime LastUsed { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdateMembershipTypeDto
    {
        public MembershipType NewMembershipType { get; set; }
    }

    public class UpdateMemberTypeDto
    {
        [Required]
        public MembershipType MembershipType { get; set; }
        public string? Notes { get; set; }
        public DateTime? EffectiveDate { get; set; }
    }

    public class ExpressInterestDto
    {
        public List<InterestType> Interests { get; set; }
    }

    public class InterestDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class BenefitsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class SuggestionDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public double RelevanceScore { get; set; }
    }
}