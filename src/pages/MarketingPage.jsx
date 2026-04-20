import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as htmlToImage from 'html-to-image';

export default function MarketingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('creative'); // dashboard, creative
  const [headline, setHeadline] = useState('Sua Casa Nova de Novo!');
  const [subtext, setSubtext] = useState('Limpeza Clínica e Proteção de Tecidos');
  const [contact, setContact] = useState(user?.company?.address || 'www.edlimp.com.br');
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80');
  const [customLogo, setCustomLogo] = useState(null);
  const [layoutType, setLayoutType] = useState('feed'); // feed (1:1), story (9:16)
  
  const canvasRef = useRef(null);

  const handleExport = async (format) => {
    if (!canvasRef.current) return;
    
    let dataUrl;
    const options = { quality: 0.95, backgroundColor: '#fff' };

    try {
      if (format === 'png') dataUrl = await htmlToImage.toPng(canvasRef.current, options);
      else if (format === 'webp') dataUrl = await htmlToImage.toWebp(canvasRef.current, options);
      else dataUrl = await htmlToImage.toJpeg(canvasRef.current, options);

      const link = document.createElement('a');
      link.download = `edlimp-arte-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('oops, something went wrong!', err);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setCustomLogo(readerEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const predictiveTexts = [
    { h: 'O Segredo da Durabilidade!', s: 'Impermeabilização clinical que protege por até 1 ano.' },
    { h: 'Adeus Ácaros e Fungos!', s: 'Nossa limpeza profunda elimina 99.9% dos agentes alérgicos.' },
    { h: 'Seu Sofá como Novo!', s: 'Remoção de manchas e odores com tecnologia hospitalar.' },
  ];

  return (
    <div className="min-h-screen bg-background flex text-on-surface relative">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary">Marketing & Criativos</h2>
          <p className="text-slate-500">Gere artes premium para suas redes sociais em segundos</p>
        </div>
        <div className="flex gap-2 bg-surface-container p-1 rounded-2xl">
          <button 
            onClick={() => setActiveTab('creative')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all hover-lift ${activeTab === 'creative' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Gerador de Artes
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all hover-lift ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Analytics
          </button>
        </div>
      </div>

      {activeTab === 'creative' ? (
        <section className="bg-white dark:bg-surface-container rounded-[2.5rem] p-10 shadow-subtle border border-outline-variant/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface p-6 rounded-[2rem] border border-outline-variant/10 shadow-subtle space-y-4">
              <h3 className="font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">edit_note</span> Personalização
              </h3>
              
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Formato</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setLayoutType('feed')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all hover-lift ${layoutType === 'feed' ? 'bg-primary text-white border-primary' : 'bg-transparent border-outline-variant text-slate-500'}`}
                  >
                    Feed (1:1)
                  </button>
                  <button 
                    onClick={() => setLayoutType('story')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all hover-lift ${layoutType === 'story' ? 'bg-primary text-white border-primary' : 'bg-transparent border-outline-variant text-slate-500'}`}
                  >
                    Stories (9:16)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Headline (Título)</label>
                <input 
                  className="w-full bg-surface-container border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Subtexto (Oferta)</label>
                <textarea 
                  className="w-full bg-surface-container border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 h-20 resize-none transition-all"
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Sugestões Preditivas</label>
                <div className="flex flex-wrap gap-2">
                  {predictiveTexts.map((pt, i) => (
                    <button 
                      key={i}
                      onClick={() => { setHeadline(pt.h); setSubtext(pt.s); }}
                      className="bg-secondary/10 hover:bg-secondary/20 text-secondary text-[10px] font-black py-1 px-3 rounded-full transition-all hover-lift"
                    >
                      Preset {i+1}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">URL da Imagem de Fundo</label>
                <input 
                  className="w-full bg-surface-container border-none rounded-xl text-sm p-3 focus:ring-2 focus:ring-primary/20 transition-all"
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center justify-between bg-primary text-white px-4 py-3 rounded-xl font-bold text-sm cursor-pointer hover:shadow-lg transition-all hover-lift active:scale-95">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined">upload_file</span> Carregar Logo
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </label>
              </div>
            </div>

            <div className="bg-surface p-6 rounded-[2rem] border border-outline-variant/10 shadow-subtle">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">download</span> Exportar
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => handleExport('jpg')} className="bg-surface-container hover:bg-slate-200 p-3 rounded-xl text-xs font-black uppercase transition-all hover-lift">JPG</button>
                <button onClick={() => handleExport('png')} className="bg-surface-container hover:bg-slate-200 p-3 rounded-xl text-xs font-black uppercase transition-all hover-lift">PNG</button>
                <button onClick={() => handleExport('webp')} className="bg-surface-container hover:bg-slate-200 p-3 rounded-xl text-xs font-black uppercase transition-all hover-lift">WebP</button>
              </div>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="lg:col-span-8 flex justify-center">
            <div 
              ref={canvasRef}
              className={`relative overflow-hidden bg-white shadow-2xl transition-all duration-500`}
              style={{
                width: layoutType === 'feed' ? '600px' : '450px',
                aspectRatio: layoutType === 'feed' ? '1/1' : '9/16',
              }}
            >
              {/* Background Image with Overlay */}
              <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>

              {/* Content Layout */}
              <div className="absolute inset-0 p-12 flex flex-col justify-end items-center text-center text-white">
                <div className="mb-auto">
                    {customLogo ? (
                        <img src={customLogo} className="h-16 object-contain" alt="Logo" />
                    ) : (
                        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                            <span className="font-black tracking-widest text-secondary uppercase">ED Limp</span>
                        </div>
                    )}
                </div>

                <div className="animate-in slide-in-from-bottom-8 duration-700">
                    <h2 className="text-4xl font-headline font-black mb-4 leading-tight drop-shadow-lg">
                        {headline}
                    </h2>
                    <p className="text-xl font-medium mb-8 opacity-90 drop-shadow-md">
                        {subtext}
                    </p>
                </div>

                <div className="w-full flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">public</span>
                        <span className="text-xs font-bold">{contact}</span>
                    </div>
                    <div className="bg-secondary text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg">
                        Agende Agora
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      ) : (
        /* Dashboard Content (Simplified from original) */
        <div className="animate-in fade-in duration-500">
           <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 bg-primary rounded-[2rem] p-8 text-white relative overflow-hidden shadow-subtle min-h-[300px]">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-label uppercase tracking-widest">Performance Digital</span>
                    <h3 className="text-3xl font-headline font-bold mt-4">Alcance do Último Mês</h3>
                    <div className="flex items-end gap-4 mt-2">
                      <span className="text-6xl font-black">124.8k</span>
                      <span className="text-secondary font-bold flex items-center mb-2">
                        <span className="material-symbols-outlined">trending_up</span> +18.4%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 bg-surface p-8 rounded-[2rem] border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-primary mb-4">Top Canais</h3>
                  <div className="space-y-4">
                     {['Instagram', 'Google Ads', 'Indicações'].map((c, i) => (
                       <div key={i} className="flex items-center justify-between">
                         <span className="text-sm font-medium text-slate-600">{c}</span>
                         <span className="text-sm font-black text-primary">{40 - i*10}%</span>
                       </div>
                     ))}
                  </div>
                </div>
                <button className="w-full bg-surface-container py-3 rounded-full font-bold text-xs text-primary mt-6">Ver Relatório Completo</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
