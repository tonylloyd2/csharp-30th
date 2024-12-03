import { AppShell, Burger, Group, Text, UnstyledButton, ThemeIcon, rem, ActionIcon } from '@mantine/core';
import { IconDashboard, IconUser, IconGift, IconCalendar, IconUsers, IconSettings, IconSun, IconMoon } from '@tabler/icons-react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

interface MainLayoutProps {
  onToggleTheme: () => void;
  colorScheme: 'light' | 'dark';
}

const mainLinks = [
  { icon: IconDashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: IconUser, label: 'Profile', link: '/profile' },
  { icon: IconGift, label: 'Benefits', link: '/benefits' },
  { icon: IconCalendar, label: 'Events', link: '/events' },
  { icon: IconUsers, label: 'Community', link: '/community' },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
];

export function MainLayout({ onToggleTheme, colorScheme }: MainLayoutProps) {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ 
        width: 300, 
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
      bg="dark.8"
      styles={{
        main: {
          backgroundColor: 'var(--mantine-color-dark-8)',
          color: 'var(--mantine-color-dark-0)'
        }
      }}
    >
      <AppShell.Header 
        p="md" 
        style={{ 
          backgroundColor: 'var(--mantine-color-dark-7)', 
          borderBottom: '1px solid var(--mantine-color-dark-4)' 
        }}
      >
        <Group justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              hiddenFrom="sm"
              size="sm"
              color="var(--mantine-color-brand-5)"
            />
            <Text 
              size="xl" 
              fw={700} 
              c="brand.0"
            >
              TogetherCulture
            </Text>
          </Group>
          <ActionIcon
            variant="outline"
            color="brand"
            onClick={onToggleTheme}
            size="lg"
          >
            {colorScheme === 'dark' ? (
              <IconSun size={18} />
            ) : (
              <IconMoon size={18} />
            )}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar 
        p="md" 
        style={{ 
          backgroundColor: 'var(--mantine-color-dark-7)', 
          borderRight: '1px solid var(--mantine-color-dark-4)' 
        }}
      >
        {mainLinks.map((item) => (
          <UnstyledButton
            key={item.label}
            onClick={() => navigate(item.link)}
            style={{
              width: '100%',
              padding: 'var(--mantine-spacing-xs)',
              borderRadius: 'var(--mantine-radius-sm)',
              color: 'var(--mantine-color-brand-0)',
              '&:hover': {
                backgroundColor: 'var(--mantine-color-dark-6)'
              }
            }}
          >
            <Group>
              <ThemeIcon 
                size={30} 
                variant="light" 
                color="brand"
              >
                <item.icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Text size="sm" c="brand.0">{item.label}</Text>
            </Group>
          </UnstyledButton>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}