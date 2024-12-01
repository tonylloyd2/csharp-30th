namespace TogetherCulture.Core.Entities.Enums
{
    public enum InterestType
    {
        Technology,
        Art,
        Sports,
        Music,
        Education,
        Environment,
        Health,
        Business,
        Social,
        Other
    }

    public enum MembershipType
    {
        Basic = 0,
        Premium = 1,
        Corporate = 2,
        NonProfit = 3,
        Lifetime = 4
    }

    public enum MembershipStatus
    {
        Pending,
        Active,
        Suspended,
        Cancelled,
        Expired
    }

    public enum ModuleCompletionStatus
    {
        NotStarted = 0,
        InProgress = 1,
        Completed = 2,
        Failed = 3
    }
}