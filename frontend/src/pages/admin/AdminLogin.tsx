import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Stack,
  Group,
  Anchor,
  Box,
  IconLock, 
  IconBuilding 
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // TODO: Implement actual backend authentication
      if (email === 'admin@example.com' && password === '1234') {
        localStorage.setItem('adminToken', 'mock-admin-token');
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <Box 
      h="100vh" 
      display="flex" 
      style={{ 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #415A77 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        background: 'url("/background.jpg")'
      }}
    >
      <Paper
        radius="lg"
        p="md"
        style={{
          width: '400px',
          backgroundColor: 'rgba(20, 21, 23, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Stack gap="sm">
          <Stack gap={5}>
            <Title order={2} style={{ color: 'white', fontSize: '1.3rem' }}>
              Welcome Back! 👋
            </Title>
            <Text size="sm" c="dimmed">
              Sign in to continue your admin journey with us
            </Text>
          </Stack>

          <Stack gap="xs">
            <TextInput
              label="Email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              error={error}
              styles={{
                label: {
                  color: '#e9ecef',
                  fontSize: '0.9rem',
                  marginBottom: '4px'
                },
                input: {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px',
                  color: 'white',
                  height: '40px',
                  '&:focus': {
                    borderColor: '#4dabf7',
                    backgroundColor: 'rgba(255,255,255,0.08)'
                  },
                  '&::placeholder': {
                    color: '#666'
                  }
                }
              }}
            />

            <PasswordInput
              label="Password"
              required
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              error={error && "Invalid credentials"}
              styles={{
                label: {
                  color: '#e9ecef',
                  fontSize: '0.9rem',
                  marginBottom: '4px'
                },
                input: {
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px',
                  color: 'white',
                  height: '40px',
                  '&:focus': {
                    borderColor: '#4dabf7',
                    backgroundColor: 'rgba(255,255,255,0.08)'
                  }
                },
                innerInput: {
                  color: 'white',
                  '&::placeholder': {
                    color: '#666'
                  }
                },
                visibilityToggle: {
                  color: '#666',
                  '&:hover': {
                    background: 'transparent',
                    color: '#999'
                  }
                }
              }}
            />

            <Group justify="flex-end" mt={-8}>
              <Anchor 
                href="#" 
                size="sm"
                style={{
                  color: '#4dabf7',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot password?
              </Anchor>
            </Group>

            <Button 
              fullWidth
              onClick={handleLogin}
              style={{
                height: '40px',
                backgroundImage: 'linear-gradient(45deg, #4dabf7 0%, #228be6 100%)',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(34, 139, 230, 0.4)'
                }
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}