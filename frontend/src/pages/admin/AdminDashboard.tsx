import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Text, 
  Title, 
  Stack,
  Group,
  Badge,
  Tabs,
  Button,
  ThemeIcon,
  Progress,
  Divider,
  RingProgress,
  List,
  SimpleGrid,
  Card,
  Link,
  Menu
} from '@mantine/core';
import { 
  IconUsers, 
  IconDashboard,
  IconCalendarEvent,
  IconChartBar,
  IconSettings,
  IconLogout,
  IconArrowUpRight,
  IconArrowDownRight,
  IconUserPlus,
  IconUsersGroup,
  IconMessageCircle,
  IconBuildingCommunity,
  IconCertificate,
  IconUser,
  IconLock,
  IconBell,
  IconBuilding,
  IconMessage,
  IconReportAnalytics
} from '@tabler/icons-react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AdminMemberManagement } from './AdminMemberManagement';
import { AdminEventManagement } from './AdminEventManagement';

export function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeView, setActiveView] = useState('dashboard');

  // Mock data based on backend DTOs
  const communityStats = {
    totalMembers: 247,
    newMembersThisMonth: 35,
    upcomingEvents: 12,
    pendingApplications: 5,
    memberGrowth: 65,
    eventAttendance: 78,
    totalRevenue: 125000,
    revenueGrowth: 12.5
  };

  const analyticsData = {
    funnel: {
      totalVisitors: 1200,
      interestedMembers: 450,
      registeredMembers: 247,
      activeMembers: 180
    },
    engagement: {
      averageEventsPerMember: 2.5,
      moduleCompletionRate: 68,
      totalConnections: 523,
      activeDiscussions: 45
    },
    interests: [
      { type: 'Creative Arts', initial: 100, current: 150, change: 50 },
      { type: 'Technology', initial: 80, current: 120, change: 40 },
      { type: 'Business', initial: 60, current: 85, change: 25 }
    ]
  };

  const contentStats = {
    totalModules: 24,
    completedModules: 18,
    activeModules: 6,
    averageRating: 4.5,
    popularCategories: [
      { name: 'Leadership', count: 45 },
      { name: 'Innovation', count: 38 },
      { name: 'Collaboration', count: 32 }
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'members':
        return <AdminMemberManagement />;
      case 'events':
        return <AdminEventManagement />;
      case 'analytics':
        return (
          <>
            {/* Analytics Content */}
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Title order={3} c="white" mb="md">Member Funnel</Title>
                <Stack>
                  <Group position="apart">
                    <Text c="dimmed">Total Visitors</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.totalVisitors}</Text>
                  </Group>
                  <Progress 
                    value={100} 
                    color="blue" 
                    size="md" 
                  />

                  <Group position="apart">
                    <Text c="dimmed">Interested Members</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.interestedMembers}</Text>
                  </Group>
                  <Progress 
                    value={(analyticsData.funnel.interestedMembers / analyticsData.funnel.totalVisitors) * 100} 
                    color="cyan" 
                    size="md" 
                  />

                  <Group position="apart">
                    <Text c="dimmed">Registered Members</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.registeredMembers}</Text>
                  </Group>
                  <Progress 
                    value={(analyticsData.funnel.registeredMembers / analyticsData.funnel.totalVisitors) * 100} 
                    color="teal" 
                    size="md" 
                  />

                  <Group position="apart">
                    <Text c="dimmed">Active Members</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.activeMembers}</Text>
                  </Group>
                  <Progress 
                    value={(analyticsData.funnel.activeMembers / analyticsData.funnel.totalVisitors) * 100} 
                    color="green" 
                    size="md" 
                  />
                </Stack>
              </Paper>
              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Title order={3} c="white" mb="md">Content Analytics</Title>
                <SimpleGrid cols={2}>
                  <Card bg="dark.7" p="sm">
                    <Text c="dimmed" size="sm">Module Completion</Text>
                    <RingProgress
                      size={90}
                      roundCaps
                      thickness={8}
                      sections={[{ value: analyticsData.engagement.moduleCompletionRate, color: 'blue' }]}
                      label={
                        <Text c="white" ta="center" size="lg">
                          {analyticsData.engagement.moduleCompletionRate}%
                        </Text>
                      }
                    />
                  </Card>
                  <Card bg="dark.7" p="sm">
                    <Text c="dimmed" size="sm">Popular Categories</Text>
                    <List
                      spacing="xs"
                      size="sm"
                      mt="xs"
                      styles={{ itemWrapper: { color: 'white' } }}
                    >
                      {contentStats.popularCategories.map((category, index) => (
                        <List.Item key={index}>
                          {category.name} ({category.count})
                        </List.Item>
                      ))}
                    </List>
                  </Card>
                </SimpleGrid>
              </Paper>
            </SimpleGrid>
            {/* Interest Trends */}
            <Paper withBorder p="lg" radius="md" bg="dark.8">
              <Title order={3} c="white" mb="md">Interest Trends</Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                {analyticsData.interests.map((interest, index) => (
                  <Card key={index} bg="dark.7" p="sm">
                    <Group position="apart" mb="xs">
                      <Text c="white">{interest.type}</Text>
                      <Badge 
                        color={interest.change > 0 ? 'green' : 'red'}
                        leftSection={interest.change > 0 ? <IconArrowUpRight size={12} /> : <IconArrowDownRight size={12} />}
                      >
                        {interest.change > 0 ? '+' : ''}{interest.change}%
                      </Badge>
                    </Group>
                    <Text c="dimmed" size="sm">
                      Current Members: {interest.current}
                    </Text>
                    <Progress 
                      value={(interest.current / interest.initial - 1) * 100} 
                      mt="md"
                      size="sm" 
                      color={interest.change > 0 ? 'green' : 'red'} 
                    />
                  </Card>
                ))}
              </SimpleGrid>
            </Paper>
          </>
        );
      default:
        return (
          <>
            {/* Dashboard Content */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Group>
                  <ThemeIcon size={48} radius="md" variant="light" color="blue">
                    <IconUsers size={24} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={700} size="xl" c="white">
                      {communityStats.totalMembers}
                    </Text>
                    <Text c="dimmed">Total Members</Text>
                  </Stack>
                </Group>
                <Group mt="md">
                  <Text c="dimmed" size="sm">
                    Growth
                  </Text>
                  <Badge color="green">
                    +{communityStats.memberGrowth}%
                  </Badge>
                </Group>
              </Paper>

              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Group>
                  <ThemeIcon size={48} radius="md" variant="light" color="green">
                    <IconCalendarEvent size={24} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={700} size="xl" c="white">
                      {communityStats.upcomingEvents}
                    </Text>
                    <Text c="dimmed">Upcoming Events</Text>
                  </Stack>
                </Group>
                <Progress 
                  value={communityStats.eventAttendance} 
                  mt="md" 
                  size="sm" 
                  color="green" 
                />
                <Text size="xs" c="dimmed" mt={5}>
                  {communityStats.eventAttendance}% Average Attendance
                </Text>
              </Paper>

              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Group>
                  <ThemeIcon size={48} radius="md" variant="light" color="yellow">
                    <IconCertificate size={24} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={700} size="xl" c="white">
                      {contentStats.totalModules}
                    </Text>
                    <Text c="dimmed">Content Modules</Text>
                  </Stack>
                </Group>
                <Text c="dimmed" size="sm" mt="md">
                  Completion Rate
                </Text>
                <Progress 
                  value={(contentStats.completedModules / contentStats.totalModules) * 100} 
                  mt={5}
                  size="sm" 
                  color="yellow" 
                />
              </Paper>

              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Group>
                  <ThemeIcon size={48} radius="md" variant="light" color="grape">
                    <IconMessage size={24} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={700} size="xl" c="white">
                      {analyticsData.engagement.activeDiscussions}
                    </Text>
                    <Text c="dimmed">Active Discussions</Text>
                  </Stack>
                </Group>
                <Group mt="md">
                  <Text c="dimmed" size="sm">
                    Engagement
                  </Text>
                  <Badge color="grape">
                    {analyticsData.engagement.totalConnections} connections
                  </Badge>
                </Group>
              </Paper>
            </SimpleGrid>
            {/* Member Funnel & Content Analytics */}
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Title order={3} c="white" mb="md">Member Funnel</Title>
                <Stack>
                  <Group position="apart">
                    <Text c="dimmed">Total Visitors</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.totalVisitors}</Text>
                  </Group>
                  <Progress 
                    value={100} 
                    color="blue" 
                    size="md" 
                  />

                  <Group position="apart">
                    <Text c="dimmed">Interested Members</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.interestedMembers}</Text>
                  </Group>
                  <Progress 
                    value={(analyticsData.funnel.interestedMembers / analyticsData.funnel.totalVisitors) * 100} 
                    color="cyan" 
                    size="md" 
                  />

                  <Group position="apart">
                    <Text c="dimmed">Registered Members</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.registeredMembers}</Text>
                  </Group>
                  <Progress 
                    value={(analyticsData.funnel.registeredMembers / analyticsData.funnel.totalVisitors) * 100} 
                    color="teal" 
                    size="md" 
                  />

                  <Group position="apart">
                    <Text c="dimmed">Active Members</Text>
                    <Text c="white" fw={500}>{analyticsData.funnel.activeMembers}</Text>
                  </Group>
                  <Progress 
                    value={(analyticsData.funnel.activeMembers / analyticsData.funnel.totalVisitors) * 100} 
                    color="green" 
                    size="md" 
                  />
                </Stack>
              </Paper>
              <Paper withBorder p="lg" radius="md" bg="dark.8">
                <Title order={3} c="white" mb="md">Content Analytics</Title>
                <SimpleGrid cols={2}>
                  <Card bg="dark.7" p="sm">
                    <Text c="dimmed" size="sm">Module Completion</Text>
                    <RingProgress
                      size={90}
                      roundCaps
                      thickness={8}
                      sections={[{ value: analyticsData.engagement.moduleCompletionRate, color: 'blue' }]}
                      label={
                        <Text c="white" ta="center" size="lg">
                          {analyticsData.engagement.moduleCompletionRate}%
                        </Text>
                      }
                    />
                  </Card>
                  <Card bg="dark.7" p="sm">
                    <Text c="dimmed" size="sm">Popular Categories</Text>
                    <List
                      spacing="xs"
                      size="sm"
                      mt="xs"
                      styles={{ itemWrapper: { color: 'white' } }}
                    >
                      {contentStats.popularCategories.map((category, index) => (
                        <List.Item key={index}>
                          {category.name} ({category.count})
                        </List.Item>
                      ))}
                    </List>
                  </Card>
                </SimpleGrid>
              </Paper>
            </SimpleGrid>
            {/* Interest Trends */}
            <Paper withBorder p="lg" radius="md" bg="dark.8">
              <Title order={3} c="white" mb="md">Interest Trends</Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                {analyticsData.interests.map((interest, index) => (
                  <Card key={index} bg="dark.7" p="sm">
                    <Group position="apart" mb="xs">
                      <Text c="white">{interest.type}</Text>
                      <Badge 
                        color={interest.change > 0 ? 'green' : 'red'}
                        leftSection={interest.change > 0 ? <IconArrowUpRight size={12} /> : <IconArrowDownRight size={12} />}
                      >
                        {interest.change > 0 ? '+' : ''}{interest.change}%
                      </Badge>
                    </Group>
                    <Text c="dimmed" size="sm">
                      Current Members: {interest.current}
                    </Text>
                    <Progress 
                      value={(interest.current / interest.initial - 1) * 100} 
                      mt="md"
                      size="sm" 
                      color={interest.change > 0 ? 'green' : 'red'} 
                    />
                  </Card>
                ))}
              </SimpleGrid>
            </Paper>
          </>
        );
    }
  };

  return (
    <Container 
      fluid 
      bg="dark.9" 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0D5AA9 0%, #1C6AB6 50%, #2B7BC3 100%)'
      }}
      p={0}
    >
      <Stack gap="xl" p="xl">
        <Group justify="space-between" align="center">
          <Group>
            <ThemeIcon 
              variant="gradient" 
              gradient={{ from: 'brand.7', to: 'brand.5', deg: 135 }} 
              size="xl"
            >
              <IconBuilding size={24} />
            </ThemeIcon>
            <Title order={2} c="white">
              Together Culture Admin
            </Title>
          </Group>
          
          <Group>
            <Menu shadow="md">
              <Menu.Target>
                <Button 
                  variant="subtle"
                  leftSection={<IconSettings size={20} />}
                >
                  Settings
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Admin Settings</Menu.Label>
                <Menu.Item leftSection={<IconUser size={14} />}>Profile</Menu.Item>
                <Menu.Item leftSection={<IconLock size={14} />}>Security</Menu.Item>
                <Menu.Item leftSection={<IconBell size={14} />}>Notifications</Menu.Item>
                <Menu.Divider />
                <Menu.Item 
                  color="red" 
                  leftSection={<IconLogout size={14} />}
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        <Group>
          <Button 
            variant={activeView === 'dashboard' ? 'filled' : 'subtle'}
            leftSection={<IconDashboard size={20} />}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant={activeView === 'members' ? 'filled' : 'subtle'}
            leftSection={<IconUsers size={20} />}
            onClick={() => setActiveView('members')}
          >
            Member Management
          </Button>
          <Button
            variant={activeView === 'events' ? 'filled' : 'subtle'}
            leftSection={<IconCalendarEvent size={20} />}
            onClick={() => setActiveView('events')}
          >
            Event Management
          </Button>
          <Button
            variant={activeView === 'analytics' ? 'filled' : 'subtle'}
            leftSection={<IconChartBar size={20} />}
            onClick={() => setActiveView('analytics')}
          >
            Analytics
          </Button>
        </Group>

        {/* Render content based on active view */}
        {renderContent()}
      </Stack>
    </Container>
  );
}