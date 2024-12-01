import api from './api';
import { LoginDto, RegisterDto, AuthResult } from '../types/auth';

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResult> {
    try {
      console.log('Attempting login with:', credentials);
      const { data } = await api.post<any>('/auth/login', credentials);
      console.log('Login response:', data);
      
      if (data.success && data.token) {
        const result: AuthResult = {
          token: data.token,
          refreshToken: data.refreshToken || '',
          expiresIn: data.expiresIn || 3600,
          userId: data.userId || 0,
          roles: data.roles || []
        };
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('userId', result.userId.toString());
        localStorage.setItem('roles', JSON.stringify(result.roles));
        return result;
      }
      throw new Error(data.message || 'Login failed');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Network error occurred. Please check your connection.');
    }
  },

  async register(userData: RegisterDto): Promise<AuthResult> {
    try {
      console.log('Attempting registration with:', userData);
      const { data } = await api.post<any>('/auth/register', userData);
      console.log('Registration response:', data);
      
      if (data.success && data.token) {
        const result: AuthResult = {
          token: data.token,
          refreshToken: data.refreshToken || '',
          expiresIn: data.expiresIn || 3600,
          userId: data.userId || 0,
          roles: data.roles || []
        };
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('userId', result.userId.toString());
        localStorage.setItem('roles', JSON.stringify(result.roles));
        return result;
      }
      throw new Error(data.message || 'Registration failed');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Network error occurred. Please check your connection.');
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthResult> {
    try {
      const { data } = await api.post<any>('/auth/refresh-token', { refreshToken });
      if (data.success && data.token) {
        const result: AuthResult = {
          token: data.token,
          refreshToken: data.refreshToken || '',
          expiresIn: data.expiresIn || 3600,
          userId: data.userId || 0,
          roles: data.roles || []
        };
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        return result;
      }
      throw new Error(data.message || 'Token refresh failed');
    } catch (error: any) {
      console.error('Refresh token error:', error);
      this.logout();
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    window.location.href = '/login';
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};