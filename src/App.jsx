import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import InventoryPage from './pages/InventoryPage';
import FinancePage from './pages/FinancePage';
import MarketingPage from './pages/MarketingPage';
import AcessoPinPage from './pages/AcessoPinPage';
import ClientsPage from './pages/ClientsPage';
import NotesPage from './pages/NotesPage';
import SettingsPage from './pages/SettingsPage';
import QuoteGeneratorPage from './pages/QuoteGeneratorPage';
import OSGeneratorPage from './pages/OSGeneratorPage';
import ProfilePage from './pages/ProfilePage';
import SubscriptionOverlay from './components/SubscriptionOverlay';

import LandingPage from './pages/LandingPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/painel" replace />;
  return children;
};

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = savedTheme || systemTheme;
    
    setTheme(activeTheme);
    document.documentElement.classList.toggle('dark', activeTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<AuthLayout />}>
            <Route path="/painel" element={<AcessoPinPage />} />
          </Route>
          
          <Route path="/portal" element={<ProtectedRoute><MainLayout toggleTheme={toggleTheme} theme={theme} /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="quote" element={<QuoteGeneratorPage />} />
            <Route path="os" element={<OSGeneratorPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <SubscriptionOverlay />
      </BrowserRouter>
    </AuthProvider>
  );
}
