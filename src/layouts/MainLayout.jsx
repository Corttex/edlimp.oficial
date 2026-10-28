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
        {/* Usando o máximo do espaço disponível: pt-20 px-3 sm:px-6 lg:px-8 pb-8 sem max-w artificial */}
        <div className="pt-20 px-3 sm:px-6 lg:px-8 pb-8 w-full min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
