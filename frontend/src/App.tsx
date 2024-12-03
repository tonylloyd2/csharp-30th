import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
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
import { 
  AdminLogin, 
  AdminDashboard 
} from './pages/admin';

const theme = createTheme({
  primaryColor: 'brand',
  defaultRadius: 'md',
  fontFamily: 'Inter, sans-serif',
  colors: {
    dark: [
      '#C1C2C5',   // lightest
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',   // base dark
      '#2C2E33',
      '#25262B',
      '#1A1B1E',   // deep dark
      '#141517',   // darkest
      '#101113'    // ultra dark
    ],
    brand: [
      '#E9ECEF',   // lightest
      '#DEE2E6',
      '#CED4DA',
      '#ADB5BD',
      '#868E96',
      '#4dabf7',   // primary accent
      '#3B8DD0',
      '#2B7BC3',
      '#1C6AB6',
      '#0D5AA9'
    ]
  },
  components: {
    Container: {
      defaultProps: {
        bg: 'dark.8'
      }
    },
    Paper: {
      defaultProps: {
        bg: 'dark.7',
        style: {
          border: '1px solid var(--mantine-color-dark-4)',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)'
        }
      }
    },
    Text: {
      defaultProps: {
        c: 'dark.0'
      }
    }
  }
});

function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

  const toggleColorScheme = () => {
    setColorScheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <MantineProvider 
      theme={{ 
        ...theme, 
        colorScheme 
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/" element={<MainLayout onToggleTheme={toggleColorScheme} colorScheme={colorScheme} />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="benefits" element={<BenefitsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="settings" element={<SettingsPage onToggleTheme={toggleColorScheme} colorScheme={colorScheme} />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AuthLayout><AdminLogin /></AuthLayout>} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;