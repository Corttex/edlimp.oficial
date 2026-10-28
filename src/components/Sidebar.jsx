import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar({ isOpen, onClose, theme }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isDark = theme === 'dark';
  const isActive = (path) => location.pathname === path;

  const permissions = user?.permissions || [];

  return (
    <aside className={`flex flex-col fixed left-0 top-0 h-full py-6 px-4 bg-surface dark:bg-surface-container-lowest w-64 border-r border-outline-variant/10 z-50 shadow-[10px_0_40px_rgba(0,0,0,0.05)] transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="mb-8 px-2 flex justify-between items-center">
        <div className="w-full">
          <Link to="/portal" onClick={onClose} className="block transition-transform hover:scale-105 duration-200">
            <img src={isDark ? '/logo-green.svg' : '/logo-color.svg'} alt="ED Limp Logo" className="w-52 max-w-[210px] mb-2 filter drop-shadow-md" />
          </Link>
          <p className="text-[11px] font-extrabold text-primary tracking-[0.25em] uppercase">Sistema Integrado</p>
        </div>
        <button onClick={onClose} className="lg:hidden text-on-surface-variant p-2">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        {permissions.includes('quote') && (
          <div className="space-y-2 mb-6">
            <Link to="/portal/quote" className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl font-black transition-all hover:scale-[1.02] active:scale-95 duration-200 bg-primary text-slate-950 shadow-lg shadow-primary/20 group">
               <span className="material-symbols-outlined w-5 text-[20px] text-center text-slate-950 group-hover:rotate-12 transition-transform">assignment_add</span>
               <span className="text-[10px] uppercase tracking-widest font-headline text-slate-950 font-black">Criar Orçamento</span>
            </Link>
            <Link to="/portal/os" onClick={onClose} className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl font-black transition-all hover:bg-surface-container-highest active:scale-95 duration-200 border border-outline-variant/20 text-on-surface bg-surface-container shadow-sm group">
               <span className="material-symbols-outlined w-5 text-[20px] text-center text-primary group-hover:scale-110 transition-transform">handyman</span>
               <span className="text-[10px] uppercase tracking-widest font-headline">Ordem de Serviço</span>
            </Link>
          </div>
        )}
        
        {permissions.includes('dashboard') && (
          <Link to="/portal" className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${isActive('/portal') ? 'bg-primary/10 text-primary font-black border border-primary/20 shadow-subtle' : 'text-on-surface-variant/70 hover:text-primary hover:bg-surface-container font-black'}`}>
            <span className="material-symbols-outlined w-5 text-[20px] text-center">dashboard</span>
            <span className="text-[10px] uppercase tracking-widest">Dashboard</span>
          </Link>
        )}
        
        {permissions.includes('clients') && (
          <Link to="/portal/clients" className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${isActive('/portal/clients') ? 'bg-primary/10 text-primary font-black border border-primary/20 shadow-subtle' : 'text-on-surface-variant/70 hover:text-primary hover:bg-surface-container font-black'}`}>
            <span className="material-symbols-outlined w-5 text-[20px] text-center">groups</span>
            <span className="text-[10px] uppercase tracking-widest">Gestão de Clientes</span>
          </Link>
        )}

        {permissions.includes('schedule') && (
          <Link to="/portal/schedule" className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${isActive('/portal/schedule') ? 'bg-primary/10 text-primary font-black border border-primary/20 shadow-subtle' : 'text-on-surface-variant/70 hover:text-primary hover:bg-surface-container font-black'}`}>
            <span className="material-symbols-outlined w-5 text-[20px] text-center">calendar_month</span>
            <span className="text-[10px] uppercase tracking-widest">Agenda</span>
          </Link>
        )}

        {permissions.includes('notes') && (
          <Link to="/portal/notes" className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${isActive('/portal/notes') ? 'bg-primary/10 text-primary font-black border border-primary/20 shadow-subtle' : 'text-on-surface-variant/70 hover:text-primary hover:bg-surface-container font-black'}`}>
            <span className="material-symbols-outlined w-5 text-[20px] text-center">sticky_note_2</span>
            <span className="text-[10px] uppercase tracking-widest">Notas Rápidas</span>
          </Link>
        )}

        {permissions.includes('inventory') && (
          <Link to="/portal/inventory" className={`flex items-center gap-3 px-4 py-2 mt-4 rounded-xl transition-all duration-200 ${isActive('/portal/inventory') ? 'bg-primary/10 text-primary font-black border border-primary/20 shadow-subtle' : 'text-on-surface-variant/70 hover:text-primary hover:bg-surface-container font-black'}`}>
            <span className="material-symbols-outlined w-5 text-[20px] text-center">inventory_2</span>
            <span className="text-[10px] uppercase tracking-widest">Estoque</span>
          </Link>
        )}
        
        {permissions.includes('finance') && (
          <Link to="/portal/finance" className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${isActive('/portal/finance') ? 'bg-primary/10 text-primary font-black border border-primary/20 shadow-subtle' : 'text-on-surface-variant/70 hover:text-primary hover:bg-surface-container font-black'}`}>
            <span className="material-symbols-outlined w-5 text-[20px] text-center">payments</span>
            <span className="text-[10px] uppercase tracking-widest">Financeiro</span>
          </Link>
        )}
        
        <Link to="/portal/marketing" className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${isActive('/portal/marketing') ? 'bg-primary/10 text-primary font-black border border-primary/20 shadow-subtle' : 'text-on-surface-variant/70 hover:text-primary hover:bg-surface-container font-black'}`}>
          <span className="material-symbols-outlined w-5 text-[20px] text-center">campaign</span>
          <span className="text-[10px] uppercase tracking-widest">Marketing</span>
        </Link>
      </nav>

      <div className="mt-4 space-y-1 border-t border-outline-variant/10 pt-4">
        {permissions.includes('settings') && (
          <Link to="/portal/settings" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/portal/settings') ? 'text-primary font-bold bg-surface-container' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container font-medium'}`}>
            <span className="material-symbols-outlined w-6 text-center">settings</span>
            <span className="text-sm font-label">Configurações/Equipe</span>
          </Link>
        )}
        <a 
          href="https://wa.me/5561994344843" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:text-primary transition-all rounded-lg group"
        >
          <span className="material-symbols-outlined w-6 text-center group-hover:scale-110 transition-transform">support_agent</span>
          <div>
            <p className="text-xs font-bold leading-tight">Suporte Técnico</p>
            <p className="text-[9px] font-medium opacity-60">Falar com Especialista</p>
          </div>
        </a>

        <button onClick={logout} className="flex w-full items-center gap-3 px-4 py-2.5 text-on-surface-variant hover:text-error transition-all rounded-lg">
          <span className="material-symbols-outlined w-6 text-center">logout</span>
          <span className="text-sm font-label">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
}
