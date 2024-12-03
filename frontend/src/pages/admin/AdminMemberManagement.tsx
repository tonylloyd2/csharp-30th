import React, { useState } from 'react';
import { 
  Container, 
  Table, 
  Group, 
  Text, 
  Button, 
  TextInput, 
  Select,
  Paper,
  Badge,
  Title,
  Stack,
  ThemeIcon,
  Modal,
  Checkbox,
  PasswordInput,
  Tabs,
  ActionIcon,
  Menu,
  Tooltip,
  Avatar
} from '@mantine/core';
import { 
  IconUsers, 
  IconUserPlus, 
  IconSearch,
  IconFilter,
  IconDots,
  IconEdit,
  IconTrash,
  IconLock,
  IconMail,
  IconUserShield,
  IconHistory,
  IconChartLine
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface Member {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
  avatar: string;
}

export function AdminMemberManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [memberType, setMemberType] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  // Mock data - replace with actual backend calls
  const [members, setMembers] = useState<Member[]>([
    { 
      id: 1, 
      name: 'Alice Johnson', 
      email: 'alice@example.com', 
      role: 'Admin', 
      status: 'Active',
      joinDate: '2023-12-01',
      lastActive: '2024-01-15',
      avatar: 'AJ'
    },
    { 
      id: 2, 
      name: 'Bob Smith', 
      email: 'bob@example.com', 
      role: 'Member', 
      status: 'Pending',
      joinDate: '2024-01-10',
      lastActive: '2024-01-14',
      avatar: 'BS'
    },
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Member',
    password: '',
    confirmPassword: '',
  });

  const handleAddMember = () => {
    if (newMember.password !== newMember.confirmPassword) {
      // Show error
      return;
    }

    const member: Member = {
      id: members.length + 1,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      avatar: newMember.name.split(' ').map(n => n[0]).join('')
    };

    setMembers([...members, member]);
    close();
    setNewMember({
      name: '',
      email: '',
      role: 'Member',
      password: '',
      confirmPassword: '',
    });
  };

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    open();
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (memberType ? member.role === memberType : true) &&
    (activeTab === 'all' || member.status.toLowerCase() === activeTab)
  );

  return (
    <Container 
      fluid 
      bg="dark.9" 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0D5AA9 0%, #1C6AB6 50%, #2B7BC3 100%)',
        maxWidth: '100%',
        padding: '0'
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
              <IconUsers size={24} />
            </ThemeIcon>
            <Title order={2} c="white">
              Member Management
            </Title>
          </Group>
          <Button 
            leftSection={<IconUserPlus size={14} />}
            variant="gradient"
            gradient={{ from: 'brand.7', to: 'brand.5', deg: 135 }}
            onClick={open}
          >
            Add New Member
          </Button>
        </Group>

        <Paper 
          withBorder 
          p="lg" 
          radius="md" 
          bg="dark.8"
        >
          <Stack gap="md">
            <Group>
              <TextInput
                placeholder="Search members"
                leftSection={<IconSearch size={14} />}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                style={{ flexGrow: 1 }}
                variant="filled"
              />
              <Select
                placeholder="Member Role"
                leftSection={<IconFilter size={14} />}
                data={['Admin', 'Member', 'Moderator']}
                value={memberType}
                onChange={setMemberType}
                clearable
                variant="filled"
              />
            </Group>

            <Tabs 
              value={activeTab} 
              onChange={setActiveTab}
              variant="pills"
              color="blue"
            >
              <Tabs.List>
                <Tabs.Tab value="all" style={{ color: 'white' }}>All Members</Tabs.Tab>
                <Tabs.Tab value="active" style={{ color: 'white' }}>Active</Tabs.Tab>
                <Tabs.Tab value="pending" style={{ color: 'white' }}>Pending</Tabs.Tab>
                <Tabs.Tab value="inactive" style={{ color: 'white' }}>Inactive</Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Table 
              withTableBorder 
              style={{ 
                tableLayout: 'fixed', 
                color: 'white',
                backgroundColor: 'var(--mantine-color-dark-8)'
              }}
              classNames={{
                tr: 'hover:!bg-transparent'
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ width: '30%', color: 'white' }}>Member</Table.Th>
                  <Table.Th style={{ width: '12%', color: 'white' }}>Role</Table.Th>
                  <Table.Th style={{ width: '12%', color: 'white' }}>Status</Table.Th>
                  <Table.Th style={{ width: '15%', color: 'white' }}>Join Date</Table.Th>
                  <Table.Th style={{ width: '15%', color: 'white' }}>Last Active</Table.Th>
                  <Table.Th style={{ width: '16%', color: 'white' }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredMembers.map((member) => (
                  <Table.Tr key={member.id}>
                    <Table.Td>
                      <Group gap="xs" wrap="nowrap">
                        <Avatar color="blue" radius="xl" size="sm">
                          {member.avatar}
                        </Avatar>
                        <Stack gap={0} style={{ minWidth: 0 }}>
                          <Text c="white" size="sm" fw={500} truncate>
                            {member.name}
                          </Text>
                          <Text c="gray.3" size="xs" truncate>
                            {member.email}
                          </Text>
                        </Stack>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={member.role === 'Admin' ? 'red' : 'blue'}
                        variant="light"
                      >
                        {member.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={
                          member.status === 'Active' ? 'green' : 
                          member.status === 'Pending' ? 'yellow' : 
                          'gray'
                        }
                        variant="light"
                      >
                        {member.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="gray.3">
                        {member.joinDate}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="gray.3">
                        {member.lastActive}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <Menu shadow="md" width={200}>
                          <Menu.Target>
                            <ActionIcon 
                              variant="subtle" 
                              color="gray" 
                              size="sm"
                            >
                              <IconDots size={14} />
                            </ActionIcon>
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Label>Member Actions</Menu.Label>
                            <Menu.Item 
                              leftSection={<IconEdit size={14} />}
                              onClick={() => handleEditMember(member)}
                            >
                              Edit Details
                            </Menu.Item>
                            <Menu.Item 
                              leftSection={<IconLock size={14} />}
                            >
                              Reset Password
                            </Menu.Item>
                            <Menu.Item 
                              leftSection={<IconMail size={14} />}
                            >
                              Send Email
                            </Menu.Item>
                            <Menu.Item 
                              leftSection={<IconHistory size={14} />}
                            >
                              View Activity
                            </Menu.Item>
                            <Menu.Item 
                              leftSection={<IconChartLine size={14} />}
                            >
                              Analytics
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item 
                              color="red" 
                              leftSection={<IconTrash size={14} />}
                              onClick={() => handleDeleteMember(member.id)}
                            >
                              Delete Member
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Stack>
        </Paper>
      </Stack>

      <Modal 
        opened={opened} 
        onClose={close} 
        title={selectedMember ? "Edit Member" : "Add New Member"}
        styles={{
          title: { color: 'white' },
          header: { backgroundColor: 'var(--mantine-color-dark-7)' },
          body: { backgroundColor: 'var(--mantine-color-dark-7)' },
          content: { backgroundColor: 'var(--mantine-color-dark-7)' }
        }}
        centered
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            label="Full Name"
            placeholder="Enter member's full name"
            value={selectedMember ? selectedMember.name : newMember.name}
            onChange={(event) => setNewMember({ ...newMember, name: event.currentTarget.value })}
            required
            styles={{
              label: { color: 'white' },
              input: { backgroundColor: 'var(--mantine-color-dark-6)' }
            }}
          />
          <TextInput
            label="Email Address"
            placeholder="Enter member's email"
            value={selectedMember ? selectedMember.email : newMember.email}
            onChange={(event) => setNewMember({ ...newMember, email: event.currentTarget.value })}
            required
            styles={{
              label: { color: 'white' },
              input: { backgroundColor: 'var(--mantine-color-dark-6)' }
            }}
          />
          <Select
            label="Role"
            placeholder="Select member role"
            data={['Admin', 'Member', 'Moderator']}
            value={selectedMember ? selectedMember.role : newMember.role}
            onChange={(value) => setNewMember({ ...newMember, role: value || 'Member' })}
            required
            styles={{
              label: { color: 'white' },
              input: { backgroundColor: 'var(--mantine-color-dark-6)' }
            }}
          />
          {!selectedMember && (
            <>
              <PasswordInput
                label="Password"
                placeholder="Enter password"
                value={newMember.password}
                onChange={(event) => setNewMember({ ...newMember, password: event.currentTarget.value })}
                required
                styles={{
                  label: { color: 'white' },
                  input: { backgroundColor: 'var(--mantine-color-dark-6)' }
                }}
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm password"
                value={newMember.confirmPassword}
                onChange={(event) => setNewMember({ ...newMember, confirmPassword: event.currentTarget.value })}
                required
                styles={{
                  label: { color: 'white' },
                  input: { backgroundColor: 'var(--mantine-color-dark-6)' }
                }}
              />
            </>
          )}
          <Button 
            fullWidth 
            onClick={handleAddMember}
            variant="gradient"
            gradient={{ from: 'brand.7', to: 'brand.5', deg: 135 }}
          >
            {selectedMember ? "Save Changes" : "Add Member"}
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}