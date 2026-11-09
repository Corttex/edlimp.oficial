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
        logout();
      }
    } else if (newPin) {
      alert('Erro: O PIN deve ter exatamente 4 dígitos.');
    }
  };

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 bg-surface/95 dark:bg-surface-container-lowest/95 text-on-surface backdrop-blur-xl border-b border-outline-variant/15 shadow-sm h-20 flex justify-between items-center px-4 sm:px-8 transition-colors duration-300">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-surface-container rounded-xl text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        {/* Logo visível em telas menores na top bar */}
        <Link to="/portal" className="lg:hidden flex items-center pr-2">
          <img src={isDark ? '/logo-green.svg' : '/logo-color.svg'} alt="ED Limp Logo" className="h-10 w-auto filter drop-shadow-md" />
        </Link>

        <div className="flex items-center bg-surface-container-low dark:bg-surface-container-high/60 border border-outline-variant/20 rounded-full px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-primary/30 transition-all flex-1 shadow-sm">
          <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-xs font-medium w-full text-on-surface placeholder:text-on-surface-variant/50 outline-none" placeholder="Buscar no sistema..." type="text" />
        </div>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-5">
        <button 
          onClick={toggleTheme}
          className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors rounded-full active:scale-95 bg-surface-container-low border border-outline-variant/15 shadow-sm"
          title={isDark ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isDark ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <button className="relative p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors rounded-full active:scale-95 duration-150 group bg-surface-container-low border border-outline-variant/15 shadow-sm">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface"></span>
          <div className="absolute top-full right-0 mt-3 w-64 bg-surface dark:bg-surface-container border border-outline-variant/20 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all text-left p-4 z-50">
             <p className="text-xs font-bold text-primary mb-1 flex items-center gap-1.5">
               <span className="material-symbols-outlined text-base">notifications_active</span>
               Notificações
             </p>
             <p className="text-xs text-on-surface-variant font-medium">Nenhum alerta pendente hoje!</p>
          </div>
        </button>
        
        <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/15">
          <div className="text-right hidden sm:block cursor-pointer select-none" onClick={() => setShowDropdown(!showDropdown)}>
            <p className="text-xs font-bold text-on-surface hover:text-primary transition-colors leading-tight">{user?.name || 'Administrador'}</p>
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{user?.role || 'DNEI'}</p>
          </div>
          <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all shadow-sm ${showDropdown ? 'border-primary ring-2 ring-primary/30' : 'border-outline-variant/30 hover:border-primary'}`}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface dark:bg-surface-container border border-outline-variant/20 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-outline-variant/15 mb-1">
                  <p className="text-xs font-bold text-on-surface">{user?.name}</p>
                  <p className="text-[10px] text-on-surface-variant font-mono uppercase">Perfil: {user?.role}</p>
                </div>
                <button 
                  onClick={handleChangePin}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-high rounded-xl flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">lock_reset</span>
                  Alterar meu PIN
                </button>
                <button 
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-error hover:bg-error/10 rounded-xl flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Sair do Sistema
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
