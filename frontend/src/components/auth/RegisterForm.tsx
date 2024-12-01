import { useState } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Text } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import { RegisterDto } from '../../types/auth';

export function RegisterForm() {
  const { register, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState<RegisterDto>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  return (
    <Box>
      <Title order={2} ta="center" mt="md" mb={50}>
        Create account
      </Title>
      {authError && <Text c="red" ta="center" mb="md">{authError}</Text>}
      <form onSubmit={handleSubmit}>
        <TextInput
          label="First Name"
          placeholder="Your first name"
          size="md"
          required
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <TextInput
          label="Last Name"
          placeholder="Your last name"
          mt="md"
          size="md"
          required
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <TextInput
          label="Email"
          placeholder="your@email.com"
          mt="md"
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
          Register
        </Button>
      </form>
    </Box>
  );
}