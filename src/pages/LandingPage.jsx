import React from 'react';
import { Link } from 'react-router-dom';
import ServicesSection from '../components/ServicesSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0e1340] text-white flex flex-col justify-between selection:bg-[#a7fc5d] selection:text-black">
      {/* Header / Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#a7fc5d] flex items-center justify-center text-black font-extrabold text-xl shadow-lg shadow-[#a7fc5d]/20">
            ED
          </div>
          <div>
            <h1 className="font-headline font-extrabold text-lg tracking-tight text-white leading-none">ED Limp</h1>
            <p className="text-[11px] text-[#a7fc5d] font-semibold uppercase tracking-wider">Higienização & Blindagem</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/5561995659224"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-sm font-semibold transition-all"
          >
            <span>(61) 99565-9224</span>
          </a>
          <Link
            to="/painel"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#a7fc5d] text-black hover:bg-[#8ee84a] text-sm font-bold shadow-md shadow-[#a7fc5d]/20 transition-all"
          >
            <span className="material-symbols-outlined text-base">lock</span>
            <span>Acessar Painel</span>
          </Link>
        </div>
      </nav>

      {/* Main Content: Services */}
      <main className="flex-1">
        <ServicesSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-6 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ED Limp · Higienização e Impermeabilização de Estofados DF e Entorno.</p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/edlimp.oficial" target="_blank" rel="noopener noreferrer" className="hover:text-[#a7fc5d] transition-colors">
              @edlimp.oficial
            </a>
            <span>•</span>
            <Link to="/painel" className="hover:text-white transition-colors">
              🔒 Área Restrita
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
