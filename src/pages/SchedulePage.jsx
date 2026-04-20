import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function SchedulePage() {
  const [localidadeFilter, setLocalidadeFilter] = useState('');

  return (
    <>
      <div className="max-w-7xl mx-auto pb-24">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-primary tracking-tight font-headline">Agenda de Serviços</h2>
            <p className="text-on-surface-variant font-body mt-1">Visão semanal de tratamentos e impermeabilização.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-white items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm w-64 focus-within:ring-2 focus-within:ring-primary/20">
              <span className="material-symbols-outlined text-sm text-on-surface-variant">location_on</span>
              <input 
                value={localidadeFilter} 
                onChange={e => setLocalidadeFilter(e.target.value)} 
                placeholder="Filtrar por região..." 
                className="bg-transparent border-none focus:ring-0 text-sm font-label w-full outline-none" 
              />
            </div>
            <div className="flex bg-surface-container rounded-full p-1">
              <button className="px-6 py-2 rounded-full text-sm font-bold text-on-surface-variant hover:bg-white hover:shadow-sm transition-all">Dia</button>
              <button className="px-6 py-2 rounded-full text-sm font-bold bg-white text-primary shadow-sm">Semana</button>
              <button className="px-6 py-2 rounded-full text-sm font-bold text-on-surface-variant hover:bg-white hover:shadow-sm transition-all">Mês</button>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Calendar View (Main Column) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Weekly Timeline */}
            <div className="bg-surface-container-low rounded-lg p-6 shadow-[40px_0_60px_-15px_rgba(0,0,0,0.05)]">
              <div className="grid grid-cols-7 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-xs font-bold text-outline-variant uppercase technical-label mb-2">Seg</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold text-on-surface-variant">12</div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-outline-variant uppercase technical-label mb-2">Ter</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold bg-primary text-white shadow-lg shadow-primary/20">13</div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-outline-variant uppercase technical-label mb-2">Qua</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold text-on-surface-variant">14</div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-outline-variant uppercase technical-label mb-2">Qui</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold text-on-surface-variant">15</div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-outline-variant uppercase technical-label mb-2">Sex</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold text-on-surface-variant">16</div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-outline-variant uppercase technical-label mb-2">Sáb</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold text-on-surface-variant">17</div>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-outline-variant uppercase technical-label mb-2">Dom</p>
                  <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold text-outline-variant">18</div>
                </div>
              </div>
              
              {/* Time Slots */}
              <div className="space-y-4">
                {/* Slot 1 */}
                <div className="relative flex gap-6 items-start group">
                  <div className="w-16 pt-1 text-right">
                    <span className="font-label text-xs font-bold text-on-surface-variant">09:00</span>
                  </div>
                  <div className="flex-grow bg-white p-4 rounded-lg border-l-4 border-secondary flex justify-between items-center group-hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary-container/20 p-2 rounded-full text-secondary">
                        <span className="material-symbols-outlined">opacity</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">Impermeabilização Premium</h4>
                        <p className="text-xs text-on-surface-variant">Residência Granja Viana</p>
                      </div>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                        <img alt="Tech" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3lv9VuZcNGM6n1V9l1QBr2KW4jLcs3r_DBgUqWUEk5bDMeJgfcb8N062C2Wo9CLvB9CXrP-ufGzO5_Jkzan6QtuWff9gW7AcaW7eCs4Qn1-Z7tCi9fPyBkPhCrHZyOSSY5aYD_IK1zXEwmpUnPIrj2AB9x712C4AFaDPMMVsEQw8uAtco4lTJU2CwA_JjvDa0jNvtwc8eskm2N2pGw_JYdhcplh9gtAJhNiPa-JDrww-gtWFZjQPPLs7gQ6p0pyPMiqf2envWfNPD"/>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Slot 2 (ACTIVE) */}
                <div className="relative flex gap-6 items-start group">
                  <div className="w-16 pt-1 text-right">
                    <span className="font-label text-xs font-bold text-on-surface-variant">13:30</span>
                  </div>
                  <div className="flex-grow bg-primary p-5 rounded-lg border-l-4 border-secondary-fixed flex justify-between items-center shadow-xl shadow-primary/10">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary-fixed p-2 rounded-full text-on-secondary-fixed">
                        <span className="material-symbols-outlined">sanitizer</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Higienização Clínica</h4>
                        <p className="text-xs text-primary-fixed-dim">Juliana Paes • Apartamento 402</p>
                      </div>
                    </div>
                    <span className="bg-white/10 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">Em progresso</span>
                  </div>
                </div>
                {/* Slot 3 */}
                <div className="relative flex gap-6 items-start group">
                  <div className="w-16 pt-1 text-right">
                    <span className="font-label text-xs font-bold text-on-surface-variant">16:00</span>
                  </div>
                  <div className="flex-grow bg-white p-4 rounded-lg border-l-4 border-outline-variant flex justify-between items-center opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="bg-surface-container p-2 rounded-full text-outline">
                        <span className="material-symbols-outlined">cleaning_services</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">Limpeza Pós-Obra</h4>
                        <p className="text-xs text-on-surface-variant">Escritório Central ADM</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline">more_horiz</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Focus Card (Asymmetric Layout) */}
            <div className="bg-primary-container text-white rounded-lg p-8 relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 relative">
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-secondary-fixed shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img alt="Juliana Paes" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSfqROlpkD_0YMXQvCQMcVCR1gj1abS2Z0I3QLvbw6KXaXVbhsz0Rew10pRpaWfVHWyDuPKxbZoV2cApSPlr0DpxnTVQOtI9AayBspkbN9f4SyWdtu1nUm3_vkdOs3iFrt7SL_EpUwKSZFm1Wq86kGGNvFPzWL5QYh1UhhFEnHhdnMVsVp-beywkTYG4i2V-kchvvOCjJkz8LFE_IVAWwC3mFwJFMiK9Hj81dUKIWBdReqyXP1hVW6K7T7M3nNx9GIQ9KhbUj2VBoW"/>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-secondary-fixed text-on-secondary-fixed p-2 rounded-lg shadow-lg">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="text-2xl font-black font-headline tracking-tight">Juliana Paes</h3>
                    <span className="bg-secondary-fixed/20 text-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded border border-secondary-fixed/30 uppercase tracking-tighter">VIP Gold</span>
                  </div>
                  <p className="text-primary-fixed-dim font-body mb-6 max-w-md">Cliente recorrente desde 2022. Especial atenção com o revestimento em veludo italiano na sala principal.</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-fixed text-lg">location_on</span>
                      <span className="text-sm font-label font-medium">Itaim Bibi, SP</span>
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary-fixed text-lg">call</span>
                      <span className="text-sm font-label font-medium">(11) 98877-0099</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background graphic */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-fixed opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
            </div>
          </div>

          {/* Sidebar Details (Right Column) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Technical Specs Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">list_alt</span>
                  Itens do Serviço
                </h4>
                <button className="text-primary hover:bg-slate-50 p-1 rounded-full transition-colors">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Service Item 1 */}
                <div className="bg-surface-container-low p-4 rounded-lg group">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-label font-bold text-on-surface-variant uppercase">Tratamento</span>
                    <span className="text-xs font-label font-bold text-secondary">Aprovado</span>
                  </div>
                  <p className="font-bold text-on-surface">Sofá Retrátil (3m)</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-1.5 flex-grow bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-full"></div>
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant">100%</span>
                  </div>
                </div>
                {/* Service Item 2 */}
                <div className="bg-surface-container-low p-4 rounded-lg group">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-label font-bold text-on-surface-variant uppercase">Impermeabilização</span>
                    <span className="text-xs font-label font-bold text-primary">Aguardando</span>
                  </div>
                  <p className="font-bold text-on-surface">Tapete Persa (4x3m)</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-1.5 flex-grow bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/3"></div>
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant">35%</span>
                  </div>
                </div>
                {/* Service Item 3 */}
                <div className="bg-surface-container-low p-4 rounded-lg group">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-label font-bold text-on-surface-variant uppercase">Proteção Bio</span>
                    <span className="text-xs font-label font-bold text-secondary">Aprovado</span>
                  </div>
                  <p className="font-bold text-on-surface">Cadeiras Jantar (x8)</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="h-1.5 flex-grow bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary w-0"></div>
                    </div>
                    <span className="text-[10px] font-black text-on-surface-variant">0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment & Supplies */}
            <div className="bg-surface-container-highest rounded-lg p-6">
              <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">inventory</span>
                Insumos Alocados
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1.5 rounded-full text-[10px] font-bold text-primary flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-xs">science</span> Shield Pro V4
                </span>
                <span className="bg-white px-3 py-1.5 rounded-full text-[10px] font-bold text-primary flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-xs">brush</span> Kit Detalhamento
                </span>
                <span className="bg-white px-3 py-1.5 rounded-full text-[10px] font-bold text-primary flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-xs">air</span> Extratora HighPower
                </span>
              </div>
            </div>

            {/* Map/Location Shortcut */}
            <div className="rounded-lg overflow-hidden h-40 relative group cursor-pointer shadow-lg shadow-primary/5">
              <img alt="Map Location" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOvRmn0aJaEzEkwwDpRBxYTYIXbkzSbwqZn6lpUz7ihNE0HgF9cS-t8mPbIRSH40U9Ef2nMrJIrR3FhsvWlOUUyk1gYOdjeQv62dzcJ13tE2As5ShX10qOlMC5M973KZWEZuXoDRDtRsMlVzQfNuJT9JdxGIRrSjIfdrGdqwnw-JosJwMTMWb0aYRN1BbSEYUIwoVaJP6-guHLHXFkfoi5I8q_Zrelpnx9g_s_sjaeKi-VDQuh74VoSsv29E9TAf8R3OXAPkvdmQh4"/>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-4">
                <p className="text-white font-bold text-sm">Abrir no GPS</p>
                <p className="text-primary-fixed-dim text-[10px] font-label">Rua Leopoldo Couto de Magalhães Jr, 402</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual FAB (Only on Agenda) */}
      <Link to="/os" className="fixed bottom-8 right-8 bg-secondary-container text-on-secondary-container h-16 w-16 rounded-full flex items-center justify-center shadow-2xl shadow-secondary/40 hover:scale-110 active:scale-90 transition-all z-50">
        <span className="material-symbols-outlined text-3xl">add_task</span>
      </Link>
    </>
  );
}
