import { useState, useEffect } from 'react';
import { getStoredClients, saveStoredClient, deleteStoredClient, exportFullBackup } from '../lib/storage';

export default function ClientsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cpf: '',
    address: '',
    reference: '',
    mapsUrl: ''
  });

  useEffect(() => {
    setClients(getStoredClients());
  }, []);

  const openNewClient = () => {
    setEditingClient(null);
    setFormData({ name: '', phone: '', cpf: '', address: '', reference: '', mapsUrl: '' });
    setShowModal(true);
  };

  const openEditClient = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      phone: client.phone || '',
      cpf: client.cpf || '',
      address: client.address || '',
      reference: client.reference || '',
      mapsUrl: client.mapsUrl || ''
    });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Por favor, informe o nome do cliente.');

    const clientToSave = {
      id: editingClient ? editingClient.id : undefined,
      ...formData,
      status: editingClient ? editingClient.status : 'Ativo'
    };

    const updated = saveStoredClient(clientToSave);
    setClients(updated);
    setShowModal(false);
    setEditingClient(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja remover este cliente?')) {
      const updated = deleteStoredClient(id);
      setClients(updated);
    }
  };

  const filteredClients = clients.filter(c => 
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.address || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone || '').includes(searchTerm)
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-primary">Gestão de Clientes</h2>
          <p className="text-on-surface-variant text-sm font-body mt-1">Base de clientes e leads persistida com segurança local e sincronizada.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="flex bg-surface-container items-center gap-2 px-6 py-3 rounded-full border border-outline-variant/10 shadow-subtle w-full sm:w-80 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
            <input 
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} 
              placeholder="Buscar por nome, fone ou região..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none" 
            />
          </div>
          <button 
            onClick={exportFullBackup} 
            title="Exportar Backup dos Dados em JSON"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-outline-variant/20 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Backup
          </button>
          <button onClick={openNewClient} className="bg-primary text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-premium hover-lift transition-all whitespace-nowrap">
            + Novo Cliente
          </button>
        </div>
      </header>

      <section className="bg-surface-container rounded-2xl shadow-subtle border border-outline-variant/10 overflow-hidden">
         <table className="w-full text-left text-sm">
           <thead className="bg-surface-container-low border-b border-outline-variant/10">
              <tr className="text-[9px] uppercase font-black tracking-widest text-on-surface-variant/70">
                <th className="py-3 px-6">Cliente</th>
                <th className="py-3 px-6">Contato</th>
                <th className="py-3 px-6 hidden md:table-cell">Endereço</th>
                <th className="py-3 px-6 text-center">Ações</th>
              </tr>
           </thead>
           <tbody>
             {filteredClients.map(c => (
                <tr key={c.id} className="border-b border-outline-variant/5 hover:bg-surface-container-lowest transition-colors">
                  <td className="py-3 px-6 font-bold text-primary text-sm">{c.name}</td>
                  <td className="py-3 px-6 text-on-surface-variant text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary/50">phone_iphone</span> 
                    <a href={`https://wa.me/55${(c.phone || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary">
                      {c.phone}
                    </a>
                  </td>
                  <td className="py-3 px-6 text-on-surface-variant text-xs">{c.address}</td>
                 <td className="py-4 px-6 text-center">
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => openEditClient(c)}
                      className="p-2 hover:bg-primary/10 rounded-full text-primary"
                      title="Editar"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(c.id)}
                      className="p-2 hover:bg-error/10 rounded-full text-error"
                      title="Excluir"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                 </td>
               </tr>
             ))}
             {filteredClients.length === 0 && (
               <tr>
                 <td colSpan="4" className="py-8 text-center text-on-surface-variant italic">Nenhum cliente cadastrado. Clique em "+ Novo Cliente" para adicionar.</td>
               </tr>
             )}
           </tbody>
         </table>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <form onSubmit={handleSave} className="bg-background w-full max-w-2xl rounded-2xl p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-outline-variant/10">
            <h3 className="text-2xl font-black text-primary mb-8">{editingClient ? 'Editar Cliente' : 'Adicionar Novo Lead/Cliente'}</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="col-span-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant mb-1.5 block tracking-widest">Nome Completo *</label>
                 <input 
                   required
                   value={formData.name} 
                   onChange={e => setFormData({ ...formData, name: e.target.value })}
                   className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 font-medium text-sm" 
                 />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-on-surface-variant mb-1.5 block tracking-widest">CPF/CNPJ</label>
                 <input 
                   value={formData.cpf} 
                   onChange={e => setFormData({ ...formData, cpf: e.target.value })}
                   className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 font-medium text-sm" 
                 />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-on-surface-variant mb-1.5 block tracking-widest">WhatsApp</label>
                 <input 
                   value={formData.phone} 
                   onChange={e => setFormData({ ...formData, phone: e.target.value })}
                   className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 font-medium text-sm" 
                   placeholder="(61) 9...."
                 />
               </div>
               <div className="col-span-2">
                 <label className="text-[10px] font-black uppercase text-on-surface-variant mb-1.5 block tracking-widest">Endereço Completo</label>
                 <input 
                   value={formData.address} 
                   onChange={e => setFormData({ ...formData, address: e.target.value })}
                   className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 font-medium text-sm" 
                 />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-on-surface-variant mb-1.5 block tracking-widest">Ponto de Referência</label>
                 <input 
                   value={formData.reference} 
                   onChange={e => setFormData({ ...formData, reference: e.target.value })}
                   className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 font-medium text-sm" 
                   placeholder="Ex: Próximo à farmácia" 
                 />
               </div>
               <div>
                 <label className="text-[10px] font-black uppercase text-on-surface-variant mb-1.5 block tracking-widest">Localização (Link Maps)</label>
                 <input 
                   value={formData.mapsUrl} 
                   onChange={e => setFormData({ ...formData, mapsUrl: e.target.value })}
                   className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 focus:ring-2 focus:ring-primary/20 font-medium text-sm" 
                   placeholder="https://maps.app.goo.gl/..." 
                 />
               </div>
            </div>
            <div className="flex gap-4 pt-10">
               <button type="button" onClick={() => { setShowModal(false); setEditingClient(null); }} className="flex-1 bg-surface-container-high text-on-surface-variant font-black py-4 rounded-2xl hover:bg-surface-container-highest transition-all uppercase tracking-wider text-xs">Cancelar</button>
               <button type="submit" className="flex-1 bg-primary text-white font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider text-xs shadow-lg">Salvar Registro</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
