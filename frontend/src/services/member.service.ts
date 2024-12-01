import api from './api';
import { 
  MemberDto, 
  CreateMemberDto, 
  UpdateMemberDto, 
  MemberProfileDto, 
  BenefitsUtilizationDto 
} from '../types/member';

export const memberService = {
  async getProfile(): Promise<MemberProfileDto> {
    const { data } = await api.get<MemberProfileDto>('/members/profile');
    return data;
  },

  async updateProfile(updateData: UpdateMemberDto): Promise<void> {
    await api.put('/members/profile', updateData);
  },

  async getBenefits(): Promise<BenefitsUtilizationDto> {
    const { data } = await api.get<BenefitsUtilizationDto>('/members/benefits');
    return data;
  },

  async getMembers(): Promise<MemberDto[]> {
    const { data } = await api.get<MemberDto[]>('/members');
    return data;
  },

  async getMember(id: number): Promise<MemberDto> {
    const { data } = await api.get<MemberDto>(`/members/${id}`);
    return data;
  },

  async createMember(memberData: CreateMemberDto): Promise<MemberDto> {
    const { data } = await api.post<MemberDto>('/members', memberData);
    return data;
  },

  async updateMember(id: number, updateData: UpdateMemberDto): Promise<void> {
    await api.put(`/members/${id}`, updateData);
  },

  async searchMembers(query: string): Promise<MemberDto[]> {
    const { data } = await api.get<MemberDto[]>('/members/search', {
      params: { query }
    });
    return data;
  },

  async expressInterest(interests: string[]): Promise<void> {
    await api.post('/members/express-interest', { interests });
  }
};