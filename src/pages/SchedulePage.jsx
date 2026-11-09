import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredSchedule, saveStoredScheduleSlot, deleteStoredScheduleSlot } from '../lib/storage';

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState('Semana'); // Dia, Semana, Mês
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [localidadeFilter, setLocalidadeFilter] = useState('');
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [slots, setSlots] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const stored = getStoredSchedule();
    setSlots(stored);
    if (stored.length > 0) {
      setSelectedSlotId(stored[0].id);
    }
  }, []);

  // Novo Slot de Agendamento Modal
  const [newSlot, setNewSlot] = useState({
    time: '09:00',
    title: 'Higienização de Sofá',
    clientName: '',
    clientPhone: '',
    address: '',
    status: 'Agendado',
    techName: 'Técnico ED Limp',
    notes: '',
  });

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.clientName || !newSlot.time) return;
    const slot = {
      id: Date.now(),
      time: newSlot.time,
      title: newSlot.title,
      clientName: newSlot.clientName,
      clientPhone: newSlot.clientPhone || '(61) 99565-9224',
      address: newSlot.address || 'Brasília - DF',
      status: newSlot.status,
      techName: newSlot.techName,
      notes: newSlot.notes,
      scopeItems: [
        { name: newSlot.title, status: newSlot.status, progress: newSlot.status === 'Concluído' ? 100 : 0 }
      ],
      supplies: ['Extratora HighPower', 'Bactericida Finisher', 'Shield Pro']
    };
    const updated = saveStoredScheduleSlot(slot);
    setSlots(updated);
    setSelectedSlotId(slot.id);
    setShowAddModal(false);
    setNewSlot({
      time: '09:00',
      title: 'Higienização de Sofá',
      clientName: '',
      clientPhone: '',
      address: '',
      status: 'Agendado',
      techName: 'Técnico ED Limp',
      notes: '',
    });
  };

  const handleDeleteSlot = (id) => {
    if (confirm('Deseja excluir este agendamento?')) {
      const updated = deleteStoredScheduleSlot(id);
      setSlots(updated);
      if (selectedSlotId === id) {
        setSelectedSlotId(updated[0]?.id || null);
      }
    }
  };

  // Dias da Semana Dinâmicos
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return {
      label: dayNames[d.getDay()],
      date: String(d.getDate()).padStart(2, '0'),
      isToday: i === 0,
      fullDate: d.toLocaleDateString('pt-BR')
    };
  });

  const filteredSlots = slots.filter(s => {
    if (!localidadeFilter) return true;
    return (s.address || '').toLowerCase().includes(localidadeFilter.toLowerCase()) ||
           (s.clientName || '').toLowerCase().includes(localidadeFilter.toLowerCase()) ||
           (s.title || '').toLowerCase().includes(localidadeFilter.toLowerCase());
  });

  const currentSlot = slots.find(s => s.id === selectedSlotId) || slots[0];

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
            Visão de atendimentos, rotas no DF e alocação de técnicos da ED Limp.
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

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-slate-950 font-black px-5 py-2.5 rounded-full text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0"
          >
            <span className="material-symbols-outlined text-sm font-black">add</span>
            <span>Novo Agendamento</span>
          </button>
        </div>
      </header>

      {/* Seletor Semanal de Dias */}
      <div className="bg-surface-container-low rounded-2xl p-6 shadow-subtle border border-outline-variant/10 mb-8">
        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {weekDays.map((d, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <button 
                key={idx} 
                onClick={() => setSelectedDayIndex(idx)}
                className={`text-center py-2 px-1 rounded-2xl transition-all ${isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-surface-container'}`}
              >
                <p className={`text-[10px] font-black uppercase mb-1 ${isSelected ? 'text-primary' : 'text-on-surface-variant/60'}`}>
                  {d.label} {d.isToday && '• Hoje'}
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
      </div>

      {slots.length === 0 ? (
        <div className="p-16 text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">event_available</span>
          <h3 className="text-lg font-black text-on-surface">Nenhum atendimento agendado</h3>
          <p className="text-xs text-on-surface-variant mt-1 max-w-md mx-auto">
            Sua agenda está limpa e pronta para começar. Clique no botão abaixo para registrar o primeiro cliente a ser atendido.
          </p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="mt-6 bg-primary text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            + Agendar Primeiro Atendimento
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Column (Timeline) */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {filteredSlots.map(slot => {
              const isSelected = slot.id === selectedSlotId;
              const isCurrent = slot.status === 'Em progresso' || slot.status === 'Em andamento';

              return (
                <div 
                  key={slot.id} 
                  onClick={() => setSelectedSlotId(slot.id)}
                  className="relative flex gap-4 sm:gap-6 items-start group cursor-pointer"
                >
                  <div className="w-14 sm:w-16 pt-3 text-right">
                    <span className="text-xs font-mono font-black text-on-surface-variant">{slot.time}</span>
                  </div>

                  <div className={`flex-grow p-5 rounded-2xl border-l-4 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm border border-outline-variant/10 ${
                    isCurrent 
                      ? 'bg-primary text-slate-950 border-l-slate-950 shadow-xl' 
                      : 'bg-surface dark:bg-surface-container border-l-secondary'
                  } ${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${isCurrent ? 'bg-slate-950 text-white' : 'bg-secondary-container/40 text-secondary'}`}>
                        <span className="material-symbols-outlined text-xl">sanitizer</span>
                      </div>
                      <div>
                        <h4 className={`font-bold text-sm ${isCurrent ? 'text-slate-950' : 'text-primary'}`}>{slot.title}</h4>
                        <p className={`text-xs ${isCurrent ? 'text-slate-900/80 font-semibold' : 'text-on-surface-variant'} mt-0.5`}>
                          {slot.clientName} • {slot.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className={`text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-black ${
                        isCurrent ? 'bg-slate-950 text-white' : 'bg-secondary-container/50 text-secondary'
                      }`}>
                        {slot.status}
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDeleteSlot(slot.id); }}
                        className="w-8 h-8 rounded-lg text-error hover:bg-error/10 flex items-center justify-center transition-colors"
                        title="Excluir"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar Detalhes do Cliente Selecionado */}
          {currentSlot && (
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-primary text-slate-950 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-slate-950 text-white px-2.5 py-1 rounded-md">
                    {currentSlot.status}
                  </span>
                  <span className="font-mono font-bold text-xs">{currentSlot.time}</span>
                </div>
                <h3 className="text-xl font-black font-headline text-slate-950">{currentSlot.clientName}</h3>
                <p className="text-xs text-slate-900/80 font-bold mt-1">{currentSlot.title}</p>
                <p className="text-xs text-slate-900/70 mt-2 font-medium">{currentSlot.address}</p>
                
                {currentSlot.notes && (
                  <p className="text-xs bg-slate-950/10 p-3 rounded-xl mt-3 font-semibold text-slate-950">
                    "{currentSlot.notes}"
                  </p>
                )}

                <div className="mt-4 pt-4 border-t border-slate-900/20 flex gap-2">
                  <a 
                    href={`https://wa.me/55${(currentSlot.clientPhone || '').replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-slate-950 text-white hover:brightness-125 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentSlot.address || '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-white text-slate-950 hover:bg-slate-100 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-black transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-sm">navigation</span>
                    <span>Rota GPS</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Modal Novo Agendamento */}
      {showAddModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface dark:bg-surface-container max-w-md w-full rounded-2xl p-6 border border-outline-variant/20 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">event_available</span>
              Novo Agendamento de Serviço
            </h3>
            <form onSubmit={handleAddSlot} className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Nome do Cliente</label>
                <input 
                  type="text" 
                  required
                  value={newSlot.clientName}
                  onChange={e => setNewSlot({ ...newSlot, clientName: e.target.value })}
                  placeholder="Ex: Dra. Mariana Silveira"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Horário</label>
                  <input 
                    type="time" 
                    required
                    value={newSlot.time}
                    onChange={e => setNewSlot({ ...newSlot, time: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Telefone / WhatsApp</label>
                  <input 
                    type="text" 
                    value={newSlot.clientPhone}
                    onChange={e => setNewSlot({ ...newSlot, clientPhone: e.target.value })}
                    placeholder="(61) 99565-9224"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Serviço</label>
                <input 
                  type="text" 
                  required
                  value={newSlot.title}
                  onChange={e => setNewSlot({ ...newSlot, title: e.target.value })}
                  placeholder="Ex: Higienização de Sofá Retrátil + Cadeiras"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Endereço de Atendimento</label>
                <input 
                  type="text" 
                  value={newSlot.address}
                  onChange={e => setNewSlot({ ...newSlot, address: e.target.value })}
                  placeholder="Ex: Condomínio Solar da Serra, Lago Sul"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Status</label>
                  <select 
                    value={newSlot.status}
                    onChange={e => setNewSlot({ ...newSlot, status: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface"
                  >
                    <option value="Agendado">Agendado</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Técnico</label>
                  <input 
                    type="text" 
                    value={newSlot.techName}
                    onChange={e => setNewSlot({ ...newSlot, techName: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-surface-container-high py-2.5 rounded-xl text-xs font-bold">Cancelar</button>
                <button type="submit" className="flex-1 bg-primary text-slate-950 font-black py-2.5 rounded-xl text-xs">Agendar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
