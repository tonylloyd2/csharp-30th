using AutoMapper;
using TogetherCulture.Core.DTOs;
using TogetherCulture.Core.Entities;

namespace TogetherCulture.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Member, MemberDto>();
            CreateMap<Event, EventDto>();
            CreateMap<ContentModule, ContentModuleDto>();
            CreateMap<MemberBenefit, BenefitDto>();
            
            // Register to Member mapping
            CreateMap<RegisterDto, Member>();
            
            // Update profile mapping
            CreateMap<UpdateProfileDto, Member>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}