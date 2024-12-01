import { Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { AuthLayout } from '../../layouts/AuthLayout';

export function LoginPage() {
  return (
    <AuthLayout>
      <Text size="lg" weight={500} align="center" mb="xl">
        Welcome to TogetherCulture, login with
      </Text>
      <LoginForm />
      <Text align="center" mt="md">
        Don't have an account?{' '}
        <Anchor component={Link} to="/register" weight={700}>
          Register
        </Anchor>
      </Text>
    </AuthLayout>
  );
}