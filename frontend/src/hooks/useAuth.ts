import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { LoginDto, RegisterDto } from '../types/auth';

export function useAuth() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(async (credentials: LoginDto) => {
    try {
      setError('');
      setLoading(true);
      console.log('Login attempt with:', credentials);
      const result = await authService.login(credentials);
      console.log('Login successful:', result);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error in hook:', err);
      setError(err.message || 'An unexpected error occurred during login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (userData: RegisterDto) => {
    try {
      setError('');
      setLoading(true);
      console.log('Registration attempt with:', userData);
      const result = await authService.register(userData);
      console.log('Registration successful:', result);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Registration error in hook:', err);
      setError(err.message || 'An unexpected error occurred during registration');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    authService.logout();
    navigate('/login');
  }, [navigate]);

  return {
    login,
    register,
    logout,
    error,
    loading,
    isAuthenticated: authService.isAuthenticated()
  };
}