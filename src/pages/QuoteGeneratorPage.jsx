import { useState, useRef, useEffect } from 'react';

export default function QuoteGeneratorPage() {
  const [servicesBase, setServicesBase] = useState([]);
  
  useEffect(() => {
    // Load pricing config
    const stored = JSON.parse(localStorage.getItem('@EDLimp:Services')) || [];
    setServicesBase(stored);
  }, []);

  const [quoteData, setQuoteData] = useState({
    client: '',
    address: '',
    date: new Date().toLocaleDateString('pt-BR'),
    photo: null,
    items: [],
  });

  const [selectedService, setSelectedService] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  
  // Editable footer fields
  const [termsText, setTermsText] = useState('Orçamento válido por 15 dias após a emissão. Aceitamos pagamentos via PIX ou Cartão em até 12x.');
  const [contactText, setContactText] = useState('edlimpclinical.com.br • (11) 9999-8888');

  const quoteRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
      setQuoteData({ ...quoteData, photo: file });
    }
  };

  const addItemToQuote = () => {
    const srv = servicesBase.find(s => s.type === selectedService);
    if (srv) {
      setQuoteData({
        ...quoteData,
        items: [...quoteData.items, { ...srv, key: Date.now() }]
      });
      setSelectedService('');
    }
  };

  const removeItem = (key) => {
    setQuoteData({
      ...quoteData,
      items: quoteData.items.filter(i => i.key !== key)
    });
  };

  const getTotal = () => {
    return quoteData.items.reduce((acc, curr) => acc + curr.price, 0);
  };

  const generatePDF = () => {
    const element = quoteRef.current;
    
    // We check if html2pdf is in window, if not, wait or simulate
    if (window.html2pdf) {
      const opt = {
        margin:       1,
        filename:     `Orcamento_${quoteData.client || 'EDLimp'}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      window.html2pdf().set(opt).from(element).save();
    } else {
      alert("Biblioteca de PDF carregando, por favor adicione a tag html2pdf via CDN no index.html ou reinicie a página.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto grid grid-cols-12 gap-8">
      {/* Configuration Form */}
      <div className="col-span-12 lg:col-span-5 space-y-6">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-primary">Criador de Orçamento</h2>
          <p className="text-on-surface-variant font-body text-sm mt-1">Monte o escopo de atendimento e gere o orçamento.</p>
        </div>

        <div className="bg-white dark:bg-surface-container p-6 rounded-2xl shadow-subtle border border-outline-variant/10 space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Nome do Cliente</label>
            <input 
              value={quoteData.client} 
              onChange={e => setQuoteData({...quoteData, client: e.target.value})} 
              className="w-full bg-surface-container-low dark:bg-surface-container-highest border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="Ex: João da Silva" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Endereço / Localidade</label>
            <input 
              value={quoteData.address} 
              onChange={e => setQuoteData({...quoteData, address: e.target.value})} 
              className="w-full bg-surface-container-low dark:bg-surface-container-highest border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all" 
              placeholder="Bairro ou Rua para logística" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Foto da Peça / Móvel (Opcional)</label>
            <div className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 text-center hover:bg-surface-container transition-all cursor-pointer relative shadow-sm">
              <input type="file" onChange={handlePhotoUpload} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="max-h-32 mx-auto rounded-xl shadow-premium" />
              ) : (
                <div className="flex flex-col items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-3xl mb-2 text-primary/40">add_a_photo</span>
                  <span className="text-[10px] font-black uppercase tracking-wider">Clique para adicionar imagem</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 space-y-4">
          <h3 className="text-[10px] font-black uppercase text-primary tracking-widest">Adicionar Serviços</h3>
          <div className="flex gap-2">
            <select 
              value={selectedService} 
              onChange={e => setSelectedService(e.target.value)} 
              className="flex-1 bg-surface-container-high border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 text-on-surface"
            >
              <option value="">Selecione um móvel/objeto</option>
              {servicesBase.map(s => (
                <option key={s.id} value={s.type}>{s.type} - R$ {Number(s.price).toFixed(2)}</option>
              ))}
            </select>
            <button 
              onClick={addItemToQuote}
              className="bg-primary text-on-primary font-black p-2 px-4 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/10"
            >
              <span className="material-symbols-outlined align-middle">add</span>
            </button>
          </div>

          <div className="mt-4 space-y-2">
             {quoteData.items.map(item => (
                <div key={item.key} className="flex justify-between items-center bg-surface-container-highest px-4 py-3 rounded-2xl border border-outline-variant/5 shadow-sm">
                  <span className="font-black text-[10px] uppercase text-on-surface tracking-widest">{item.type}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-secondary text-xs">R$ {Number(item.price).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.key)} className="text-error opacity-60 hover:opacity-100 transition-all p-1 hover:bg-error/10 rounded-full">
                      <span className="material-symbols-outlined text-sm align-middle">close</span>
                    </button>
                  </div>
                </div>
             ))}
          </div>
        </div>

        <div className="bg-surface-container p-6 rounded-2xl shadow-sm border border-outline-variant/10 space-y-4">
          <h3 className="text-[10px] font-black uppercase text-primary tracking-widest mb-2">Informações do Rodapé</h3>
          <div>
            <label className="block text-[9px] font-black uppercase text-on-surface-variant/60 mb-1 tracking-widest">Termos e Condições</label>
            <textarea 
              value={termsText} 
              onChange={e => setTermsText(e.target.value)} 
              className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-primary/20 h-16 resize-none text-on-surface" 
            />
          </div>
          <div>
            <label className="block text-[9px] font-black uppercase text-on-surface-variant/60 mb-1 tracking-widest">Rodapé / Contato</label>
            <input 
              value={contactText} 
              onChange={e => setContactText(e.target.value)} 
              className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-primary/20 text-on-surface" 
            />
          </div>
        </div>
        
        <button 
          onClick={generatePDF}
          className="w-full bg-primary text-on-primary font-black py-4 rounded-2xl shadow-premium hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2 uppercase tracking-widest text-xs hover-lift"
        >
          <span className="material-symbols-outlined">picture_as_pdf</span>
          Gerar Orçamento em PDF
        </button>
      </div>

      {/* PDF Visual Previewer */}
      <div className="col-span-12 lg:col-span-7 bg-surface-container-highest p-8 rounded-lg overflow-auto flex justify-center items-start border border-outline-variant/10 shadow-inner">
         <div 
           ref={quoteRef} 
           className="bg-white p-10 w-[794px] max-w-full shadow-2xl relative min-h-[1000px] text-on-surface"
           style={{ fontFamily: "'Inter', sans-serif" }} // Safe font for PDF
         >
            {/* PDF Header */}
            <div className="flex justify-between items-start border-b-4 border-primary pb-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary-container rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-primary">sanitizer</span>
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-primary tracking-tight">ED Limp</h1>
                  <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-1">Especialistas em Limpeza e Proteção</p>
                </div>
              </div>
              <div className="text-right text-xs text-on-surface-variant font-medium">
                <p>Data do Orçamento:</p>
                <p className="font-bold text-primary text-sm">{quoteData.date}</p>
              </div>
            </div>

            {/* Client Info */}
            <div className="mb-10 text-sm">
                <p className="font-bold text-primary mb-1 uppercase tracking-wider text-xs">Dados do Cliente</p>
                <p className="text-xl font-bold text-on-surface">{quoteData.client || 'NOME DO CLIENTE'}</p>
                <p className="text-on-surface-variant">{quoteData.address || 'ENDEREÇO'}</p>
            </div>

            {/* Photo Section */}
            {photoPreview && (
              <div className="mb-10 text-center">
                 <p className="font-bold text-primary mb-2 text-left uppercase tracking-wider text-xs">Referência Fotográfica</p>
                 <img src={photoPreview} alt="Móvel do Cliente" className="max-w-full max-h-64 rounded-lg shadow-md mx-auto" />
              </div>
            )}

            {/* Summary Table */}
            <div className="mb-10">
               <p className="font-bold text-primary mb-4 uppercase tracking-wider text-xs">Itens e Serviços Propostos</p>
               <table className="w-full text-left text-sm">
                 <thead>
                   <tr className="bg-surface-container-low text-on-surface border-b border-outline-variant/20">
                     <th className="py-3 px-4 font-bold">Descrição do Serviço (Higienização/Impermeabilização)</th>
                     <th className="py-3 px-4 text-right font-bold w-32">Valor Unitário</th>
                   </tr>
                 </thead>
                 <tbody>
                   {quoteData.items.length === 0 ? (
                     <tr>
                       <td colSpan="2" className="py-4 text-center text-on-surface-variant text-xs italic">Adicione serviços ao escopo ao lado.</td>
                     </tr>
                   ) : (
                     quoteData.items.map(item => (
                       <tr key={item.key} className="border-b border-outline-variant/10">
                         <td className="py-4 px-4">{item.type}</td>
                         <td className="py-4 px-4 text-right font-medium text-on-surface-variant">R$ {Number(item.price).toFixed(2)}</td>
                       </tr>
                     ))
                   )}
                 </tbody>
               </table>
            </div>

            {/* Total Footer */}
            <div className="flex justify-end pt-4 pb-12 border-t border-outline-variant/20">
              <div className="bg-surface-container-low px-8 py-4 rounded-xl shadow-sm text-right min-w-[250px]">
                <p className="text-xs uppercase font-bold text-on-surface-variant tracking-wider mb-1">Investimento Total</p>
                <p className="text-3xl font-black text-primary">R$ {getTotal().toFixed(2)}</p>
              </div>
            </div>

            {/* Validity Footer */}
            <div className="absolute bottom-10 left-10 right-10 border-t border-outline-variant/20 pt-4 text-center">
              <p className="text-[10px] text-on-surface-variant">{termsText}</p>
              <p className="text-[10px] font-bold text-primary mt-1">{contactText}</p>
            </div>
         </div>
      </div>
    </div>
  );
}
