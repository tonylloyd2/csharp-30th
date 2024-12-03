import { useState } from 'react';
import { TextInput, PasswordInput, Button, Box, Title, Text, Paper, Group, Divider, Tooltip, rem } from '@mantine/core';
import { useAuth } from '../../hooks/useAuth';
import { LoginDto } from '../../types/auth';
import { IconBrandGoogle, IconMail, IconLock, IconInfoCircle } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import classes from './AuthForms.module.css';

export function LoginForm() {
  const { login, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });
  const [focused, setFocused] = useState<'email' | 'password' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData);
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
          Welcome Back! 👋
        </Title>
        
        <Text c="dimmed" size="sm" ta="center" mb={30} className={classes.text}>
          Sign in to continue your journey with us
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
          <Tooltip
            label="Enter the email you used to register"
            position="right"
            withArrow
            opened={focused === 'email'}
          >
            <TextInput
              label="Email"
              placeholder="your@email.com"
              size="md"
              required
              icon={<IconMail size={16} />}
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
              placeholder="Your password"
              mt="md"
              size="md"
              required
              icon={<IconLock size={16} />}
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

          <Group justify="flex-end" mt="md">
            <Text component="a" href="#" size="sm" className={classes.forgotPassword}>
              Forgot password?
            </Text>
          </Group>

          <Button
            fullWidth
            mt="xl"
            size="md"
            loading={loading}
            className={classes.button}
            type="submit"
          >
            Sign in
          </Button>

          <Divider label="Or continue with" labelPosition="center" my="lg" />

          <Button
            fullWidth
            variant="outline"
            leftSection={<IconBrandGoogle size={16} />}
            className={classes.socialButton}
          >
            Continue with Google
          </Button>

          <Text ta="center" mt="md" size="sm">
            Don't have an account?{' '}
            <Text component="a" href="/register" className={classes.link}>
              Create one
            </Text>
          </Text>
        </Box>
      </Paper>
    </motion.div>
  );
}