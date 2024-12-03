import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Text, 
  Group, 
  SimpleGrid, 
  Progress, 
  Badge, 
  Button, 
  Stack,
  Tooltip
} from '@mantine/core';
import { 
  IconGift, 
  IconCheck, 
  IconX, 
  IconInfoCircle 
} from '@tabler/icons-react';

interface Benefit {
  id: number;
  title: string;
  description: string;
  category: string;
  progress: number;
  claimed: boolean;
}

export function BenefitsPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([
    {
      id: 1,
      title: 'Creative Economy Workshop',
      description: 'Exclusive access to advanced workshops on collaborative economic models',
      category: 'Learning',
      progress: 75,
      claimed: false
    },
    {
      id: 2,
      title: 'Community Networking',
      description: 'Priority access to monthly networking events and skill exchanges',
      category: 'Networking',
      progress: 50,
      claimed: true
    },
    {
      id: 3,
      title: 'Digital Resource Library',
      description: 'Unlimited access to curated learning materials and creative resources',
      category: 'Resources',
      progress: 100,
      claimed: true
    },
    {
      id: 4,
      title: 'Workspace Credits',
      description: 'Discounted access to creative workspaces and collaboration zones',
      category: 'Facilities',
      progress: 25,
      claimed: false
    }
  ]);

  const handleClaimBenefit = (benefitId: number) => {
    setBenefits(prev => 
      prev.map(benefit => 
        benefit.id === benefitId 
          ? { ...benefit, claimed: true } 
          : benefit
      )
    );
  };

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Paper shadow="xl" p="xl" radius="lg" bg="dark.7">
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Text fw={700} size="xl" c="brand.0">
                My Benefits Dashboard
              </Text>
              <Text c="dark.2">
                Track and manage your membership benefits
              </Text>
            </Stack>
            <Group>
              <Badge color="green" variant="light">
                Claimed: {benefits.filter(b => b.claimed).length}
              </Badge>
              <Badge color="yellow" variant="light">
                Pending: {benefits.filter(b => !b.claimed).length}
              </Badge>
            </Group>
          </Group>
        </Paper>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }}>
          {benefits.map(benefit => (
            <Paper 
              key={benefit.id} 
              shadow="xl" 
              p="xl" 
              radius="lg" 
              bg="dark.7"
            >
              <Stack gap="md">
                <Group justify="space-between">
                  <Group>
                    <IconGift size={24} color="var(--mantine-color-brand-5)" />
                    <Text fw={700} c="brand.0">{benefit.title}</Text>
                  </Group>
                  <Tooltip 
                    label={benefit.description} 
                    multiline 
                    w={220}
                  >
                    <IconInfoCircle 
                      size={16} 
                      color="var(--mantine-color-dark-3)" 
                    />
                  </Tooltip>
                </Group>

                <Text size="sm" c="dark.2">{benefit.description}</Text>

                <Group justify="space-between" align="center">
                  <Stack gap={4} style={{ flex: 1 }}>
                    <Text size="xs" c="dark.2">Progress</Text>
                    <Progress 
                      value={benefit.progress} 
                      color={benefit.progress === 100 ? 'green' : 'brand'} 
                      size="md" 
                    />
                  </Stack>
                  <Badge color="brand" variant="light">
                    {benefit.category}
                  </Badge>
                </Group>

                <Button
                  fullWidth
                  variant={benefit.claimed ? 'light' : 'filled'}
                  color={benefit.claimed ? 'gray' : 'brand'}
                  leftSection={benefit.claimed ? <IconCheck size={14} /> : <IconX size={14} />}
                  onClick={() => handleClaimBenefit(benefit.id)}
                  disabled={benefit.claimed}
                >
                  {benefit.claimed ? 'Claimed' : 'Claim Benefit'}
                </Button>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
