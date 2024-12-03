import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Text, 
  Group, 
  Avatar, 
  Stack, 
  Button, 
  Divider, 
  Tabs,
  TextInput,
  Select,
  Modal,
  Badge,
  SimpleGrid,
  Tooltip,
  Textarea
} from '@mantine/core';
import { 
  IconUsers, 
  IconSearch, 
  IconNetwork, 
  IconMessage, 
  IconPlus,
  IconUserPlus,
  IconFilter
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface CommunityMember {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  interests: string[];
  membershipType: 'Community Member' | 'Key Access Member' | 'Creative Workspace Member';
}

interface CommunityConnection {
  id: number;
  type: 'need' | 'offer';
  title: string;
  description: string;
  author: Pick<CommunityMember, 'id' | 'firstName' | 'lastName'>;
  tags: string[];
}

export function CommunityPage() {
  const [members, setMembers] = useState<CommunityMember[]>([
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Kim',
      avatar: 'AK',
      role: 'Cultural Expert',
      interests: ['creating', 'sharing'],
      membershipType: 'Community Member'
    },
    {
      id: 2,
      firstName: 'Mike',
      lastName: 'Smith',
      avatar: 'MS',
      role: 'Language Enthusiast',
      interests: ['experiencing', 'working'],
      membershipType: 'Key Access Member'
    },
    {
      id: 3,
      firstName: 'Lisa',
      lastName: 'Park',
      avatar: 'LP',
      role: 'Community Leader',
      interests: ['caring', 'creating'],
      membershipType: 'Creative Workspace Member'
    }
  ]);

  const [connections, setConnections] = useState<CommunityConnection[]>([
    {
      id: 1,
      type: 'need',
      title: 'Web Design Support',
      description: 'Looking for help redesigning community website',
      author: { id: 2, firstName: 'Mike', lastName: 'Smith' },
      tags: ['technology', 'design', 'volunteer']
    },
    {
      id: 2,
      type: 'offer',
      title: 'Photography Workshop',
      description: 'Offering free photography skills session',
      author: { id: 3, firstName: 'Lisa', lastName: 'Park' },
      tags: ['art', 'skills', 'workshop']
    }
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const [connectionOpened, { open: openConnection, close: closeConnection }] = useDisclosure(false);

  const [filters, setFilters] = useState({
    membershipType: '',
    interests: ''
  });

  const filteredMembers = members.filter(member => 
    (!filters.membershipType || member.membershipType === filters.membershipType) &&
    (!filters.interests || member.interests.includes(filters.interests))
  );

  const handleAddConnection = () => {
    // Implement connection creation logic
    closeConnection();
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Text fw={700} size="xl" c="brand.0">
                Together Culture Community
              </Text>
              <Text c="dark.2">
                Connect, collaborate, and create together
              </Text>
            </Stack>
            <Group>
              <Button 
                leftSection={<IconUserPlus size={14} />} 
                onClick={open}
              >
                Invite Member
              </Button>
              <Button 
                leftSection={<IconPlus size={14} />} 
                variant="light"
                onClick={openConnection}
              >
                Add Connection
              </Button>
            </Group>
          </Group>
        </Paper>

        <Tabs defaultValue="members" variant="pills">
          <Tabs.List>
            <Tabs.Tab 
              value="members" 
              leftSection={<IconUsers size={14} />}
            >
              Community Members
            </Tabs.Tab>
            <Tabs.Tab 
              value="connections" 
              leftSection={<IconNetwork size={14} />}
            >
              Community Connections
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="members" pt="xl">
            <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
              <Group justify="space-between" mb="md">
                <Group>
                  <Select
                    placeholder="Membership Type"
                    data={[
                      'Community Member', 
                      'Key Access Member', 
                      'Creative Workspace Member'
                    ]}
                    value={filters.membershipType}
                    onChange={(value) => setFilters(prev => ({
                      ...prev, 
                      membershipType: value || ''
                    }))}
                    leftSection={<IconFilter size={14} />}
                  />
                  <Select
                    placeholder="Interests"
                    data={['caring', 'sharing', 'creating', 'experiencing', 'working']}
                    value={filters.interests}
                    onChange={(value) => setFilters(prev => ({
                      ...prev, 
                      interests: value || ''
                    }))}
                    leftSection={<IconSearch size={14} />}
                  />
                </Group>
                <TextInput
                  placeholder="Search members"
                  leftSection={<IconSearch size={14} />}
                />
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
                {filteredMembers.map(member => (
                  <Paper 
                    key={member.id} 
                    shadow="sm" 
                    p="lg" 
                    radius="md"
                    bg="dark.6"
                  >
                    <Group>
                      <Avatar 
                        size={64} 
                        radius="xl" 
                        color="brand"
                      >
                        {member.avatar}
                      </Avatar>
                      <Stack gap={4}>
                        <Text fw={700} c="brand.0">
                          {member.firstName} {member.lastName}
                        </Text>
                        <Text size="sm" c="dark.2">
                          {member.role}
                        </Text>
                        <Badge color="brand" variant="light">
                          {member.membershipType}
                        </Badge>
                        <Group gap="xs">
                          {member.interests.map(interest => (
                            <Badge 
                              key={interest} 
                              size="xs" 
                              color="brand" 
                              variant="dot"
                            >
                              {interest}
                            </Badge>
                          ))}
                        </Group>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
              </SimpleGrid>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="connections" pt="xl">
            <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="md">
                {connections.map(connection => (
                  <Paper 
                    key={connection.id} 
                    shadow="sm" 
                    p="lg" 
                    radius="md"
                    bg="dark.6"
                  >
                    <Group justify="space-between" mb="md">
                      <Text fw={700} c="brand.0">
                        {connection.title}
                      </Text>
                      <Badge 
                        color={connection.type === 'need' ? 'red' : 'green'} 
                        variant="light"
                      >
                        {connection.type.toUpperCase()}
                      </Badge>
                    </Group>
                    <Text size="sm" c="dark.2" mb="md">
                      {connection.description}
                    </Text>
                    <Group justify="space-between" align="center">
                      <Group>
                        <Avatar 
                          size="sm" 
                          radius="xl" 
                          color="brand"
                        >
                          {connection.author.firstName[0] + connection.author.lastName[0]}
                        </Avatar>
                        <Text size="xs" c="dark.2">
                          {connection.author.firstName} {connection.author.lastName}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        {connection.tags.map(tag => (
                          <Badge 
                            key={tag} 
                            size="xs" 
                            color="brand" 
                            variant="dot"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </Group>
                    </Group>
                  </Paper>
                ))}
              </SimpleGrid>
            </Paper>
          </Tabs.Panel>
        </Tabs>

        {/* Invite Member Modal */}
        <Modal 
          opened={opened} 
          onClose={close} 
          title="Invite New Member"
          centered
          size="lg"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          <Stack gap="md">
            <Text c="dark.2" mb="md">
              Invite a new member to join our collaborative community. 
              Help expand our creative network.
            </Text>

            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  First Name
                </Text>
              }
              placeholder="Enter first name"
              required
              withAsterisk
            />
            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  Last Name
                </Text>
              }
              placeholder="Enter last name"
              required
              withAsterisk
            />
            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  Email
                </Text>
              }
              placeholder="Enter email address"
              required
              withAsterisk
            />
            <Select
              label={
                <Text c="brand.2" fw={500}>
                  Membership Type
                </Text>
              }
              placeholder="Select membership type"
              data={[
                'Community Member', 
                'Key Access Member', 
                'Creative Workspace Member'
              ]}
              required
              withAsterisk
            />
            <Button 
              fullWidth 
              color="brand" 
              mt="md"
            >
              Send Invitation
            </Button>
          </Stack>
        </Modal>

        {/* Add Connection Modal */}
        <Modal 
          opened={connectionOpened} 
          onClose={closeConnection} 
          title="Add Community Connection"
          centered
          size="lg"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          <Stack gap="md">
            <Text c="dark.2" mb="md">
              Create a new connection to collaborate or seek support 
              within our community. Share your needs or offers.
            </Text>

            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  Title
                </Text>
              }
              placeholder="Enter connection title"
              required
              withAsterisk
            />
            <Select
              label={
                <Text c="brand.2" fw={500}>
                  Type
                </Text>
              }
              placeholder="Select connection type"
              data={['Need', 'Offer']}
              required
              withAsterisk
            />
            <Textarea
              label={
                <Text c="brand.2" fw={500}>
                  Description
                </Text>
              }
              placeholder="Describe your connection"
              minRows={3}
              maxRows={6}
              required
              withAsterisk
            />
            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  Tags
                </Text>
              }
              placeholder="Enter tags separated by commas"
            />
            <Button 
              fullWidth 
              onClick={handleAddConnection}
              color="brand"
              mt="md"
            >
              Create Connection
            </Button>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}
