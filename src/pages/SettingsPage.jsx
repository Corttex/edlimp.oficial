import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pricing'); // 'pricing' | 'team' | 'company'
  const [editingStaff, setEditingStaff] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({
    cnpj: '',
    inscricaoMunicipal: '',
    razaoSocial: '',
    nomeFantasia: ''
  });
  
  // PRICING STATE
  const [services, setServices] = useState([
    { id: 1, type: 'Higienização de Sofá', price: 450, color: 'Geral', size: '3 lugares', fabric: 'Suede/Linho' },
    { id: 2, type: 'Impermeabilização Shield', price: 600, color: 'Geral', size: 'M²', fabric: 'Todos' },
  ]);
  const [newService, setNewService] = useState({ type: '', price: 0, color: '', size: '', fabric: '' });

  // TEAM STATE
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: '', role: 'secretaria', pin: '' });

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('@EDLimp:Profiles')) || [
      { name: 'Admin Local', role: 'dnei', pin: '0000' }
    ];
    setProfiles(storedProfiles);
  }, []);

  const handleAddService = () => {
    const updated = [...services, { id: Date.now(), ...newService, price: Number(newService.price) }];
    setServices(updated);
    setNewService({ type: '', price: 0, color: '', size: '', fabric: '' });
  };

  const handleRemoveService = (id) => {
    setServices(services.filter(s => s.id !== id));
  };

  const handleAddProfile = () => {
    if (newProfile.pin.length !== 4) return alert('O PIN deve ter 4 dígitos.');
    const perms = newProfile.role === 'dnei' 
      ? ['dashboard', 'schedule', 'inventory', 'finance', 'quote', 'clients', 'notes'] 
      : ['dashboard', 'schedule', 'quote', 'clients', 'notes'];

    const updated = [...profiles, { ...newProfile, permissions: perms }];
    setProfiles(updated);
    localStorage.setItem('@EDLimp:Profiles', JSON.stringify(updated));
    setNewProfile({ name: '', role: 'secretaria', pin: '' });
  };

  if (user?.role !== 'master' && user?.role !== 'dnei') {
    return <div className="p-8 text-center"><p className="text-error font-bold">Acesso restrito. Módulo exclusivo para Administradores.</p></div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-headline font-extrabold text-primary">Configurações & Gestão</h2>
        <p className="text-on-surface-variant text-sm font-body mt-1">Configure tabelas de preços e cadastre colaboradores.</p>
      </header>

      <div className="flex space-x-2 border-b border-outline-variant/20 mb-8">
        <button 
          onClick={() => setActiveTab('pricing')}
          className={`pb-4 px-4 font-bold text-sm transition-colors ${activeTab === 'pricing' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-lg">payments</span>
          Tabela de Serviços
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          className={`pb-4 px-4 font-bold text-sm transition-colors ${activeTab === 'team' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-lg">badge</span>
          Gestão de Equipe
        </button>
        <button 
          onClick={() => setActiveTab('company')}
          className={`pb-4 px-4 font-bold text-sm transition-colors ${activeTab === 'company' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-lg">business</span>
          Gestão da Empresa
        </button>
      </div>

      {activeTab === 'pricing' && (
        <section className="bg-surface-container p-8 rounded-2xl shadow-subtle border border-outline-variant/10">
          <h3 className="font-bold text-primary text-xl mb-6">Valores Base de Serviços</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 bg-surface-container-low p-4 rounded-2xl">
            <input value={newService.type} onChange={e => setNewService({...newService, type: e.target.value})} className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Serviço" />
            <input value={newService.size} onChange={e => setNewService({...newService, size: e.target.value})} className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Medida" />
            <input value={newService.fabric} onChange={e => setNewService({...newService, fabric: e.target.value})} className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Tecido" />
            <input value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} type="number" className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Preço" />
            <button onClick={handleAddService} className="bg-primary text-on-primary rounded-xl font-black py-3 hover:brightness-110 active:scale-95 transition-all text-[10px] uppercase tracking-widest shadow-lg">Adicionar</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant bg-surface-container-low border-y border-outline-variant/10">
                  <th className="px-6 py-4">Tipo de Serviço</th>
                  <th className="px-6 py-4">Medida/Ref</th>
                  <th className="px-6 py-4">Tecido Ref</th>
                  <th className="px-6 py-4">Valor Base</th>
                  <th className="px-6 py-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {services.map(s => (
                  <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 font-bold text-primary text-sm">{s.type}</td>
                    <td className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase">{s.size}</td>
                    <td className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase">{s.fabric}</td>
                    <td className="px-6 py-4 font-black text-secondary">R$ {s.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleRemoveService(s.id)} className="w-8 h-8 rounded-full flex items-center justify-center text-error hover:bg-error/10 transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'team' && (
        <section className="bg-surface-container p-8 rounded-2xl shadow-subtle border border-outline-variant/10">
          <h3 className="font-bold text-primary text-xl mb-6">Usuários e Colaboradores</h3>
          
          <div className="flex gap-4 mb-8 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 items-end flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Nome</label>
              <input value={newProfile.name} onChange={e => setNewProfile({...newProfile, name: e.target.value})} className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20" placeholder="Nome do funcionário" />
            </div>
            <div className="w-48">
              <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Perfil de Acesso</label>
              <select value={newProfile.role} onChange={e => setNewProfile({...newProfile, role: e.target.value})} className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20">
                <option value="secretaria">Secretária</option>
                <option value="dnei">Administrador</option>
              </select>
            </div>
            <div className="w-32">
              <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">PIN (4 Digitos)</label>
              <input value={newProfile.pin} onChange={e => setNewProfile({...newProfile, pin: e.target.value})} maxLength="4" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 font-bold" placeholder="EX: 1234" />
            </div>
            <button onClick={handleAddProfile} className="bg-primary text-on-primary font-black px-8 py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-[10px] uppercase tracking-widest shadow-lg">
              Criar Acesso
            </button>
          </div>

          <div className="space-y-4">
            {profiles.map((prof, idx) => (
              <div key={idx} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex justify-between items-center hover:bg-surface-container-high transition-all shadow-subtle group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary font-black text-lg">
                    {prof.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface flex items-center gap-2">
                      {prof.name} 
                      <span className="text-[9px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full uppercase font-black tracking-widest">{prof.role}</span>
                    </p>
                    <p className="text-[10px] font-black text-on-surface-variant/40 flex items-center gap-1 uppercase tracking-widest">
                      <span className="material-symbols-outlined text-sm">lock</span> PIN Ativo
                    </p>
                  </div>
                </div>
                {user.role === 'master' && (
                  <button 
                    onClick={() => setEditingStaff(prof)} 
                    className="w-10 h-10 rounded-full bg-surface-container border border-outline-variant/20 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'company' && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-surface-container p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <h3 className="font-black text-primary text-xl mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">domain</span>
              Dados Cadastrais (MEI/ME)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Razão Social</label>
                <input value={companyInfo.razaoSocial} onChange={e => setCompanyInfo({...companyInfo, razaoSocial: e.target.value})} className="w-full bg-surface-container-high rounded-2xl px-6 py-4 text-sm font-black border-none focus:ring-2 focus:ring-primary/20 placeholder:opacity-30 text-on-surface" placeholder="Ex: ED LIMP SOLUCOES CLINICAS LTDA" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">CNPJ</label>
                <input value={companyInfo.cnpj} onChange={e => setCompanyInfo({...companyInfo, cnpj: e.target.value})} className="w-full bg-surface-container-high rounded-2xl px-6 py-4 text-sm font-black border-none focus:ring-2 focus:ring-primary/20 placeholder:opacity-30 text-on-surface" placeholder="00.000.000/0001-00" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Nome Fantasia</label>
                <input value={companyInfo.nomeFantasia} onChange={e => setCompanyInfo({...companyInfo, nomeFantasia: e.target.value})} className="w-full bg-surface-container-high rounded-2xl px-6 py-4 text-sm font-black border-none focus:ring-2 focus:ring-primary/20 placeholder:opacity-30 text-on-surface" placeholder="Ex: ED Limp" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Inscrição Municipal</label>
                <input value={companyInfo.inscricaoMunicipal} onChange={e => setCompanyInfo({...companyInfo, inscricaoMunicipal: e.target.value})} className="w-full bg-surface-container-high rounded-2xl px-6 py-4 text-sm font-black border-none focus:ring-2 focus:ring-primary/20 placeholder:opacity-30 text-on-surface" placeholder="0.000.000-0" />
              </div>
            </div>
            <button className="mt-10 bg-primary text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest">Salvar Dados da Empresa</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { title: 'e-CAC Receita', desc: 'Acesso Federal', icon: 'account_balance', link: 'https://cav.receita.fazenda.gov.br/autenticacao/login' },
               { title: 'PGMEI Simples', desc: 'Identificação MEI', icon: 'id_card', link: 'https://www8.receita.fazenda.gov.br/SimplesNacional/Aplicacoes/ATSPO/pgmei.app/Identificacao' },
               { title: 'Emitir DAS', desc: 'Guia de Imposto', icon: 'receipt_long', link: 'https://www.gov.br/pt-br/servicos/emitir-das-para-pagamento-de-tributos-do-mei' },
               { title: 'NFS-e Nacional', desc: 'Emissão de Nota', icon: 'description', link: 'https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/nota-fiscal/nota-fiscal-de-servico-eletronica-nfs-e' },
             ].map((portal, idx) => (
               <a 
                key={idx} 
                href={portal.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white dark:bg-surface-container p-6 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
               >
                 <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined">{portal.icon}</span>
                 </div>
                 <h4 className="font-black text-primary text-sm mb-1">{portal.title}</h4>
                 <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{portal.desc}</p>
               </a>
             ))}
          </div>
        </section>
      )}

      {/* Permissions Modal */}
      {editingStaff && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
           <div className="bg-surface-container-low w-full max-w-lg rounded-2xl p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-outline-variant/10">
              <header className="mb-8">
                <h3 className="text-2xl font-black text-primary">Permissões de Acesso</h3>
                <p className="text-on-surface-variant/60 font-black text-[10px] uppercase tracking-widest mt-1">{editingStaff.name} • {editingStaff.role}</p>
              </header>
              <div className="space-y-3">
                 {['Dashboard', 'Agenda', 'Financeiro', 'Orçamentos', 'OS Generator', 'Marketing', 'Estoque', 'Clientes', 'Notas'].map(module => (
                   <label key={module} className="flex justify-between items-center bg-surface-container-high px-6 py-4 rounded-2xl border border-outline-variant/10 cursor-pointer hover:bg-surface-container-highest transition-all">
                      <span className="font-black text-on-surface text-xs uppercase tracking-widest">{module}</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded-lg border-outline-variant/20 text-primary focus:ring-primary/20 bg-surface-container" />
                   </label>
                 ))}
              </div>
              <div className="flex gap-4 pt-10">
                 <button onClick={() => setEditingStaff(null)} className="flex-1 bg-surface-container-high text-on-surface-variant font-black py-4 rounded-2xl hover:bg-surface-container-highest transition-all uppercase tracking-widest text-[10px]">Cancelar</button>
                 <button onClick={() => setEditingStaff(null)} className="flex-1 bg-primary text-on-primary font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-all uppercase tracking-widest text-[10px]">Salvar Acessos</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
