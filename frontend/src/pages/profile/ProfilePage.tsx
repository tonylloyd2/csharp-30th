import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Text, 
  Group, 
  Avatar, 
  Stack, 
  Tabs, 
  Badge, 
  Grid, 
  Button, 
  Modal,
  TextInput,
  Select,
  Textarea,
  SimpleGrid,
  Divider,
  Switch
} from '@mantine/core';
import { 
  IconUser, 
  IconSettings, 
  IconCertificate, 
  IconEdit,
  IconUsers,
  IconBolt
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface Achievement {
  id: number;
  title: string;
  description: string;
  dateEarned: string;
  icon: React.ReactNode;
}

interface ProfileSettings {
  privacyLevel: 'Public' | 'Private' | 'Selective';
  emailNotifications: boolean;
  communityAlerts: boolean;
  profileVisibility: boolean;
}

export function ProfilePage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [profile, setProfile] = useState({
    firstName: 'Emma',
    lastName: 'Rodriguez',
    email: 'emma.rodriguez@togethercultureorg',
    membershipType: 'Community Member',
    interests: ['creating', 'sharing'],
    joinedDate: '2024-01-15',
    bio: 'Passionate about collaborative creative economies and community development.'
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'Community Connector',
      description: 'Participated in 5 community events',
      dateEarned: '2024-02-15',
      icon: <IconUsers size={24} color="var(--mantine-color-brand-5)" />
    },
    {
      id: 2,
      title: 'Creative Collaborator',
      description: 'Contributed to 3 community projects',
      dateEarned: '2024-03-01',
      icon: <IconBolt size={24} color="var(--mantine-color-brand-5)" />
    },
    {
      id: 3,
      title: 'Skill Sharer',
      description: 'Hosted a workshop for community members',
      dateEarned: '2024-03-10',
      icon: <IconCertificate size={24} color="var(--mantine-color-brand-5)" />
    }
  ]);

  const [settings, setSettings] = useState<ProfileSettings>({
    privacyLevel: 'Selective',
    emailNotifications: true,
    communityAlerts: true,
    profileVisibility: true
  });

  const handleProfileUpdate = () => {
    // Implement profile update logic
    close();
  };

  const renderAchievementsTab = () => (
    <Paper 
      shadow="xl" 
      p="xl" 
      radius="lg" 
      bg="dark.7"
    >
      <Stack gap="md">
        <Text fw={700} c="brand.0" size="lg">
          My Achievements
        </Text>
        {achievements.length === 0 ? (
          <Text c="dark.2" ta="center">
            No achievements earned yet
          </Text>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
            {achievements.map(achievement => (
              <Paper 
                key={achievement.id} 
                shadow="sm" 
                p="lg" 
                radius="md"
                bg="dark.6"
              >
                <Group>
                  {achievement.icon}
                  <Stack gap={4}>
                    <Text fw={700} c="brand.0">
                      {achievement.title}
                    </Text>
                    <Text size="sm" c="dark.2">
                      {achievement.description}
                    </Text>
                    <Text size="xs" c="dark.3">
                      Earned on {achievement.dateEarned}
                    </Text>
                  </Stack>
                </Group>
              </Paper>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Paper>
  );

  const renderSettingsTab = () => (
    <Paper 
      shadow="xl" 
      p="xl" 
      radius="lg" 
      bg="dark.7"
    >
      <Stack gap="xl">
        <Stack gap="md">
          <Text fw={700} c="brand.0" size="lg">
            Privacy Settings
          </Text>
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Text fw={500} c="brand.0">
                Profile Visibility
              </Text>
              <Text size="sm" c="dark.2">
                Control who can view your profile
              </Text>
            </Stack>
            <Select
              w={200}
              value={settings.privacyLevel}
              onChange={(value) => setSettings(prev => ({
                ...prev,
                privacyLevel: value as ProfileSettings['privacyLevel']
              }))}
              data={['Public', 'Private', 'Selective']}
            />
          </Group>
        </Stack>

        <Divider />

        <Stack gap="md">
          <Text fw={700} c="brand.0" size="lg">
            Notification Preferences
          </Text>
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Text fw={500} c="brand.0">
                Email Notifications
              </Text>
              <Text size="sm" c="dark.2">
                Receive updates and community news
              </Text>
            </Stack>
            <Switch
              checked={settings.emailNotifications}
              onChange={(event) => setSettings(prev => ({
                ...prev,
                emailNotifications: event.currentTarget.checked
              }))}
            />
          </Group>

          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Text fw={500} c="brand.0">
                Community Alerts
              </Text>
              <Text size="sm" c="dark.2">
                Get notified about community activities
              </Text>
            </Stack>
            <Switch
              checked={settings.communityAlerts}
              onChange={(event) => setSettings(prev => ({
                ...prev,
                communityAlerts: event.currentTarget.checked
              }))}
            />
          </Group>
        </Stack>

        <Button 
          variant="filled" 
          color="brand"
          fullWidth
        >
          Save Settings
        </Button>
      </Stack>
    </Paper>
  );

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
            <Stack align="center" gap="md">
              <Avatar 
                size={120} 
                radius="xl" 
                color="brand"
              >
                {profile.firstName[0] + profile.lastName[0]}
              </Avatar>
              <Stack align="center" gap={4}>
                <Text size="xl" fw={700} c="brand.0">
                  {profile.firstName} {profile.lastName}
                </Text>
                <Badge color="brand" variant="light">
                  {profile.membershipType}
                </Badge>
                <Text size="sm" c="dark.2">
                  Member since {profile.joinedDate}
                </Text>
              </Stack>
              <Button 
                leftSection={<IconEdit size={14} />} 
                variant="light" 
                color="brand"
                onClick={open}
              >
                Edit Profile
              </Button>
            </Stack>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Tabs defaultValue="overview" variant="pills">
            <Tabs.List>
              <Tabs.Tab 
                value="overview" 
                leftSection={<IconUser size={14} />}
              >
                Overview
              </Tabs.Tab>
              <Tabs.Tab 
                value="achievements" 
                leftSection={<IconCertificate size={14} />}
              >
                Achievements
              </Tabs.Tab>
              <Tabs.Tab 
                value="settings" 
                leftSection={<IconSettings size={14} />}
              >
                Settings
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview" pt="xl">
              <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
                <Text fw={700} c="brand.0" mb="md">About Me</Text>
                <Text c="dark.2">{profile.bio}</Text>
                
                <Text fw={700} c="brand.0" mt="xl" mb="md">My Interests</Text>
                <Group>
                  {profile.interests.map(interest => (
                    <Badge 
                      key={interest} 
                      color="brand" 
                      variant="light"
                    >
                      {interest}
                    </Badge>
                  ))}
                </Group>
              </Paper>
            </Tabs.Panel>

            <Tabs.Panel value="achievements" pt="xl">
              {renderAchievementsTab()}
            </Tabs.Panel>

            <Tabs.Panel value="settings" pt="xl">
              {renderSettingsTab()}
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>

      <Modal 
        opened={opened} 
        onClose={close} 
        title="Edit Profile"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Stack gap="md">
          <TextInput
            label="First Name"
            value={profile.firstName}
            onChange={(e) => setProfile(prev => ({
              ...prev, 
              firstName: e.currentTarget.value
            }))}
          />
          <TextInput
            label="Last Name"
            value={profile.lastName}
            onChange={(e) => setProfile(prev => ({
              ...prev, 
              lastName: e.currentTarget.value
            }))}
          />
          <TextInput
            label="Email"
            value={profile.email}
            onChange={(e) => setProfile(prev => ({
              ...prev, 
              email: e.currentTarget.value
            }))}
          />
          <Select
            label="Membership Type"
            value={profile.membershipType}
            onChange={(value) => setProfile(prev => ({
              ...prev, 
              membershipType: value || prev.membershipType
            }))}
            data={[
              'Community Member', 
              'Key Access Member', 
              'Creative Workspace Member'
            ]}
          />
          <Textarea
            label="Bio"
            value={profile.bio}
            onChange={(e) => setProfile(prev => ({
              ...prev, 
              bio: e.currentTarget.value
            }))}
            minRows={3}
          />
          <Button onClick={handleProfileUpdate}>Save Changes</Button>
        </Stack>
      </Modal>
    </Container>
  );
}