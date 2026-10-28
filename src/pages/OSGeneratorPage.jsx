import { useState, useRef, useEffect } from 'react';

export default function OSGeneratorPage() {
  const [servicesBase, setServicesBase] = useState([]);
  const [showPrintMode, setShowPrintMode] = useState(false);
  const [items, setItems] = useState([
    { service: 'Higienização Profunda', dimension: '3-lugares', price: 450 }
  ]);
  const [clientData, setClientData] = useState({
    name: '', address: '', phone: '', email: '', cnpj: '', obs: '',
    location: null
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('@EDLimp:Services')) || [];
    setServicesBase(stored);
  }, []);

  const formatCurrency = (value) => {
    const cleanValue = value.toString().replace(/\D/g, '');
    const numberValue = (Number(cleanValue) / 100);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue);
  };

  const handlePriceChange = (idx, value) => {
    const cleanValue = value.replace(/\D/g, '');
    const newItems = [...items];
    newItems[idx].price = Number(cleanValue) / 100;
    setItems(newItems);
  };

  const loadLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setClientData(prev => ({
          ...prev,
          location: { lat: position.coords.latitude, lng: position.coords.longitude }
        }));
      });
    }
  };

  const handlePrint = () => {
    setShowPrintMode(true);
    setTimeout(() => {
      window.print();
      setShowPrintMode(false);
    }, 500);
  };

  const [osData, setOsData] = useState({
    client: '',
    address: '',
    phone: '',
    technician: '',
    conditions: '',
    date: new Date().toLocaleDateString('pt-BR'),
  });

  const [selectedService, setSelectedService] = useState('');
  const osRef = useRef(null);

  const [warrantyText, setWarrantyText] = useState('Declaro que os serviços descritos acima foram executados e testados. A ED Limp oferece garantia de 12 meses na impermeabilização. Tempo de secagem estimado: 8h a 12h. O surgimento de manchas antigas ou danos pré-existentes não são cobertos pela garantia do serviço executado hoje.');
  const [contactText, setContactText] = useState('edlimpclinical.com.br • (11) 9999-8888');

  const getTotal = () => {
    return items.reduce((acc, curr) => acc + curr.price, 0);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black text-primary -tracking-wider">ED Limp - Soluções Premium</h2>
          <p className="text-on-surface-variant font-bold uppercase tracking-widest text-[10px] mt-1">Gerador Oficial de Ordem de Serviço</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-primary text-on-primary font-black px-8 py-3 rounded-2xl shadow-premium hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center gap-2 hover-lift"
        >
          <span className="material-symbols-outlined">print</span>
          Gerar/Imprimir Ordem de Serviço
        </button>
      </header>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-7 space-y-10">
          <section className="bg-white dark:bg-surface-container rounded-2xl p-10 shadow-subtle border border-outline-variant/10">
            <h3 className="text-lg font-black text-primary mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">person</span>
              Dados do Paciente/Cliente
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Nome Completo</label>
                <input className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium" placeholder="Ex: Juliana Paes" onChange={e => setClientData({...clientData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Endereço</label>
                <div className="relative">
                  <input className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 font-medium pr-12" placeholder="Loura, Itaim Bibi, 402" onChange={e => setClientData({...clientData, address: e.target.value})} />
                  <button 
                    onClick={loadLocation}
                    className="absolute right-2 top-2 p-2 hover:bg-primary/10 rounded-xl text-primary transition-colors"
                    title="Capturar Localização Atual"
                  >
                    <span className="material-symbols-outlined">my_location</span>
                  </button>
                </div>
              </div>
              <div className="bg-slate-100 rounded-2xl overflow-hidden relative">
                 {clientData.location ? (
                   <img 
                     src={`https://maps.googleapis.com/maps/api/staticmap?center=${clientData.location.lat},${clientData.location.lng}&zoom=15&size=400x200&markers=color:red%7C${clientData.location.lat},${clientData.location.lng}&key=MOCK_KEY`} 
                     className="w-full h-full object-cover" 
                     alt="Mapa" 
                   />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px] uppercase font-black">
                     <span className="material-symbols-outlined text-2xl mb-1">map</span>
                     Localização não capturada
                   </div>
                 )}
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-surface-container rounded-2xl p-10 shadow-subtle border border-outline-variant/10">
            <h3 className="text-lg font-black text-primary mb-8">Serviços Solicitados</h3>
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 gap-4 mb-4">
                <input className="col-span-5 bg-slate-50 border-none rounded-xl p-3 text-sm font-bold" placeholder="Serviço" value={item.service} onChange={e => {
                  const newItems = [...items];
                  newItems[idx].service = e.target.value;
                  setItems(newItems);
                }} />
                <input className="col-span-4 bg-slate-50 border-none rounded-xl p-3 text-sm font-bold" placeholder="Tamanho/Medida" value={item.dimension} onChange={e => {
                  const newItems = [...items];
                  newItems[idx].dimension = e.target.value;
                  setItems(newItems);
                }} />
                <input 
                  className="col-span-2 bg-slate-50 dark:bg-surface-container-highest border-none rounded-xl p-3 text-sm font-bold text-secondary" 
                  type="text" 
                  placeholder="R$" 
                  value={formatCurrency(item.price * 100)} 
                  onChange={e => handlePriceChange(idx, e.target.value)} 
                />
                <button className="col-span-1 text-error" onClick={() => setItems(items.filter((_, i) => i !== idx))}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
            <button onClick={() => setItems([...items, { service: '', dimension: '', price: 0 }])} className="w-full mt-6 py-4 border-2 border-dashed border-primary/20 rounded-2xl text-primary font-black text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-sm inline-block translate-y-0.5 mr-2">add</span>
              Adicionar mais um Serviço
            </button>
          </section>
        </div>
      </div>

      {showPrintMode && (
        <div className="fixed inset-0 z-[9999] bg-white print:p-0 overflow-y-auto">
          <div className="max-w-[800px] mx-auto p-12 bg-white print:p-0">
             <header className="flex justify-between items-center border-b-2 border-primary pb-8 mb-8">
               <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-2xl">ED</div>
                  <div>
                    <h1 className="text-2xl font-black text-primary">ED LIMP</h1>
                    <p className="text-[10px] font-bold text-on-surface-variant mt-1">Soluções Premium</p>
                  </div>
               </div>
               <div className="text-right">
                 <h2 className="text-3xl font-black text-primary uppercase">O.S. nº {Math.floor(Math.random() * 9000) + 1000}</h2>
                 <p className="text-sm font-bold text-on-surface-variant">Data: {new Date().toLocaleDateString('pt-BR')}</p>
               </div>
             </header>

             <section className="mb-10 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Informações do Cliente</h4>
                <div className="grid grid-cols-2 gap-8">
                   <div>
                     <p className="text-xs text-slate-400 mb-0.5 font-bold uppercase">Cliente</p>
                     <p className="font-black text-primary uppercase">{clientData.name || '---'}</p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-400 mb-0.5 font-bold uppercase">Telefone</p>
                     <p className="font-black text-primary">{clientData.phone || '---'}</p>
                   </div>
                   <div className="col-span-2">
                     <p className="text-xs text-slate-400 mb-0.5 font-bold uppercase">Endereço de Execução</p>
                     <p className="font-bold text-on-surface-variant">{clientData.address || '---'}</p>
                   </div>
                </div>
             </section>

             <table className="w-full mb-10">
                <thead className="border-b border-primary/20">
                  <tr className="text-[10px] font-black tracking-widest text-primary text-left bg-slate-50">
                    <th className="px-4 py-4">Item/Serviço Realizado</th>
                    <th className="px-4 py-4">Dimensão/Tamanho</th>
                    <th className="px-4 py-4 text-right">Valor Bruto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-4 text-sm font-black text-primary">{item.service}</td>
                      <td className="px-4 py-4 text-sm text-on-surface-variant font-bold uppercase tracking-tight">{item.dimension}</td>
                      <td className="px-4 py-4 text-sm font-black text-right text-secondary">R$ {item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
             </table>

             <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 mb-10">
               <h4 className="text-[10px] font-black uppercase text-primary mb-3 tracking-widest">Garantia & Termos</h4>
               <p className="text-[11px] font-bold text-primary leading-relaxed">
                 {warrantyText}
               </p>
             </section>

             <footer className="flex justify-between items-end pt-10 border-t border-slate-100">
                <div className="w-64 border-t-2 border-primary pt-2 text-center">
                  <p className="text-[10px] font-black uppercase text-primary">Assinatura do Técnico</p>
                  <p className="text-[8px] font-bold text-on-surface-variant mt-1">ED LIMP - Soluções Especializadas</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400">Total Geral</p>
                  <p className="text-4xl font-black text-primary">R$ {getTotal().toFixed(2)}</p>
                </div>
             </footer>
          </div>
        </div>
      )}
    </div>
  );
}
