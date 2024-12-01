import { AppShell, Navbar, Header, Text, UnstyledButton, Group, ThemeIcon, rem } from '@mantine/core';
import { IconDashboard, IconUser, IconGift, IconCalendar, IconUsers, IconSettings } from '@tabler/icons-react';
import { useNavigate, Outlet } from 'react-router-dom';

const mainLinks = [
  { icon: IconDashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: IconUser, label: 'Profile', link: '/profile' },
  { icon: IconGift, label: 'Benefits', link: '/benefits' },
  { icon: IconCalendar, label: 'Events', link: '/events' },
  { icon: IconUsers, label: 'Community', link: '/community' },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
];

export function MainLayout() {
  const navigate = useNavigate();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          {mainLinks.map((item) => (
            <UnstyledButton
              key={item.label}
              onClick={() => navigate(item.link)}
              sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
              })}
            >
              <Group>
                <ThemeIcon size={30} variant="light">
                  <item.icon style={{ width: rem(18), height: rem(18) }} />
                </ThemeIcon>
                <Text size="sm">{item.label}</Text>
              </Group>
            </UnstyledButton>
          ))}
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Group position="apart">
            <Text size="xl" weight={700}>TogetherCulture</Text>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}