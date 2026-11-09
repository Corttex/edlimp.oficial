import { useState, useRef, useEffect } from 'react';

export default function QuoteGeneratorPage() {
  const [servicesBase, setServicesBase] = useState([]);
  const [companyInfo, setCompanyInfo] = useState({
    cnpj: '58.330.125/0001-44',
    nomeFantasia: 'ED Limp Higienização e Impermeabilização',
    razaoSocial: 'ED LIMP SOLUCOES CLINICAS LTDA',
    inscricaoMunicipal: '07.994.120/001-90',
    telefone: '(61) 99565-9224',
    email: 'contato@edlimp.com.br',
    cidade: 'Brasília - DF'
  });

  const [quoteData, setQuoteData] = useState({
    client: '',
    phone: '',
    address: '',
    date: new Date().toLocaleDateString('pt-BR'),
    photo: null,
    items: [
      { key: 1, type: 'Higienização de Sofá Retrátil 3 Lugares', price: 380 }
    ],
  });

  const [selectedService, setSelectedService] = useState('');
  const [customServiceName, setCustomServiceName] = useState('');
  const [customServicePrice, setCustomServicePrice] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const [termsText, setTermsText] = useState('Orçamento válido por 15 dias após a emissão. Aceitamos pagamentos via PIX ou Cartão em até 12x.');
  
  const quoteRef = useRef(null);

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

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setQuoteData({ ...quoteData, photo: file });
    }
  };

  const addItemToQuote = () => {
    if (customServiceName && customServicePrice) {
      setQuoteData(prev => ({
        ...prev,
        items: [...prev.items, { key: Date.now(), type: customServiceName, price: Number(customServicePrice) }]
      }));
      setCustomServiceName('');
      setCustomServicePrice('');
      return;
    }

    const srv = servicesBase.find(s => s.type === selectedService);
    if (srv) {
      setQuoteData(prev => ({
        ...prev,
        items: [...prev.items, { ...srv, key: Date.now() }]
      }));
      setSelectedService('');
    }
  };

  const removeItem = (key) => {
    setQuoteData(prev => ({
      ...prev,
      items: prev.items.filter(i => i.key !== key)
    }));
  };

  const getTotal = () => {
    return quoteData.items.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
  };

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto font-body">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-outline-variant/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-wider font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">assignment</span> Orçamentos Comerciais
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Brasília & Entorno</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-primary tracking-tight font-headline">
            Criador de Orçamento
          </h2>
          <p className="text-on-surface-variant text-xs sm:text-sm font-medium mt-0.5">
            Gere propostas legíveis de alto padrão para envio rápido no WhatsApp ou impressão em PDF.
          </p>
        </div>

        <button 
          onClick={handlePrint}
          className="bg-primary text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-base font-black">print</span>
          <span>Imprimir / Salvar PDF</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Lado Esquerdo: Formulário */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card Cliente */}
          <div className="bg-surface dark:bg-surface-container p-6 rounded-2xl shadow-sm border border-outline-variant/20 space-y-4">
            <h3 className="text-sm font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-base">person</span>
              Dados do Cliente
            </h3>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Nome do Cliente
              </label>
              <input 
                type="text"
                value={quoteData.client} 
                onChange={e => setQuoteData({ ...quoteData, client: e.target.value })} 
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40" 
                placeholder="Ex: João da Silva" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Telefone / WhatsApp
              </label>
              <input 
                type="text"
                value={quoteData.phone} 
                onChange={e => setQuoteData({ ...quoteData, phone: e.target.value })} 
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40" 
                placeholder="(61) 99565-9224" 
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Endereço / Localidade
              </label>
              <input 
                type="text"
                value={quoteData.address} 
                onChange={e => setQuoteData({ ...quoteData, address: e.target.value })} 
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-3 text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/40" 
                placeholder="Ex: Asa Sul, Águas Claras, Lago Sul..." 
              />
            </div>

            {/* Foto opcional */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                Foto do Móvel / Estofado (Opcional)
              </label>
              <div className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-4 text-center hover:bg-surface-container-high transition-all cursor-pointer relative shadow-sm">
                <input type="file" onChange={handlePhotoUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                {photoPreview ? (
                  <div className="relative">
                    <img src={photoPreview} alt="Preview" className="max-h-36 mx-auto rounded-xl shadow-md object-contain" />
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setPhotoPreview(null); }}
                      className="absolute top-1 right-1 bg-error text-white p-1 rounded-full text-xs shadow-md"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-on-surface-variant py-2">
                    <span className="material-symbols-outlined text-3xl mb-1 text-primary">add_a_photo</span>
                    <span className="text-[10px] font-black uppercase tracking-wider">Clique para adicionar foto</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card Adicionar Serviços */}
          <div className="bg-surface dark:bg-surface-container p-6 rounded-2xl border border-outline-variant/20 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-base">add_circle</span>
              Adicionar Itens ao Orçamento
            </h3>

            {/* Inserir item personalizado */}
            <div className="space-y-2">
              <input 
                type="text"
                placeholder="Nome do serviço (ex: Sofá Retrátil 3L)"
                value={customServiceName}
                onChange={e => setCustomServiceName(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
              />
              <div className="flex gap-2">
                <input 
                  type="number"
                  placeholder="Preço R$"
                  value={customServicePrice}
                  onChange={e => setCustomServicePrice(e.target.value)}
                  className="flex-1 bg-surface-container-high border border-outline-variant/30 rounded-xl px-4 py-2.5 text-xs font-bold text-on-surface"
                />
                <button 
                  onClick={addItemToQuote}
                  className="bg-primary text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm font-black">add</span>
                  <span>Adicionar</span>
                </button>
              </div>
            </div>

            {/* Ou selecionar da tabela padrão */}
            {servicesBase.length > 0 && (
              <div className="pt-2 border-t border-outline-variant/15">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant/70 block mb-1">
                  Ou escolha da Tabela Cadastrada:
                </label>
                <div className="flex gap-2">
                  <select 
                    value={selectedService} 
                    onChange={e => setSelectedService(e.target.value)} 
                    className="flex-1 bg-surface-container-high border border-outline-variant/30 rounded-xl px-3 py-2 text-xs font-bold text-on-surface"
                  >
                    <option value="">Selecione um serviço pré-cadastrado...</option>
                    {servicesBase.map(s => (
                      <option key={s.id} value={s.type}>{s.type} - R$ {Number(s.price).toFixed(2)}</option>
                    ))}
                  </select>
                  <button 
                    onClick={addItemToQuote}
                    disabled={!selectedService}
                    className="bg-secondary-container text-on-secondary-container disabled:opacity-40 font-black px-4 py-2 rounded-xl text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Lista dos Itens Adicionados */}
            <div className="space-y-2 pt-2">
              {quoteData.items.map(item => (
                <div key={item.key} className="flex justify-between items-center bg-surface-container-low dark:bg-surface-container-high/60 px-4 py-2.5 rounded-xl border border-outline-variant/20 shadow-sm">
                  <div>
                    <p className="font-bold text-xs text-on-surface">{item.type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-secondary font-mono text-xs">{formatCurrency(item.price)}</span>
                    <button onClick={() => removeItem(item.key)} className="text-error hover:bg-error/10 p-1 rounded-full transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Termos de Validade */}
          <div className="bg-surface dark:bg-surface-container p-4 rounded-xl border border-outline-variant/20">
            <label className="block text-[10px] font-black uppercase text-on-surface-variant/70 mb-1">Termos e Condições do Orçamento</label>
            <textarea 
              rows={2}
              value={termsText}
              onChange={e => setTermsText(e.target.value)}
              className="w-full bg-surface-container-high border border-outline-variant/30 rounded-xl p-3 text-xs text-on-surface resize-none font-medium"
            />
          </div>

        </div>

        {/* Lado Direito: Folha do Orçamento em Alto Contraste */}
        <div className="lg:col-span-7 bg-slate-900 p-4 sm:p-6 rounded-2xl flex justify-center items-start overflow-x-auto border border-outline-variant/20 shadow-2xl">
          <div 
            ref={quoteRef} 
            className="bg-white text-slate-950 p-8 sm:p-10 w-[720px] max-w-full rounded-xl shadow-xl min-h-[920px] flex flex-col justify-between"
          >
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
                    Orçamento Comercial
                  </span>
                  <p className="text-xs font-mono font-black text-slate-900 mt-2">Nº #{Math.floor(1000 + Math.random() * 9000)}</p>
                  <p className="text-[10px] text-slate-600 font-mono">Data: {quoteData.date}</p>
                </div>
              </div>

              {/* DADOS DO CLIENTE */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Dados do Cliente</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Cliente</span>
                    <strong className="text-slate-900 text-sm">{quoteData.client || 'Nome do Cliente'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Telefone / WhatsApp</span>
                    <strong className="text-slate-900 font-mono">{quoteData.phone || '(61) 99565-9224'}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Localidade / Região</span>
                    <p className="text-slate-800 font-medium">{quoteData.address || 'Brasília - DF'}</p>
                  </div>
                </div>
              </div>

              {/* FOTO DO MÓVEL SE HOUVER */}
              {photoPreview && (
                <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-left">Foto de Referência do Estofado</p>
                  <img src={photoPreview} alt="Estofado" className="max-h-48 rounded-lg mx-auto object-contain shadow-sm" />
                </div>
              )}

              {/* TABELA DE SERVIÇOS PROPOSTOS */}
              <div className="mb-6">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider mb-2">Itens e Serviços Propostos</p>
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Descrição do Serviço</th>
                      <th className="py-2.5 px-3 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {quoteData.items.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="py-4 text-center text-slate-400 italic text-xs">
                          Nenhum serviço adicionado ainda.
                        </td>
                      </tr>
                    ) : (
                      quoteData.items.map(it => (
                        <tr key={it.key} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{it.type}</td>
                          <td className="py-2.5 px-3 text-right font-black font-mono text-slate-950">{formatCurrency(it.price)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* INVESTIMENTO TOTAL */}
              <div className="flex justify-end mb-6">
                <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 text-right min-w-[220px]">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Investimento Total</span>
                  <strong className="text-3xl font-black text-slate-950 font-mono">{formatCurrency(getTotal())}</strong>
                </div>
              </div>

              {/* TERMOS */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 mb-6">
                <strong className="text-[10px] font-black uppercase tracking-wider text-slate-700 block">Condições de Pagamento:</strong>
                <p>{termsText}</p>
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

    </div>
  );
}
