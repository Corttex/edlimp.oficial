import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || '',
    company: {
      name: user?.company?.name || '',
      cnpj: user?.company?.cnpj || '',
      type: user?.company?.type || 'MEI',
      uf: user?.company?.uf || 'SP',
      address: user?.company?.address || '',
    }
  });

  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const govLinks = {
    SP: {
      sefaz: 'https://www.fazenda.sp.gov.br/',
      receita: 'https://www.gov.br/receitafederal/pt-br',
      das: 'https://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes/atps/pgmei.app/default.aspx',
    },
    RJ: {
      sefaz: 'https://www.fazenda.rj.gov.br/',
      receita: 'https://www.gov.br/receitafederal/pt-br',
      das: 'https://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes/atps/pgmei.app/default.aspx',
    },
    // Default fallback
    DEFAULT: {
      sefaz: 'https://www.gov.br/pt-br/temas/servicos-sefaz',
      receita: 'https://www.gov.br/receitafederal/pt-br',
      das: 'https://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes/atps/pgmei.app/default.aspx',
    }
  };

  const activeLinks = govLinks[formData.company.uf] || govLinks.DEFAULT;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-10 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary mb-2">Perfil & Empresa</h1>
          <p className="text-slate-500">Gerencie seus dados pessoais e fiscais da empresa</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">edit</span> Editar Perfil
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-surface-container text-on-surface px-6 py-2.5 rounded-full font-bold hover:bg-surface-container-high transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition-all active:scale-95"
            >
              Salvar Alterações
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant/10 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10 mx-auto">
                <img 
                   src={formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <div className="absolute bottom-1 right-1 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg border border-outline-variant/20 cursor-pointer hover:bg-slate-50 transition-all active:scale-90">
                  <span className="material-symbols-outlined text-primary text-lg">photo_camera</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleAvatarChange}
                  />
                </div>
              )}
            </div>
            
            {!isEditing ? (
              <>
                <h2 className="text-xl font-bold text-on-surface mb-1">{formData.name}</h2>
                <p className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full inline-block">
                  {user?.role}
                </p>
              </>
            ) : (
              <div className="space-y-4 text-left">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Nome Completo</label>
                  <input 
                    className="w-full bg-surface-container border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-outline-variant/10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-500 group cursor-pointer hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <span className="font-medium">Identidade Verificada</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 group cursor-pointer hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">lock</span>
                <span className="font-medium" onClick={() => alert('PIN pode ser alterado no menu superior')}>PIN Ativo (4 dígitos)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Data */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">business</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">Dados Corporativos (MEI/ME)</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Nome da Empresa / Fantasia</label>
                  <input 
                    className={`w-full ${isEditing ? 'bg-surface-container' : 'bg-transparent'} border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 transition-all font-medium`}
                    value={formData.company.name}
                    readOnly={!isEditing}
                    onChange={(e) => setFormData({...formData, company: {...formData.company, name: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">CNPJ</label>
                  <input 
                    className={`w-full ${isEditing ? 'bg-surface-container' : 'bg-transparent'} border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 transition-all font-medium`}
                    value={formData.company.cnpj}
                    readOnly={!isEditing}
                    onChange={(e) => setFormData({...formData, company: {...formData.company, cnpj: e.target.value}})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Tipo de Regime</label>
                  <select 
                    className={`w-full ${isEditing ? 'bg-surface-container' : 'bg-transparent'} border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none`}
                    value={formData.company.type}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, company: {...formData.company, type: e.target.value}})}
                  >
                    <option value="MEI">MEI - Microempreendedor Individual</option>
                    <option value="ME">ME - Micro Empresa</option>
                    <option value="EPP">EPP - Empresa de Pequeno Porte</option>
                    <option value="PF">Pessoa Física / Autônomo</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Estado (UF)</label>
                  <select 
                    className={`w-full ${isEditing ? 'bg-surface-container' : 'bg-transparent'} border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none`}
                    value={formData.company.uf}
                    disabled={!isEditing}
                    onChange={(e) => setFormData({...formData, company: {...formData.company, uf: e.target.value}})}
                  >
                    {ufs.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-1 block">Endereço Comercial</label>
                <input 
                  className={`w-full ${isEditing ? 'bg-surface-container' : 'bg-transparent'} border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 transition-all font-medium`}
                  value={formData.company.address}
                  readOnly={!isEditing}
                  onChange={(e) => setFormData({...formData, company: {...formData.company, address: e.target.value}})}
                />
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-2xl border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">account_balance</span>
              </div>
              <h2 className="text-xl font-bold text-on-surface">Links Rápidos Governamentais ({formData.company.uf})</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href={activeLinks.sefaz} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-surface-container rounded-2xl hover:bg-primary hover:text-white transition-all group scale-100 active:scale-95"
              >
                <span className="material-symbols-outlined text-3xl mb-3 text-primary group-hover:text-white">account_balance_wallet</span>
                <span className="font-bold text-sm">SEFAZ {formData.company.uf}</span>
                <span className="text-[10px] uppercase tracking-tighter opacity-70 mt-1 text-center">Consulta de Notas e Impostos</span>
              </a>
              <a 
                href={activeLinks.das} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-surface-container rounded-2xl hover:bg-secondary hover:text-on-secondary transition-all group scale-100 active:scale-95"
              >
                <span className="material-symbols-outlined text-3xl mb-3 text-secondary group-hover:text-on-secondary">description</span>
                <span className="font-bold text-sm">Gerar DAS</span>
                <span className="text-[10px] uppercase tracking-tighter opacity-70 mt-1 text-center">Pagamento Mensal Simples</span>
              </a>
              <a 
                href={activeLinks.receita} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-surface-container rounded-2xl hover:bg-slate-800 hover:text-white transition-all group scale-100 active:scale-95"
              >
                <span className="material-symbols-outlined text-3xl mb-3 text-slate-500 group-hover:text-white">assured_workload</span>
                <span className="font-bold text-sm">Receita Federal</span>
                <span className="text-[10px] uppercase tracking-tighter opacity-70 mt-1 text-center">IRPF e Situação Cadastral</span>
              </a>
            </div>
            
            <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-xs text-on-surface-variant flex gap-2 items-start">
                <span className="material-symbols-outlined text-primary text-base">info</span>
                Estes links são gerados automaticamente com base na Unidade Federativa (UF) do seu cadastro de empresa. 
                Certifique-se de manter seus dados atualizados para links mais precisos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
