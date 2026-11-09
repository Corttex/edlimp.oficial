import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as htmlToImage from 'html-to-image';
import { getStoredMarketingGoals, saveStoredMarketingGoals, getStoredReviews, saveStoredReview } from '../lib/storage';

export default function MarketingPage() {
  const { user } = useAuth();
  
  // Abas: ads (patrocinados), gmb (google meu negocio), goals (metas semanais), creative (gerador de artes), analytics (metricas)
  const [activeTab, setActiveTab] = useState('ads');

  // ==========================================
  // ESTADOS: GERADOR DE ARTES
  // ==========================================
  const [headline, setHeadline] = useState('Sua Casa Nova de Novo!');
  const [subtext, setSubtext] = useState('Higienização Profunda & Blindagem de Estofados');
  const [contact, setContact] = useState('(61) 99565-9224 • www.edlimp.com.br');
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80');
  const [overlayColor, setOverlayColor] = useState('#2b6c00');
  const [textColor, setTextColor] = useState('#ffffff');
  const [customLogo, setCustomLogo] = useState(null);
  const [layoutType, setLayoutType] = useState('feed'); // 'feed' (1:1) ou 'story' (9:16)
  const canvasRef = useRef(null);

  const handleExport = async (format) => {
    if (!canvasRef.current) return;
    const options = { quality: 0.95, backgroundColor: '#fff' };
    try {
      let dataUrl;
      if (format === 'png') {
        dataUrl = await htmlToImage.toPng(canvasRef.current, options);
      } else {
        dataUrl = await htmlToImage.toJpeg(canvasRef.current, options);
      }
      const link = document.createElement('a');
      link.download = `edlimp-arte-${Date.now()}.${format === 'png' ? 'png' : 'jpg'}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao exportar imagem:', err);
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

  // ==========================================
  // ESTADOS & DADOS: ANÚNCIOS PATROCINADOS (META ADS / GESTOR)
  // ==========================================
  const [copiedId, setCopiedId] = useState(null);
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const adPresets = [
    {
      id: 'ad-1',
      badge: 'Campeão de Mensagens WhatsApp',
      objective: 'Engajamento / Mensagens (WhatsApp direto)',
      campaignName: '[ED LIMP] [WPP] - HIGIENIZACAO SOFAS - DF RAIO 25KM',
      targetAudience: {
        locations: 'Brasília, DF (+25 km) - Águas Claras, Sudoeste, Asa Sul, Asa Norte, Guará, Lago Sul/Norte, Vicente Pires, Taguatinga',
        age: '26 a 58 anos',
        gender: 'Todos (Prioridade Mulheres 65% / Homens 35%)',
        interests: 'Decoração de interiores, Móveis, Família, Pais com filhos pequenos, Animais de estimação (Pets), Reforma residencial, Sofá retrátil',
      },
      budget: 'R$ 20,00 a R$ 40,00 / dia (Sugestão de teste: R$ 25/dia)',
      headline: 'Sofá Como Novo em poucas horas? Solicite orçamento!',
      description: 'Atendimento em domicílio em todo DF. Eliminação de ácaros e bactérias.',
      callToAction: 'Enviar mensagem pelo WhatsApp',
      primaryText: `Você sabia que um sofá sem higienização acumula até 2 milhões de ácaros, fungos e bactérias? 🦠⚠️

Na ED Limp, realizamos a Higienização Clínica Profunda e Impermeabilização que renovam o tecido e trazem de volta a cor e o perfume de estofado novo, sem danificar as fibras.

✅ Eliminação de 99.9% de ácaros e bactérias
✅ Secagem rápida com tecnologia extratora alemã
✅ Atendimento no conforto da sua casa em todo DF e Entorno
✅ Mais de 479 clientes satisfeitos e avaliação 4.9★ no Google!

📲 Toque em "Enviar Mensagem no WhatsApp" e envie uma foto do seu estofado para receber um orçamento imediato sem compromisso! 👇`
    },
    {
      id: 'ad-2',
      badge: 'Campanha de Blindagem & Pets',
      objective: 'Conversão / Mensagens para Fechamento',
      campaignName: '[ED LIMP] [CONVERSAO] - IMPERMEABILIZACAO BLINDAGEM PETS',
      targetAudience: {
        locations: 'Brasília - Asa Sul, Asa Norte, Lago Sul, Lago Norte, Park Way, Sudoeste, Noroeste',
        age: '28 a 60 anos',
        gender: 'Todos',
        interests: 'Gatos, Cães, Cuidados com animais de estimação, Arquitetura, Sofá de linho, Decoração de luxo',
      },
      budget: 'R$ 30,00 a R$ 50,00 / dia',
      headline: 'Proteja seu Sofá contra xixi de pet e manchas de líquidos!',
      description: 'Blindagem que não altera a textura do tecido com garantia.',
      callToAction: 'Falar com Especialista no WhatsApp',
      primaryText: `Acidentes acontecem, mas seu sofá não precisa pagar o preço! 🐶🍷☕

Com a Impermeabilização e Blindagem Nano-Shield da ED Limp, qualquer líquido derramado (café, vinho, refrigerante ou xixi de pet) fica retido na superfície em forma de gota e é removido apenas com um papel toalha!

🛡️ Proteção hidrorepelente e oleorrepelente
🛡️ Preserva a maciez e a cor original do tecido
🛡️ Não resseca e não tem cheiro forte
🛡️ Garantia de aplicação com certificado

📍 Atendemos em toda Brasília e DF.

👉 Clique no botão abaixo e proteja seu investimento antes que uma mancha estrague seu estofado!`
    }
  ];

  const [selectedAdIndex, setSelectedAdIndex] = useState(0);
  const activeAd = adPresets[selectedAdIndex];

  // ==========================================
  // ESTADOS: GOOGLE MEU NEGÓCIO & REVIEWS REAIS
  // ==========================================
  const [gmbReviewLink, setGmbReviewLink] = useState('https://g.page/r/edlimpoficial/review');
  const [clientName, setClientName] = useState('');
  const [serviceDone, setServiceDone] = useState('');
  const [customReviewMessage, setCustomReviewMessage] = useState(
`Olá! Tudo bem? 😊

Aqui é da equipe ED Limp Estofados. Foi um imenso prazer cuidar da higienização e impermeabilização no seu lar! Esperamos que você e sua família estejam amando o resultado! 🛋️✨

Sua opinião é fundamental para nós e ajuda outras famílias de Brasília a conhecerem nosso trabalho.

Poderia nos deixar uma rápida avaliação de 5 estrelas no Google? Leva menos de 30 segundos:
👉 ${gmbReviewLink}

Muito obrigado pela confiança e conte sempre conosco! 💚`
  );

  const [reviewsList, setReviewsList] = useState([]);
  const [newReviewInput, setNewReviewInput] = useState({ author: '', text: '', service: 'Higienização' });
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  useEffect(() => {
    setReviewsList(getStoredReviews());
  }, []);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewInput.author || !newReviewInput.text) return;
    const rev = {
      id: Date.now(),
      author: newReviewInput.author,
      text: newReviewInput.text,
      service: newReviewInput.service,
      date: 'Hoje',
      rating: 5,
    };
    const updated = saveStoredReview(rev);
    setReviewsList(updated);
    setShowAddReviewModal(false);
    setNewReviewInput({ author: '', text: '', service: 'Higienização' });
  };

  // ==========================================
  // ESTADOS: METAS SEMANAIS PERSISTIDAS
  // ==========================================
  const [weeklyGoal, setWeeklyGoal] = useState(() => getStoredMarketingGoals());

  const handleUpdateGoals = (newGoals) => {
    setWeeklyGoal(newGoals);
    saveStoredMarketingGoals(newGoals);
  };

  const clientPercent = weeklyGoal.targetClients > 0 
    ? Math.min(100, Math.round((weeklyGoal.currentClients / weeklyGoal.targetClients) * 100)) 
    : 0;

  const revenuePercent = weeklyGoal.targetRevenue > 0 
    ? Math.min(100, Math.round((weeklyGoal.currentRevenue / weeklyGoal.targetRevenue) * 100)) 
    : 0;

  return (
    <div className="min-h-screen bg-background text-on-surface p-4 sm:p-6 lg:p-10 font-body transition-colors">
      
      {/* Top Header */}
      <header className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-outline-variant/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-widest font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">rocket_launch</span> Growth & Marketing Hub
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Brasília & Entorno</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight font-headline">
            Central de Marketing & Crescimento
          </h2>
          <p className="text-on-surface-variant text-sm font-medium mt-1 max-w-2xl">
            Gestão completa de campanhas de anúncios, criador de artes para Instagram, reputação no Google Meu Negócio e metas semanais de clientes.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-surface-container-low p-1.5 rounded-2xl shadow-subtle border border-outline-variant/10">
          <button 
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'ads' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">campaign</span>
            <span>Patrocinados (Meta Ads)</span>
          </button>

          <button 
            onClick={() => setActiveTab('gmb')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'gmb' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">reviews</span>
            <span>Google Meu Negócio</span>
          </button>

          <button 
            onClick={() => setActiveTab('goals')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'goals' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">track_changes</span>
            <span>Metas Semanais</span>
          </button>

          <button 
            onClick={() => setActiveTab('creative')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'creative' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">palette</span>
            <span>Gerador de Artes</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">insights</span>
            <span>Métricas & ROI</span>
          </button>
        </div>
      </header>

      {/* ABA 1: META ADS */}
      {activeTab === 'ads' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-gradient-to-r from-primary/10 via-surface-container to-secondary/10 p-6 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-2xl font-black">ads_click</span>
              </div>
              <div>
                <h3 className="font-bold font-headline text-on-surface text-base">Ficha Técnica Pronta para o Gestor de Anúncios</h3>
                <p className="text-xs text-on-surface-variant">
                  Copie e cole diretamente no <strong>Facebook Ads / Gerenciador de Anúncios da Meta</strong> para gerar leads qualificados no WhatsApp.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedAdIndex(0)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAdIndex === 0 ? 'bg-primary text-slate-950 shadow-md font-black' : 'bg-surface-container text-on-surface-variant'}`}
              >
                Campanha 01: Higienização
              </button>
              <button
                onClick={() => setSelectedAdIndex(1)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAdIndex === 1 ? 'bg-primary text-slate-950 shadow-md font-black' : 'bg-surface-container text-on-surface-variant'}`}
              >
                Campanha 02: Blindagem & Pets
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/10 shadow-subtle space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{activeAd.badge}</span>
                <span className="text-xs text-on-surface-variant font-mono">Meta Ads (Instagram + FB)</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">1. Nome Sugerido da Campanha</label>
                  <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl text-xs font-mono font-bold text-on-surface border border-outline-variant/20">
                    <span className="truncate mr-2">{activeAd.campaignName}</span>
                    <button onClick={() => copyToClipboard(activeAd.campaignName, 'camp-name')} className="text-primary text-xs font-bold flex items-center gap-1 shrink-0">
                      <span className="material-symbols-outlined text-sm">{copiedId === 'camp-name' ? 'check' : 'content_copy'}</span>
                      {copiedId === 'camp-name' ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">2. Objetivo da Campanha</label>
                  <div className="p-3 bg-secondary-container/20 rounded-xl text-xs font-bold text-on-surface border border-secondary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-secondary">chat</span>
                    <span>{activeAd.objective}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">3. Localização & Raio Geográfico</label>
                  <div className="p-3 bg-surface-container rounded-xl text-xs text-on-surface border border-outline-variant/20">
                    <p className="font-bold text-primary">Distrito Federal e Regiões de Alto Potencial:</p>
                    <p className="text-on-surface-variant text-[11px] mt-0.5">{activeAd.targetAudience.locations}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">Faixa Etária</label>
                    <div className="p-3 bg-surface-container rounded-xl text-xs font-bold text-on-surface border border-outline-variant/20">{activeAd.targetAudience.age}</div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">Orçamento Diário Sugerido</label>
                    <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl text-xs font-black border border-secondary/20 font-mono">{activeAd.budget}</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <a href="https://adsmanager.facebook.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black hover:shadow-lg transition-all">
                  <span>Abrir Gestor de Anúncios da Meta</span>
                  <span className="material-symbols-outlined text-sm font-black">open_in_new</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/10 shadow-subtle space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold font-headline text-on-surface text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">edit_document</span>
                    Peças de Texto (Copy do Anúncio)
                  </h4>
                  <span className="text-[10px] font-black uppercase text-secondary">Pronto para rodar</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">Texto Principal (Legenda do Anúncio)</label>
                    <button onClick={() => copyToClipboard(activeAd.primaryText, 'copy-text')} className="text-primary hover:text-primary/80 text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">{copiedId === 'copy-text' ? 'check' : 'content_copy'}</span>
                      {copiedId === 'copy-text' ? 'Copiado!' : 'Copiar Texto'}
                    </button>
                  </div>
                  <div className="bg-surface-container p-4 rounded-2xl text-xs text-on-surface whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto border border-outline-variant/20 custom-scrollbar font-medium">
                    {activeAd.primaryText}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">Título (Headline)</label>
                      <button onClick={() => copyToClipboard(activeAd.headline, 'copy-head')} className="text-primary text-[11px] font-bold">
                        {copiedId === 'copy-head' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <div className="bg-surface-container p-3 rounded-xl text-xs font-bold text-on-surface border border-outline-variant/20">{activeAd.headline}</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">Chamada (CTA)</label>
                      <button onClick={() => copyToClipboard(activeAd.callToAction, 'copy-cta')} className="text-primary text-[11px] font-bold">
                        {copiedId === 'copy-cta' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <div className="bg-secondary-container/30 text-secondary p-3 rounded-xl text-xs font-bold border border-secondary/20 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">touch_app</span>
                      {activeAd.callToAction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: GOOGLE MEU NEGÓCIO COM AVALIAÇÕES REAIS */}
      {activeTab === 'gmb' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shadow-sm">G</span>
                    <span className="text-xs font-black uppercase tracking-widest text-on-surface">Google Meu Negócio</span>
                  </div>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black rounded-full uppercase">Canal Oficial</span>
                </div>

                <div className="mt-8 flex items-baseline gap-3">
                  <span className="text-6xl font-black font-headline text-primary">5.0</span>
                  <div className="flex flex-col">
                    <div className="flex text-amber-400 text-lg">★★★★★</div>
                    <span className="text-xs text-on-surface-variant font-medium">Classificação Máxima</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed font-medium">
                  Peça aos seus clientes satisfeitos para deixarem 5 estrelas. Esse é o maior canal de conversão orgânica para atrair famílias no DF.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant/10">
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Link Direto de Avaliação Google</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={gmbReviewLink}
                    onChange={e => setGmbReviewLink(e.target.value)}
                    className="flex-1 bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-xs font-mono text-on-surface"
                    placeholder="https://g.page/r/suaempresa/review"
                  />
                  <button 
                    onClick={() => copyToClipboard(gmbReviewLink, 'gmb-link')}
                    className="bg-primary text-slate-950 px-3 py-2 rounded-xl text-xs font-black"
                  >
                    {copiedId === 'gmb-link' ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>
            </div>

            {/* Gerador de Mensagem WhatsApp */}
            <div className="md:col-span-7 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/15 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="font-bold text-base text-on-surface flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-secondary">send</span>
                  Disparo de Pedido de Avaliação no WhatsApp
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Envie 2 horas após a conclusão do serviço para coletar 5 estrelas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Nome do Cliente</label>
                  <input 
                    type="text" 
                    value={clientName} 
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Ex: Camila"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-xs font-medium text-on-surface"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Serviço Realizado</label>
                  <input 
                    type="text" 
                    value={serviceDone} 
                    onChange={e => setServiceDone(e.target.value)}
                    placeholder="Ex: higienização do sofá retrátil"
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-xs font-medium text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Texto Personalizado</label>
                <textarea 
                  rows={5}
                  value={customReviewMessage}
                  onChange={e => setCustomReviewMessage(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-3 text-xs text-on-surface resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => copyToClipboard(customReviewMessage, 'rev-msg')}
                  className="flex-1 bg-surface-container-high text-on-surface font-bold py-3 rounded-xl text-xs uppercase tracking-wider"
                >
                  {copiedId === 'rev-msg' ? 'Copiado!' : 'Copiar Mensagem'}
                </button>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(customReviewMessage)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 bg-secondary text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Abrir no WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Lista de Avaliações Reais Cadastradas */}
          <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold font-headline text-on-surface">Depoimentos & Avaliações Reais</h4>
                <p className="text-xs text-on-surface-variant">Depoimentos coletados de clientes atendidos no DF.</p>
              </div>
              <button 
                onClick={() => setShowAddReviewModal(true)}
                className="bg-primary text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm font-black">add</span>
                Registrar Depoimento
              </button>
            </div>

            {reviewsList.length === 0 ? (
              <div className="p-8 text-center bg-surface-container/30 rounded-2xl border border-dashed border-outline-variant/20">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-1">rate_review</span>
                <p className="text-xs font-bold text-on-surface">Nenhum depoimento registrado ainda.</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Cadastre depoimentos de clientes satisfeitos para usar no marketing e no site.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reviewsList.map(r => (
                  <div key={r.id} className="bg-surface-container p-5 rounded-2xl border border-outline-variant/15 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-on-surface">{r.author}</span>
                        <span className="text-amber-400 text-xs">★★★★★</span>
                      </div>
                      <p className="text-xs text-on-surface-variant italic">"{r.text}"</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-outline-variant/10 flex justify-between items-center text-[10px]">
                      <span className="text-primary font-bold">{r.service}</span>
                      <span className="text-on-surface-variant">{r.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ABA 3: METAS SEMANAIS REAIS */}
      {activeTab === 'goals' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Meta de Clientes */}
            <div className="md:col-span-6 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-secondary">Acompanhamento Semanal</span>
                  <h3 className="text-2xl font-bold font-headline text-on-surface mt-1">Meta de Atendimentos</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">group_add</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black font-headline text-on-surface">{weeklyGoal.currentClients}</span>
                <span className="text-xl font-bold text-on-surface-variant">/ {weeklyGoal.targetClients} atendimentos</span>
                <span className="ml-auto px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-black rounded-full">
                  {clientPercent}% atingido
                </span>
              </div>

              <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden p-0.5 border border-outline-variant/10">
                <div className="bg-secondary h-full rounded-full transition-all duration-700 shadow-sm" style={{ width: `${clientPercent}%` }} />
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">Ajustar meta da semana:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleUpdateGoals({ ...weeklyGoal, currentClients: Math.max(0, weeklyGoal.currentClients - 1) })}
                    className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-xs font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold px-2">{weeklyGoal.currentClients} Realizados</span>
                  <button 
                    onClick={() => handleUpdateGoals({ ...weeklyGoal, currentClients: weeklyGoal.currentClients + 1 })}
                    className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-xs font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Meta de Faturamento */}
            <div className="md:col-span-6 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-primary">Receita Prevista</span>
                  <h3 className="text-2xl font-bold font-headline text-on-surface mt-1">Faturamento da Semana</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">payments</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-5xl font-black font-headline text-primary">
                  R$ {weeklyGoal.currentRevenue.toLocaleString('pt-BR')}
                </span>
                <span className="text-lg font-bold text-on-surface-variant">
                  / R$ {weeklyGoal.targetRevenue.toLocaleString('pt-BR')}
                </span>
                <span className="ml-auto px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full">
                  {revenuePercent}%
                </span>
              </div>

              <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden p-0.5 border border-outline-variant/10">
                <div className="bg-primary h-full rounded-full transition-all duration-700 shadow-sm" style={{ width: `${revenuePercent}%` }} />
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">Ajustar faturamento alvo:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleUpdateGoals({ ...weeklyGoal, targetRevenue: Math.max(1000, weeklyGoal.targetRevenue - 500) })}
                    className="px-3 py-1 rounded-xl bg-surface-container text-xs font-bold"
                  >
                    - R$500
                  </button>
                  <button 
                    onClick={() => handleUpdateGoals({ ...weeklyGoal, targetRevenue: weeklyGoal.targetRevenue + 500 })}
                    className="px-3 py-1 rounded-xl bg-surface-container text-xs font-bold"
                  >
                    + R$500
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ABA 4: GERADOR DE ARTES */}
      {activeTab === 'creative' && (
        <section className="bg-surface-container-low rounded-2xl p-6 sm:p-10 shadow-subtle border border-outline-variant/10 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface p-6 rounded-2xl border border-outline-variant/10 shadow-subtle space-y-4">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">edit_note</span> Personalização da Arte
                </h3>
                
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Título Principal</label>
                  <input value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-bold text-on-surface" />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Subtítulo / Chamada</label>
                  <input value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-medium text-on-surface" />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Contato / Rodapé</label>
                  <input value={contact} onChange={e => setContact(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-bold text-on-surface" />
                </div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-outline-variant/10 shadow-subtle">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-sm">download</span> Baixar Arte Pronta
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleExport('jpg')} className="bg-primary text-slate-950 font-black p-3 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 shadow-sm">JPG HD</button>
                  <button onClick={() => handleExport('png')} className="bg-surface-container hover:bg-surface-container-high p-3 rounded-xl text-xs font-black uppercase">PNG HD</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 flex justify-center sticky top-6">
              <div 
                ref={canvasRef}
                className="relative overflow-hidden bg-white shadow-2xl rounded-3xl"
                style={{ width: '480px', aspectRatio: '1/1' }}
              >
                <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="Fundo" />
                <div className="absolute inset-0 opacity-80" style={{ background: `linear-gradient(to top, ${overlayColor} 0%, transparent 80%)` }}></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-white text-slate-950 font-black text-[10px] rounded-full uppercase tracking-widest shadow-sm">ED Limp Oficial</span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-headline leading-tight drop-shadow-md">{headline}</h3>
                    <p className="text-xs sm:text-sm font-semibold mt-1 opacity-95 drop-shadow-sm">{subtext}</p>
                    <p className="text-[11px] font-mono mt-4 font-bold bg-black/40 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm">{contact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ABA 5: MÉTRICAS & ROI */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle">
            <h4 className="font-bold text-lg text-on-surface mb-4">Cálculo de ROI & Custo por Lead em Brasília</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-surface-container rounded-xl">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Custo por Lead Médio</span>
                <p className="text-2xl font-black text-secondary mt-1">R$ 2,50</p>
                <p className="text-[11px] text-on-surface-variant mt-1">Média estimada para campanhas no DF</p>
              </div>
              <div className="p-5 bg-surface-container rounded-xl">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Taxa de Conversão WhatsApp</span>
                <p className="text-2xl font-black text-primary mt-1">15% a 25%</p>
                <p className="text-[11px] text-on-surface-variant mt-1">De contato para serviço agendado</p>
              </div>
              <div className="p-5 bg-surface-container rounded-xl">
                <span className="text-[10px] uppercase font-bold text-on-surface-variant">Ticket Médio Estimado</span>
                <p className="text-2xl font-black text-on-surface mt-1">R$ 380,00</p>
                <p className="text-[11px] text-on-surface-variant mt-1">Por higienização e blindagem</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cadastrar Review Real */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface dark:bg-surface-container max-w-md w-full rounded-2xl p-6 border border-outline-variant/20 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-on-surface">Cadastrar Avaliação Real de Cliente</h4>
            <form onSubmit={handleAddReview} className="space-y-3">
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Nome do Cliente</label>
                <input 
                  type="text" 
                  required
                  value={newReviewInput.author}
                  onChange={e => setNewReviewInput({ ...newReviewInput, author: e.target.value })}
                  placeholder="Ex: Dra. Mariana Silveira (Lago Sul)"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-xs font-bold text-on-surface"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Serviço Realizado</label>
                <input 
                  type="text" 
                  value={newReviewInput.service}
                  onChange={e => setNewReviewInput({ ...newReviewInput, service: e.target.value })}
                  placeholder="Ex: Higienização de Sofá + Blindagem"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-xs font-bold text-on-surface"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Depoimento do Cliente</label>
                <textarea 
                  rows={4}
                  required
                  value={newReviewInput.text}
                  onChange={e => setNewReviewInput({ ...newReviewInput, text: e.target.value })}
                  placeholder="O que o cliente disse sobre a equipe, o cheiro, a limpeza e o resultado?"
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl p-3 text-xs text-on-surface resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAddReviewModal(false)} className="flex-1 bg-surface-container-high py-2.5 rounded-xl text-xs font-bold">Cancelar</button>
                <button type="submit" className="flex-1 bg-primary text-slate-950 font-black py-2.5 rounded-xl text-xs">Salvar Depoimento</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
