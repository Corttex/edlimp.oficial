import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState('Semana'); // Dia, Semana, Mês
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Terça (13)
  const [localidadeFilter, setLocalidadeFilter] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState(2); // ID 2: Juliana Paes (Ativo)

  // Dias da Semana simulados
  const weekDays = [
    { label: 'Seg', date: '12', hasSlots: true },
    { label: 'Ter', date: '13', hasSlots: true, isToday: true },
    { label: 'Qua', date: '14', hasSlots: true },
    { label: 'Qui', date: '15', hasSlots: true },
    { label: 'Sex', date: '16', hasSlots: true },
    { label: 'Sáb', date: '17', hasSlots: true },
    { label: 'Dom', date: '18', hasSlots: false },
  ];

  // Slots de Atendimento
  const timeSlots = [
    {
      id: 1,
      time: '09:00',
      title: 'Impermeabilização Premium',
      client: 'Residência Granja Viana',
      clientName: 'Roberto Alves',
      clientPhone: '(61) 98455-1122',
      address: 'Condomínio Solar da Serra, Lago Sul, DF',
      status: 'Concluído',
      statusBadgeClass: 'bg-secondary-container/30 text-secondary border border-secondary/20',
      borderLeftClass: 'border-secondary',
      icon: 'opacity',
      iconBg: 'bg-secondary-container/20 text-secondary',
      techAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80',
      techName: 'Carlos M.',
      scopeItems: [
        { name: 'Sofá Retrátil 3 Lugares', status: 'Concluído', progress: 100, barColor: 'bg-secondary' },
        { name: 'Poltrona Eames Couro', status: 'Concluído', progress: 100, barColor: 'bg-secondary' }
      ],
      supplies: ['Shield Pro V4', 'Extratora HighPower', 'Pulverizador Eletrostático']
    },
    {
      id: 2,
      time: '13:30',
      title: 'Higienização Clínica Profunda',
      client: 'Juliana Paes • Apartamento 402',
      clientName: 'Juliana Paes',
      clientTier: 'VIP Gold',
      clientNote: 'Cliente recorrente desde 2022. Especial atenção com o revestimento em veludo italiano na sala principal e tecido sensível.',
      clientPhone: '(61) 99565-9224',
      address: 'SQS 308 Bloco F, Asa Sul, Brasília - DF',
      status: 'Em progresso',
      statusBadgeClass: 'bg-white/20 text-white font-black',
      borderLeftClass: 'border-secondary-container',
      isActiveTheme: true,
      icon: 'sanitizer',
      iconBg: 'bg-secondary-container text-on-secondary-container',
      techAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
      techName: 'Fellipe A.',
      scopeItems: [
        { name: 'Sofá Retrátil (3.20m)', status: 'Higienizado 100%', progress: 100, barColor: 'bg-secondary' },
        { name: 'Tapete Persa (4x3m)', status: 'Extração 35%', progress: 35, barColor: 'bg-primary' },
        { name: 'Cadeiras de Jantar (x8)', status: 'Aguardando', progress: 0, barColor: 'bg-secondary/40' }
      ],
      supplies: ['Shield Pro V4', 'Detergente Enzimático Clin', 'Kit Detalhamento Pincéis', 'Extratora HighPower']
    },
    {
      id: 3,
      time: '16:00',
      title: 'Limpeza e Sanitização Pós-Reforma',
      client: 'Escritório Central ADM • Sala 804',
      clientName: 'Dr. Marcos Albuquerque',
      clientPhone: '(61) 98112-9900',
      address: 'Setor Comercial Norte, Quadra 2, Brasília - DF',
      status: 'Agendado',
      statusBadgeClass: 'bg-surface-container-high text-on-surface-variant/80 border border-outline-variant/20',
      borderLeftClass: 'border-outline-variant/40',
      icon: 'cleaning_services',
      iconBg: 'bg-surface-container text-on-surface-variant',
      techAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80',
      techName: 'Marcos V.',
      scopeItems: [
        { name: '60 Cadeiras de Escritório Mesh', status: 'Pendente', progress: 0, barColor: 'bg-primary/40' },
        { name: 'Carpete Modular 120m²', status: 'Pendente', progress: 0, barColor: 'bg-primary/40' }
      ],
      supplies: ['Extratora 80L', 'Desinfetante Hospitalar Quat', 'Secador Turbo']
    }
  ];

  const currentSlot = timeSlots.find(s => s.id === selectedSlotId) || timeSlots[1];

  const filteredSlots = timeSlots.filter(s => {
    if (!localidadeFilter) return true;
    return s.address.toLowerCase().includes(localidadeFilter.toLowerCase()) ||
           s.client.toLowerCase().includes(localidadeFilter.toLowerCase());
  });

  return (
    <div className="w-full pb-16 font-body animate-fadeIn">
      
      {/* Header Section */}
      <header className="flex justify-between items-end mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-widest font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">calendar_month</span> Operações de Campo
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Brasília & Entorno</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight font-headline">
            Agenda de Serviços
          </h2>
          <p className="text-on-surface-variant text-sm font-medium mt-1">
            Visão semanal de tratamentos clínicos, alocação de técnicos e impermeabilização.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container-low items-center gap-2 px-4 py-2.5 rounded-full border border-outline-variant/10 shadow-sm w-64 focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined text-sm text-on-surface-variant/50">location_on</span>
            <input 
              value={localidadeFilter} 
              onChange={e => setLocalidadeFilter(e.target.value)} 
              placeholder="Filtrar por região (ex: Asa Sul)..." 
              className="bg-transparent border-none focus:ring-0 text-xs font-semibold w-full outline-none text-on-surface" 
            />
          </div>

          <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant/10 shadow-subtle">
            {['Dia', 'Semana', 'Mês'].map(mode => (
              <button 
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-5 py-2 rounded-full text-xs font-black transition-all ${viewMode === mode ? 'bg-primary text-slate-950 shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Main Column (Calendar Timeline) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Seletor Semanal de Dias */}
          <div className="bg-surface-container-low rounded-2xl p-6 shadow-subtle border border-outline-variant/10">
            <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-6">
              {weekDays.map((d, idx) => {
                const isSelected = selectedDayIndex === idx;
                return (
                  <button 
                    key={idx} 
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`text-center py-2 px-1 rounded-2xl transition-all ${isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-surface-container'}`}
                  >
                    <p className={`text-[10px] font-black uppercase mb-1 ${isSelected ? 'text-primary' : 'text-on-surface-variant/60'}`}>
                      {d.label}
                    </p>
                    <div className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm font-black transition-all ${
                      isSelected 
                        ? 'bg-primary text-slate-950 shadow-lg shadow-primary/25 scale-105' 
                        : 'text-on-surface hover:text-primary'
                    }`}>
                      {d.date}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Timeline de Horários e Cards de Atendimento */}
            <div className="space-y-4">
              {filteredSlots.map(slot => {
                const isSelected = slot.id === selectedSlotId;
                
                if (slot.isActiveTheme) {
                  // Card Ativo / Em Progresso (Design Destaque Verde Logo com texto preto profundo)
                  return (
                    <div 
                      key={slot.id} 
                      onClick={() => setSelectedSlotId(slot.id)}
                      className="relative flex gap-4 sm:gap-6 items-start group cursor-pointer"
                    >
                      <div className="w-14 sm:w-16 pt-3 text-right">
                        <span className="text-xs font-mono font-black text-on-surface-variant">{slot.time}</span>
                      </div>

                      <div className={`flex-grow bg-primary text-slate-950 p-5 rounded-2xl border-l-4 border-slate-900 flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-xl shadow-primary/20 transition-all ${isSelected ? 'ring-2 ring-slate-900 ring-offset-2' : 'hover:scale-[1.01]'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-2xl">{slot.icon}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-slate-900/80 font-black">Atendimento Atual</span>
                            <h4 className="font-extrabold text-base font-headline text-slate-950 leading-tight">{slot.title}</h4>
                            <p className="text-xs text-slate-900/80 font-bold mt-0.5">{slot.client}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className="bg-slate-950 text-white text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-widest font-black shadow-sm">
                            {slot.status}
                          </span>
                          <div className="w-9 h-9 rounded-full border-2 border-slate-900 overflow-hidden shrink-0 shadow-md">
                            <img src={slot.techAvatar} alt={slot.techName} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Cards Normais (Concluído ou Agendado)
                return (
                  <div 
                    key={slot.id} 
                    onClick={() => setSelectedSlotId(slot.id)}
                    className="relative flex gap-4 sm:gap-6 items-start group cursor-pointer"
                  >
                    <div className="w-14 sm:w-16 pt-3 text-right">
                      <span className="text-xs font-mono font-bold text-on-surface-variant/80">{slot.time}</span>
                    </div>

                    <div className={`flex-grow bg-white dark:bg-surface-container p-5 rounded-2xl border-l-4 ${slot.borderLeftClass} flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm border border-outline-variant/10 transition-all ${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${slot.iconBg}`}>
                          <span className="material-symbols-outlined text-xl">{slot.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-primary dark:text-white">{slot.title}</h4>
                          <p className="text-xs text-on-surface-variant mt-0.5">{slot.client}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className={`text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-bold ${slot.statusBadgeClass}`}>
                          {slot.status}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-outline-variant/30 overflow-hidden shrink-0">
                          <img src={slot.techAvatar} alt={slot.techName} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card Detalhado do Cliente Selecionado (Asymmetric Focus Card) */}
          <div className="bg-primary text-slate-950 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div className="relative z-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
              
              {/* Foto do Cliente */}
              <div className="flex-shrink-0 relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-slate-900 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    alt={currentSlot.clientName} 
                    className="w-full h-full object-cover" 
                    src={currentSlot.techAvatar} 
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-slate-950 text-white p-2 rounded-xl shadow-lg">
                  <span className="material-symbols-outlined text-sm font-bold">verified</span>
                </div>
              </div>

              {/* Informações Clínicas do Cliente */}
              <div className="flex-grow text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h3 className="text-2xl font-black font-headline tracking-tight text-slate-950">{currentSlot.clientName}</h3>
                  <span className="bg-slate-950 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                    {currentSlot.clientTier || 'Cliente VIP'}
                  </span>
                </div>
                <p className="text-slate-900/80 text-xs sm:text-sm font-bold mb-5 max-w-lg leading-relaxed">
                  {currentSlot.clientNote || 'Atendimento residencial de alto padrão no Distrito Federal.'}
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="bg-slate-950/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black text-slate-950">
                    <span className="material-symbols-outlined text-slate-950 text-base">location_on</span>
                    <span>{currentSlot.address}</span>
                  </div>
                  <a 
                    href={`https://wa.me/55${currentSlot.clientPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-slate-950 text-white hover:brightness-125 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>{currentSlot.clientPhone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Efeitos de Fundo Orgânico */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container opacity-10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>
          </div>

        </div>

        {/* Sidebar Details (Right Column) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Card de Escopo Técnico */}
          <div className="bg-surface-container-low rounded-2xl p-6 shadow-subtle border border-outline-variant/10">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-bold font-headline text-primary dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">list_alt</span>
                Escopo Técnico da OS
              </h4>
              <span className="text-[10px] font-mono font-bold bg-surface-container px-2 py-1 rounded-lg">
                OS #{currentSlot.id}409
              </span>
            </div>

            <div className="space-y-3">
              {currentSlot.scopeItems.map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-surface-container p-4 rounded-2xl border border-outline-variant/10 shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-on-surface">{item.name}</span>
                    <span className="text-[10px] font-black uppercase text-secondary">{item.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="h-1.5 flex-grow bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.barColor} rounded-full transition-all duration-500`} style={{ width: `${item.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] font-mono font-black text-on-surface-variant">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insumos & Equipamentos Alocados */}
          <div className="bg-surface-container-low rounded-2xl p-6 shadow-subtle border border-outline-variant/10">
            <h4 className="font-bold font-headline text-primary dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">inventory</span>
              Insumos & Equipamentos na Van
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentSlot.supplies.map((sup, idx) => (
                <span key={idx} className="bg-white dark:bg-surface-container px-3 py-1.5 rounded-full text-xs font-bold text-on-surface flex items-center gap-1.5 shadow-sm border border-outline-variant/10">
                  <span className="material-symbols-outlined text-xs text-primary">science</span>
                  {sup}
                </span>
              ))}
            </div>
          </div>

          {/* Atalho de GPS / Rota */}
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentSlot.address)}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl overflow-hidden h-44 relative group cursor-pointer shadow-lg shadow-primary/5 border border-outline-variant/10"
          >
            <img 
              alt="Localização no Mapa" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-5 text-white">
              <div className="flex items-center gap-1.5 text-secondary-container text-xs font-bold mb-1">
                <span className="material-symbols-outlined text-sm">navigation</span>
                <span>Navegar até o Cliente (Google Maps)</span>
              </div>
              <p className="text-xs font-medium text-slate-200 line-clamp-1">{currentSlot.address}</p>
            </div>
          </a>

        </div>

      </div>

      {/* Botão Flutuante (FAB) para Nova OS */}
      <Link 
        to="/portal/os" 
        className="fixed bottom-8 right-8 bg-primary text-white h-16 w-16 rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
        <div className="absolute right-20 bg-primary text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Agendar Novo Serviço (OS)
        </div>
      </Link>
    </div>
  );
}
