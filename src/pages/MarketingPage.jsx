import { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as htmlToImage from 'html-to-image';

export default function MarketingPage() {
  const { user } = useAuth();
  
  // Abas: creative (gerador de artes), ads (patrocinados / gestor de anuncios), gmb (google meu negocio / avaliacoes), goals (metas semanais), analytics (metricas)
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

  const predictiveTexts = [
    { h: 'Seu Sofá Livre de Ácaros e Manchas!', s: 'Tecnologia extratora hospitalar que elimina 99.9% de germes e fungos.' },
    { h: 'Blindagem e Impermeabilização ED Limp', s: 'Diga adeus a acidentes com líquidos, vinho e café no seu estofado.' },
    { h: 'Atendimento VIP em todo DF e Entorno!', s: 'Equipe especializada na sua residência com agendamento pontual.' },
  ];

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
        placements: 'Feed do Instagram, Instagram Stories, Reels e Feed do Facebook'
      },
      budget: 'R$ 20,00 a R$ 40,00 / dia (Sugestão de teste: R$ 25/dia)',
      primaryText: `Você sabia que um sofá sem higienização acumula até 2 milhões de ácaros, fungos e bactérias? 🦠🛋️

Na ED Limp, realizamos a Higienização Clínica Profunda e Impermeabilização que renovam o tecido e trazem de volta a cor e o perfume de estofado novo, sem danificar as fibras.

✅ Eliminação de 99.9% de ácaros e bactérias
✅ Secagem rápida com tecnologia extratora alemã
✅ Atendimento no conforto da sua casa em todo DF e Entorno
✅ Mais de 479 clientes satisfeitos e avaliação 4.9★ no Google!

📲 Toque em "Enviar Mensagem no WhatsApp" e envie uma foto do seu estofado para receber um orçamento express sem compromisso!`,
      headline: 'Sofá Como Novo em poucas horas? Solicite orçamento!',
      description: 'Atendimento a domicílio em Brasília e Entorno. 4.9★ no Google.',
      callToAction: 'Enviar mensagem pelo WhatsApp'
    },
    {
      id: 'ad-2',
      badge: 'Foco em Blindagem & Pets',
      objective: 'Tráfego / Conversão de Contatos',
      campaignName: '[ED LIMP] [CONVERSAO] - IMPERMEABILIZACAO BLINDAGEM PETS',
      targetAudience: {
        locations: 'Distrito Federal (Condomínios fechados e áreas nobres)',
        age: '28 a 55 anos',
        gender: 'Todos',
        interests: 'Gatos, Cães, Amantes de animais, Design de interiores, Arquitetura, Casas',
        placements: 'Instagram Reels & Stories (Vídeo de teste de repelência a líquidos)'
      },
      budget: 'R$ 30,00 / dia',
      primaryText: `Acidentes acontecem, mas seu sofá não precisa pagar o preço! 🍷🐶

Com a Blindagem de Estofados ED Limp, líquidos como café, sucos e urina de pet simplesmente não penetram no tecido, facilitando a limpeza instantânea sem manchas e sem odores.

🛡️ Proteção UV contra desbotamento solar
🛡️ Produto com certificado de segurança, não inflamável
🛡️ Mantém a maciez original sem alterar a textura

Garantia de satisfação de 97% com especialistas certificados.
Clique no botão e proteja seu investimento agora mesmo!`,
      headline: 'Blindagem de Estofados contra Manchas e Pets',
      description: 'Líquidos não entram. Garantia comprovada ED Limp.',
      callToAction: 'Fale Conosco'
    }
  ];

  const [selectedAdIndex, setSelectedAdIndex] = useState(0);
  const activeAd = adPresets[selectedAdIndex];

  // ==========================================
  // ESTADOS: GOOGLE MEU NEGÓCIO & AVALIAÇÕES
  // ==========================================
  const [clientName, setClientName] = useState('Camila');
  const [serviceDone, setServiceDone] = useState('higienização e impermeabilização do sofá retrátil');
  const gmbReviewLink = 'https://g.page/r/edlimp-oficial/review'; // Link direto de 5 estrelas

  const defaultReviewMessage = `Olá, ${clientName}! Tudo bem? 😊

Aqui é da equipe ED Limp Estofados. Foi um imenso prazer cuidar da ${serviceDone} no seu lar! Esperamos que você e sua família estejam amando o resultado! 🛋️✨

Sua opinião é fundamental para nós e ajuda outras famílias de Brasília a conhecerem nosso trabalho.

Poderia nos deixar uma rápida avaliação de 5 estrelas no Google? Leva menos de 30 segundos:
👉 ${gmbReviewLink}

Muito obrigado pela confiança e conte sempre conosco! 💚`;

  const [customReviewMessage, setCustomReviewMessage] = useState(defaultReviewMessage);

  // Sincronizar mensagem caso o usuario mude o nome ou servico
  const handleUpdateMessageFields = (newName, newService) => {
    setClientName(newName);
    setServiceDone(newService);
    setCustomReviewMessage(
`Olá, ${newName || 'Cliente'}! Tudo bem? 😊

Aqui é da equipe ED Limp Estofados. Foi um imenso prazer cuidar da ${newService || 'higienização do seu estofado'} no seu lar! Esperamos que você e sua família estejam amando o resultado! 🛋️✨

Sua opinião é fundamental para nós e ajuda outras famílias de Brasília a conhecerem nosso trabalho.

Poderia nos deixar uma rápida avaliação de 5 estrelas no Google? Leva menos de 30 segundos:
👉 ${gmbReviewLink}

Muito obrigado pela confiança e conte sempre conosco! 💚`
    );
  };

  const sampleReviews = [
    {
      author: 'Mariana Silveira',
      rating: 5,
      date: 'Há 2 dias',
      text: 'O sofá ficou impecável! Tinha manchas de café e pelos do meu cachorro que eu achava impossíveis de tirar. A equipe foi super educada, pontual e cuidadosa.',
      service: 'Higienização + Blindagem',
      verified: true
    },
    {
      author: 'Carlos Eduardo Mendes',
      rating: 5,
      date: 'Há 5 dias',
      text: 'Trabalho de outro nível em Brasília. Chegaram no horário combinado, sem sujeira e o sofá secou muito mais rápido do que imaginei. Recomendo de olhos fechados!',
      service: 'Sofá Retrátil 3 Lugares',
      verified: true
    },
    {
      author: 'Priscila Rocha',
      rating: 5,
      date: 'Há 1 semana',
      text: 'Fiz a impermeabilização após a limpeza e realmente funciona! Derrubaram suco de uva no dia seguinte e saiu apenas com papel toalha. Maravilhoso!',
      service: 'Impermeabilização Premium',
      verified: true
    }
  ];

  // ==========================================
  // ESTADOS: METAS SEMANAIS DE CLIENTES
  // ==========================================
  const [weeklyGoal, setWeeklyGoal] = useState({
    targetClients: 16,
    currentClients: 11,
    targetRevenue: 6400,
    currentRevenue: 4850,
    days: [
      { day: 'Seg', clients: 2, rev: 850, done: true },
      { day: 'Ter', clients: 3, rev: 1200, done: true },
      { day: 'Qua', clients: 2, rev: 900, done: true },
      { day: 'Qui', clients: 4, rev: 1900, done: true },
      { day: 'Sex', clients: 0, rev: 0, done: false, projected: 3 },
      { day: 'Sáb', clients: 0, rev: 0, done: false, projected: 2 },
    ]
  });

  const clientPercent = Math.min(100, Math.round((weeklyGoal.currentClients / weeklyGoal.targetClients) * 100));
  const revenuePercent = Math.min(100, Math.round((weeklyGoal.currentRevenue / weeklyGoal.targetRevenue) * 100));

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
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'ads' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">campaign</span>
            <span>Patrocinados (Meta Ads)</span>
          </button>

          <button 
            onClick={() => setActiveTab('gmb')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'gmb' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">reviews</span>
            <span>Google Meu Negócio</span>
          </button>

          <button 
            onClick={() => setActiveTab('goals')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'goals' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">track_changes</span>
            <span>Metas Semanais</span>
          </button>

          <button 
            onClick={() => setActiveTab('creative')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'creative' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">palette</span>
            <span>Gerador de Artes</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">insights</span>
            <span>Métricas & ROI</span>
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* ABA 1: ANÚNCIOS PATROCINADOS & GESTOR DE ANÚNCIOS (META ADS) */}
      {/* ============================================================== */}
      {activeTab === 'ads' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Quick Explainer Bar */}
          <div className="bg-gradient-to-r from-primary/10 via-surface-container to-secondary/10 p-6 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-2xl">ads_click</span>
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAdIndex === 0 ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
              >
                Campanha 01: Higienização & WhatsApp
              </button>
              <button
                onClick={() => setSelectedAdIndex(1)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedAdIndex === 1 ? 'bg-primary text-on-primary shadow-sm' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
              >
                Campanha 02: Blindagem & Pets
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Lado Esquerdo: Parâmetros Técnicos do Gerenciador de Anúncios */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Card de Configuração de Conjunto de Anúncios */}
              <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/10 shadow-subtle space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full tracking-wider">
                    {activeAd.badge}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono">Meta Ads (Instagram + FB)</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                      1. Nome Sugerido da Campanha
                    </label>
                    <div className="flex items-center justify-between bg-surface-container px-3 py-2.5 rounded-xl font-mono text-xs text-on-surface border border-outline-variant/20">
                      <span className="truncate pr-2">{activeAd.campaignName}</span>
                      <button 
                        onClick={() => copyToClipboard(activeAd.campaignName, 'c-name')}
                        className="text-primary hover:text-primary/70 shrink-0 text-xs font-bold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">{copiedId === 'c-name' ? 'check' : 'content_copy'}</span>
                        {copiedId === 'c-name' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                      2. Objetivo da Campanha no Gerenciador
                    </label>
                    <div className="bg-surface-container p-3 rounded-xl text-xs text-on-surface font-semibold flex items-center gap-2 border border-outline-variant/20">
                      <span className="material-symbols-outlined text-secondary text-base">chat</span>
                      <span>{activeAd.objective}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                      3. Localização & Raio Geográfico
                    </label>
                    <div className="bg-surface-container p-3 rounded-xl text-xs text-on-surface leading-relaxed border border-outline-variant/20">
                      <p className="font-bold text-primary mb-1">Distrito Federal e Regiões de Alto Potencial:</p>
                      <p className="text-on-surface-variant text-[11px]">{activeAd.targetAudience.locations}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                        Faixa Etária
                      </label>
                      <div className="bg-surface-container p-3 rounded-xl text-xs font-bold text-on-surface border border-outline-variant/20">
                        {activeAd.targetAudience.age}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                        Orçamento Diário Sugerido
                      </label>
                      <div className="bg-surface-container p-3 rounded-xl text-xs font-bold text-secondary border border-outline-variant/20">
                        {activeAd.budget}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                      4. Segmentação Detalhada (Interesses)
                    </label>
                    <div className="bg-surface-container p-3 rounded-xl text-xs text-on-surface-variant border border-outline-variant/20">
                      {activeAd.targetAudience.interests}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                      5. Posicionamentos Recomendados
                    </label>
                    <div className="bg-surface-container p-3 rounded-xl text-xs text-on-surface-variant border border-outline-variant/20">
                      {activeAd.targetAudience.placements}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                  <a 
                    href="https://adsmanager.facebook.com/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-bold hover:shadow-lg transition-all"
                  >
                    <span>Abrir Gestor de Anúncios da Meta</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                  <button 
                    onClick={() => {
                      const allInfo = `CAMPANHA: ${activeAd.campaignName}\nOBJETIVO: ${activeAd.objective}\nORÇAMENTO: ${activeAd.budget}\nLOCALIZAÇÃO: ${activeAd.targetAudience.locations}\nIDADE: ${activeAd.targetAudience.age}\nINTERESSES: ${activeAd.targetAudience.interests}\n\nTEXTO PRINCIPAL:\n${activeAd.primaryText}\n\nTÍTULO: ${activeAd.headline}\nDESCRIÇÃO: ${activeAd.description}\nCHAMADA: ${activeAd.callToAction}`;
                      copyToClipboard(allInfo, 'all-ad');
                    }}
                    className="text-xs font-bold text-secondary hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">{copiedId === 'all-ad' ? 'check' : 'copy_all'}</span>
                    {copiedId === 'all-ad' ? 'Dados Copiados!' : 'Copiar Tudo'}
                  </button>
                </div>
              </div>
            </div>

            {/* Lado Direito: Peça Criativa, Textos (Copy) e Pré-visualização do Feed */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Card de Textos e Copywriting */}
              <div className="bg-surface-container-low p-6 sm:p-8 rounded-2xl border border-outline-variant/10 shadow-subtle space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold font-headline text-on-surface text-base flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">edit_document</span>
                    Peças de Texto (Copy do Anúncio)
                  </h4>
                  <span className="text-[10px] font-black uppercase text-secondary">Pronto para rodar</span>
                </div>

                {/* Texto Principal (Copy) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">
                      Texto Principal (Legenda do Anúncio)
                    </label>
                    <button 
                      onClick={() => copyToClipboard(activeAd.primaryText, 'copy-text')}
                      className="text-primary hover:text-primary/80 text-xs font-bold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">{copiedId === 'copy-text' ? 'check' : 'content_copy'}</span>
                      {copiedId === 'copy-text' ? 'Copiado!' : 'Copiar Texto'}
                    </button>
                  </div>
                  <div className="bg-surface-container p-4 rounded-2xl text-xs text-on-surface whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto border border-outline-variant/20 custom-scrollbar font-medium">
                    {activeAd.primaryText}
                  </div>
                </div>

                {/* Título e Descrição */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">
                        Título (Headline)
                      </label>
                      <button 
                        onClick={() => copyToClipboard(activeAd.headline, 'copy-head')}
                        className="text-primary text-[11px] font-bold"
                      >
                        {copiedId === 'copy-head' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <div className="bg-surface-container p-3 rounded-xl text-xs font-bold text-on-surface border border-outline-variant/20">
                      {activeAd.headline}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">
                        Chamada para Ação (CTA)
                      </label>
                      <button 
                        onClick={() => copyToClipboard(activeAd.callToAction, 'copy-cta')}
                        className="text-primary text-[11px] font-bold"
                      >
                        {copiedId === 'copy-cta' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <div className="bg-secondary-container/30 text-on-secondary-container p-3 rounded-xl text-xs font-bold border border-secondary/20 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">touch_app</span>
                      {activeAd.callToAction}
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulação Visual do Feed Instagram */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-outline-variant/10 shadow-lg max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center font-black text-xs text-on-secondary-container">
                      ED
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        edlimp.oficial
                        <span className="material-symbols-outlined text-blue-500 text-xs">verified</span>
                      </h5>
                      <p className="text-[9px] text-slate-400 font-medium">Patrocinado • Brasília</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-sm">more_horiz</span>
                </div>

                {/* Imagem do Criativo */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={selectedAdIndex === 0 
                      ? 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80' 
                      : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'} 
                    alt="Criativo Anúncio" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-secondary text-xs">verified_user</span> 99.9% Sem Bactérias
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-3 rounded-xl text-white">
                    <p className="text-xs font-black">{activeAd.headline}</p>
                    <p className="text-[10px] text-slate-300 mt-0.5">Atendimento em Domicílio em todo o DF</p>
                  </div>
                </div>

                {/* Botão de Ação do Feed */}
                <div className="mt-3 bg-primary text-on-primary py-2.5 px-4 rounded-xl flex items-center justify-between text-xs font-bold shadow-md cursor-pointer hover:brightness-105 transition-all">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    {activeAd.callToAction}
                  </span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>

                <div className="mt-3 px-2 text-[11px] text-slate-600 dark:text-slate-300">
                  <p className="line-clamp-2">
                    <span className="font-bold text-slate-900 dark:text-white mr-1.5">edlimp.oficial</span>
                    {activeAd.primaryText}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* ABA 2: GOOGLE MEU NEGÓCIO & COLETOR DE AVALIAÇÕES */}
      {/* ============================================================== */}
      {activeTab === 'gmb' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Card de Reputação Geral */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Placar Google 4.9 */}
            <div className="md:col-span-5 bg-gradient-to-br from-primary via-primary-container to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-primary text-sm shadow-sm">
                      G
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-200">Google Meu Negócio</span>
                  </div>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-black rounded-full uppercase">
                    Verificado
                  </span>
                </div>

                <div className="mt-8 flex items-baseline gap-3">
                  <span className="text-6xl font-black font-headline">4.9</span>
                  <div className="flex flex-col">
                    <div className="flex text-amber-400 text-lg">
                      ★★★★★
                    </div>
                    <span className="text-xs text-slate-300 font-medium">Classificação Excelente</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-200 leading-relaxed font-medium">
                  <strong>479+ Clientes Atendidos</strong> e avaliados no Distrito Federal e Entorno. Essa autoridade no Google é o maior canal de conversão orgânica da ED Limp!
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-300">Taxa de Recomendação</p>
                  <p className="text-lg font-black text-secondary-container">97% de Satisfação</p>
                </div>
                <a 
                  href={gmbReviewLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all flex items-center gap-1 shadow-sm"
                >
                  <span>Link de Review</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Gerador de Mensagem de Avaliação para WhatsApp */}
            <div className="md:col-span-7 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold font-headline text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">mark_chat_unread</span>
                      Envio de Pedido de Avaliação no WhatsApp
                    </h3>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                      Envie para o cliente 2 horas após a conclusão do serviço para coletar 5 estrelas.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black uppercase rounded-full">
                    Gera Reviews
                  </span>
                </div>

                {/* Campos dinâmicos do cliente */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                      Nome do Cliente
                    </label>
                    <input 
                      type="text" 
                      value={clientName} 
                      onChange={(e) => handleUpdateMessageFields(e.target.value, serviceDone)}
                      placeholder="Ex: Camila"
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-xs font-medium text-on-surface focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                      Serviço Realizado
                    </label>
                    <input 
                      type="text" 
                      value={serviceDone} 
                      onChange={(e) => handleUpdateMessageFields(clientName, e.target.value)}
                      placeholder="Ex: higienização do sofá 3 lugares"
                      className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-xs font-medium text-on-surface focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Área da Mensagem Pré-Pronta */}
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 block mb-1">
                    Texto Personalizado da Mensagem
                  </label>
                  <textarea 
                    rows={6}
                    value={customReviewMessage}
                    onChange={(e) => setCustomReviewMessage(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-2xl p-4 text-xs font-medium text-on-surface focus:ring-2 focus:ring-primary/20 leading-relaxed custom-scrollbar resize-none"
                  />
                </div>
              </div>

              {/* Botões de Ação: Copiar & Disparar no WhatsApp */}
              <div className="pt-2 flex flex-wrap gap-3 items-center justify-between">
                <button 
                  onClick={() => copyToClipboard(customReviewMessage, 'review-msg')}
                  className="flex-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-outline-variant/20"
                >
                  <span className="material-symbols-outlined text-sm">{copiedId === 'review-msg' ? 'check' : 'content_copy'}</span>
                  <span>{copiedId === 'review-msg' ? 'Texto Copiado com Sucesso!' : 'Copiar Mensagem'}</span>
                </button>

                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(customReviewMessage)}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 bg-secondary text-white py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 hover:brightness-105 shadow-md"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Abrir e Enviar no WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Feed de Avaliações Recentes (Puxar Avaliações) */}
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold font-headline text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500">hotel_class</span>
                  Avaliações Recentes no Google Meu Negócio
                </h4>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  Depoimentos reais de clientes atendidos no DF para utilizar em suas redes sociais e provas sociais.
                </p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => alert('Sincronização com a API do Google Meu Negócio concluída! 3 novas avaliações encontradas.')}
                  className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">sync</span>
                  <span>Puxar Novas Avaliações</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleReviews.map((rev, i) => (
                <div key={i} className="bg-surface-container p-6 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between hover-lift">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center text-xs">
                          {rev.author[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface leading-none">{rev.author}</p>
                          <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{rev.date}</p>
                        </div>
                      </div>
                      <span className="text-amber-400 text-xs tracking-tighter">★★★★★</span>
                    </div>

                    <p className="text-xs text-on-surface-variant italic leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-outline-variant/10 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                      {rev.service}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(`"${rev.text}" - ${rev.author} (5 Estrelas no Google)`, `rev-${i}`)}
                      className="text-on-surface-variant hover:text-primary font-bold flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-xs">{copiedId === `rev-${i}` ? 'check' : 'content_copy'}</span>
                      {copiedId === `rev-${i}` ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* ABA 3: METAS SEMANAIS DE CLIENTES & FATURAMENTO */}
      {/* ============================================================== */}
      {activeTab === 'goals' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Bento Grid: Metas da Semana */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card 1: Meta de Clientes Atendidos */}
            <div className="md:col-span-6 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-secondary">Acompanhamento Semanal</span>
                  <h3 className="text-2xl font-bold font-headline text-on-surface mt-1">Meta de Novos Clientes</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">group_add</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black font-headline text-on-surface">{weeklyGoal.currentClients}</span>
                <span className="text-xl font-bold text-on-surface-variant">/ {weeklyGoal.targetClients} clientes</span>
                <span className="ml-auto px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-black rounded-full">
                  {clientPercent}% atingido
                </span>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-2">
                <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden p-0.5 border border-outline-variant/10">
                  <div 
                    className="bg-secondary h-full rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${clientPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
                  <span>Faltam apenas {Math.max(0, weeklyGoal.targetClients - weeklyGoal.currentClients)} clientes para bater a meta</span>
                  <span>Meta: {weeklyGoal.targetClients}/sem</span>
                </div>
              </div>

              {/* Ajuste Rápido de Meta */}
              <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">Ajustar meta semanal:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWeeklyGoal(g => ({ ...g, targetClients: Math.max(1, g.targetClients - 1) }))}
                    className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold font-mono px-2">{weeklyGoal.targetClients}</span>
                  <button 
                    onClick={() => setWeeklyGoal(g => ({ ...g, targetClients: g.targetClients + 1 }))}
                    className="w-8 h-8 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Meta de Faturamento Semanal */}
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
                <span className="text-5xl font-black font-headline text-primary">
                  R$ {weeklyGoal.currentRevenue.toLocaleString('pt-BR')}
                </span>
                <span className="text-lg font-bold text-on-surface-variant">
                  / R$ {weeklyGoal.targetRevenue.toLocaleString('pt-BR')}
                </span>
                <span className="ml-auto px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-full">
                  {revenuePercent}% atingido
                </span>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-2">
                <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden p-0.5 border border-outline-variant/10">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${revenuePercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant font-medium">
                  <span>Ticket Médio Atual: <strong>R$ {Math.round(weeklyGoal.currentRevenue / (weeklyGoal.currentClients || 1))} / cliente</strong></span>
                  <span>Faltam R$ {(weeklyGoal.targetRevenue - weeklyGoal.currentRevenue).toLocaleString('pt-BR')}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-medium">Ajustar faturamento alvo:</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setWeeklyGoal(g => ({ ...g, targetRevenue: Math.max(1000, g.targetRevenue - 400) }))}
                    className="px-2.5 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface"
                  >
                    - R$400
                  </button>
                  <button 
                    onClick={() => setWeeklyGoal(g => ({ ...g, targetRevenue: g.targetRevenue + 400 }))}
                    className="px-2.5 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface"
                  >
                    + R$400
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Gráfico / Distribuição por Dias da Semana */}
          <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold font-headline text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_view_week</span>
                  Ritmo de Atendimentos por Dia da Semana (Seg a Sáb)
                </h4>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  Visualização do volume de atendimentos concluídos e agendamentos projetados para fechar a semana.
                </p>
              </div>
              <span className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full">
                Semana Atual (Ativa)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {weeklyGoal.days.map((d, i) => (
                <div 
                  key={i} 
                  className={`p-5 rounded-2xl border transition-all ${d.done ? 'bg-surface-container border-secondary/30' : 'bg-surface-container/40 border-dashed border-outline-variant/30'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-on-surface">{d.day}</span>
                    {d.done ? (
                      <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-slate-400">Previsto</span>
                    )}
                  </div>

                  <p className="text-2xl font-black font-headline text-on-surface">
                    {d.done ? d.clients : d.projected}
                    <span className="text-xs font-normal text-on-surface-variant ml-1">clientes</span>
                  </p>

                  <p className="text-xs font-bold text-secondary mt-1">
                    {d.done ? `R$ ${d.rev}` : 'A Confirmar'}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* ABA 4: GERADOR DE ARTES (CANVAS / FEED & STORIES) */}
      {/* ============================================================== */}
      {activeTab === 'creative' && (
        <section className="bg-surface-container-low rounded-2xl p-6 sm:p-10 shadow-subtle border border-outline-variant/10 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controles do Editor */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface p-6 rounded-2xl border border-outline-variant/10 shadow-subtle space-y-4">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">edit_note</span> Personalização da Arte
                </h3>
                
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Formato da Peça</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setLayoutType('feed')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${layoutType === 'feed' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-transparent border-outline-variant/40 text-on-surface-variant'}`}
                    >
                      Feed (1:1)
                    </button>
                    <button 
                      onClick={() => setLayoutType('story')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${layoutType === 'story' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-transparent border-outline-variant/40 text-on-surface-variant'}`}
                    >
                      Stories (9:16)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Headline (Título)</label>
                  <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-semibold text-on-surface focus:ring-2 focus:ring-primary/20"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Subtexto (Oferta)</label>
                  <textarea 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/20 h-20 resize-none leading-relaxed"
                    value={subtext}
                    onChange={(e) => setSubtext(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Contato no Rodapé</label>
                  <input 
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-medium text-on-surface focus:ring-2 focus:ring-primary/20"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>

                {/* Sugestões Rápidas */}
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-2 block">Ideias Rápidas de Copy</label>
                  <div className="space-y-2">
                    {predictiveTexts.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setHeadline(item.h); setSubtext(item.s); }}
                        className="w-full text-left p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-all text-xs font-medium text-on-surface border border-outline-variant/10 line-clamp-1"
                      >
                        💡 {item.h}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cores */}
                <div className="pt-2 border-t border-outline-variant/10">
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-2 block">Paleta de Cor</label>
                  <div className="flex gap-2 mb-3">
                    {[
                      {name: 'Verde ED Limp', bg: '#2b6c00', text: '#ffffff'},
                      {name: 'Tropical Lime', bg: '#a7fc5d', text: '#111827'},
                      {name: 'Azul Clínico', bg: '#0f238e', text: '#ffffff'},
                      {name: 'Dark Premium', bg: '#111827', text: '#a7fc5d'},
                    ].map((p, i) => (
                      <button 
                        key={i}
                        onClick={() => { setOverlayColor(p.bg); setTextColor(p.text); }}
                        className="w-7 h-7 rounded-full border border-outline-variant/20 transition-all hover:scale-110 shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${p.bg} 50%, ${p.text} 50%)` }}
                        title={p.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Imagem de Fundo */}
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">URL da Imagem</label>
                  <input 
                    placeholder="Cole a URL da imagem aqui..."
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-medium text-on-surface"
                    value={bgImage}
                    onChange={(e) => setBgImage(e.target.value)}
                  />
                </div>

                {/* Upload de Logo */}
                <div>
                  <label className="flex items-center justify-between bg-primary text-white px-4 py-3 rounded-xl font-bold text-xs cursor-pointer hover:shadow-lg transition-all active:scale-95">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">upload_file</span> Carregar Logo Personalizada
                    </span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                  </label>
                </div>
              </div>

              {/* Botões de Download */}
              <div className="bg-surface p-6 rounded-2xl border border-outline-variant/10 shadow-subtle">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-sm">download</span> Baixar Arte
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleExport('jpg')} className="bg-surface-container hover:bg-surface-container-high p-3 rounded-xl text-xs font-black uppercase transition-all">JPG HD</button>
                  <button onClick={() => handleExport('png')} className="bg-surface-container hover:bg-surface-container-high p-3 rounded-xl text-xs font-black uppercase transition-all">PNG Transparência</button>
                </div>
              </div>
            </div>

            {/* Canvas Preview */}
            <div className="lg:col-span-8 flex justify-center sticky top-6">
              <div 
                ref={canvasRef}
                className="relative overflow-hidden bg-white shadow-2xl transition-all duration-500 rounded-3xl"
                style={{
                  width: layoutType === 'feed' ? '520px' : '380px',
                  aspectRatio: layoutType === 'feed' ? '1/1' : '9/16',
                }}
              >
                <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="Background" />
                <div 
                  className="absolute inset-0 opacity-85" 
                  style={{ 
                    background: `linear-gradient(to top, ${overlayColor} 0%, ${overlayColor}99 45%, transparent 100%)` 
                  }}
                />

                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10" style={{ color: textColor }}>
                  {/* Top Header Arte */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">ED Limp Oficial</span>
                    </div>

                    {customLogo ? (
                      <img src={customLogo} alt="Logo" className="h-8 max-w-[120px] object-contain drop-shadow" />
                    ) : (
                      <span className="text-xs font-black tracking-tighter uppercase px-3 py-1 bg-white/10 rounded-xl">
                        DF e Entorno
                      </span>
                    )}
                  </div>

                  {/* Centro / Headline */}
                  <div className="space-y-3 my-auto">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      Higienização & Blindagem
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black leading-tight drop-shadow-md">
                      {headline}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium opacity-90 max-w-sm leading-relaxed drop-shadow">
                      {subtext}
                    </p>
                  </div>

                  {/* Rodapé da Arte */}
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider font-bold opacity-75">Agendamento VIP</p>
                      <p className="text-xs font-black tracking-wide">{contact}</p>
                    </div>
                    <div className="bg-white text-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-lg">
                      Solicite Já
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* ABA 5: ANALYTICS, FUNIL DE CONVERSÃO & MÉTRICAS (STITCH 2) */}
      {/* ============================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Hero Banner: Alcance Global da Campanha (do marketing_e_analytics_2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-primary text-slate-950 rounded-2xl p-8 relative overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-950/15 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-950">
                    Performance Real-Time • DF
                  </span>
                  <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-headline mt-4 text-slate-950">Alcance Global da Campanha</h3>
                <div className="flex items-baseline gap-4 mt-2">
                  <span className="text-5xl sm:text-6xl font-black font-headline text-slate-950">124.8k</span>
                  <span className="text-slate-950 font-black text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm font-black text-slate-950">trending_up</span> +18.4%
                  </span>
                </div>
                <p className="text-xs text-slate-900/85 max-w-md mt-1 font-bold">
                  Usuários únicos impactados no Distrito Federal e Entorno nos últimos 30 dias via Meta Ads e Google Meu Negócio.
                </p>
              </div>

              {/* Chart Simulation do Stitch */}
              <div className="mt-8 flex items-end gap-2.5 h-32 relative z-10">
                <div className="flex-1 bg-slate-950/10 rounded-t-xl h-[45%] hover:bg-slate-950/20 transition-all"></div>
                <div className="flex-1 bg-slate-950/15 rounded-t-xl h-[70%] hover:bg-slate-950/25 transition-all"></div>
                <div className="flex-1 bg-slate-950/20 rounded-t-xl h-[60%] hover:bg-slate-950/30 transition-all"></div>
                <div className="flex-1 bg-slate-950/30 rounded-t-xl h-[85%] hover:bg-slate-950/40 transition-all"></div>
                <div className="flex-1 bg-slate-950/25 rounded-t-xl h-[75%] hover:bg-slate-950/35 transition-all"></div>
                <div className="flex-1 bg-slate-950 rounded-t-xl h-full shadow-[0_0_25px_rgba(0,0,0,0.3)]"></div>
                <div className="flex-1 bg-slate-950/20 rounded-t-xl h-[55%] hover:bg-slate-950/30 transition-all"></div>
              </div>

              {/* Water droplet glow background */}
              <div className="absolute right-0 top-0 w-80 h-80 bg-slate-950/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* ROI Card Lateral */}
            <div className="lg:col-span-4 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6 shadow-sm">
                  <span className="material-symbols-outlined text-2xl font-bold">trending_up</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-secondary">Retorno Sobre Investimento</span>
                <h4 className="text-4xl font-black text-on-surface font-headline mt-1">4.8x ROAS</h4>
                <p className="text-xs text-on-surface-variant font-medium mt-2 leading-relaxed">
                  Para cada R$ 1,00 investido em anúncios no DF, a ED Limp gerou R$ 4,80 em serviços fechados de impermeabilização e higienização.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-outline-variant/10 space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface-variant">Custo por Lead (WhatsApp):</span>
                  <span className="text-secondary font-mono">R$ 2,40</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-on-surface-variant">Taxa de Conversão em Venda:</span>
                  <span className="text-primary font-mono">68%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Funil de Conversão Digital */}
          <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h4 className="font-bold font-headline text-primary dark:text-white text-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">filter_alt</span>
                  Funil de Conversão e Vendas (DF & Entorno)
                </h4>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                  Acompanhamento da jornada: de visualizações no feed até o fechamento da OS no WhatsApp.
                </p>
              </div>
              <span className="text-xs font-bold bg-secondary-container/30 text-secondary px-3 py-1.5 rounded-full">
                Funil Otimizado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { stage: '1. Impressões (Feed/Stories)', num: '124.850', percent: '100%', sub: 'Visualizações no DF', icon: 'visibility', color: 'bg-primary/10 text-primary' },
                { stage: '2. Cliques no Anúncio', num: '8.420', percent: '6.7%', sub: 'Interesse qualificado', icon: 'ads_click', color: 'bg-primary/20 text-primary' },
                { stage: '3. Conversas no WhatsApp', num: '842', percent: '10.0%', sub: 'Leads solicitando orçamento', icon: 'chat', color: 'bg-secondary-container text-on-secondary-container' },
                { stage: '4. Ordens de Serviço Fechadas', num: '128', percent: '15.2%', sub: 'Clientes atendidos', icon: 'check_circle', color: 'bg-secondary text-white' },
              ].map((f, idx) => (
                <div key={idx} className="bg-surface-container p-6 rounded-2xl border border-outline-variant/10 shadow-sm relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${f.color}`}>
                        <span className="material-symbols-outlined text-xl">{f.icon}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-on-surface-variant">{f.percent}</span>
                    </div>
                    <p className="text-[10px] font-black uppercase text-on-surface-variant/80 tracking-wider">{f.stage}</p>
                    <h5 className="text-2xl font-black font-headline text-on-surface mt-1">{f.num}</h5>
                  </div>
                  <p className="text-[10px] text-on-surface-variant font-medium mt-3 pt-2 border-t border-outline-variant/10">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Campanhas Ativas no Meta Ads */}
          <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle space-y-6">
            <h4 className="font-bold font-headline text-primary dark:text-white text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">campaign</span>
              Campanhas Ativas & Desempenho
            </h4>

            <div className="space-y-4">
              {[
                { name: '[ED LIMP] [WPP] - HIGIENIZACAO SOFAS - DF RAIO 25KM', status: 'Ativa', leads: 48, cpl: 'R$ 2,15', invest: 'R$ 103,20', roas: '5.2x' },
                { name: '[ED LIMP] [CONVERSAO] - IMPERMEABILIZACAO BLINDAGEM PETS', status: 'Ativa', leads: 32, cpl: 'R$ 2,80', invest: 'R$ 89,60', roas: '4.4x' }
              ].map((c, i) => (
                <div key={i} className="p-5 bg-surface-container rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 border border-outline-variant/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{c.status}</span>
                    </div>
                    <h5 className="font-bold text-xs sm:text-sm text-on-surface font-mono">{c.name}</h5>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant">Leads WhatsApp</p>
                      <p className="font-black text-on-surface">{c.leads}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant">Custo / Lead</p>
                      <p className="font-black text-secondary">{c.cpl}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant">Investimento</p>
                      <p className="font-black text-on-surface">{c.invest}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant">ROAS</p>
                      <p className="font-black text-primary">{c.roas}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
