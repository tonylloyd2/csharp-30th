import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Text, 
  Button, 
  Group, 
  Stack, 
  SimpleGrid, 
  Badge, 
  Modal, 
  TextInput, 
  Select, 
  Textarea, 
  Tabs,
  Image
} from '@mantine/core';
import { 
  IconCalendar, 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconUsers,
  IconCalendarEvent,
  IconHistory,
  IconClock,
  IconMapPin
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'Upcoming' | 'Past';
  attendees: number;
  category: string;
  image?: string;
}

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Cultural Exchange Workshop',
      date: 'March 15, 2024',
      time: '2:00 PM',
      location: 'Online',
      description: 'An interactive session exploring diverse creative practices',
      status: 'Upcoming',
      attendees: 15,
      category: 'Workshop',
    },
    {
      id: 2,
      title: 'Community Meetup',
      date: 'March 20, 2024',
      time: '6:00 PM',
      location: 'Together Culture Hub',
      description: 'Networking and skill-sharing event for community members',
      status: 'Upcoming',
      attendees: 22,
      category: 'Networking',
    },
    {
      id: 3,
      title: 'Creative Leadership Seminar',
      date: 'April 5, 2024',
      time: '10:00 AM',
      location: 'Community Center',
      description: 'Developing entrepreneurial skills for community leaders',
      status: 'Upcoming',
      attendees: 10,
      category: 'Training',
    }
  ]);

  const [pastEvents, setPastEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Creative Economy Workshop',
      date: '2024-01-15',
      time: '14:00 - 16:00',
      location: 'Online',
      description: 'Exploring innovative approaches to collaborative economic models',
      status: 'Past',
      attendees: 45,
      category: 'Workshop',
      image: 'https://example.com/creative-economy.jpg'
    },
    {
      id: 2,
      title: 'Community Networking Night',
      date: '2024-02-10',
      time: '18:30 - 20:30',
      location: 'Together Culture Hub',
      description: 'An evening of connections, ideas, and collaborative opportunities',
      status: 'Past',
      attendees: 62,
      category: 'Networking',
      image: 'https://example.com/networking-night.jpg'
    },
    {
      id: 3,
      title: 'Skill Share Symposium',
      date: '2024-03-05',
      time: '10:00 - 15:00',
      location: 'Community Center',
      description: 'Members showcase and learn diverse skills from each other',
      status: 'Past',
      attendees: 38,
      category: 'Learning',
      image: 'https://example.com/skill-share.jpg'
    }
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleJoinEvent = (eventId: number) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, attendees: event.attendees + 1 } 
          : event
      )
    );
  };

  const handleCreateEvent = () => {
    // Implement event creation logic
    close();
  };

  const renderUpcomingEvents = () => (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
      {events.map(event => (
        <Paper 
          key={event.id} 
          shadow="xl" 
          p="xl" 
          radius="lg" 
          bg="dark.7"
        >
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={700} c="brand.0">{event.title}</Text>
              <Badge color="brand" variant="light">
                {event.category}
              </Badge>
            </Group>

            <Text size="sm" c="dark.2">{event.description}</Text>

            <Group justify="space-between">
              <Stack gap={4}>
                <Group>
                  <IconCalendar size={16} color="var(--mantine-color-brand-5)" />
                  <Text size="xs" c="dark.2">{event.date}</Text>
                </Group>
                <Text size="xs" c="dark.2">{event.time}</Text>
              </Stack>
              <Text size="xs" c="dark.2">
                {event.attendees}/{event.maxAttendees} Attendees
              </Text>
            </Group>

            <Button
              fullWidth
              variant="filled"
              color="brand"
              onClick={() => handleJoinEvent(event.id)}
              disabled={event.attendees >= event.maxAttendees}
            >
              {event.attendees >= event.maxAttendees 
                ? 'Event Full' 
                : 'Join Event'}
            </Button>
          </Stack>
        </Paper>
      ))}
    </SimpleGrid>
  );

  const renderPastEvents = () => (
    <Paper 
      shadow="xl" 
      p="xl" 
      radius="lg" 
      bg="dark.7"
    >
      <Stack gap="xl">
        <Text fw={700} c="brand.0" size="xl">
          Past Events
        </Text>
        
        {pastEvents.length === 0 ? (
          <Text c="dark.2" ta="center">
            No past events to display
          </Text>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {pastEvents.map(event => (
              <Paper 
                key={event.id} 
                shadow="sm" 
                p="lg" 
                radius="md"
                bg="dark.6"
              >
                {event.image && (
                  <Image 
                    src={event.image} 
                    height={200} 
                    mb="md"
                    radius="md"
                    alt={event.title}
                  />
                )}
                <Stack gap="md">
                  <Group justify="space-between" align="center">
                    <Text fw={700} c="brand.0" size="lg">
                      {event.title}
                    </Text>
                    <Badge color="gray" variant="light">
                      {event.category}
                    </Badge>
                  </Group>
                  
                  <Group>
                    <IconCalendar size={16} color="var(--mantine-color-brand-5)" />
                    <Text size="sm" c="dark.2">
                      {event.date}
                    </Text>
                  </Group>
                  
                  <Group>
                    <IconClock size={16} color="var(--mantine-color-brand-5)" />
                    <Text size="sm" c="dark.2">
                      {event.time}
                    </Text>
                  </Group>
                  
                  <Group>
                    <IconMapPin size={16} color="var(--mantine-color-brand-5)" />
                    <Text size="sm" c="dark.2">
                      {event.location}
                    </Text>
                  </Group>
                  
                  <Text size="sm" c="dark.3" lineClamp={3}>
                    {event.description}
                  </Text>
                  
                  <Group justify="space-between" align="center">
                    <Group>
                      <IconUsers size={16} color="var(--mantine-color-brand-5)" />
                      <Text size="sm" c="dark.2">
                        {event.attendees} Attendees
                      </Text>
                    </Group>
                    <Badge color="gray">
                      Completed
                    </Badge>
                  </Group>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Paper>
  );

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Text fw={700} size="xl" c="brand.0">
                Community Events
              </Text>
              <Text c="dark.2">
                Explore, join, and create events that inspire collaboration
              </Text>
            </Stack>
            <Button 
              leftSection={<IconPlus size={14} />} 
              onClick={open}
            >
              Create Event
            </Button>
          </Group>
        </Paper>

        <Tabs defaultValue="upcoming" variant="pills">
          <Tabs.List>
            <Tabs.Tab 
              value="upcoming" 
              leftSection={<IconCalendarEvent size={14} />}
            >
              Upcoming Events
            </Tabs.Tab>
            <Tabs.Tab 
              value="past" 
              leftSection={<IconHistory size={14} />}
            >
              Past Events
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="upcoming" pt="xl">
            {renderUpcomingEvents()}
          </Tabs.Panel>

          <Tabs.Panel value="past" pt="xl">
            {renderPastEvents()}
          </Tabs.Panel>
        </Tabs>

        <Modal 
          opened={opened} 
          onClose={close} 
          title="Create New Event"
          centered
          size="lg"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          <Stack gap="md">
            <Text c="dark.2" mb="md">
              Create an engaging event to bring our community together. 
              Fill out the details below to share your opportunity.
            </Text>
            
            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  Event Title
                </Text>
              }
              placeholder="Give your event a clear, descriptive name"
              required
              withAsterisk
            />
            
            <Select
              label={
                <Text c="brand.2" fw={500}>
                  Event Category
                </Text>
              }
              placeholder="Choose the type of event"
              data={[
                'Workshop', 
                'Networking', 
                'Training', 
                'Seminar', 
                'Social', 
                'Other'
              ]}
              required
              withAsterisk
            />
            
            <Group grow>
              <TextInput
                label={
                  <Text c="brand.2" fw={500}>
                    Date
                  </Text>
                }
                type="date"
                placeholder="Select event date"
                required
                withAsterisk
              />
              <TextInput
                label={
                  <Text c="brand.2" fw={500}>
                    Time
                  </Text>
                }
                type="time"
                placeholder="Select event time"
                required
                withAsterisk
              />
            </Group>
            
            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  Location
                </Text>
              }
              placeholder="Specify venue or online platform"
              required
              withAsterisk
            />
            
            <Textarea
              label={
                <Text c="brand.2" fw={500}>
                  Event Description
                </Text>
              }
              placeholder="Provide a detailed description of your event"
              minRows={3}
              maxRows={6}
              required
              withAsterisk
            />
            
            <TextInput
              label={
                <Text c="brand.2" fw={500}>
                  Maximum Attendees
                </Text>
              }
              type="number"
              placeholder="Set a limit for event participants"
              min={1}
            />
            
            <Button 
              fullWidth 
              onClick={handleCreateEvent}
              color="brand"
              mt="md"
            >
              Create Event
            </Button>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}
