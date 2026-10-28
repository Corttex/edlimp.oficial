import { useState } from 'react';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, assets, maintenance, kits
  const [showAddModal, setShowAddModal] = useState(false);

  // Insumos Químicos Reais com monitoramento de lotes e volume
  const [chemicals, setChemicals] = useState([
    {
      id: 1,
      name: 'Impermeabilizante Shield HP-900',
      lot: '#2024-XP90',
      volume: 85,
      maxVolume: 100,
      unit: 'Litros',
      status: 'Em Conformidade',
      statusClass: 'bg-secondary-container/40 text-secondary border border-secondary/20',
      barColor: 'bg-secondary',
      icon: 'science',
      category: 'Blindagem'
    },
    {
      id: 2,
      name: 'Detergente Enzimático Clin Pro',
      lot: '#2024-ENZ2',
      volume: 12,
      maxVolume: 100,
      unit: 'Litros',
      status: 'Reposição Urgente',
      statusClass: 'bg-error-container text-error border border-error/20',
      barColor: 'bg-error',
      icon: 'cleaning_services',
      category: 'Higienização'
    },
    {
      id: 3,
      name: 'Neutralizador Odor Bio-Tech',
      lot: '#2024-BIO8',
      volume: 42,
      maxVolume: 60,
      unit: 'Litros',
      status: 'Em Conformidade',
      statusClass: 'bg-secondary-container/40 text-secondary border border-secondary/20',
      barColor: 'bg-secondary',
      icon: 'opacity',
      category: 'Odores & Pets'
    },
    {
      id: 4,
      name: 'Solvente Desengordurante Citrus',
      lot: '#2024-CIT1',
      volume: 8,
      maxVolume: 40,
      unit: 'Litros',
      status: 'Estoque Baixo',
      statusClass: 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300',
      barColor: 'bg-amber-500',
      icon: 'sanitizer',
      category: 'Manchas Difíceis'
    },
    {
      id: 5,
      name: 'Flotador Tensoativo Hospitalar',
      lot: '#2024-FLO5',
      volume: 64,
      maxVolume: 80,
      unit: 'Litros',
      status: 'Em Conformidade',
      statusClass: 'bg-secondary-container/40 text-secondary border border-secondary/20',
      barColor: 'bg-secondary',
      icon: 'bubble_chart',
      category: 'Pré-Lavagem'
    }
  ]);

  // Ativos e Equipamentos Físicos (Patrimônio)
  const patrimonyItems = [
    {
      id: 1,
      name: 'Extratora Alemã HighPower 80L',
      serial: 'EXT-8890-DF',
      condition: '100% Operacional',
      value: 12500,
      location: 'Van 01 (Asa Sul / Sudoeste)',
      maintenanceDue: '15/11/2026',
      icon: 'vacuum'
    },
    {
      id: 2,
      name: 'Extratora Compacta Puzzi 10/1',
      serial: 'EXT-3301-DF',
      condition: '100% Operacional',
      value: 6800,
      location: 'Van 02 (Águas Claras / Taguatinga)',
      maintenanceDue: '20/11/2026',
      icon: 'cleaning_services'
    },
    {
      id: 3,
      name: 'Pulverizador de Blindagem Eletrostático',
      serial: 'PULV-2024-PRO',
      condition: 'Revisão Preventiva',
      value: 5200,
      location: 'Base Central Brasília',
      maintenanceDue: 'Amanhã',
      icon: 'water_drop'
    },
    {
      id: 4,
      name: 'Turbina de Secagem Rápida AirForce 3000',
      serial: 'AIR-9921-X',
      condition: '100% Operacional',
      value: 3900,
      location: 'Van 01',
      maintenanceDue: '05/12/2026',
      icon: 'air'
    }
  ];

  // Novo item modal state
  const [newItem, setNewItem] = useState({
    name: '',
    lot: '',
    volume: 50,
    unit: 'Litros',
    category: 'Higienização'
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    const item = {
      id: Date.now(),
      name: newItem.name,
      lot: newItem.lot || `#2024-${Math.floor(1000 + Math.random() * 9000)}`,
      volume: Number(newItem.volume),
      maxVolume: 100,
      unit: newItem.unit,
      status: Number(newItem.volume) < 20 ? 'Reposição Urgente' : 'Em Conformidade',
      statusClass: Number(newItem.volume) < 20 ? 'bg-error-container text-error' : 'bg-secondary-container/40 text-secondary',
      barColor: Number(newItem.volume) < 20 ? 'bg-error' : 'bg-secondary',
      icon: 'science',
      category: newItem.category
    };
    setChemicals([item, ...chemicals]);
    setShowAddModal(false);
    setNewItem({ name: '', lot: '', volume: 50, unit: 'Litros', category: 'Higienização' });
  };

  return (
    <div className="w-full pb-16 font-body animate-fadeIn">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4 border-b border-outline-variant/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-widest font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">inventory_2</span> Ativos & Patrimônio
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Controle de Frota e Lotes Químicos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight font-headline">
            Estoque & Patrimônio
          </h2>
          <p className="text-on-surface-variant text-sm font-medium mt-1">
            Gestão de insumos químicos hospitalares, manutenção preventiva de extratoras e valor imobilizado.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-surface-container-low rounded-2xl p-1 border border-outline-variant/10 shadow-subtle">
            {[
              { id: 'inventory', label: 'Insumos Químicos' },
              { id: 'assets', label: 'Equipamentos & Frota' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:brightness-105 transition-all shadow-sm shrink-0"
          >
            <span className="material-symbols-outlined text-sm font-bold">add</span>
            <span>Cadastrar Insumo</span>
          </button>
        </div>
      </header>

      {/* Metrics Overview (Asymmetric Bento Grid do estoque_e_patrim_nio_2) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
        
        {/* Card 1: Saúde de Ativos (98.4%) */}
        <div className="md:col-span-5 bg-primary text-slate-950 p-8 rounded-2xl relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-950/80 font-label">
              Saúde Geral de Ativos
            </span>
            <h3 className="text-5xl sm:text-6xl font-black mt-2 mb-3 tracking-tighter font-headline text-slate-950">
              98.4%
            </h3>
            <p className="text-xs sm:text-sm text-slate-900/85 max-w-sm leading-relaxed font-bold">
              Equipamentos de extração alemã e pulverizadores operando em capacidade clínica máxima. 1 revisão preventiva programada.
            </p>
          </div>

          <div className="mt-6 relative z-10 flex items-center justify-between border-t border-slate-900/20 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-pulse"></span>
              <span className="text-xs font-black text-slate-900">Van 01 & Van 02 Prontas</span>
            </div>
            <button 
              onClick={() => setActiveTab('assets')}
              className="bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:scale-105 transition-all shadow-sm"
            >
              Ver Equipamentos
            </button>
          </div>

          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-slate-950">
            <span className="material-symbols-outlined text-[14rem]">verified</span>
          </div>
        </div>

        {/* Card 2: Atenção Necessária / Estoque Crítico */}
        <div className="md:col-span-4 bg-surface-container-low p-8 rounded-2xl flex flex-col justify-between border border-outline-variant/10 shadow-subtle">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
              Monitoramento Clínico
            </span>
            <div className="flex items-center gap-4 mt-4">
              <div className="p-4 bg-error-container text-error rounded-2xl shadow-sm shrink-0">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <div>
                <h4 className="text-3xl font-black text-on-surface tracking-tight font-headline">02 Insumos</h4>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">Abaixo do nível de segurança</p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex gap-2">
              <div className="h-1.5 flex-1 bg-error rounded-full"></div>
              <div className="h-1.5 flex-1 bg-amber-400 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-secondary rounded-full"></div>
            </div>
            <p className="text-[11px] text-on-surface-variant font-medium">
              Detergente Enzimático Clin (12L) e Desengordurante (8L) necessitam pedido.
            </p>
          </div>
        </div>

        {/* Card 3: Patrimônio Total Avaliado */}
        <div className="md:col-span-3 bg-secondary-container p-8 rounded-2xl flex flex-col justify-between border border-secondary/20 shadow-subtle text-on-secondary-container">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center text-secondary mb-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl font-bold">inventory</span>
            </div>
            <h4 className="text-[10px] font-black text-secondary uppercase tracking-widest">Patrimônio em Ativos</h4>
            <p className="text-4xl font-black text-on-secondary-container mt-1 font-headline">R$ 142.5k</p>
          </div>

          <div className="mt-4 inline-flex items-center text-xs font-bold text-secondary gap-1.5 bg-white/70 px-3.5 py-1.5 rounded-full w-fit shadow-sm">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            <span>+12% este mês</span>
          </div>
        </div>

      </section>

      {/* ABA 1: Insumos Químicos e Barras de Lote */}
      {activeTab === 'inventory' && (
        <section className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <div>
              <h3 className="text-2xl font-bold text-primary dark:text-white tracking-tight font-headline">
                Insumos Químicos & Reagentes
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Monitoramento volumétrico para blindagens e higienizações profundas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chemicals.map(item => (
              <div 
                key={item.id}
                className="bg-surface-container-low p-6 rounded-2xl shadow-subtle border border-outline-variant/10 hover-lift transition-all"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="p-3 bg-surface-container rounded-2xl text-primary">
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${item.statusClass}`}>
                    {item.status}
                  </span>
                </div>

                <span className="text-[10px] font-black uppercase tracking-wider text-secondary">
                  {item.category}
                </span>
                <h4 className="text-base font-bold text-on-surface mt-0.5 leading-snug">{item.name}</h4>
                <p className="text-xs font-mono text-on-surface-variant/70 mb-5">Lote: {item.lot}</p>

                <div className="space-y-2 pt-2 border-t border-outline-variant/10">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-on-surface-variant font-medium">Volume Atual</span>
                    <span className="text-on-surface font-mono">{item.volume} {item.unit} / {item.maxVolume} {item.unit}</span>
                  </div>
                  <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden p-0.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${item.barColor}`}
                      style={{ width: `${Math.min(100, (item.volume / item.maxVolume) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 flex justify-between items-center text-[11px]">
                  <span className="text-on-surface-variant font-medium">Capacidade: {Math.round((item.volume / item.maxVolume) * 100)}%</span>
                  <button 
                    onClick={() => {
                      const added = prompt(`Adicionar quantos litros em ${item.name}?`, '10');
                      if (added && !isNaN(added)) {
                        setChemicals(chems => chems.map(c => c.id === item.id ? { ...c, volume: Math.min(c.maxVolume, c.volume + Number(added)) } : c));
                      }
                    }}
                    className="text-primary hover:underline font-bold"
                  >
                    + Abastecer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ABA 2: Equipamentos & Frota (Patrimônio) */}
      {activeTab === 'assets' && (
        <section className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <div>
              <h3 className="text-2xl font-bold text-primary dark:text-white tracking-tight font-headline">
                Maquinário Clínico & Frota de Atendimento
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">
                Extratoras profissionais, pulverizadores eletrostáticos e veículos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patrimonyItems.map(item => (
              <div 
                key={item.id} 
                className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/10 shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-on-surface">{item.name}</h4>
                        <p className="text-xs font-mono text-on-surface-variant">Patrimônio: {item.serial}</p>
                      </div>
                    </div>
                    <span className="bg-secondary-container/30 text-secondary text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      {item.condition}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-surface-container rounded-2xl text-xs">
                    <div>
                      <p className="text-on-surface-variant/70 text-[10px] uppercase font-bold">Localização Atual</p>
                      <p className="font-bold text-on-surface mt-0.5">{item.location}</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant/70 text-[10px] uppercase font-bold">Próxima Revisão</p>
                      <p className="font-bold text-primary mt-0.5">{item.maintenanceDue}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant/70">Valor do Ativo</span>
                    <p className="text-base font-black text-secondary">R$ {item.value.toLocaleString('pt-BR')},00</p>
                  </div>
                  <button 
                    onClick={() => alert(`Check-in de manutenção confirmado para ${item.name}!`)}
                    className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl text-xs font-bold transition-all border border-outline-variant/20"
                  >
                    Registrar Manutenção
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal para Adicionar Insumo */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-container-low w-full max-w-md rounded-2xl p-8 shadow-2xl border border-outline-variant/20 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-headline text-primary dark:text-white">Cadastrar Insumo Químico</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Impermeabilizante Pro Shield"
                  value={newItem.name}
                  onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Lote</label>
                  <input 
                    type="text" 
                    placeholder="Ex: #2024-XP01"
                    value={newItem.lot}
                    onChange={e => setNewItem({ ...newItem, lot: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Volume Inicial (L)</label>
                  <input 
                    type="number" 
                    required
                    value={newItem.volume}
                    onChange={e => setNewItem({ ...newItem, volume: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Categoria de Uso</label>
                <select 
                  value={newItem.category}
                  onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface"
                >
                  <option value="Blindagem">Blindagem & Impermeabilização</option>
                  <option value="Higienização">Higienização Profunda</option>
                  <option value="Odores & Pets">Odores & Pets</option>
                  <option value="Manchas Difíceis">Manchas Difíceis</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-surface-container hover:bg-surface-container-high py-3 rounded-xl text-xs font-bold text-on-surface"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-primary text-white py-3 rounded-xl text-xs font-bold hover:brightness-105 shadow-md"
                >
                  Salvar Insumo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
