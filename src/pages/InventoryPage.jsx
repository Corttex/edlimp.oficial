import { useState, useEffect } from 'react';
import { 
  getStoredInventory, 
  saveStoredInventoryItem, 
  updateStoredInventoryVolume, 
  deleteStoredInventoryItem,
  getStoredPatrimony,
  saveStoredPatrimonyItem,
  deleteStoredPatrimonyItem
} from '../lib/storage';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, assets
  const [showAddChemicalModal, setShowAddChemicalModal] = useState(false);
  const [showAddAssetModal, setShowAddAssetModal] = useState(false);
  
  const [chemicals, setChemicals] = useState([]);
  const [patrimonyItems, setPatrimonyItems] = useState([]);

  useEffect(() => {
    setChemicals(getStoredInventory());
    setPatrimonyItems(getStoredPatrimony());
  }, []);

  // Novo Insumo Químico Modal
  const [newChemical, setNewChemical] = useState({
    name: '',
    lot: '',
    volume: 50,
    maxVolume: 100,
    unit: 'Litros',
    category: 'Higienização',
    minAlert: 15,
  });

  // Novo Equipamento / Ativo
  const [newAsset, setNewAsset] = useState({
    name: '',
    serial: '',
    location: 'Van 01 (DF)',
    value: 0,
    condition: '100% Operacional',
    maintenanceDue: 'A definir'
  });

  const handleAddChemical = (e) => {
    e.preventDefault();
    if (!newChemical.name) return;
    const vol = Number(newChemical.volume) || 0;
    const item = {
      id: Date.now(),
      name: newChemical.name,
      lot: newChemical.lot || `#2026-${Math.floor(1000 + Math.random() * 9000)}`,
      volume: vol,
      maxVolume: Number(newChemical.maxVolume) || 100,
      unit: newChemical.unit,
      minAlert: Number(newChemical.minAlert) || 15,
      category: newChemical.category,
      icon: 'science'
    };
    const updated = saveStoredInventoryItem(item);
    setChemicals(updated);
    setShowAddChemicalModal(false);
    setNewChemical({ name: '', lot: '', volume: 50, maxVolume: 100, unit: 'Litros', category: 'Higienização', minAlert: 15 });
  };

  const handleDeleteChemical = (id) => {
    if (confirm('Deseja excluir este insumo do estoque?')) {
      const updated = deleteStoredInventoryItem(id);
      setChemicals(updated);
    }
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newAsset.name) return;
    const asset = {
      id: Date.now(),
      name: newAsset.name,
      serial: newAsset.serial || `EQ-${Math.floor(1000 + Math.random() * 9000)}-DF`,
      location: newAsset.location,
      value: Number(newAsset.value) || 0,
      condition: newAsset.condition,
      maintenanceDue: newAsset.maintenanceDue || 'Em dia',
      icon: 'vacuum'
    };
    const updated = saveStoredPatrimonyItem(asset);
    setPatrimonyItems(updated);
    setShowAddAssetModal(false);
    setNewAsset({ name: '', serial: '', location: 'Van 01 (DF)', value: 0, condition: '100% Operacional', maintenanceDue: 'A definir' });
  };

  const handleDeleteAsset = (id) => {
    if (confirm('Deseja excluir este equipamento da frota?')) {
      const updated = deleteStoredPatrimonyItem(id);
      setPatrimonyItems(updated);
    }
  };

  // Cálculos Reais Dinâmicos
  const totalAssetsValue = patrimonyItems.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
  const criticalChemicals = chemicals.filter(c => (Number(c.volume) || 0) <= (Number(c.minAlert) || 15));
  const healthPercent = patrimonyItems.length > 0 
    ? Math.round((patrimonyItems.filter(p => p.condition?.includes('100%')).length / patrimonyItems.length) * 100) 
    : 100;

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-slate-950 font-black shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'inventory' ? (
            <button 
              onClick={() => setShowAddChemicalModal(true)}
              className="bg-primary text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-sm shrink-0"
            >
              <span className="material-symbols-outlined text-sm font-black">add</span>
              <span>Cadastrar Insumo</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowAddAssetModal(true)}
              className="bg-primary text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-sm shrink-0"
            >
              <span className="material-symbols-outlined text-sm font-black">add</span>
              <span>Cadastrar Equipamento</span>
            </button>
          )}
        </div>
      </header>

      {/* Metrics Overview 100% DINÂMICO E REAL */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
        
        {/* Card 1: Saúde de Ativos */}
        <div className="md:col-span-5 bg-primary text-slate-950 p-8 rounded-2xl relative overflow-hidden shadow-xl flex flex-col justify-between">
          <div className="relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-950/80 font-label">
              Saúde Geral de Ativos
            </span>
            <h3 className="text-5xl sm:text-6xl font-black mt-2 mb-3 tracking-tighter font-headline text-slate-950">
              {healthPercent}%
            </h3>
            <p className="text-xs sm:text-sm text-slate-900/85 max-w-sm leading-relaxed font-bold">
              {patrimonyItems.length > 0 
                ? `${patrimonyItems.length} máquinas e veículos cadastrados na base oficial da ED Limp.` 
                : 'Nenhum equipamento cadastrado ainda. Adicione suas extratoras e vans na aba Equipamentos & Frota.'}
            </p>
          </div>

          <div className="mt-6 relative z-10 flex items-center justify-between border-t border-slate-900/20 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-950 animate-pulse"></span>
              <span className="text-xs font-black text-slate-900">Operação em Brasília</span>
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

        {/* Card 2: Atenção Necessária / Insumos em Alerta */}
        <div className="md:col-span-4 bg-surface-container-low p-8 rounded-2xl flex flex-col justify-between border border-outline-variant/10 shadow-subtle">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
              Monitoramento Clínico
            </span>
            <div className="flex items-center gap-4 mt-4">
              <div className={`p-4 rounded-2xl shadow-sm shrink-0 ${criticalChemicals.length > 0 ? 'bg-error-container text-error' : 'bg-secondary-container/40 text-secondary'}`}>
                <span className="material-symbols-outlined text-2xl font-bold">
                  {criticalChemicals.length > 0 ? 'warning' : 'check_circle'}
                </span>
              </div>
              <div>
                <h4 className="text-3xl font-black text-on-surface tracking-tight font-headline">
                  {String(criticalChemicals.length).padStart(2, '0')} Insumos
                </h4>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  {criticalChemicals.length > 0 ? 'Abaixo do nível de segurança' : 'Estoque em conformidade'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-[11px] text-on-surface-variant font-medium">
              {criticalChemicals.length > 0
                ? criticalChemicals.map(c => `${c.name} (${c.volume} ${c.unit})`).join(', ')
                : 'Todos os produtos químicos possuem volume adequado para atendimento.'}
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
            <p className="text-3xl sm:text-4xl font-black text-on-secondary-container mt-1 font-headline">
              {formatCurrency(totalAssetsValue)}
            </p>
          </div>

          <div className="mt-4 inline-flex items-center text-xs font-bold text-secondary gap-1.5 bg-white/70 px-3.5 py-1.5 rounded-full w-fit shadow-sm">
            <span className="material-symbols-outlined text-xs">precision_manufacturing</span>
            <span>{patrimonyItems.length} máquinas/veículos</span>
          </div>
        </div>

      </section>

      {/* ABA 1: Insumos Químicos */}
      {activeTab === 'inventory' && (
        <section className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <div>
              <h3 className="text-xl font-extrabold text-on-surface font-headline">Insumos Químicos & Reagentes</h3>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                Monitoramento volumétrico para blindagens e higienizações profundas.
              </p>
            </div>
          </div>

          {chemicals.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">science</span>
              <h4 className="font-bold text-on-surface text-base">Nenhum produto químico cadastrado</h4>
              <p className="text-xs text-on-surface-variant mt-1">Comece cadastrando os desinfetantes, impermeabilizantes e detergentes da ED Limp.</p>
              <button 
                onClick={() => setShowAddChemicalModal(true)}
                className="mt-4 bg-primary text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
              >
                + Cadastrar Primeiro Insumo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chemicals.map((chem) => {
                const percent = Math.min(100, Math.round(((Number(chem.volume) || 0) / (Number(chem.maxVolume) || 100)) * 100));
                const isCritical = (Number(chem.volume) || 0) <= (Number(chem.minAlert) || 15);

                return (
                  <div key={chem.id} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 shadow-subtle flex flex-col justify-between space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${isCritical ? 'bg-error-container text-error' : 'bg-primary/20 text-primary'}`}>
                          <span className="material-symbols-outlined text-xl">science</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-on-surface">{chem.name}</h4>
                          <span className="text-[10px] font-mono text-on-surface-variant">{chem.lot} • {chem.category}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteChemical(chem.id)}
                        className="text-error hover:bg-error/10 p-1 rounded-full transition-colors"
                        title="Excluir"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-on-surface">{chem.volume} {chem.unit}</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${isCritical ? 'bg-error-container text-error' : 'bg-secondary-container/40 text-secondary'}`}>
                          {isCritical ? 'Reposição Urgente' : 'Volume Seguro'}
                        </span>
                      </div>
                      <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-500 ${isCritical ? 'bg-error' : 'bg-secondary'}`} style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-outline-variant/10 flex justify-between items-center">
                      <span className="text-[11px] text-on-surface-variant font-medium">Ajustar volume:</span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            const newVol = Math.max(0, (Number(chem.volume) || 0) - 2);
                            setChemicals(updateStoredInventoryVolume(chem.id, newVol));
                          }}
                          className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-bold text-xs"
                        >
                          -2
                        </button>
                        <button 
                          onClick={() => {
                            const newVol = (Number(chem.volume) || 0) + 5;
                            setChemicals(updateStoredInventoryVolume(chem.id, newVol));
                          }}
                          className="w-7 h-7 rounded-lg bg-primary text-slate-950 font-bold text-xs"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ABA 2: Equipamentos & Frota */}
      {activeTab === 'assets' && (
        <section className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <div>
              <h3 className="text-xl font-extrabold text-on-surface font-headline">Equipamentos, Extratoras & Frota</h3>
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                Patrimônio físico ativo da ED Limp, manutenções e localização nas vans.
              </p>
            </div>
          </div>

          {patrimonyItems.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/30">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">precision_manufacturing</span>
              <h4 className="font-bold text-on-surface text-base">Nenhum equipamento cadastrado</h4>
              <p className="text-xs text-on-surface-variant mt-1">Cadastre as extratoras, pulverizadores e veículos que compõem os ativos da empresa.</p>
              <button 
                onClick={() => setShowAddAssetModal(true)}
                className="mt-4 bg-primary text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
              >
                + Cadastrar Primeiro Equipamento
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patrimonyItems.map((asset) => (
                <div key={asset.id} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 shadow-subtle flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-xl">vacuum</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">{asset.name}</h4>
                        <span className="text-[10px] font-mono text-on-surface-variant">{asset.serial}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteAsset(asset.id)}
                      className="text-error hover:bg-error/10 p-1 rounded-full transition-colors"
                      title="Excluir"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Localização:</span>
                      <strong className="text-on-surface">{asset.location}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Valor Avaliado:</span>
                      <strong className="text-secondary font-mono">{formatCurrency(asset.value)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Condição:</span>
                      <strong className="text-primary">{asset.condition}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant font-medium">Próxima Revisão:</span>
                      <span className="text-on-surface font-mono">{asset.maintenanceDue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Modal Novo Insumo Químico */}
      {showAddChemicalModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface dark:bg-surface-container max-w-md w-full rounded-2xl p-6 border border-outline-variant/20 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">science</span>
              Cadastrar Novo Insumo Químico
            </h3>
            <form onSubmit={handleAddChemical} className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Nome do Produto</label>
                <input 
                  type="text" 
                  required
                  value={newChemical.name}
                  onChange={e => setNewChemical({ ...newChemical, name: e.target.value })}
                  placeholder="Ex: Bactericida Desinfetante Finisher"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Volume Atual</label>
                  <input 
                    type="number" 
                    required
                    value={newChemical.volume}
                    onChange={e => setNewChemical({ ...newChemical, volume: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-black text-on-surface"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Unidade</label>
                  <select 
                    value={newChemical.unit}
                    onChange={e => setNewChemical({ ...newChemical, unit: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface"
                  >
                    <option value="Litros">Litros</option>
                    <option value="Galões">Galões</option>
                    <option value="Kg">Kg</option>
                    <option value="Frascos">Frascos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Categoria</label>
                  <select 
                    value={newChemical.category}
                    onChange={e => setNewChemical({ ...newChemical, category: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface"
                  >
                    <option value="Higienização">Higienização</option>
                    <option value="Impermeabilização">Impermeabilização</option>
                    <option value="Flotador">Flotador</option>
                    <option value="Enzimático">Enzimático</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Nível Mínimo (Alerta)</label>
                  <input 
                    type="number" 
                    value={newChemical.minAlert}
                    onChange={e => setNewChemical({ ...newChemical, minAlert: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-black text-on-surface"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddChemicalModal(false)} className="flex-1 bg-surface-container-high py-2.5 rounded-xl text-xs font-bold">Cancelar</button>
                <button type="submit" className="flex-1 bg-primary text-slate-950 font-black py-2.5 rounded-xl text-xs">Salvar Insumo</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Novo Equipamento / Ativo */}
      {showAddAssetModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface dark:bg-surface-container max-w-md w-full rounded-2xl p-6 border border-outline-variant/20 shadow-2xl space-y-4">
            <h3 className="text-base font-black text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">vacuum</span>
              Cadastrar Equipamento / Veículo
            </h3>
            <form onSubmit={handleAddAsset} className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Nome do Equipamento / Máquina</label>
                <input 
                  type="text" 
                  required
                  value={newAsset.name}
                  onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
                  placeholder="Ex: Extratora IPC Soteco 80L"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Localização / Alocação</label>
                  <input 
                    type="text" 
                    value={newAsset.location}
                    onChange={e => setNewAsset({ ...newAsset, location: e.target.value })}
                    placeholder="Van 01 (Asa Sul)"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Valor Estimado (R$)</label>
                  <input 
                    type="number" 
                    value={newAsset.value}
                    onChange={e => setNewAsset({ ...newAsset, value: e.target.value })}
                    placeholder="8500"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-black text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Condição Técnica</label>
                  <select 
                    value={newAsset.condition}
                    onChange={e => setNewAsset({ ...newAsset, condition: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2.5 text-xs font-bold text-on-surface"
                  >
                    <option value="100% Operacional">100% Operacional</option>
                    <option value="Revisão Preventiva">Revisão Preventiva</option>
                    <option value="Em Manutenção">Em Manutenção</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Próxima Revisão</label>
                  <input 
                    type="text" 
                    value={newAsset.maintenanceDue}
                    onChange={e => setNewAsset({ ...newAsset, maintenanceDue: e.target.value })}
                    placeholder="15/12/2026"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddAssetModal(false)} className="flex-1 bg-surface-container-high py-2.5 rounded-xl text-xs font-bold">Cancelar</button>
                <button type="submit" className="flex-1 bg-primary text-slate-950 font-black py-2.5 rounded-xl text-xs">Salvar Equipamento</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
