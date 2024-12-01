import { Text, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { AuthLayout } from '../../layouts/AuthLayout';

export function RegisterPage() {
  return (
    <AuthLayout>
      <Text size="lg" weight={500} align="center" mb="xl">
        Create your TogetherCulture account
      </Text>
      <RegisterForm />
      <Text align="center" mt="md">
        Already have an account?{' '}
        <Anchor component={Link} to="/login" weight={700}>
          Login
        </Anchor>
      </Text>
    </AuthLayout>
  );
}