import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function TopNav({ onMenuClick, toggleTheme, theme }) {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const isDark = theme === 'dark';

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
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 bg-slate-950/95 dark:bg-slate-900/95 text-white backdrop-blur-xl border-b border-slate-800 shadow-xl h-20 flex justify-between items-center px-4 sm:px-10 transition-colors duration-300">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Logo visível em telas menores na top bar */}
        <Link to="/portal" className="lg:hidden flex items-center pr-2">
          <img src="/logo-green.svg" alt="ED Limp Logo" className="h-12 w-auto filter drop-shadow-md" />
        </Link>

        <div className="flex items-center bg-slate-900/80 border border-slate-750/50 rounded-full px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/50 transition-all flex-1">
          <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm font-label w-full text-slate-100 placeholder:text-slate-400" placeholder="Buscar no sistema..." type="text" />
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors rounded-full active:scale-95 bg-slate-900 border border-slate-800"
          title="Alternar Tema"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button className="relative p-2 text-slate-300 hover:text-primary hover:bg-slate-800 transition-colors rounded-full active:scale-95 duration-150 group bg-slate-900 border border-slate-800">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
          <div className="absolute top-full right-0 mt-3 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all text-left p-4 z-50">
             <p className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
               <span className="material-symbols-outlined text-base">notifications_active</span>
               Notificações
             </p>
             <p className="text-xs text-slate-400 font-medium">Nenhum alerta pendente hoje!</p>
          </div>
        </button>
        
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="text-right hidden sm:block cursor-pointer select-none" onClick={() => setShowDropdown(!showDropdown)}>
            <p className="text-sm font-bold text-slate-100 hover:text-emerald-400 transition-colors -mb-0.5">{user?.name || 'Carregando...'}</p>
            <p className="text-[10px] font-label font-bold text-emerald-400 uppercase tracking-widest">{user?.role || 'Visitante'}</p>
          </div>
          <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <div className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all ${showDropdown ? 'border-primary ring-2 ring-primary/30' : 'border-slate-700 hover:border-slate-500'}`}>
              <img alt="User profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYRHPUxX_Bh_ZcFh8nYfZF2wMATqqONkBpA3xG_NTI5-n4J9YZWZ6fJJpQ_LnmT4qFfs_cNitRkMXZrOCLQCGyE-V7q-xY1vzvZleDjtK7tWSE8xu_o3pi2KymzcOwj5lVjz9C9qL07rS-WI6A-f8s50zShcihDjzKeV8UL_PQxwdxzzc9H8SrAL8zbvT4K81ZBa9HC6YbCZFoLAT2BCsr7W11naH5vm1r19pFEJ37tAq6Ymp79aqUtwfC6lvE-Yet_8vZW7H5d_AE" />
            </div>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-3 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in-scale">
                <Link to="/portal/profile" onClick={() => setShowDropdown(false)} className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 hover:text-primary flex items-center gap-2.5 transition-colors">
                  <span className="material-symbols-outlined text-base">person</span>
                  Meu Perfil
                </Link>
                <button onClick={handleChangePin} className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 hover:text-primary flex items-center gap-2.5 transition-colors">
                  <span className="material-symbols-outlined text-base">lock</span> Alterar PIN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
