import { Container, Paper } from '@mantine/core';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundSize: 'cover',
      backgroundImage: 'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=80)'
    }}>
      <Container size={420} py={40}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md" style={{ backgroundColor: 'white' }}>
          {children}
        </Paper>
      </Container>
    </div>
  );
}