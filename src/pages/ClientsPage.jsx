import { useState, useEffect } from 'react';

export default function ClientsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([
    { id: 1, name: 'Juliana Paes', phone: '(11) 98877-0099', email: 'ju.paes@gmail.com', address: 'Rua Leopoldo Couto, 402, Itaim Bibi', status: 'Ativo', category: 'VIP Gold', cpf: '123.456.789-00' },
    { id: 2, name: 'Marcos Oliveira', phone: '(11) 97766-1122', email: 'marcos.oli@uol.com.br', address: 'Av. Paulista, 1000, Bela Vista', status: 'Ativo', category: 'Recorrente', cpf: '987.654.321-11' },
  ]);

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.address.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-primary">Gestão de Clientes</h2>
          <p className="text-on-surface-variant text-sm font-body mt-1">Gerencie a base de clientes e histórico de atendimento.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex bg-white dark:bg-surface-container items-center gap-2 px-6 py-3 rounded-full border border-outline-variant/10 shadow-subtle w-full sm:w-80 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input 
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} 
              placeholder="Buscar por nome ou região..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" 
            />
          </div>
          <button onClick={() => { setEditingClient(null); setShowModal(true); }} className="bg-primary text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-premium hover-lift transition-all whitespace-nowrap">
            + Novo Cliente
          </button>
        </div>
      </header>

      <section className="bg-white dark:bg-surface-container rounded-3xl shadow-subtle border border-outline-variant/10 overflow-hidden">
         <table className="w-full text-left text-sm">
           <thead className="bg-surface-container-low border-b border-outline-variant/10">
             <tr className="text-[10px] uppercase font-black tracking-widest text-on-surface-variant">
               <th className="py-4 px-6">Cliente</th>
               <th className="py-4 px-6">Contato</th>
               <th className="py-4 px-6 hidden md:table-cell">Endereço</th>
               <th className="py-4 px-6 text-center">Ações</th>
             </tr>
           </thead>
           <tbody>
             {filteredClients.map(c => (
               <tr key={c.id} className="border-b border-outline-variant/5 hover:bg-surface-container-lowest transition-colors">
                 <td className="py-4 px-6 font-bold text-primary">{c.name}</td>
                 <td className="py-4 px-6 text-on-surface-variant flex items-center gap-2">
                   <span className="material-symbols-outlined text-[18px] text-zinc-400">phone_iphone</span> {c.phone}
                 </td>
                 <td className="py-4 px-6 text-on-surface-variant">{c.address}</td>
                 <td className="py-4 px-6 text-center">
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => { setEditingClient(c); setShowModal(true); }}
                      className="p-2 hover:bg-primary/10 rounded-full text-primary"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button className="p-2 hover:bg-error/10 rounded-full text-error">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                 </td>
               </tr>
             ))}
             {filteredClients.length === 0 && (
               <tr>
                 <td colSpan="4" className="py-8 text-center text-on-surface-variant italic">Nenhum cliente encontrado.</td>
               </tr>
             )}
           </tbody>
         </table>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-black text-primary mb-8">{editingClient ? 'Editar Cliente' : 'Adicionar Novo Lead/Cliente'}</h3>
            <div className="grid grid-cols-2 gap-6">
               <div className="col-span-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Nome Completo</label>
                 <input className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium" defaultValue={editingClient?.name} />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">CPF/CNPJ</label>
                 <input className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium" defaultValue={editingClient?.cpf} />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">WhatsApp</label>
                 <input className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium" defaultValue={editingClient?.phone} />
               </div>
               <div className="col-span-2">
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Endereço Completo</label>
                 <input className="w-full bg-slate-50 dark:bg-surface-container-highest border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium" defaultValue={editingClient?.address} />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Ponto de Referência</label>
                 <input className="w-full bg-slate-50 dark:bg-surface-container-highest border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium" placeholder="Ex: Próximo à farmácia" />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Localização (Link Maps)</label>
                 <input className="w-full bg-slate-50 dark:bg-surface-container-highest border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium" placeholder="https://maps.app.goo.gl/..." />
               </div>
            </div>
            <div className="flex gap-4 pt-10">
               <button onClick={() => { setShowModal(false); setEditingClient(null); }} className="flex-1 bg-surface-container-high text-on-surface-variant font-black py-4 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-wider text-xs">Cancelar</button>
               <button className="flex-1 bg-primary text-white font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider text-xs shadow-lg">Salvar Registro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
