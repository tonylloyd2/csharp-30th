import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage, RegisterPage } from './pages/auth';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { BenefitsPage } from './pages/benefits/BenefitsPage';
import { EventsPage } from './pages/events/EventsPage';
import { CommunityPage } from './pages/community/CommunityPage';
import { SettingsPage } from './pages/settings/SettingsPage';

function App() {
  const [colorScheme, setColorScheme] = useState('dark');

  const toggleColorScheme = (value?: 'light' | 'dark') =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="benefits" element={<BenefitsPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;