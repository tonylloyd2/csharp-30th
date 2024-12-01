import api from './api';
import { LoginDto, RegisterDto, AuthResult } from '../types/auth';

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResult> {
    try {
      const { data } = await api.post<AuthResult>('/auth/login', credentials);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.userId.toString());
        localStorage.setItem('roles', JSON.stringify(data.roles));
      }
      return data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Network error occurred');
    }
  },

  async register(userData: RegisterDto): Promise<AuthResult> {
    try {
      const { data } = await api.post<AuthResult>('/auth/register', userData);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userId', data.userId.toString());
        localStorage.setItem('roles', JSON.stringify(data.roles));
      }
      return data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error occurred');
    }
  },

  async refreshToken(refreshToken: string): Promise<AuthResult> {
    try {
      const { data } = await api.post<AuthResult>('/auth/refresh-token', { refreshToken });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      return data;
    } catch (error) {
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