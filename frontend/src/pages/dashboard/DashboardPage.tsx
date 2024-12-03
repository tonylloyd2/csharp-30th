import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Text, 
  Group, 
  RingProgress, 
  Stack, 
  Badge, 
  Button, 
  SimpleGrid,
  Tooltip,
  MantineProvider,
  createTheme,
  Skeleton,
  Alert,
  Avatar,
  Modal,
  TextInput,
  Select,
  ActionIcon
} from '@mantine/core';
import { 
  IconChartBar, 
  IconUsers, 
  IconBolt, 
  IconAlertCircle,
  IconLogout,
  IconEdit
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

// Custom dark theme configuration
const darkTheme = createTheme({
  colors: {
    dark: [
      '#C1C2C5',   // lightest
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',   // base dark
      '#2C2E33',
      '#25262B',
      '#1A1B1E',   // deep dark
      '#141517',   // darkest
      '#101113'    // ultra dark
    ],
    brand: [
      '#E9ECEF',   // lightest
      '#DEE2E6',
      '#CED4DA',
      '#ADB5BD',
      '#868E96',
      '#4dabf7',   // primary accent
      '#3B8DD0',
      '#2B7BC3',
      '#1C6AB6',
      '#0D5AA9'
    ]
  },
  primaryColor: 'brand',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
});

// Interfaces
interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: 'Community Member' | 'Key Access Member' | 'Creative Workspace Member';
  joinedAt: string;
  primaryInterest?: MemberInterest;
  secondaryInterests?: MemberInterest[];
}

interface Benefit {
  id: number;
  name: string;
  usagePercentage: number;
  description: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  registered: boolean;
}

interface Interest {
  id: number;
  name: string;
  category: string;
}

interface Suggestion {
  type: string;
  title: string;
  description: string;
  score: number;
}

interface MemberInterest {
  id: number;
  category: 'caring' | 'sharing' | 'creating' | 'experiencing' | 'working';
  description?: string;
}

interface CommunityConnection {
  id: number;
  type: 'need' | 'offer';
  title: string;
  description: string;
  tags: string[];
}

interface DigitalModule {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
}

