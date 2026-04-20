import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function TopNav({ onMenuClick }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const handleChangePin = () => {
    setShowDropdown(false);
    const newPin = window.prompt(`Alterando o PIN para o perfil ${user?.name}\n\nDigite seu novo PIN de 4 dígitos:`);
    if (newPin && newPin.length === 4) {
      const profiles = JSON.parse(localStorage.getItem('@EDLimp:Profiles')) || [];
      const idx = profiles.findIndex(p => p.pin === user.pin);
      if (idx !== -1) {
        profiles[idx].pin = newPin;
        localStorage.setItem('@EDLimp:Profiles', JSON.stringify(profiles));
        const updatedUser = { ...user, pin: newPin };
        localStorage.setItem('@EDLimp:User', JSON.stringify(updatedUser));
        alert('PIN alterado com sucesso!');
        // We log them out so they test the new pin
        logout();
      }
    } else if (newPin) {
      alert('Erro: O PIN deve ter exatamente 4 dígitos.');
    }
  };

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 bg-surface/60 backdrop-blur-xl border-b border-outline-variant/5 h-20 flex justify-between items-center px-4 sm:px-10">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center bg-surface-container-highest rounded-full px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all flex-1">
          <span className="material-symbols-outlined text-outline">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm font-label w-full" placeholder="Buscar..." type="text" />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 hover:text-primary transition-colors rounded-full active:scale-95 bg-surface-container"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button className="relative text-slate-500 hover:text-primary transition-colors rounded-full active:scale-95 duration-150 group">
          <span className="material-symbols-outlined text-[28px]">notifications</span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-white dark:border-slate-800"></span>
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-outline-variant/10 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-left p-4 z-50">
             <p className="text-sm font-bold text-primary mb-2">Notificações</p>
             <p className="text-xs text-on-surface-variant font-medium">Nenhum alerta pendente hoje!</p>
          </div>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <p className="text-sm font-bold text-primary -mb-1">{user?.name || 'Carregando...'}</p>
            <p className="text-[10px] font-label font-bold text-secondary uppercase tracking-widest">{user?.role || 'Visitante'}</p>
          </div>
          <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <div className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-colors ${showDropdown ? 'border-secondary' : 'border-primary-container'}`}>
              <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYRHPUxX_Bh_ZcFh8nYfZF2wMATqqONkBpA3xG_NTI5-n4J9YZWZ6fJJpQ_LnmT4qFfs_cNitRkMXZrOCLQCGyE-V7q-xY1vzvZleDjtK7tWSE8xu_o3pi2KymzcOwj5lVjz9C9qL07rS-WI6A-f8s50zShcihDjzKeV8UL_PQxwdxzzc9H8SrAL8zbvT4K81ZBa9HC6YbCZFoLAT2BCsr7W11naH5vm1r19pFEJ37tAq6Ymp79aqUtwfC6lvE-Yet_8vZW7H5d_AE" />
            </div>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-outline-variant/10 rounded-lg shadow-xl py-2 z-50">
                <Link to="/profile" onClick={() => setShowDropdown(false)} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-lg">person</span> Perfil
                </Link>
                <button onClick={handleChangePin} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">lock</span> Alterar PIN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
