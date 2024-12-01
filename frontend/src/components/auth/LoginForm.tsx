import { useState } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Text } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import { LoginDto } from '../../types/auth';

export function LoginForm() {
  const { login, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <Box>
      <Title order={2} ta="center" mt="md" mb={50}>
        Welcome back!
      </Title>
      {authError && <Text c="red" ta="center" mb="md">{authError}</Text>}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder="your@email.com"
          size="md"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <Button fullWidth mt="xl" size="md" type="submit" loading={loading}>
          Sign in
        </Button>
      </form>
    </Box>
  );
}