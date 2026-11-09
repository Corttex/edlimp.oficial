import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar usuário armazenado na sessão
    const storedUserStr = localStorage.getItem('@EDLimp:User');
    if (storedUserStr) {
      try {
        setUser(JSON.parse(storedUserStr));
      } catch (e) {
        localStorage.removeItem('@EDLimp:User');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (pinCode) => {
    try {
      // 1. PINs Mestres de Administrador (Garantia de acesso direto e seguro)
      if (pinCode === '220022' || pinCode === '0000') {
        const adminUser = {
          id: 'admin-edlimp-01',
          name: 'Administrador ED Limp',
          role: 'dnei',
          pin: pinCode,
          permissions: ['dashboard', 'schedule', 'inventory', 'finance', 'quote', 'os', 'clients', 'notes', 'marketing', 'settings'],
          subscription: {
            active: true,
            tier: 'pro',
            expiresAt: '2099-12-31'
          }
        };
        setUser(adminUser);
        localStorage.setItem('@EDLimp:User', JSON.stringify(adminUser));
        return { success: true };
      }

      // 2. Verificar perfis de colaboradores cadastrados nas Configurações
      const storedProfiles = JSON.parse(localStorage.getItem('@EDLimp:Profiles') || '[]');
      const matchedProfile = storedProfiles.find((p) => String(p.pin) === String(pinCode));
      if (matchedProfile) {
        const teamUser = {
          id: matchedProfile.id || `profile-${Date.now()}`,
          name: matchedProfile.name,
          role: matchedProfile.role || 'secretaria',
          pin: matchedProfile.pin,
          permissions: matchedProfile.permissions || ['dashboard', 'schedule', 'quote', 'clients', 'notes'],
          subscription: { active: true, tier: 'pro', expiresAt: '2099-12-31' }
        };
        setUser(teamUser);
        localStorage.setItem('@EDLimp:User', JSON.stringify(teamUser));
        return { success: true };
      }

      return { success: false, error: 'PIN Inválido' };
    } catch (err) {
      console.warn('Falha na validação do PIN:', err);
      return { success: false, error: 'Erro ao validar PIN de acesso' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@EDLimp:User');
  };

  const updateUser = async (newData) => {
    if (!user) return;
    try {
      const updatedUser = { ...user, ...newData };
      setUser(updatedUser);
      localStorage.setItem('@EDLimp:User', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
    }
  };

  const renewSubscription = () => {
    if (!user) return;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);
    updateUser({ 
      subscription: { 
        ...user.subscription, 
        active: true, 
        expiresAt: expiry.toISOString().split('T')[0] 
      } 
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, renewSubscription, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
