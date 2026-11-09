import { useState, useRef, useEffect } from 'react';

export default function OSGeneratorPage() {
  const [servicesBase, setServicesBase] = useState([]);
  const [showPrintMode, setShowPrintMode] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    cnpj: '58.330.125/0001-44',
    nomeFantasia: 'ED Limp Higienização e Impermeabilização',
    razaoSocial: 'ED LIMP SOLUCOES CLINICAS LTDA',
    inscricaoMunicipal: '07.994.120/001-90',
    telefone: '(61) 99565-9224',
    email: 'contato@edlimp.com.br',
    cidade: 'Brasília - DF'
  });

  const [items, setItems] = useState([
    { service: 'Higienização Clínica Profunda', dimension: 'Sofá Retrátil 3 Lugares', price: 450 }
  ]);
  
  const [clientData, setClientData] = useState({
    name: '', 
    address: '', 
    phone: '', 
    email: '', 
    cpfCnpj: '', 
    obs: '',
    technician: 'Fellipe (Técnico Responsável)',
    date: new Date().toLocaleDateString('pt-BR'),
  });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('@EDLimp:Services')) || [];
      if (stored.length > 0) setServicesBase(stored);

      const storedCompany = JSON.parse(localStorage.getItem('@EDLimp:Company'));
      if (storedCompany && (storedCompany.cnpj || storedCompany.nomeFantasia)) {
        setCompanyInfo(prev => ({ ...prev, ...storedCompany }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const formatCurrency = (value) => {
    const num = Number(value) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num);
  };

  const handlePriceChange = (idx, value) => {
    const cleanValue = value.replace(/\D/g, '');
    const newItems = [...items];
    newItems[idx].price = Number(cleanValue) / 100;
    setItems(newItems);
  };

  const handlePrint = () => {
    setShowPrintMode(true);
    setTimeout(() => {
      window.print();
      setShowPrintMode(false);
    }, 400);
  };

  const getTotal = () => {
    return items.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto font-body">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-outline-variant/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-wider font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">handyman</span> Operações de Campo
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Brasília & Entorno</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight font-headline">
            Ordem de Serviço (OS)
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-sm font-medium mt-0.5">
            Preencha os dados de execução técnica e imprima com a logo e dados fiscais da ED Limp.
          </p>
        </div>

        <button 
          onClick={handlePrint}
          className="bg-primary text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base font-black">print</span>
          <span>Imprimir / Gerar OS</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Formulário de Configuração (Esquerda) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Card 1: Dados do Cliente */}
          <section className="bg-surface dark:bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20 space-y-4">
            <h3 className="text-base font-black text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">person</span>
              Identificação do Cliente
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Nome Completo
                </label>
                <input 
                  type="text"
                  value={clientData.name}
                  onChange={e => setClientData({ ...clientData, name: e.target.value })}
                  placeholder="Ex: Juliana Paes"
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input 
                    type="text"
                    value={clientData.phone}
                    onChange={e => setClientData({ ...clientData, phone: e.target.value })}
                    placeholder="(61) 99565-9224"
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                    CPF ou CNPJ
                  </label>
                  <input 
                    type="text"
                    value={clientData.cpfCnpj}
                    onChange={e => setClientData({ ...clientData, cpfCnpj: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Endereço de Execução
                </label>
                <input 
                  type="text"
                  value={clientData.address}
                  onChange={e => setClientData({ ...clientData, address: e.target.value })}
                  placeholder="Ex: SQS 308 Bloco F, Asa Sul, Brasília - DF"
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                    Técnico Responsável
                  </label>
                  <input 
                    type="text"
                    value={clientData.technician}
                    onChange={e => setClientData({ ...clientData, technician: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                    Data do Serviço
                  </label>
                  <input 
                    type="text"
                    value={clientData.date}
                    onChange={e => setClientData({ ...clientData, date: e.target.value })}
                    className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Observações Técnicas / Vistoria Prévia
                </label>
                <textarea 
                  rows={2}
                  value={clientData.obs}
                  onChange={e => setClientData({ ...clientData, obs: e.target.value })}
                  placeholder="Ex: Tecido em linho cru. Manchas de café pré-existentes na almofada esquerda."
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs font-medium text-on-surface focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>
          </section>

          {/* Card 2: Serviços Solicitados */}
          <section className="bg-surface dark:bg-surface-container rounded-2xl p-6 shadow-sm border border-outline-variant/20 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">cleaning_services</span>
                Serviços Solicitados
              </h3>
              <span className="text-xs font-mono font-bold text-on-surface-variant">
                Total: {formatCurrency(getTotal())}
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="p-3 bg-surface-container-low dark:bg-surface-container-high/40 rounded-xl border border-outline-variant/25 grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input 
                      type="text"
                      placeholder="Serviço"
                      value={item.service}
                      onChange={e => {
                        const newItems = [...items];
                        newItems[idx].service = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-surface-container dark:bg-slate-900 border border-outline-variant/30 rounded-lg px-3 py-2 text-xs font-black text-on-surface dark:text-white placeholder:text-on-surface-variant/40"
                    />
                  </div>

                  <div className="col-span-4">
                    <input 
                      type="text"
                      placeholder="Medida / Móvel"
                      value={item.dimension}
                      onChange={e => {
                        const newItems = [...items];
                        newItems[idx].dimension = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-surface-container dark:bg-slate-900 border border-outline-variant/30 rounded-lg px-3 py-2 text-xs font-black text-on-surface dark:text-white placeholder:text-on-surface-variant/40"
                    />
                  </div>

                  <div className="col-span-2">
                    <input 
                      type="text"
                      value={formatCurrency(item.price)}
                      onChange={e => handlePriceChange(idx, e.target.value)}
                      className="w-full bg-surface-container dark:bg-slate-900 border border-outline-variant/30 rounded-lg px-2 py-2 text-xs font-mono font-black text-secondary text-right"
                    />
                  </div>

                  <div className="col-span-1 text-center">
                    <button 
                      type="button"
                      onClick={() => setItems(items.filter((_, i) => i !== idx))}
                      className="w-7 h-7 rounded-lg text-error hover:bg-error/10 flex items-center justify-center transition-colors mx-auto"
                      title="Excluir item"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              type="button"
              onClick={() => setItems([...items, { service: '', dimension: '', price: 0 }])}
              className="w-full py-3 border-2 border-dashed border-primary/30 rounded-xl text-primary font-black text-xs uppercase tracking-wider hover:bg-primary/5 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>Adicionar Mais Um Serviço</span>
            </button>
          </section>

        </div>

        {/* Pré-visualização da Folha A4 em Alto Contraste (Direita) */}
        <div className="lg:col-span-6 bg-slate-900 p-4 sm:p-6 rounded-2xl flex justify-center items-start overflow-x-auto border border-outline-variant/20 shadow-2xl">
          <div className="bg-white text-slate-950 p-8 sm:p-10 w-[720px] max-w-full rounded-xl shadow-xl min-h-[920px] flex flex-col justify-between">
            
            <div>
              {/* TOPO COM LOGO E CNPJ */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <img src="/logo-color.svg" alt="ED Limp" className="w-40 max-w-[170px] object-contain" />
                  <div className="border-l-2 border-slate-300 pl-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-800">{companyInfo.nomeFantasia}</p>
                    <p className="text-[9px] font-bold text-slate-500 font-mono">CNPJ: {companyInfo.cnpj || '58.330.125/0001-44'}</p>
                    <p className="text-[9px] text-slate-500 font-mono">Insc. Mun: {companyInfo.inscricaoMunicipal || '07.994.120/001-90'}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="bg-slate-950 text-white text-[10px] font-black uppercase px-3 py-1 rounded-md">
                    Ordem de Serviço
                  </span>
                  <p className="text-xs font-mono font-black text-slate-900 mt-2">OS Nº #{Math.floor(1000 + Math.random() * 9000)}</p>
                  <p className="text-[10px] text-slate-600 font-mono">Data: {clientData.date}</p>
                </div>
              </div>

              {/* DADOS DO CLIENTE */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Dados do Cliente & Local de Atendimento</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Nome</span>
                    <strong className="text-slate-900 text-sm">{clientData.name || 'Nome do Cliente'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Telefone / WhatsApp</span>
                    <strong className="text-slate-900 font-mono">{clientData.phone || '(61) 99565-9224'}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Endereço de Execução</span>
                    <p className="text-slate-800 font-medium">{clientData.address || 'Endereço Completo em Brasília / DF'}</p>
                  </div>
                  {clientData.cpfCnpj && (
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">CPF / CNPJ</span>
                      <strong className="text-slate-900 font-mono">{clientData.cpfCnpj}</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Técnico Responsável</span>
                    <strong className="text-slate-900">{clientData.technician}</strong>
                  </div>
                </div>
              </div>

              {/* TABELA DE SERVIÇOS EXECUTADOS */}
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Escopo Técnico dos Serviços</p>
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Item / Tratamento Clínico</th>
                      <th className="py-2.5 px-3">Medida / Móvel</th>
                      <th className="py-2.5 px-3 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{it.service || 'Serviço de Higienização'}</td>
                        <td className="py-2.5 px-3 text-slate-700">{it.dimension || '---'}</td>
                        <td className="py-2.5 px-3 text-right font-black font-mono text-slate-950">{formatCurrency(it.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* TOTAL */}
              <div className="flex justify-end mb-6">
                <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-300 text-right min-w-[200px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Valor Total do Atendimento</span>
                  <strong className="text-2xl font-black text-slate-950 font-mono">{formatCurrency(getTotal())}</strong>
                </div>
              </div>

              {/* VISTORIA E OBSERVAÇÕES */}
              {clientData.obs && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 mb-6 text-xs text-amber-900">
                  <strong className="block text-[10px] uppercase font-black text-amber-800 tracking-wider mb-0.5">Observações de Vistoria Prévia:</strong>
                  {clientData.obs}
                </div>
              )}

              {/* CAMPOS DE ASSINATURA */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-300 mt-6">
                <div className="text-center">
                  <div className="border-b border-slate-400 mb-1 h-10"></div>
                  <p className="text-[10px] font-black uppercase text-slate-700">{clientData.name || 'Assinatura do Cliente'}</p>
                  <p className="text-[9px] text-slate-400">Cliente / Responsável</p>
                </div>
                <div className="text-center">
                  <div className="border-b border-slate-400 mb-1 h-10"></div>
                  <p className="text-[10px] font-black uppercase text-slate-700">{clientData.technician}</p>
                  <p className="text-[9px] text-slate-400">ED Limp - Técnico Certificado</p>
                </div>
              </div>
            </div>

            {/* RODAPÉ COM CNPJ E CONTATO */}
            <div className="pt-4 border-t-2 border-slate-900 text-center text-[9px] text-slate-500 space-y-0.5 mt-8">
              <p className="font-bold text-slate-800">
                {companyInfo.nomeFantasia} • CNPJ: {companyInfo.cnpj || '58.330.125/0001-44'} • {companyInfo.cidade}
              </p>
              <p>
                Atendimento Técnico: {companyInfo.telefone} • {companyInfo.email} • Brasília - DF
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* TELA DE IMPRESSÃO PURA */}
      {showPrintMode && (
        <div className="fixed inset-0 z-[9999] bg-white p-8 overflow-y-auto">
          <div className="max-w-[780px] mx-auto bg-white text-slate-950 p-6">
            
            {/* TOPO COM LOGO E CNPJ */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <img src="/logo-color.svg" alt="ED Limp" className="w-44 object-contain" />
                <div className="border-l-2 border-slate-300 pl-3">
                  <p className="text-[11px] font-black uppercase text-slate-900">{companyInfo.nomeFantasia}</p>
                  <p className="text-[10px] font-bold text-slate-600 font-mono">CNPJ: {companyInfo.cnpj || '58.330.125/0001-44'}</p>
                  <p className="text-[10px] text-slate-600 font-mono">Inscrição Municipal: {companyInfo.inscricaoMunicipal || '07.994.120/001-90'}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="border-2 border-slate-900 text-slate-900 text-xs font-black uppercase px-3 py-1 rounded">
                  Ordem de Serviço
                </span>
                <p className="text-xs font-mono font-black text-slate-900 mt-2">OS Nº #{Math.floor(1000 + Math.random() * 9000)}</p>
                <p className="text-[10px] text-slate-600 font-mono">Data: {clientData.date}</p>
              </div>
            </div>

            {/* DADOS DO CLIENTE */}
            <div className="border border-slate-300 p-4 rounded-lg mb-6 text-xs">
              <p className="text-[10px] font-black uppercase text-slate-600 mb-2">Dados do Cliente & Local de Atendimento</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Nome</span>
                  <strong className="text-slate-900 text-sm">{clientData.name || '---'}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Telefone</span>
                  <strong className="text-slate-900 font-mono">{clientData.phone || '---'}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Endereço de Execução</span>
                  <p className="text-slate-800 font-medium">{clientData.address || '---'}</p>
                </div>
              </div>
            </div>

            {/* ITENS */}
            <table className="w-full text-left text-xs border border-slate-300 mb-6">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-[10px] uppercase">
                  <th className="p-2.5">Item / Serviço</th>
                  <th className="p-2.5">Medida</th>
                  <th className="p-2.5 text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="p-2.5 font-bold">{it.service}</td>
                    <td className="p-2.5">{it.dimension}</td>
                    <td className="p-2.5 text-right font-black font-mono">{formatCurrency(it.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTAL */}
            <div className="flex justify-end mb-8">
              <div className="border border-slate-300 p-3 rounded text-right min-w-[200px]">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Valor Total</span>
                <strong className="text-2xl font-black text-slate-950 font-mono">{formatCurrency(getTotal())}</strong>
              </div>
            </div>

            {/* ASSINATURAS */}
            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-slate-300 mt-8">
              <div className="text-center">
                <div className="border-b border-slate-400 mb-1 h-12"></div>
                <p className="text-xs font-bold text-slate-800">{clientData.name || 'Assinatura do Cliente'}</p>
                <p className="text-[10px] text-slate-500">Cliente / Contratante</p>
              </div>
              <div className="text-center">
                <div className="border-b border-slate-400 mb-1 h-12"></div>
                <p className="text-xs font-bold text-slate-800">{clientData.technician}</p>
                <p className="text-[10px] text-slate-500">ED Limp - Técnico Responsável</p>
              </div>
            </div>

            {/* RODAPÉ */}
            <div className="pt-6 border-t-2 border-slate-900 text-center text-[10px] text-slate-600 mt-10">
              <p className="font-bold text-slate-900">{companyInfo.nomeFantasia} • CNPJ: {companyInfo.cnpj || '58.330.125/0001-44'}</p>
              <p>Atendimento Técnico: {companyInfo.telefone} • {companyInfo.email} • Brasília - DF</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
