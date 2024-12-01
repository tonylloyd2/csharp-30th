export enum MembershipType {
  Basic = 'Basic',
  Premium = 'Premium',
  VIP = 'VIP'
}

export enum InterestType {
  Art = 'Art',
  Music = 'Music',
  Sports = 'Sports',
  Technology = 'Technology',
  Culture = 'Culture'
}

export interface CreateMemberDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface MemberDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  membershipType: MembershipType;
  interests: InterestType[];
  phoneNumber?: string;
  bio?: string;
  createdAt: Date;
}

export interface UpdateMemberDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  interests?: InterestType[];
}

export interface MemberProfileDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: MembershipType;
  interests: InterestType[];
  phoneNumber?: string;
  bio?: string;
}

export interface BenefitsUtilizationDto {
  totalBenefits: number;
  usedBenefits: number;
  benefits: BenefitUtilization[];
}

export interface BenefitUtilization {
  benefitName: string;
  totalAllowed: number;
  used: number;
  remaining: number;
}