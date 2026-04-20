import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Look for stored session user
    const storedUserStr = localStorage.getItem('@EDLimp:User');
    if (storedUserStr) {
      setUser(JSON.parse(storedUserStr));
    }
    
    setLoading(false);
  }, []);

  const login = async (pinCode) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('pin', pinCode)
        .single();

      if (error || !data) {
        console.error('Login error:', error);
        return { success: false, error: 'PIN Inválido' };
      }

      setUser(data);
      localStorage.setItem('@EDLimp:User', JSON.stringify(data));
      return { success: true };
    } catch (err) {
      console.error('Auth crash:', err);
      return { success: false, error: 'Erro de conexão com o banco de dados' };
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
      
      const { error } = await supabase
        .from('profiles')
        .update(newData)
        .eq('pin', user.pin);

      if (error) {
        console.error('Update error:', error);
        return;
      }

      setUser(updatedUser);
      localStorage.setItem('@EDLimp:User', JSON.stringify(updatedUser));
    } catch (err) {
      console.error('Update crash:', err);
    }
  };

  const renewSubscription = () => {
    if (!user) return;
    // Em uma implementação real, isso seria disparado por um webhook do gateway de pagamento
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
