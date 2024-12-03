import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Text, 
  Stack, 
  Switch, 
  Select, 
  Button, 
  Group, 
  PasswordInput, 
  Tabs,
  Badge,
  Modal
} from '@mantine/core';
import { 
  IconSettings, 
  IconLock, 
  IconBell, 
  IconLanguage, 
  IconUser,
  IconAlertTriangle
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  emailNotifications: boolean;
  eventReminders: boolean;
  twoFactorAuth: boolean;
}

export function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'dark',
    language: 'English',
    emailNotifications: true,
    eventReminders: true,
    twoFactorAuth: false
  });

  const [opened, { open, close }] = useDisclosure(false);

  const handleToggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  const handleUpdatePassword = () => {
    // Implement password update logic
    close();
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Text fw={700} size="xl" c="brand.0">
                Account Settings
              </Text>
              <Text c="dark.2">
                Customize your experience and manage account preferences
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Tabs defaultValue="preferences" variant="pills">
          <Tabs.List>
            <Tabs.Tab 
              value="preferences" 
              leftSection={<IconSettings size={14} />}
            >
              Preferences
            </Tabs.Tab>
            <Tabs.Tab 
              value="security" 
              leftSection={<IconLock size={14} />}
            >
              Security
            </Tabs.Tab>
            <Tabs.Tab 
              value="notifications" 
              leftSection={<IconBell size={14} />}
            >
              Notifications
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="preferences" pt="xl">
            <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Stack gap={4}>
                    <Text fw={700} c="brand.0">Theme</Text>
                    <Text size="sm" c="dark.2">
                      Customize your visual experience
                    </Text>
                  </Stack>
                  <Switch
                    label={settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    checked={settings.theme === 'dark'}
                    onChange={handleToggleTheme}
                  />
                </Group>

                <Group justify="space-between" align="center">
                  <Stack gap={4}>
                    <Text fw={700} c="brand.0">Language</Text>
                    <Text size="sm" c="dark.2">
                      Choose your preferred language
                    </Text>
                  </Stack>
                  <Select
                    w={200}
                    value={settings.language}
                    onChange={(value) => setSettings(prev => ({
                      ...prev,
                      language: value || 'English'
                    }))}
                    data={['English', 'Spanish', 'French', 'German']}
                  />
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="security" pt="xl">
            <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Stack gap={4}>
                    <Text fw={700} c="brand.0">Two-Factor Authentication</Text>
                    <Text size="sm" c="dark.2">
                      Add an extra layer of security to your account
                    </Text>
                  </Stack>
                  <Switch
                    label={settings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    checked={settings.twoFactorAuth}
                    onChange={() => setSettings(prev => ({
                      ...prev,
                      twoFactorAuth: !prev.twoFactorAuth
                    }))}
                  />
                </Group>

                <Group justify="space-between" align="center">
                  <Stack gap={4}>
                    <Text fw={700} c="brand.0">Change Password</Text>
                    <Text size="sm" c="dark.2">
                      Update your account password
                    </Text>
                  </Stack>
                  <Button 
                    variant="light" 
                    color="brand"
                    onClick={open}
                  >
                    Update Password
                  </Button>
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="notifications" pt="xl">
            <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Stack gap={4}>
                    <Text fw={700} c="brand.0">Email Notifications</Text>
                    <Text size="sm" c="dark.2">
                      Receive updates and important information
                    </Text>
                  </Stack>
                  <Switch
                    label={settings.emailNotifications ? 'Enabled' : 'Disabled'}
                    checked={settings.emailNotifications}
                    onChange={() => setSettings(prev => ({
                      ...prev,
                      emailNotifications: !prev.emailNotifications
                    }))}
                  />
                </Group>

                <Group justify="space-between" align="center">
                  <Stack gap={4}>
                    <Text fw={700} c="brand.0">Event Reminders</Text>
                    <Text size="sm" c="dark.2">
                      Get notified about upcoming community events
                    </Text>
                  </Stack>
                  <Switch
                    label={settings.eventReminders ? 'Enabled' : 'Disabled'}
                    checked={settings.eventReminders}
                    onChange={() => setSettings(prev => ({
                      ...prev,
                      eventReminders: !prev.eventReminders
                    }))}
                  />
                </Group>
              </Stack>
            </Paper>
          </Tabs.Panel>
        </Tabs>

        <Modal 
          opened={opened} 
          onClose={close} 
          title="Update Password"
          centered
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          <Stack gap="md">
            <PasswordInput
              label="Current Password"
              placeholder="Enter current password"
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
            />
            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm new password"
            />
            <Button onClick={handleUpdatePassword}>Update Password</Button>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}