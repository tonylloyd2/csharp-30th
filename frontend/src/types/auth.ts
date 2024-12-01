export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResult {
  token: string;
  refreshToken: string;
  expiresIn: number;
  userId: number;
  roles: string[];
}