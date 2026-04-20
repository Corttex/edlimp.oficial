import { useState } from 'react';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState('inventory'); // inventory, patrimony, maintenance, kits
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const assets = [
    { id: 'PAT-0092', name: 'Extratora Industrial X-200', lastMaint: '12/05', status: 'Ativo', health: 95, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgjz7WZz2WEeTo8HaExpb9Lz4mIdKlbqhVkLsPqRbojgEu8-lmEgJ_fnHdIz6NC-B1qTkYR8nkGoJc-4g5ANEEqtyxk8apCsEahlA7EN4pNgdTIILDnZNnZggPOls_qaRG2kQcFcG9MZnIJOu_is10ECVJYjhz5gNm9toOFf-rKfINoyu7ZA0GPlckxMorHPz3n_4G_IyU122NicQtSjdsH5jD2_3Lp8p87WMbLcv-oX4op1lYniDR6Kk7iHL7u6oxLYNQxHELNYx1', description: 'Extratora de alta potência para limpeza profunda de estofados clínicos.', nf: 'NF-9023-A' },
    { id: 'PAT-0104', name: 'Vaporizadora Clinical V-9', lastMaint: '08/06', status: 'Manutenção', health: 40, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr4AflbSJwy7h_MdQLcu49CWTUSs7q4ieD6aCql_NSlTyiMoUucKXA_7WTmNiPOmo0PNn3-HNXR6ovEBSGY0d8GNjb_AHDAskqYpiWUGsfUrLdPkG-ye1c-D5s3AZ0wi8_DuT4jGRT7-FD8kydsHXFwz_9DKq3h3gqX2KXFriYnhHCge2ADOFhtWTpNDwEnhAoLfzWYH49TjbnmQgJdJScyDOjNf17WWbrq0kjnaG3_QvyPDMZBXjpLVPXsODkYy8ezwAzPHy3sc3D', description: 'Vaporizador hospitalar para desinfecção de superfícies rígidas.', nf: 'NF-1022-B' },
  ];

  const maintenanceLogs = [
    { date: '15/06/2024', item: 'Extratora X-200', type: 'Preventiva', technician: 'Roberto Silva', cost: 'R$ 150,00' },
    { date: '10/06/2024', item: 'Vaporizadora V-9', type: 'Corretiva', technician: 'Carlos Tech', cost: 'R$ 420,00' },
  ];

  const kits = [
    { name: 'Kit Pós-Obra Master', items: '5L HP-900, 2 Escovas, 1 Mop', availability: 3 },
    { name: 'Kit Clinico Hospitalar', items: '10L Sanitizante, EPIs, Vaporizadora', availability: 1 },
  ];

  return (
    <div className="p-10 pb-20 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Gestão de Ativos & Estoque</h2>
          <p className="text-slate-500">Controle total de peças, manutenções e patrimônio clínico</p>
        </div>
        <div className="flex gap-2 bg-surface-container p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
          >
            Insumos
          </button>
          <button 
            onClick={() => setActiveTab('patrimony')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'patrimony' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
          >
            Patrimônio
          </button>
          <button 
            onClick={() => setActiveTab('maintenance')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'maintenance' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
          >
            Manutenções
          </button>
          <button 
            onClick={() => setActiveTab('kits')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${activeTab === 'kits' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}
          >
            Kits Extras
          </button>
        </div>
      </div>

      {activeTab === 'inventory' && (
        <section className="animate-in slide-in-from-bottom-4 duration-500">
           {/* Summary Metrics */}
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary p-6 rounded-[2rem] text-white">
              <span className="text-[10px] uppercase font-black tracking-widest opacity-70">Saúde de Ativos</span>
              <h3 className="text-3xl font-black mt-1">98.4%</h3>
              <div className="w-full bg-white/20 h-1 rounded-full mt-4">
                <div className="bg-secondary h-full rounded-full w-[98%]"></div>
              </div>
            </div>
            <div className="bg-error p-6 rounded-[2rem] text-white">
              <span className="text-[10px] uppercase font-black tracking-widest opacity-70">Estoque Crítico</span>
              <h3 className="text-3xl font-black mt-1">04 itens</h3>
              <p className="text-[10px] mt-2 opacity-80 uppercase font-bold">Reposição imediata recomendada</p>
            </div>
            <div className="bg-surface-container p-6 rounded-[2rem] border border-outline-variant/10 md:col-span-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-primary">Patrimônio Avaliado</span>
                  <h3 className="text-3xl font-black mt-1 text-on-surface">R$ 142.500</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <span className="material-symbols-outlined text-primary">account_balance</span>
                </div>
              </div>
            </div>
           </div>

           {/* Insumos Grid */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'HP-900 Impermeabilizante', vol: '85L', type: 'Químico', color: 'primary' },
                { name: 'Detergente Enzimático', vol: '12L', type: 'Químico', color: 'error' },
                { name: 'Flotador Clinical', vol: '42L', type: 'Químico', color: 'primary' },
              ].map((item, i) => (
                <div key={i} className="bg-surface p-6 rounded-[2rem] border border-outline-variant/10 hover:shadow-xl transition-all group cursor-pointer active:scale-95">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 bg-${item.color}/10 rounded-2xl`}>
                      <span className={`material-symbols-outlined text-${item.color}`}>{item.color === 'error' ? 'warning' : 'science'}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.type}</span>
                  </div>
                  <h4 className="font-bold text-lg text-on-surface mb-4">{item.name}</h4>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase">Volume Atual</p>
                      <p className={`text-2xl font-black text-${item.color}`}>{item.vol}</p>
                    </div>
                    <button className="p-2 bg-surface-container rounded-full hover:bg-primary hover:text-white transition-colors shadow-subtle hover-lift">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
              ))}
           </div>
        </section>
      )}

      {activeTab === 'patrimony' && (
        <section className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-surface p-4 rounded-[2rem] border border-outline-variant/10 flex items-center justify-between shadow-subtle hover:shadow-premium transition-all hover-lift">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container">
                  <img src={asset.img} className="w-full h-full object-cover" alt={asset.name} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">{asset.name}</h4>
                  <div className="flex gap-4 mt-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">ID: {asset.id}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400">Maint: {asset.lastMaint}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 border-l border-outline-variant/10">
                <button 
                  onClick={() => setSelectedItem(asset)}
                  className="p-2 hover:bg-primary/10 rounded-full text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Saúde Técnica</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${asset.health > 80 ? 'bg-secondary' : asset.health > 30 ? 'bg-yellow-400' : 'bg-error'}`} style={{width: `${asset.health}%`}}></div>
                    </div>
                    <span className="text-xs font-bold">{asset.health}%</span>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${asset.status === 'Ativo' ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'}`}>
                  {asset.status}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'maintenance' && (
        <section className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface rounded-[2rem] border border-outline-variant/10 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead className="bg-surface-container-low border-b border-outline-variant/10">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Data</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Equipamento</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Técnico</th>
                  <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Custo</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {maintenanceLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-on-surface">{log.date}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-on-surface">{log.item}</p>
                        <p className="text-[10px] font-black uppercase text-secondary">{log.type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{log.technician}</td>
                    <td className="px-6 py-4 text-sm font-black text-primary">{log.cost}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">description</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'kits' && (
        <section className="animate-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 md:grid-cols-2 gap-6">
          {kits.map((kit, i) => (
            <div key={i} className="bg-surface p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-3xl">backpack</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-2">{kit.name}</h4>
              <p className="text-xs text-slate-500 mb-6 font-medium leading-relaxed">{kit.items}</p>
              <div className="flex justify-between items-center bg-surface-container p-4 rounded-2xl">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Disponíveis</p>
                  <p className="text-lg font-black text-on-surface">{kit.availability} Unidades</p>
                </div>
                <button className="bg-secondary text-on-secondary px-6 py-2 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-all">
                  Retirar Kit
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
             <div className="h-48 bg-primary relative">
                <img src={selectedItem.img} className="w-full h-full object-cover opacity-50" alt="" />
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
             </div>
             <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-primary">{selectedItem.name}</h3>
                  <p className="text-on-surface-variant text-sm font-bold uppercase tracking-widest mt-1">ID: {selectedItem.id}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Última Manutenção</p>
                    <p className="font-bold text-on-surface">{selectedItem.lastMaint}</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Nota Fiscal</p>
                    <div className="flex items-center gap-2 text-primary font-bold">
                       <span className="material-symbols-outlined text-sm">attachment</span>
                       <span>{selectedItem.nf || 'Anexar NF'}</span>
                    </div>
                  </div>
                </div>

                <div>
                   <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Descrição Técnica</p>
                   <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                     {selectedItem.description || 'Nenhuma descrição detalhada cadastrada para este item.'}
                   </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 bg-primary text-white font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-wider">
                    Solicitar Manutenção
                  </button>
                  <button className="bg-surface-container text-on-surface-variant px-6 py-4 rounded-2xl hover:bg-surface-container-high transition-all">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
        <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 pointer-events-none transition-all scale-90 group-hover:scale-100">
           <span className="bg-white dark:bg-slate-800 text-on-surface px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg border border-outline-variant/10">Novo Equipamento</span>
           <span className="bg-white dark:bg-slate-800 text-on-surface px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg border border-outline-variant/10">Registrar Manutenção</span>
        </div>
      </button>
    </div>
  );
}