export function DashboardPage() {
  const navigate = useNavigate();
  
  // Dummy data
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    firstName: 'Emma',
    lastName: 'Rodriguez',
    email: 'emma.rodriguez@example.com',
    membershipType: 'Community Member',
    joinedAt: new Date().toISOString(),
    primaryInterest: {
      id: 1,
      category: 'creating',
      description: 'Interested in collaborative art projects'
    },
    secondaryInterests: [
      { id: 2, category: 'sharing', description: 'Community skill exchange' }
    ]
  });

  const [benefits, setBenefits] = useState<Benefit[]>([
    { 
      id: 1, 
      name: 'Learning Credits', 
      usagePercentage: 65, 
      description: 'Annual learning and development credits' 
    },
    { 
      id: 2, 
      name: 'Health Benefits', 
      usagePercentage: 40, 
      description: 'Comprehensive health insurance' 
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Tech Innovation Summit',
      description: 'Annual technology conference',
      startDate: new Date(2024, 5, 15).toISOString(),
      endDate: new Date(2024, 5, 17).toISOString(),
      registered: false
    },
    {
      id: 2,
      title: 'Leadership Workshop',
      description: 'Professional development seminar',
      startDate: new Date(2024, 4, 20).toISOString(),
      endDate: new Date(2024, 4, 21).toISOString(),
      registered: true
    }
  ]);

  const [interests, setInterests] = useState<Interest[]>([
    { id: 1, name: 'Machine Learning', category: 'Technology' },
    { id: 2, name: 'Cloud Computing', category: 'Technology' },
    { id: 3, name: 'Agile Methodologies', category: 'Management' }
  ]);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      type: 'Course',
      title: 'Advanced React Development',
      description: 'Recommended based on your profile',
      score: 85
    },
    {
      type: 'Event',
      title: 'AI and Future of Work',
      description: 'Matching your interests',
      score: 75
    }
  ]);

  const [digitalModules, setDigitalModules] = useState<DigitalModule[]>([
    {
      id: 1,
      title: 'Creative Economy Foundations',
      description: 'Introduction to collaborative economic models',
      completed: false,
      progress: 60
    },
    {
      id: 2,
      title: 'Community Leadership Skills',
      description: 'Developing inclusive leadership techniques',
      completed: false,
      progress: 30
    }
  ]);

  const [communityConnections, setCommunityConnections] = useState<CommunityConnection[]>([
    {
      id: 1,
      type: 'need',
      title: 'Web Design Support',
      description: 'Looking for help redesigning community website',
      tags: ['technology', 'design', 'volunteer']
    },
    {
      id: 2,
      type: 'offer',
      title: 'Photography Workshop',
      description: 'Offering free photography skills session',
      tags: ['art', 'skills', 'workshop']
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Profile edit modal state
  const [opened, { open, close }] = useDisclosure(false);
  const [editProfile, setEditProfile] = useState<Partial<UserProfile>>({});

  // Handlers
  const handleLogout = () => {
    // Clear authentication token
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  // Enhanced profile update handler
  const handleProfileUpdate = () => {
    setProfile(prev => ({
      ...prev,
      ...editProfile,
      // Preserve existing interests if not explicitly changed
      primaryInterest: editProfile.primaryInterest || prev.primaryInterest,
      secondaryInterests: editProfile.secondaryInterests || prev.secondaryInterests
    }));
    close();
  };

  // Utility functions
  const calculateAverageBenefitsUsage = () => {
    if (!benefits.length) return 0;
    
    const totalUsage = benefits.reduce((sum, benefit) => 
      sum + benefit.usagePercentage, 0);
    return Math.round(totalUsage / benefits.length);
  };

  // Determine display name and membership type
  const displayName = profile.firstName 
    ? `${profile.firstName} ${profile.lastName}`.trim() 
    : (profile.email || 'User');
  const membershipType = profile.membershipType || 'Basic';

  // Render method for digital modules widget
  const renderDigitalModulesWidget = () => (
    <Grid.Col span={{ base: 12, md: 4 }}>
      <Paper 
        shadow="xl" 
        p="xl" 
        radius="lg"
        bg="dark.7"
        style={{
          border: '1px solid var(--mantine-color-dark-4)',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
        }}
      >
        <Group justify="space-between">
          <Text fw={700} c="brand.0" size="lg">Digital Modules</Text>
          <IconBolt size={20} color="var(--mantine-color-brand-5)" />
        </Group>
        <Stack mt="md" gap="sm">
          {digitalModules.map(module => (
            <Group key={module.id} justify="space-between" align="center">
              <Stack gap={4}>
                <Text size="sm" c="brand.0">{module.title}</Text>
                <Text size="xs" c="dark.2">{module.description}</Text>
              </Stack>
              <Badge 
                color={module.completed ? 'green' : 'yellow'} 
                variant="light"
              >
                {module.completed ? 'Completed' : `${module.progress}%`}
              </Badge>
            </Group>
          ))}
        </Stack>
      </Paper>
    </Grid.Col>
  );

  // Render method for community connections widget
  const renderCommunityConnectionsWidget = () => (
    <Grid.Col span={{ base: 12, md: 4 }}>
      <Paper 
        shadow="xl" 
        p="xl" 
        radius="lg"
        bg="dark.7"
        style={{
          border: '1px solid var(--mantine-color-dark-4)',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
        }}
      >
        <Group justify="space-between">
          <Text fw={700} c="brand.0" size="lg">Community Connections</Text>
          <IconUsers size={20} color="var(--mantine-color-brand-5)" />
        </Group>
        <Stack mt="md" gap="sm">
          {communityConnections.map(connection => (
            <Group key={connection.id} justify="space-between" align="center">
              <Stack gap={4}>
                <Text size="sm" c="brand.0">{connection.title}</Text>
                <Text size="xs" c="dark.2">{connection.description}</Text>
              </Stack>
              <Badge 
                color={connection.type === 'need' ? 'red' : 'green'} 
                variant="light"
              >
                {connection.type.toUpperCase()}
              </Badge>
            </Group>
          ))}
        </Stack>
      </Paper>
    </Grid.Col>
  );

  // Render
  if (loading) return <Skeleton height="100vh" />;

  // Error handling
  if (error) return (
    <Container>
      <Alert 
        variant="filled" 
        color="red" 
        title="Error" 
        icon={<IconAlertCircle />}
      >
        {error}
      </Alert>
    </Container>
  );

  return (
    <MantineProvider theme={darkTheme}>
      <Container 
        size="xl" 
        mt="xl"
        style={{
          background: 'linear-gradient(135deg, #1A1B1E 0%, #141517 100%)',
          minHeight: '100vh',
          padding: '2rem',
          borderRadius: '16px'
        }}
      >
        {/* Profile Header */}
        <Paper 
          bg="dark.7" 
          p="xl" 
          radius="lg" 
          mb="xl"
          style={{ border: '1px solid var(--mantine-color-dark-4)' }}
        >
          <Group justify="space-between" align="center">
            <Group>
              <Avatar 
                size="xl" 
                color="brand" 
                radius="xl"
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Stack gap={4}>
                <Text size="xl" fw={700} c="brand.0">
                  {displayName}
                </Text>
                <Text size="sm" c="dark.2">
                  {membershipType} Member
                </Text>
              </Stack>
            </Group>
            <Group>
              <Tooltip label="Edit Profile">
                <ActionIcon 
                  variant="outline" 
                  color="brand" 
                  onClick={open}
                >
                  <IconEdit size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Logout">
                <ActionIcon 
                  variant="outline" 
                  color="red" 
                  onClick={handleLogout}
                >
                  <IconLogout size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        </Paper>

        {/* Profile Edit Modal */}
        <Modal 
          opened={opened} 
          onClose={close} 
          title="Edit Profile"
          centered
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          styles={{
            title: { 
              color: 'var(--mantine-color-brand-5)', 
              fontWeight: 700 
            },
            content: { 
              backgroundColor: 'var(--mantine-color-dark-7)',
              border: '1px solid var(--mantine-color-dark-4)'
            }
          }}
        >
          <Stack gap="md">
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              value={editProfile.firstName || profile.firstName}
              onChange={(e) => setEditProfile(prev => ({ 
                ...prev, 
                firstName: e.currentTarget.value 
              }))}
              styles={{
                label: { 
                  color: 'var(--mantine-color-brand-3)', 
                  marginBottom: '0.5rem' 
                }
              }}
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              value={editProfile.lastName || profile.lastName}
              onChange={(e) => setEditProfile(prev => ({ 
                ...prev, 
                lastName: e.currentTarget.value 
              }))}
              styles={{
                label: { 
                  color: 'var(--mantine-color-brand-3)', 
                  marginBottom: '0.5rem' 
                }
              }}
            />
            <Select
              label="Membership Type"
              placeholder="Select membership type"
              value={editProfile.membershipType || profile.membershipType}
              onChange={(value) => setEditProfile(prev => ({ 
                ...prev, 
                membershipType: value || undefined 
              }))}
              data={['Community Member', 'Key Access Member', 'Creative Workspace Member']}
              styles={{
                label: { 
                  color: 'var(--mantine-color-brand-3)', 
                  marginBottom: '0.5rem' 
                }
              }}
            />
            <Button 
              onClick={handleProfileUpdate} 
              color="brand"
              fullWidth
            >
              Save Changes
            </Button>
          </Stack>
        </Modal>

        {/* Dashboard Widgets */}
        <Grid gutter="xl">
          {/* First Row: Key Insights */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper 
              shadow="xl" 
              p="xl" 
              radius="lg"
              bg="dark.7"
              style={{
                border: '1px solid var(--mantine-color-dark-4)',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
              }}
            >
              <Group justify="space-between">
                <Text fw={700} c="brand.0" size="lg">Benefits Usage</Text>
                <IconChartBar size={20} color="var(--mantine-color-brand-5)" />
              </Group>
              <Stack align="center" mt="xl">
                <RingProgress
                  sections={[{ 
                    value: calculateAverageBenefitsUsage(), 
                    color: 'brand.5' 
                  }]}
                  label={
                    <Text size="xl" ta="center" fw={700} c="brand.0">
                      {calculateAverageBenefitsUsage()}%
                    </Text>
                  }
                  size={150}
                  thickness={12}
                />
                <Text size="sm" c="dark.2" mt="md">Benefits Used This Month</Text>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Interests Widget */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper 
              shadow="xl" 
              p="xl" 
              radius="lg"
              bg="dark.7"
              style={{
                border: '1px solid var(--mantine-color-dark-4)',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
              }}
            >
              <Group justify="space-between">
                <Text fw={700} c="brand.0" size="lg">My Interests</Text>
                <IconUsers size={20} color="var(--mantine-color-brand-5)" />
              </Group>
              <SimpleGrid cols={2} mt="md" spacing="xs">
                {profile.primaryInterest && (
                  <Badge 
                    variant="light" 
                    color="brand"
                  >
                    {profile.primaryInterest.category}
                  </Badge>
                )}
                {profile.secondaryInterests?.map(interest => (
                  <Badge 
                    key={interest.id} 
                    variant="light" 
                    color="brand"
                  >
                    {interest.category}
                  </Badge>
                ))}
              </SimpleGrid>
              {(!profile.primaryInterest && (!profile.secondaryInterests || profile.secondaryInterests.length === 0)) && (
                <Text size="sm" c="dark.2" ta="center" mt="md">
                  No interests added yet
                </Text>
              )}
            </Paper>
          </Grid.Col>

          {/* Personalized Suggestions Widget */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper 
              shadow="xl" 
              p="xl" 
              radius="lg"
              bg="dark.7"
              style={{
                border: '1px solid var(--mantine-color-dark-4)',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
              }}
            >
              <Group justify="space-between">
                <Text fw={700} c="brand.0" size="lg">Personalized Suggestions</Text>
                <IconBolt size={20} color="var(--mantine-color-brand-5)" />
              </Group>
              <Stack mt="md" gap="sm">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Group key={index} justify="space-between" align="center">
                    <Stack gap={4}>
                      <Text size="sm" c="brand.0">{suggestion.title}</Text>
                      <Text size="xs" c="dark.2">{suggestion.description}</Text>
                    </Stack>
                    <Badge color="brand" variant="light">{suggestion.score}%</Badge>
                  </Group>
                ))}
                {suggestions.length === 0 && (
                  <Text size="sm" c="dark.2" ta="center">
                    No suggestions available
                  </Text>
                )}
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Second Row: Engagement Widgets */}
          {renderDigitalModulesWidget()}
          {renderCommunityConnectionsWidget()}
        </Grid>
      </Container>
    </MantineProvider>
  );
}