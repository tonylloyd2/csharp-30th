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
  Textarea,
  NumberInput,
  ActionIcon,
  Menu,
  Tooltip,
  Tabs,
  Grid,
  Card,
  Progress,
  Avatar,
  Checkbox
} from '@mantine/core';
import { 
  IconCalendarEvent, 
  IconPlus, 
  IconSearch,
  IconFilter,
  IconCalendar,
  IconDots,
  IconEdit,
  IconTrash,
  IconUsers,
  IconChartBar,
  IconMail,
  IconShare,
  IconClock,
  IconMapPin,
  IconTicket
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { DateInput, TimeInput } from '@mantine/dates';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  capacity: number;
  registered: number;
  status: string;
  organizer: {
    name: string;
    avatar: string;
  };
}

export function AdminEventManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('all');

  // Mock data - replace with actual backend calls
  const [events, setEvents] = useState<Event[]>([
    { 
      id: 1, 
      title: 'Creative Leadership Workshop', 
      description: 'Learn effective leadership skills for creative teams',
      date: '2024-02-15', 
      time: '14:00',
      location: 'Main Conference Room',
      type: 'Workshop',
      capacity: 50,
      registered: 35,
      status: 'Upcoming',
      organizer: {
        name: 'Alice Johnson',
        avatar: 'AJ'
      }
    },
    { 
      id: 2, 
      title: 'Digital Innovation Summit', 
      description: 'Explore the latest trends in digital innovation',
      date: '2024-02-20', 
      time: '10:00',
      location: 'Virtual',
      type: 'Conference',
      capacity: 200,
      registered: 150,
      status: 'Open',
      organizer: {
        name: 'Bob Smith',
        avatar: 'BS'
      }
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: '',
    capacity: 0
  });

  const handleAddEvent = () => {
    const event: Event = {
      id: events.length + 1,
      ...newEvent,
      registered: 0,
      status: 'Upcoming',
      organizer: {
        name: 'Admin User',
        avatar: 'AU'
      }
    };

    setEvents([...events, event]);
    close();
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: '',
      capacity: 0
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    open();
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (eventType ? event.type === eventType : true) &&
    (activeTab === 'all' || event.status.toLowerCase() === activeTab.toLowerCase())
  );

  return (
    <Container 
      fluid 
      style={{ 
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        background: 'linear-gradient(135deg, #0D5AA9 0%, #1C6AB6 50%, #2B7BC3 100%)'
      }}
    >
      <Stack gap="xl" p="xl" style={{ width: '100%' }}>
        <Group justify="space-between" align="center">
          <Group>
            <ThemeIcon 
              variant="gradient" 
              gradient={{ from: 'brand.7', to: 'brand.5', deg: 135 }} 
              size="xl"
            >
              <IconCalendar size={24} />
            </ThemeIcon>
            <Title order={2} c="white">
              Event Management
            </Title>
          </Group>
          <Button 
            leftSection={<IconPlus size={14} />}
            variant="gradient"
            gradient={{ from: 'brand.7', to: 'brand.5', deg: 135 }}
            onClick={open}
          >
            Create Event
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
                placeholder="Search events"
                leftSection={<IconSearch size={14} />}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                style={{ flexGrow: 1 }}
                variant="filled"
              />
              <Select
                placeholder="Event Type"
                leftSection={<IconFilter size={14} />}
                data={['Workshop', 'Conference', 'Seminar', 'Networking', 'Training']}
                value={eventType}
                onChange={setEventType}
                clearable
                variant="filled"
              />
            </Group>

            <Tabs 
              value={activeTab} 
              onChange={setActiveTab}
              variant="pills"
              color="blue"
              style={{ width: '100%' }}
            >
              <Tabs.List style={{ gap: '1rem' }}>
                <Tabs.Tab 
                  value="all" 
                  style={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: '#2C5282' }
                  }}
                >
                  All Events
                </Tabs.Tab>
                <Tabs.Tab 
                  value="upcoming"
                  style={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: '#2C5282' }
                  }}
                >
                  Upcoming
                </Tabs.Tab>
                <Tabs.Tab 
                  value="ongoing"
                  style={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: '#2C5282' }
                  }}
                >
                  Ongoing
                </Tabs.Tab>
                <Tabs.Tab 
                  value="past"
                  style={{ 
                    color: 'white',
                    '&:hover': { backgroundColor: '#2C5282' }
                  }}
                >
                  Past
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <Table 
              striped 
              highlightOnHover 
              withTableBorder
              styles={(theme) => ({
                table: {
                  backgroundColor: theme.colors.dark[7]
                },
                tr: {
                  backgroundColor: '#1a237e'
                },
                td: {
                  backgroundColor: '#1a237e',
                  '&:hover': {
                    backgroundColor: '#424242'
                  }
                },
                trGroup: {
                  '&:nth-of-type(even)': {
                    backgroundColor: '#283593'
                  }
                }
              })}
            >
              <Table.Thead style={{ backgroundColor: '#1a1b1e' }}>
                <Table.Tr>
                  <Table.Th style={{ color: 'white' }}>Event Details</Table.Th>
                  <Table.Th style={{ color: 'white' }}>Date & Time</Table.Th>
                  <Table.Th style={{ color: 'white' }}>Location</Table.Th>
                  <Table.Th style={{ color: 'white' }}>Capacity</Table.Th>
                  <Table.Th style={{ color: 'white' }}>Status</Table.Th>
                  <Table.Th style={{ color: 'white' }}>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredEvents.map((event) => (
                  <Table.Tr key={event.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <ThemeIcon 
                          variant="light" 
                          color="blue" 
                          size="lg"
                        >
                          <IconCalendarEvent size={18} />
                        </ThemeIcon>
                        <Stack gap={0}>
                          <Text c="white" size="sm" fw={500}>
                            {event.title}
                          </Text>
                          <Group gap="xs">
                            <Avatar 
                              size="xs" 
                              color="blue"
                              radius="xl"
                            >
                              {event.organizer.avatar}
                            </Avatar>
                            <Text c="dimmed" size="xs">
                              by {event.organizer.name}
                            </Text>
                          </Group>
                        </Stack>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap={0}>
                        <Text c="white" size="sm">
                          {event.date}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {event.time}
                        </Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Text c="dimmed" size="sm">
                        {event.location}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap="xs">
                        <Group gap="xs">
                          <Text c="white" size="sm">
                            {event.registered}/{event.capacity}
                          </Text>
                          <Badge 
                            size="sm"
                            color={event.registered >= event.capacity ? 'red' : 'green'}
                          >
                            {event.registered >= event.capacity ? 'Full' : 'Available'}
                          </Badge>
                        </Group>
                        <Progress 
                          value={(event.registered / event.capacity) * 100} 
                          size="xs"
                          color={event.registered >= event.capacity ? 'red' : 'blue'}
                        />
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={
                          event.status === 'Upcoming' ? 'blue' : 
                          event.status === 'Ongoing' ? 'green' : 
                          'gray'
                        }
                        variant="light"
                      >
                        {event.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
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
                          <Menu.Label>Event Actions</Menu.Label>
                          <Menu.Item 
                            leftSection={<IconEdit size={14} />}
                            onClick={() => handleEditEvent(event)}
                          >
                            Edit Event
                          </Menu.Item>
                          <Menu.Item 
                            leftSection={<IconUsers size={14} />}
                          >
                            Manage Attendees
                          </Menu.Item>
                          <Menu.Item 
                            leftSection={<IconChartBar size={14} />}
                          >
                            View Analytics
                          </Menu.Item>
                          <Menu.Item 
                            leftSection={<IconMail size={14} />}
                          >
                            Email Attendees
                          </Menu.Item>
                          <Menu.Item 
                            leftSection={<IconShare size={14} />}
                          >
                            Share Event
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item 
                            color="red" 
                            leftSection={<IconTrash size={14} />}
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            Cancel Event
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
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
        title={selectedEvent ? "Edit Event" : "Create New Event"}
        centered
        size="lg"
        styles={(theme) => ({
          title: {
            color: 'white',
            fontWeight: 600,
            fontSize: '1.2rem'
          },
          header: {
            backgroundColor: theme.colors.blue[7]
          },
          body: {
            padding: '1.5rem',
            backgroundColor: theme.colors.dark[7]
          },
          close: {
            color: 'white',
            '&:hover': {
              backgroundColor: theme.colors.blue[8]
            }
          }
        })}
      >
        <Stack gap="md">
          <TextInput
            label="Event Title"
            placeholder="Enter event title"
            value={selectedEvent ? selectedEvent.title : newEvent.title}
            onChange={(event) => setNewEvent({ ...newEvent, title: event.currentTarget.value })}
            required
            styles={{
              label: {
                color: 'white',
                fontWeight: 500,
                marginBottom: '0.5rem'
              },
              input: {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          />
          <Textarea
            label="Description"
            placeholder="Enter event description"
            value={selectedEvent ? selectedEvent.description : newEvent.description}
            onChange={(event) => setNewEvent({ ...newEvent, description: event.currentTarget.value })}
            minRows={3}
            required
            styles={{
              label: {
                color: 'white',
                fontWeight: 500,
                marginBottom: '0.5rem'
              },
              input: {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          />
          <Grid>
            <Grid.Col span={6}>
              <DateInput
                label="Date"
                placeholder="Select date"
                value={selectedEvent ? new Date(selectedEvent.date) : newEvent.date ? new Date(newEvent.date) : null}
                onChange={(date) => setNewEvent({ ...newEvent, date: date?.toISOString().split('T')[0] || '' })}
                required
                styles={{
                  label: {
                    color: 'white',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                  },
                  input: {
                    backgroundColor: 'white',
                    color: 'black'
                  }
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TimeInput
                label="Time"
                placeholder="Select time"
                value={selectedEvent ? selectedEvent.time : newEvent.time}
                onChange={(event) => setNewEvent({ ...newEvent, time: event.currentTarget.value })}
                required
                styles={{
                  label: {
                    color: 'white',
                    fontWeight: 500,
                    marginBottom: '0.5rem'
                  },
                  input: {
                    backgroundColor: 'white',
                    color: 'black'
                  }
                }}
              />
            </Grid.Col>
          </Grid>
          <TextInput
            label="Location"
            placeholder="Enter event location"
            value={selectedEvent ? selectedEvent.location : newEvent.location}
            onChange={(event) => setNewEvent({ ...newEvent, location: event.currentTarget.value })}
            required
            styles={{
              label: {
                color: 'white',
                fontWeight: 500,
                marginBottom: '0.5rem'
              },
              input: {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          />
          <Select
            label="Event Type"
            placeholder="Select event type"
            data={['Workshop', 'Conference', 'Seminar', 'Networking', 'Training']}
            value={selectedEvent ? selectedEvent.type : newEvent.type}
            onChange={(value) => setNewEvent({ ...newEvent, type: value || '' })}
            required
            styles={{
              label: {
                color: 'white',
                fontWeight: 500,
                marginBottom: '0.5rem'
              },
              input: {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          />
          <NumberInput
            label="Capacity"
            placeholder="Enter maximum capacity"
            value={selectedEvent ? selectedEvent.capacity : newEvent.capacity}
            onChange={(value) => setNewEvent({ ...newEvent, capacity: value || 0 })}
            min={1}
            required
            styles={{
              label: {
                color: 'white',
                fontWeight: 500,
                marginBottom: '0.5rem'
              },
              input: {
                backgroundColor: 'white',
                color: 'black'
              }
            }}
          />
          <Button 
            fullWidth 
            onClick={handleAddEvent}
            variant="gradient"
            gradient={{ from: 'brand.7', to: 'brand.5', deg: 135 }}
          >
            {selectedEvent ? "Save Changes" : "Create Event"}
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
}