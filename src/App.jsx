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

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<AcessoPinPage />} />
          </Route>
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/quote" element={<QuoteGeneratorPage />} />
            <Route path="/os" element={<OSGeneratorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <SubscriptionOverlay />
      </BrowserRouter>
    </AuthProvider>
  );
}
