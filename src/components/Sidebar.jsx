import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path) => location.pathname === path;

  const permissions = user?.permissions || [];

  return (
    <aside className={`flex flex-col fixed left-0 top-0 h-full py-8 px-4 bg-surface rounded-r-[2rem] w-64 border-r border-outline-variant/10 z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="mb-8 px-4 flex justify-between items-center">
        <div>
          <img src={document.documentElement.classList.contains('dark') ? '/logo-green.svg' : '/logo-color.svg'} alt="ED Limp Logo" className="w-32 mb-2" />
          <p className="text-[10px] text-on-surface-variant font-label tracking-widest uppercase">Sistema Integrado</p>
        </div>
        <button onClick={onClose} className="lg:hidden text-on-surface-variant">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
        {permissions.includes('quote') && (
          <>
            <Link to="/quote" className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all hover:translate-x-1 duration-200 mb-2 bg-primary text-white shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/40`}>
               <span className="material-symbols-outlined w-6 text-center text-secondary-container">assignment_add</span>
               <span className="text-sm font-label tracking-wide">Criar Orçamento</span>
            </Link>
            <Link to="/os" onClick={onClose} className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all hover:translate-x-1 duration-200 mb-4 bg-secondary text-[#082100] shadow-md hover:shadow-lg focus:ring-2 focus:ring-secondary/40`}>
               <span className="material-symbols-outlined w-6 text-center text-[#082100]/60">handyman</span>
               <span className="text-sm font-label tracking-wide">Ordem de Serviço (O.S)</span>
            </Link>
          </>
        )}
        
        {permissions.includes('dashboard') && (
          <Link to="/" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold transition-all hover:translate-x-1 duration-200 ${isActive('/') ? 'text-secondary border-r-4 border-secondary bg-slate-50' : 'text-slate-500 hover:text-primary hover:bg-slate-50'}`}>
            <span className="material-symbols-outlined w-6 text-center">dashboard</span>
            <span className="text-sm font-label">Dashboard</span>
          </Link>
        )}
        
        {permissions.includes('clients') && (
          <Link to="/clients" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all hover:translate-x-1 duration-200 ${isActive('/clients') ? 'text-secondary border-r-4 border-secondary bg-slate-50 font-bold' : 'text-slate-500 hover:text-primary hover:bg-slate-50 font-medium'}`}>
            <span className="material-symbols-outlined w-6 text-center">groups</span>
            <span className="text-sm font-label">Gestão de Clientes</span>
          </Link>
        )}

        {permissions.includes('schedule') && (
          <Link to="/schedule" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all hover:translate-x-1 duration-200 ${isActive('/schedule') ? 'text-secondary border-r-4 border-secondary bg-slate-50 font-bold' : 'text-slate-500 hover:text-primary hover:bg-slate-50 font-medium'}`}>
            <span className="material-symbols-outlined w-6 text-center">calendar_month</span>
            <span className="text-sm font-label">Agenda</span>
          </Link>
        )}

        {permissions.includes('notes') && (
          <Link to="/notes" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all hover:translate-x-1 duration-200 ${isActive('/notes') ? 'text-secondary border-r-4 border-secondary bg-slate-50 font-bold' : 'text-slate-500 hover:text-primary hover:bg-slate-50 font-medium'}`}>
            <span className="material-symbols-outlined w-6 text-center">sticky_note_2</span>
            <span className="text-sm font-label">Notas Rápidas</span>
          </Link>
        )}

        {permissions.includes('inventory') && (
          <Link to="/inventory" className={`flex items-center gap-3 px-4 py-2.5 mt-4 rounded-lg transition-all hover:translate-x-1 duration-200 ${isActive('/inventory') ? 'text-secondary border-r-4 border-secondary bg-slate-50 font-bold' : 'text-slate-500 hover:text-primary hover:bg-slate-50 font-medium'}`}>
            <span className="material-symbols-outlined w-6 text-center">inventory_2</span>
            <span className="text-sm font-label">Estoque</span>
          </Link>
        )}
        
        {permissions.includes('finance') && (
          <Link to="/finance" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all hover:translate-x-1 duration-200 ${isActive('/finance') ? 'text-secondary border-r-4 border-secondary bg-slate-50 font-bold' : 'text-slate-500 hover:text-primary hover:bg-slate-50 font-medium'}`}>
            <span className="material-symbols-outlined w-6 text-center">payments</span>
            <span className="text-sm font-label">Financeiro</span>
          </Link>
        )}
        
        {permissions.includes('marketing') && (
          <Link to="/marketing" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all hover:translate-x-1 duration-200 ${isActive('/marketing') ? 'text-secondary border-r-4 border-secondary bg-surface-container font-bold' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container font-medium'}`}>
            <span className="material-symbols-outlined w-6 text-center">campaign</span>
            <span className="text-sm font-label">Marketing</span>
          </Link>
        )}
      </nav>

      <div className="mt-4 space-y-1 border-t border-outline-variant/10 pt-4">
        {permissions.includes('settings') && (
          <Link to="/settings" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive('/settings') ? 'text-primary font-bold bg-surface-container' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container font-medium'}`}>
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
