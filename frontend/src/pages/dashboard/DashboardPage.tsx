import { Container, Grid, Card, Text, Group, RingProgress, Stack } from '@mantine/core';

export function DashboardPage() {
  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" p="lg">
            <Group position="apart">
              <Text weight={500}>Benefits Usage</Text>
            </Group>
            <Stack align="center" mt="md">
              <RingProgress
                sections={[{ value: 40, color: 'blue' }]}
                label={
                  <Text size="xl" align="center">
                    40%
                  </Text>
                }
              />
              <Text size="sm" color="dimmed">Benefits Used This Month</Text>
            </Stack>
          </Card>
        </Grid.Col>
        {/* Add more dashboard widgets */}
      </Grid>
    </Container>
  );
}