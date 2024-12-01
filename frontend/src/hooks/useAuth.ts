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
      await authService.login(credentials);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const register = useCallback(async (userData: RegisterDto) => {
    try {
      setError('');
      setLoading(true);
      await authService.register(userData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      throw err;
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