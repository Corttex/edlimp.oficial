import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { clearAllData, exportFullBackup } from '../lib/storage';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pricing'); // 'pricing' | 'team' | 'company' | 'system'
  const [editingStaff, setEditingStaff] = useState(null);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('@EDLimp:Company')) || {
        cnpj: '',
        inscricaoMunicipal: '',
        razaoSocial: '',
        nomeFantasia: ''
      };
    } catch {
      return { cnpj: '', inscricaoMunicipal: '', razaoSocial: '', nomeFantasia: '' };
    }
  });
  
  // PRICING STATE
  const [services, setServices] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('@EDLimp:Services')) || [
        { id: 1, type: 'Higienização de Sofá', price: 450, color: 'Geral', size: '3 lugares', fabric: 'Suede/Linho' },
        { id: 2, type: 'Impermeabilização Shield', price: 600, color: 'Geral', size: 'M²', fabric: 'Todos' },
      ];
    } catch {
      return [];
    }
  });
  const [newService, setNewService] = useState({ type: '', price: 0, color: '', size: '', fabric: '' });

  // TEAM STATE
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ name: '', role: 'secretaria', pin: '' });

  useEffect(() => {
    const storedProfiles = JSON.parse(localStorage.getItem('@EDLimp:Profiles') || '[]');
    setProfiles(storedProfiles);
  }, []);

  const handleAddService = () => {
    if (!newService.type) return;
    const updated = [...services, { id: Date.now(), ...newService, price: Number(newService.price) }];
    setServices(updated);
    localStorage.setItem('@EDLimp:Services', JSON.stringify(updated));
    setNewService({ type: '', price: 0, color: '', size: '', fabric: '' });
  };

  const handleRemoveService = (id) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    localStorage.setItem('@EDLimp:Services', JSON.stringify(updated));
  };

  const handleAddProfile = () => {
    if (newProfile.pin.length !== 4) return alert('O PIN deve ter 4 dígitos.');
    const perms = newProfile.role === 'dnei' 
      ? ['dashboard', 'schedule', 'inventory', 'finance', 'quote', 'clients', 'notes', 'settings'] 
      : ['dashboard', 'schedule', 'quote', 'clients', 'notes'];

    const updated = [...profiles, { ...newProfile, permissions: perms }];
    setProfiles(updated);
    localStorage.setItem('@EDLimp:Profiles', JSON.stringify(updated));
    setNewProfile({ name: '', role: 'secretaria', pin: '' });
  };

  const handleSaveCompany = () => {
    localStorage.setItem('@EDLimp:Company', JSON.stringify(companyInfo));
    alert('Dados da empresa salvos com sucesso!');
  };

  const handleExecuteReset = () => {
    if (resetConfirmText.trim().toUpperCase() !== 'ZERAR DADOS') {
      alert('Digite exatamente "ZERAR DADOS" para confirmar.');
      return;
    }
    clearAllData(true);
    setResetSuccess(true);
    setShowResetModal(false);
    setTimeout(() => {
      window.location.href = '/portal/dashboard';
    }, 1200);
  };

  if (user?.role !== 'master' && user?.role !== 'dnei') {
    return <div className="p-8 text-center"><p className="text-error font-bold">Acesso restrito. Módulo exclusivo para Administradores.</p></div>;
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 font-body">
      <header>
        <h2 className="text-2xl sm:text-3xl font-headline font-extrabold text-primary">Configurações & Gestão</h2>
        <p className="text-on-surface-variant text-xs sm:text-sm font-body mt-1">Configure tabelas de preços, colaboradores, empresa e manutenção da base de dados.</p>
      </header>

      {resetSuccess && (
        <div className="p-4 bg-secondary-container/40 border border-secondary text-secondary rounded-xl text-xs font-bold flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          Base de dados zerada com sucesso! Redirecionando para o Dashboard limpo...
        </div>
      )}

      <div className="flex space-x-2 border-b border-outline-variant/20 overflow-x-auto pb-1">
        <button 
          onClick={() => setActiveTab('pricing')}
          className={`pb-4 px-4 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${activeTab === 'pricing' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-lg">payments</span>
          Tabela de Serviços
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          className={`pb-4 px-4 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${activeTab === 'team' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-lg">badge</span>
          Gestão de Equipe
        </button>
        <button 
          onClick={() => setActiveTab('company')}
          className={`pb-4 px-4 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${activeTab === 'company' ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-lg">business</span>
          Gestão da Empresa
        </button>
        <button 
          onClick={() => setActiveTab('system')}
          className={`pb-4 px-4 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors ${activeTab === 'system' ? 'text-error border-b-2 border-error' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <span className="material-symbols-outlined align-middle mr-2 text-lg text-error">database</span>
          Base de Dados & Reset
        </button>
      </div>

      {activeTab === 'pricing' && (
        <section className="bg-surface dark:bg-surface-container p-6 sm:p-8 rounded-2xl shadow-subtle border border-outline-variant/10">
          <h3 className="font-bold text-primary text-xl mb-6">Valores Base de Serviços</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 bg-surface-container-low dark:bg-surface-container-high/40 p-4 rounded-2xl">
            <input value={newService.type} onChange={e => setNewService({...newService, type: e.target.value})} className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-xs sm:text-sm" placeholder="Serviço" />
            <input value={newService.size} onChange={e => setNewService({...newService, size: e.target.value})} className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-xs sm:text-sm" placeholder="Medida" />
            <input value={newService.fabric} onChange={e => setNewService({...newService, fabric: e.target.value})} className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-xs sm:text-sm" placeholder="Tecido" />
            <input value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} type="number" className="p-3 bg-surface-container rounded-xl border border-outline-variant/30 text-xs sm:text-sm" placeholder="Preço" />
            <button onClick={handleAddService} className="bg-primary text-slate-950 rounded-xl font-black py-3 hover:brightness-110 active:scale-95 transition-all text-[10px] uppercase tracking-widest shadow-lg">Adicionar</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant bg-surface-container-low dark:bg-surface-container-high/30 border-y border-outline-variant/10">
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
                    <td className="px-6 py-4 font-black text-secondary">R$ {Number(s.price).toFixed(2)}</td>
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
        <section className="bg-surface dark:bg-surface-container p-6 sm:p-8 rounded-2xl shadow-subtle border border-outline-variant/10">
          <h3 className="font-bold text-primary text-xl mb-6">Usuários e Colaboradores</h3>
          
          <div className="flex gap-4 mb-8 bg-surface-container-low dark:bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/10 items-end flex-wrap">
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
              <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">PIN (4 Dígitos)</label>
              <input value={newProfile.pin} onChange={e => setNewProfile({...newProfile, pin: e.target.value})} maxLength="4" className="w-full bg-surface-container border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 font-bold" placeholder="EX: 1234" />
            </div>
            <button onClick={handleAddProfile} className="bg-primary text-slate-950 font-black px-8 py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-[10px] uppercase tracking-widest shadow-lg">
              Criar Acesso
            </button>
          </div>

          <div className="space-y-4">
            {profiles.length === 0 ? (
              <p className="text-xs text-on-surface-variant italic">Nenhum colaborador extra cadastrado além do PIN mestre.</p>
            ) : (
              profiles.map((prof, idx) => (
                <div key={idx} className="bg-surface-container-low dark:bg-surface-container-high/40 p-5 rounded-2xl border border-outline-variant/10 flex justify-between items-center hover:bg-surface-container-high transition-all shadow-subtle group">
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
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {activeTab === 'company' && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-surface dark:bg-surface-container p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <h3 className="font-black text-primary text-xl mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">domain</span>
              Dados Cadastrais (MEI/ME)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Razão Social</label>
                <input value={companyInfo.razaoSocial} onChange={e => setCompanyInfo({...companyInfo, razaoSocial: e.target.value})} className="w-full bg-surface-container-high rounded-xl px-4 py-3 text-sm font-bold border border-outline-variant/20 focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="Ex: ED LIMP SOLUCOES CLINICAS LTDA" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">CNPJ</label>
                <input value={companyInfo.cnpj} onChange={e => setCompanyInfo({...companyInfo, cnpj: e.target.value})} className="w-full bg-surface-container-high rounded-xl px-4 py-3 text-sm font-bold border border-outline-variant/20 focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="00.000.000/0001-00" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Nome Fantasia</label>
                <input value={companyInfo.nomeFantasia} onChange={e => setCompanyInfo({...companyInfo, nomeFantasia: e.target.value})} className="w-full bg-surface-container-high rounded-xl px-4 py-3 text-sm font-bold border border-outline-variant/20 focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="Ex: ED Limp Higienização" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/40 mb-2 block tracking-widest">Inscrição Municipal</label>
                <input value={companyInfo.inscricaoMunicipal} onChange={e => setCompanyInfo({...companyInfo, inscricaoMunicipal: e.target.value})} className="w-full bg-surface-container-high rounded-xl px-4 py-3 text-sm font-bold border border-outline-variant/20 focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="0.000.000-0" />
              </div>
            </div>
            <button onClick={handleSaveCompany} className="mt-8 bg-primary text-slate-950 font-black px-8 py-3.5 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest">
              Salvar Dados da Empresa
            </button>
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
                className="bg-surface dark:bg-surface-container p-5 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
               >
                 <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined">{portal.icon}</span>
                 </div>
                 <h4 className="font-black text-primary text-sm mb-1">{portal.title}</h4>
                 <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{portal.desc}</p>
               </a>
             ))}
          </div>
        </section>
      )}

      {/* NOVO TAB: Base de Dados & Zerar Sistema */}
      {activeTab === 'system' && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Card de Backup */}
          <div className="bg-surface dark:bg-surface-container p-6 sm:p-8 rounded-2xl border border-outline-variant/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary">cloud_download</span>
                <h3 className="font-extrabold text-on-surface text-lg">Exportar Backup Completo</h3>
              </div>
              <p className="text-xs text-on-surface-variant max-w-xl">
                Baixe um arquivo JSON com todos os clientes, movimentações financeiras, produtos de estoque, notas e serviços cadastrados até o momento.
              </p>
            </div>
            <button 
              onClick={exportFullBackup}
              className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              Baixar Backup (.json)
            </button>
          </div>

          {/* Card de Zerar Dados (Reset) */}
          <div className="bg-error/5 dark:bg-error/10 border-2 border-error/30 p-6 sm:p-8 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-error/20 text-error rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-black text-error">Zerar Todos os Dados (Reset para Dados Reais)</h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  Esta ação remove todos os dados demonstrativos e registros de teste da base local: 
                  <strong> Clientes, Finanças, Estoque, Agenda e Notas</strong>.
                </p>
                <p className="text-xs text-on-surface mt-2 font-semibold">
                  ✓ As suas credenciais de Administrador (PIN 220022 / 0000) serão <u>preservadas</u>, garantindo que você nunca perca o acesso.
                </p>
                
                <div className="mt-6">
                  <button 
                    onClick={() => setShowResetModal(true)}
                    className="bg-error text-white font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-error/90 active:scale-95 transition-all shadow-md flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">delete_forever</span>
                    Zerar Todos os Dados Agora
                  </button>
                </div>
              </div>
            </div>
          </div>

        </section>
      )}

      {/* Modal de Confirmação Segura de Reset */}
      {showResetModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface dark:bg-surface-container max-w-md w-full rounded-2xl p-6 sm:p-8 border border-error/40 shadow-2xl space-y-4">
            <div className="w-12 h-12 bg-error/20 text-error rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">lock_reset</span>
            </div>
            <h4 className="text-lg font-black text-on-surface">Confirmação de Limpeza Geral</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Tem certeza de que deseja zerar a base para começar os lançamentos reais? Para confirmar a ação com total segurança, digite <span className="font-mono font-bold text-error">ZERAR DADOS</span> abaixo:
            </p>
            <input 
              type="text"
              value={resetConfirmText}
              onChange={(e) => setResetConfirmText(e.target.value)}
              placeholder="Digite: ZERAR DADOS"
              className="w-full bg-surface-container-high border border-error/40 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-error/20"
            />
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => { setShowResetModal(false); setResetConfirmText(''); }}
                className="flex-1 bg-surface-container-high text-on-surface-variant font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-surface-container-highest"
              >
                Cancelar
              </button>
              <button 
                onClick={handleExecuteReset}
                disabled={resetConfirmText.trim().toUpperCase() !== 'ZERAR DADOS'}
                className="flex-1 bg-error disabled:opacity-40 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-error/90 transition-all shadow-lg"
              >
                Confirmar e Zerar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
