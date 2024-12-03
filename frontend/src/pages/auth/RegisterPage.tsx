import { Container, Text, Anchor, Paper, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

export function RegisterPage() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h="100vh"
      bg="dark.8"
    >
      <Container size="xs" w="100%">
        <Paper 
          shadow="xl" 
          p="xl" 
          radius="lg" 
          bg="dark.7"
          style={{
            border: '1px solid var(--mantine-color-dark-4)',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            background: 'linear-gradient(to bottom right, var(--mantine-color-dark-6), var(--mantine-color-dark-7))'
          }}
        >
          <Text 
            size="xl" 
            fw={700} 
            ta="center" 
            mb="xl" 
            c="brand.0"
          >
            TogetherCulture
          </Text>
          <Text 
            size="lg" 
            fw={500} 
            ta="center" 
            mb="xl" 
            c="brand.3"
          >
            Create your account
          </Text>
          <RegisterForm />
          <Text 
            ta="center" 
            mt="md" 
            c="dark.2"
          >
            Already have an account?{' '}
            <Anchor 
              component={Link} 
              to="/login" 
              fw={700} 
              c="brand.5"
              underline="always"
            >
              Login
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </Flex>
  );
}