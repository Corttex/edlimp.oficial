import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';

export default function MainLayout({ toggleTheme, theme }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex text-on-surface relative">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} theme={theme} />
      
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-64 w-full">
        <TopNav onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} toggleTheme={toggleTheme} theme={theme} />
        {/* Espaçamento superior generoso (pt-24 sm:pt-28) para garantir respiro visual entre a barra superior e o conteúdo */}
        <div className="pt-24 sm:pt-28 px-4 sm:px-8 lg:px-10 pb-12 w-full min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
