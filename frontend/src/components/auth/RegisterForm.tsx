import { useState } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Text, Paper, Group, Divider, Tooltip } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import { RegisterDto } from '../../types/auth';
import { IconBrandGoogle, IconMail, IconLock, IconUser } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './AuthForms.module.css';

export function RegisterForm() {
  const { register, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState<RegisterDto>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [focused, setFocused] = useState<'email' | 'password' | 'firstName' | 'lastName' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper className={classes.formContainer} radius="md" p={30} shadow="md">
        <Title order={2} ta="center" mt="md" mb={30} className={classes.title}>
          Create Your Account ✨
        </Title>
        
        <Text c="dimmed" size="sm" ta="center" mb={30} className={classes.text}>
          Join our community and start your journey
        </Text>

        {authError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Text className={classes.error} mb="md">
              {authError}
            </Text>
          </motion.div>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Group grow className={classes.inputGroup}>
            <Tooltip
              label="Enter your first name"
              position="top"
              withArrow
              opened={focused === 'firstName'}
            >
              <TextInput
                label="First Name"
                placeholder="Your first name"
                icon={<IconUser size={16} />}
                required
                classNames={{
                  input: classes.input,
                  label: classes.label,
                  wrapper: classes.text
                }}
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                onFocus={() => setFocused('firstName')}
                onBlur={() => setFocused(null)}
              />
            </Tooltip>

            <Tooltip
              label="Enter your last name"
              position="top"
              withArrow
              opened={focused === 'lastName'}
            >
              <TextInput
                label="Last Name"
                placeholder="Your last name"
                icon={<IconUser size={16} />}
                required
                classNames={{
                  input: classes.input,
                  label: classes.label,
                  wrapper: classes.text
                }}
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                onFocus={() => setFocused('lastName')}
                onBlur={() => setFocused(null)}
              />
            </Tooltip>
          </Group>

          <Tooltip
            label="Enter a valid email address"
            position="right"
            withArrow
            opened={focused === 'email'}
          >
            <TextInput
              label="Email"
              placeholder="your@email.com"
              mt="md"
              icon={<IconMail size={16} />}
              required
              classNames={{
                input: classes.input,
                label: classes.label,
                wrapper: classes.text
              }}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
          </Tooltip>

          <Tooltip
            label="Password must be at least 8 characters"
            position="right"
            withArrow
            opened={focused === 'password'}
          >
            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              mt="md"
              icon={<IconLock size={16} />}
              required
              classNames={{
                input: classes.input,
                label: classes.label,
                wrapper: classes.text,
                innerInput: classes.text
              }}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
          </Tooltip>

          <Button
            fullWidth
            mt="xl"
            size="md"
            loading={loading}
            className={classes.button}
            type="submit"
          >
            Create Account
          </Button>

          <Divider 
            label="Or continue with" 
            labelPosition="center" 
            my="lg" 
            className={classes.divider}
          />

          <Button
            fullWidth
            variant="outline"
            leftSection={<IconBrandGoogle size={16} />}
            className={classes.socialButton}
          >
            Continue with Google
          </Button>

          <Text ta="center" mt="md" size="sm">
            Already have an account?{' '}
            <Text component="a" href="/login" className={classes.link}>
              Sign in
            </Text>
          </Text>
        </Box>
      </Paper>
    </motion.div>
  );
}