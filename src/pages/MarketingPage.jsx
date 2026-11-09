import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as htmlToImage from 'html-to-image';
import { getStoredMarketingGoals, saveStoredMarketingGoals, getStoredReviews, saveStoredReview } from '../lib/storage';
import { generateAdCopyRealAI, generateSocialPostCreativeAI } from '../lib/gemini';

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
  const [isGeneratingPostAI, setIsGeneratingPostAI] = useState(false);
  const canvasRef = useRef(null);

  // Biblioteca de imagens curadas de alta definição para estofados & interiores
  const postBackgrounds = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', // Sofá verde luxo sala
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80', // Sofá cinza moderno
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80', // Sala de estar aconchegante
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80', // Sofá linho claro elegante
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', // Banheiro/limpeza clinica
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80', // Quarto e colchão higienizado
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80', // Sala arquitetura alto padrão
  ];

  const handleGeneratePostWithAI = async () => {
    setIsGeneratingPostAI(true);
    const themes = [
      "Higienização profunda de sofá retrátil com eliminação de ácaros e bactérias",
      "Impermeabilização e blindagem de estofados resistente a café e vinho",
      "Eliminação profunda de odores e manchas de pets em sofás e tapetes",
      "Higienização de colchão hospitalar para quem sofre com rinite alérgica",
      "Sofá novo de novo sem precisar comprar outro: restauração de estofados"
    ];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    try {
      const result = await generateSocialPostCreativeAI(randomTheme);
      if (result && result.headline) {
        setHeadline(result.headline);
        if (result.subtext) setSubtext(result.subtext);
        if (result.overlayColor) setOverlayColor(result.overlayColor);
        // Alternar para foto aleatória de estofados de luxo
        const randomBg = postBackgrounds[Math.floor(Math.random() * postBackgrounds.length)];
        setBgImage(randomBg);
      } else {
        // Fallback rápido inteligente
        const presets = [
          { h: 'Sofá Como Novo em Poucas Horas!', s: 'Extração Profunda Alemã & Secagem Rápida', c: '#2b6c00' },
          { h: 'Blindagem Nano Shield ED Limp', s: 'Seu Sofá Protegido Contra Vinhos, Sucos e Café', c: '#166534' },
          { h: 'Seu Pet Fez Xixi no Sofá?', s: 'Eliminação Enzimática de Odores e Manchas na Raiz', c: '#0f3d17' },
          { h: 'Durma Livre de Crises Alérgicas', s: 'Higienização Clínica de Colchão com Bactericida Hospitalar', c: '#1e3a8a' },
        ];
        const p = presets[Math.floor(Math.random() * presets.length)];
        setHeadline(p.h);
        setSubtext(p.s);
        setOverlayColor(p.c);
        setBgImage(postBackgrounds[Math.floor(Math.random() * postBackgrounds.length)]);
      }
    } catch (e) {
      console.warn("Erro ao gerar arte com IA:", e);
    } finally {
      setIsGeneratingPostAI(false);
    }
  };

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
  // ESTADOS & DADOS: ANÚNCIOS PATROCINADOS & IA DE CRIATIVOS
  // ==========================================
  const [copiedId, setCopiedId] = useState(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiIdeaCount, setAiIdeaCount] = useState(0);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Banco de Ideias / Copys geradas por IA para Higienização e Impermeabilização em Brasília
  const aiCreativeIdeas = [
    {
      badge: 'IA Growth • Gancho Sanitário & Alergias',
      objective: 'Engajamento / Mensagens (WhatsApp direto)',
      campaignName: '[ED LIMP] [IA] - SAUDE & ALERGIAS - DF FAMILIAS',
      targetAudience: {
        locations: 'Brasília, DF (Raio 25km) - Asa Sul, Asa Norte, Sudoeste, Águas Claras, Guará, Noroeste',
        age: '28 a 55 anos',
        gender: 'Mulheres e Homens (Foco em Famílias e Pais)',
        interests: 'Saúde infantil, Alergia respiratória, Rinite, Decoração, Família, Pets',
      },
      budget: 'R$ 25,00 a R$ 45,00 / dia',
      headline: 'Rinite constante em casa? A culpa pode ser do sofá!',
      description: 'Extração hospitalar elimina 99.9% de ácaros e bactérias no DF.',
      callToAction: 'Falar com Especialista no WhatsApp',
      primaryText: `Você ou alguém da sua família acorda com espirros, coceira no nariz ou crises de rinite? 🤧⚠️

Pouca gente sabe, mas um sofá pode acumular mais de 2 milhões de ácaros, fungos e restos de pele invisíveis a olho nu.

Com a Higienização Clínica Profunda da ED Limp:
✅ Extração profunda com maquinário alemão de alta sucção
✅ Bactericida hospitalar seguro para crianças e pets
✅ Eliminação de odores, ácaros e mofo
✅ Secagem rápida no mesmo dia!

📲 Toque no botão abaixo e envie uma foto do seu estofado para receber um orçamento sem compromisso no WhatsApp! 👇`
    },
    {
      badge: 'IA Growth • Gancho Blindagem & Vinhos/Café',
      objective: 'Conversão / Mensagens para Fechamento',
      campaignName: '[ED LIMP] [IA] - BLINDAGEM NANO SHIELD - BRASILIA VIP',
      targetAudience: {
        locations: 'Brasília - Lago Sul, Lago Norte, Park Way, Sudoeste, Noroeste, Asa Sul',
        age: '30 a 62 anos',
        gender: 'Todos (Público A/B)',
        interests: 'Vinho, Gastronomia, Arquitetura, Móveis de Design, Sofá de Linho, Decoração de luxo',
      },
      budget: 'R$ 35,00 a R$ 60,00 / dia',
      headline: 'Derrubou vinho ou café no sofá? Com a Blindagem ED Limp não mancha!',
      description: 'Proteção nano-tecnológica que repele líquidos com garantia.',
      callToAction: 'Solicitar Orçamento no WhatsApp',
      primaryText: `Acidentes acontecem em segundos, mas uma mancha pode durar para sempre! 🍷☕🛋️

A Impermeabilização Nano-Shield da ED Limp cria uma barreira molecular invisível nas fibras do tecido. Qualquer líquido derramado (café, vinho, refrigerante ou molho) vira gota na superfície e sai facilmente com um guardanapo!

🛡️ Não altera o toque ou a cor do tecido (ideal para linho e veludo)
🛡️ Proteção certificada não inflamável
🛡️ Garantia formal com certificado ED Limp
🛡️ Atendimento com hora marcada em todo o Distrito Federal

👉 Toque em "Solicitar Orçamento" e proteja o estofado da sua casa hoje mesmo!`
    },
    {
      badge: 'IA Growth • Gancho Estofado Como Novo / Economia',
      objective: 'Engajamento / Mensagens WhatsApp',
      campaignName: '[ED LIMP] [IA] - SOFA NOVO SEM COMPRAR OUTRO - DF',
      targetAudience: {
        locations: 'Brasília e Regiões Administrativas (+30km)',
        age: '25 a 58 anos',
        gender: 'Todos',
        interests: 'Reforma, Limpeza doméstica, Dicas de casa, Decoração, Economia',
      },
      budget: 'R$ 20,00 a R$ 35,00 / dia',
      headline: 'Não troque de sofá! Deixe ele com cheiro e cor de novo por uma fração do preço!',
      description: 'Higienização e revitalização em domicílio no DF.',
      callToAction: 'Enviar Mensagem no WhatsApp',
      primaryText: `Pensando em gastar R$ 4.000 ou R$ 6.000 em um sofá novo porque o seu está encardido ou com manchas? 🛑🛋️

Com a higienização técnica especializada da ED Limp, nós revitalizamos o tecido original, retirando sujidades profundas, suor acumulado, manchas e odores.

✨ Devolve a cor original das fibras
✨ Deixa o estofado perfumado e higienizado
✨ Economia de mais de 80% em relação à compra de um novo
✨ Atendimento rápido e pontual no conforto da sua residência

📲 Clique no botão e mande uma foto do seu estofado para ver a mágica acontecer!`
    },
    {
      badge: 'IA Growth • Gancho Pets & Xixi / Odores',
      objective: 'Conversão / WhatsApp Direto',
      campaignName: '[ED LIMP] [IA] - REMOCAO DE ODOR PETS - DF',
      targetAudience: {
        locations: 'Brasília, DF - Plano Piloto, Águas Claras, Sudoeste, Guará, Taguatinga',
        age: '24 a 56 anos',
        gender: 'Todos',
        interests: 'Gatos, Cachorros, Pet shops, Adoção de pets, Veterinária',
      },
      budget: 'R$ 25,00 a R$ 40,00 / dia',
      headline: 'Seu pet fez xixi no sofá? Removemos o cheiro e a mancha pela raiz!',
      description: 'Tratamento enzimático hospitalar elimina bactérias e odor.',
      callToAction: 'Chamar no WhatsApp Agora',
      primaryText: `Amamos nossos bichinhos, mas acidentes no sofá deixam um cheiro que não sai com receita caseira! 🐾🐶🐱

Produtos de mercado apenas mascaram o odor e espalham a mancha para o fundo da espuma.

A ED Limp utiliza Neutralizadores Enzimáticos de ação profunda que decompõem as moléculas de ureia e bactérias causadoras do mau cheiro, eliminando o problema na raiz sem danificar o tecido!

✅ Eliminação do odor característico
✅ Sanitização com extratora profissional
✅ Não irrita o olfato dos pets
✅ Atendimento domiciliar em todo o DF

👇 Toque no botão e recupere o conforto do seu sofá hoje!`
    }
  ];

  const [activeAd, setActiveAd] = useState(aiCreativeIdeas[0]);

  // Função para a IA (Google Gemini 3.8 Flash) gerar criativo ou alternar
  const handleGenerateNextAIIdea = async () => {
    setIsGeneratingAI(true);
    const themes = [
      "Higienização profunda de estofados e eliminação de ácaros e bactérias para famílias no DF",
      "Blindagem e impermeabilização premium Nano Shield contra manchas de café, vinho e líquidos no Lago Sul e Noroeste",
      "Limpeza profunda e neutralização enzimática de xixi e odores de pets (cães e gatos) em sofás em Águas Claras e Sudoeste",
      "Higienização e sanitização hospitalar de colchões para alívio imediato de rinite alérgica",
      "Limpeza e revitalização de cadeiras de jantar e sofás de linho claro antes de eventos em família em Brasília"
    ];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    try {
      const generated = await generateAdCopyRealAI(randomTheme);
      if (generated && generated.headline && generated.primaryText) {
        setActiveAd({
          badge: generated.badge || 'Google Gemini IA • Alta Conversão',
          objective: generated.objective || 'Engajamento / Mensagens (WhatsApp direto)',
          campaignName: generated.campaignName || '[ED LIMP] [IA] - META ADS BRASILIA',
          targetAudience: {
            locations: generated.locations || 'Brasília, DF (Raio 25km) - Asa Sul, Asa Norte, Sudoeste, Noroeste, Águas Claras',
            age: generated.age || '26 a 58 anos',
            gender: 'Todos (Foco em donos de residências e famílias)',
            interests: 'Decoração, Bem-estar, Pets, Arquitetura, Família',
          },
          budget: generated.budget || 'R$ 25,00 a R$ 45,00 / dia',
          headline: generated.headline,
          description: generated.description || 'Tecnologia extratora hospitalar com secagem rápida no DF',
          callToAction: generated.callToAction || 'Enviar mensagem pelo WhatsApp',
          primaryText: generated.primaryText,
        });
      } else {
        // Fallback para preset
        const nextIndex = (aiIdeaCount + 1) % aiCreativeIdeas.length;
        setAiIdeaCount(nextIndex);
        setActiveAd(aiCreativeIdeas[nextIndex]);
      }
    } catch (e) {
      console.warn("Erro ao gerar criativo Gemini, usando rotação de presets:", e);
      const nextIndex = (aiIdeaCount + 1) % aiCreativeIdeas.length;
      setAiIdeaCount(nextIndex);
      setActiveAd(aiCreativeIdeas[nextIndex]);
    } finally {
      setIsGeneratingAI(false);
    }
  };

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
    <div className="min-h-screen bg-background text-on-surface font-body transition-colors">
      
      {/* Top Header */}
      <header className="mb-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-outline-variant/15 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-wider font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">rocket_launch</span> Growth & Marketing Hub
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Brasília & Entorno</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-headline">
            Central de Marketing & Crescimento
          </h2>
          <p className="text-on-surface-variant text-xs font-medium mt-0.5">
            Anúncios com inteligência artificial, Google Meu Negócio, metas semanais e gerador de artes.
          </p>
        </div>

        {/* Navigation Tabs - CABER TUDO NUMA LINHA SÓ COM SCROLL HORIZONTAL FLUIDO */}
        <div className="flex items-center gap-1 bg-surface-container-low dark:bg-surface-container-high/40 p-1.5 rounded-2xl shadow-subtle border border-outline-variant/15 overflow-x-auto max-w-full custom-scrollbar">
          <button 
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 ${activeTab === 'ads' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">campaign</span>
            <span>Patrocinados (Meta Ads)</span>
          </button>

          <button 
            onClick={() => setActiveTab('gmb')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 ${activeTab === 'gmb' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">reviews</span>
            <span>Google Meu Negócio</span>
          </button>

          <button 
            onClick={() => setActiveTab('goals')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 ${activeTab === 'goals' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">track_changes</span>
            <span>Metas Semanais</span>
          </button>

          <button 
            onClick={() => setActiveTab('creative')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 ${activeTab === 'creative' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">palette</span>
            <span>Gerador de Artes</span>
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all shrink-0 ${activeTab === 'analytics' ? 'bg-primary text-slate-950 shadow-md font-black' : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined text-sm">insights</span>
            <span>Métricas & ROI</span>
          </button>
        </div>
      </header>

      {/* ABA 1: META ADS COM BOTÃO DE ATUALIZAR IDEIA POR IA */}
      {activeTab === 'ads' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Barra Superior com Botão Conectado à IA de Criativos */}
          <div className="bg-surface-container-low dark:bg-surface-container-high/40 p-5 rounded-2xl border border-outline-variant/15 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-2xl font-black">psychology</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold font-headline text-on-surface text-base">Ficha Técnica com IA de Criativos</h3>
                  <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-[10px] font-black uppercase">IA Ativa</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Copie e cole diretamente no <strong>Gerenciador de Anúncios da Meta</strong> para atrair famílias no WhatsApp.
                </p>
              </div>
            </div>

            {/* BOTÃO ATUALIZAR IDEIA COM IA */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleGenerateNextAIIdea}
                disabled={isGeneratingAI}
                className="w-full md:w-auto bg-primary text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
                title="Gera novos textos persuasivos, headlines e públicos-alvo testados"
              >
                <span className={`material-symbols-outlined text-base font-black ${isGeneratingAI ? 'animate-spin' : ''}`}>
                  {isGeneratingAI ? 'refresh' : 'auto_awesome'}
                </span>
                <span>{isGeneratingAI ? 'Gerando com IA...' : 'Atualizar Ideia com IA'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Lado Esquerdo: Ficha Técnica */}
            <div className="lg:col-span-6 bg-surface-container-low dark:bg-surface-container-high/40 p-6 sm:p-7 rounded-2xl border border-outline-variant/15 shadow-subtle space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-secondary tracking-widest">{activeAd.badge}</span>
                <span className="text-xs text-on-surface-variant font-mono">Meta Ads (Instagram + Facebook)</span>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">1. Nome Sugerido da Campanha</label>
                  <div className="flex items-center justify-between p-3 bg-surface-container dark:bg-slate-900 rounded-xl text-xs font-mono font-bold text-on-surface border border-outline-variant/20">
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
                  <div className="p-3 bg-surface-container dark:bg-slate-900 rounded-xl text-xs text-on-surface border border-outline-variant/20">
                    <p className="font-bold text-primary">Distrito Federal e Regiões de Alto Potencial:</p>
                    <p className="text-on-surface-variant text-[11px] mt-0.5">{activeAd.targetAudience.locations}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">Faixa Etária</label>
                    <div className="p-3 bg-surface-container dark:bg-slate-900 rounded-xl text-xs font-bold text-on-surface border border-outline-variant/20">{activeAd.targetAudience.age}</div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70 mb-1 block">Orçamento Diário Sugerido</label>
                    <div className="p-3 bg-secondary-container/30 text-secondary rounded-xl text-xs font-black border border-secondary/20 font-mono">{activeAd.budget}</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                <a href="https://adsmanager.facebook.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black hover:shadow-lg transition-all">
                  <span>Abrir Gestor da Meta</span>
                  <span className="material-symbols-outlined text-sm font-black">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Lado Direito: Peça de Copywriting */}
            <div className="lg:col-span-6 space-y-5">
              <div className="bg-surface-container-low dark:bg-surface-container-high/40 p-6 sm:p-7 rounded-2xl border border-outline-variant/15 shadow-subtle space-y-4">
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
                  <div className="bg-surface-container dark:bg-slate-900 p-4 rounded-xl text-xs text-on-surface whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto border border-outline-variant/20 custom-scrollbar font-medium">
                    {activeAd.primaryText}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant/70">Título (Headline)</label>
                      <button onClick={() => copyToClipboard(activeAd.headline, 'copy-head')} className="text-primary text-[11px] font-bold">
                        {copiedId === 'copy-head' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                    <div className="bg-surface-container dark:bg-slate-900 p-3 rounded-xl text-xs font-bold text-on-surface border border-outline-variant/20">{activeAd.headline}</div>
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

      {/* ABA 2: GOOGLE MEU NEGÓCIO */}
      {activeTab === 'gmb' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 bg-surface-container-low dark:bg-surface-container-high/40 rounded-2xl p-6 sm:p-8 border border-outline-variant/15 flex flex-col justify-between">
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
            <div className="md:col-span-7 bg-surface-container-low dark:bg-surface-container-high/40 rounded-2xl p-6 sm:p-8 border border-outline-variant/15 flex flex-col justify-between space-y-6">
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
          <div className="bg-surface-container-low dark:bg-surface-container-high/40 rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle space-y-6">
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

      {/* ABA 3: METAS SEMANAIS */}
      {activeTab === 'goals' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Meta de Clientes */}
            <div className="md:col-span-6 bg-surface-container-low dark:bg-surface-container-high/40 rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-6">
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
                <span className="text-xs text-on-surface-variant font-medium">Ajustar atendimentos realizados:</span>
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
            <div className="md:col-span-6 bg-surface-container-low dark:bg-surface-container-high/40 rounded-2xl p-8 border border-outline-variant/10 shadow-subtle space-y-6">
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
        <section className="bg-surface-container-low dark:bg-surface-container-high/40 rounded-2xl p-6 sm:p-10 shadow-subtle border border-outline-variant/10 animate-fadeIn space-y-6">
          
          {/* Topo com Botão Gerar Arte com IA */}
          <div className="bg-surface dark:bg-surface-container p-5 rounded-2xl border border-outline-variant/15 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-2xl font-black">palette</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold font-headline text-on-surface text-base">Gerador de Artes & Posts Sociais</h3>
                  <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-[10px] font-black uppercase">Google Gemini 3.8</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Crie posts e artes profissionais para Instagram Feed (1:1) ou Story prontos para exportar em alta definição.
                </p>
              </div>
            </div>

            <button
              onClick={handleGeneratePostWithAI}
              disabled={isGeneratingPostAI}
              className="w-full md:w-auto bg-primary text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              title="Gera novos textos de posts, títulos magnéticos e fotos de estofados usando a IA oficial do Google"
            >
              <span className={`material-symbols-outlined text-base font-black ${isGeneratingPostAI ? 'animate-spin' : ''}`}>
                {isGeneratingPostAI ? 'refresh' : 'auto_awesome'}
              </span>
              <span>{isGeneratingPostAI ? 'Gerando Ideia de Post...' : 'Gerar Post com IA'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface dark:bg-surface-container p-6 rounded-2xl border border-outline-variant/10 shadow-subtle space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-primary flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-base">edit_note</span> Personalização da Arte
                  </h3>
                  <div className="flex gap-1 bg-surface-container-high/60 p-1 rounded-xl">
                    <button 
                      onClick={() => setLayoutType('feed')}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${layoutType === 'feed' ? 'bg-primary text-slate-950 font-black' : 'text-on-surface-variant'}`}
                    >
                      Feed (1:1)
                    </button>
                    <button 
                      onClick={() => setLayoutType('story')}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${layoutType === 'story' ? 'bg-primary text-slate-950 font-black' : 'text-on-surface-variant'}`}
                    >
                      Story (9:16)
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Título Principal do Post</label>
                  <input value={headline} onChange={e => setHeadline(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-bold text-on-surface" placeholder="Ex: Sofá Como Novo em Poucas Horas!" />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Subtítulo / Chamada de Benefício</label>
                  <input value={subtext} onChange={e => setSubtext(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-medium text-on-surface" placeholder="Ex: Higienização Profunda & Blindagem Hospitalar" />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Contato / Rodapé</label>
                  <input value={contact} onChange={e => setContact(e.target.value)} className="w-full bg-surface-container border border-outline-variant/20 rounded-xl text-xs p-3 font-bold text-on-surface" />
                </div>

                {/* Seleção Rápida de Imagens de Sofás & Ambientes */}
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1.5 block">Trocar Foto de Fundo</label>
                  <div className="grid grid-cols-4 gap-2">
                    {postBackgrounds.slice(0, 4).map((bg, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBgImage(bg)}
                        className={`h-12 rounded-lg overflow-hidden border-2 transition-all ${bgImage === bg ? 'border-primary ring-2 ring-primary/40' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img src={bg} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-surface dark:bg-surface-container p-6 rounded-2xl border border-outline-variant/10 shadow-subtle">
                <h3 className="font-bold text-primary mb-3 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-sm">download</span> Baixar Arte Pronta em Alta
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleExport('jpg')} className="bg-primary text-slate-950 font-black p-3 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 shadow-sm flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">image</span>
                    <span>JPG HD</span>
                  </button>
                  <button onClick={() => handleExport('png')} className="bg-surface-container hover:bg-surface-container-high p-3 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">photo_size_select_actual</span>
                    <span>PNG HD</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center sticky top-6">
              <div 
                ref={canvasRef}
                className="relative overflow-hidden bg-white shadow-2xl rounded-3xl transition-all duration-300"
                style={{ 
                  width: layoutType === 'story' ? '340px' : '460px', 
                  aspectRatio: layoutType === 'story' ? '9/16' : '1/1' 
                }}
              >
                <img src={bgImage} className="absolute inset-0 w-full h-full object-cover" alt="Fundo" />
                <div className="absolute inset-0 opacity-85" style={{ background: `linear-gradient(to top, ${overlayColor} 0%, rgba(0,0,0,0.2) 60%, transparent 100%)` }}></div>
                <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-between z-10 text-white">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-white/95 text-slate-950 px-3.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="font-black text-[10px] uppercase tracking-widest text-slate-950">ED Limp Oficial</span>
                    </div>
                    <span className="text-[10px] font-bold text-white/90 bg-black/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full">Brasília • DF</span>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black font-headline leading-tight drop-shadow-md text-white">{headline}</h3>
                    <p className="text-xs sm:text-sm font-semibold mt-2 opacity-95 drop-shadow-sm text-white/95 leading-relaxed">{subtext}</p>
                    <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                      <p className="text-[11px] font-mono font-bold bg-black/40 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm text-white">{contact}</p>
                      <span className="text-[9px] font-bold uppercase text-white/80">Atendimento a Domicílio</span>
                    </div>
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
          <div className="bg-surface-container-low dark:bg-surface-container-high/40 rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle">
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
