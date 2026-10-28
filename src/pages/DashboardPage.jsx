import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function DashboardPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cabeçalho
      gsap.fromTo('.gsap-header-item', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', clearProps: 'all' }
      );

      // 2. Cards de Performance
      gsap.fromTo('.gsap-card', 
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out', clearProps: 'all' }
      );

      // 3. Blocos Inferiores
      gsap.fromTo('.gsap-block', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );

      // 4. Barras do gráfico
      gsap.fromTo('.gsap-bar', 
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: 'bottom', duration: 0.7, stagger: 0.04, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full pb-8 font-body">
      
      {/* Top Header - Otimizado e Compacto */}
      <header className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/15 pb-4">
        <div className="gsap-header-item">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-wider font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">analytics</span> Centro de Controle
            </span>
            <span className="text-xs text-on-surface-variant font-medium">ED Limp Brasília • Operação Ativa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary font-headline">
            Visão Geral
          </h2>
          <p className="text-xs text-on-surface-variant font-medium">
            Resumo em tempo real de faturamento, agendamentos, clientes e alertas da frota.
          </p>
        </div>

        <div className="gsap-header-item flex items-center gap-2.5 shrink-0">
          <Link 
            to="/portal/quote" 
            className="bg-primary text-slate-950 px-4 py-2 rounded-xl text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm font-black text-slate-950">assignment_add</span>
            <span className="text-slate-950 font-black">Novo Orçamento</span>
          </Link>
          <Link 
            to="/portal/settings" 
            className="bg-surface-container border border-outline-variant/30 text-on-surface px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-surface-container-high transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm text-primary">settings</span>
            <span>Configurações</span>
          </Link>
        </div>
      </header>
      
      {/* Bento Grid Performance Cards - 4 colunas ocupando toda a largura */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        
        {/* Card 1: Receita Total */}
        <div className="gsap-card bg-surface dark:bg-surface-container p-5 rounded-lg shadow-md border-l-4 border-l-primary border border-outline-variant/40 dark:border-outline-variant/60 hover:border-primary/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-xl">payments</span>
            </div>
            <span className="text-[10px] font-black uppercase text-secondary bg-secondary-container/40 px-2 py-0.5 rounded">
              +12.5%
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Receita Mensal (Jun)</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">R$ 42.850</p>
            <p className="text-xs text-on-surface-variant font-medium">vs R$ 38.100 mês anterior</p>
          </div>
        </div>
        
        {/* Card 2: Agendamentos Ativos */}
        <div className="gsap-card bg-surface dark:bg-surface-container p-5 rounded-lg shadow-md border-l-4 border-l-secondary border border-outline-variant/40 dark:border-outline-variant/60 hover:border-secondary/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-md flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined text-xl">verified</span>
            </div>
            <span className="text-[10px] font-black uppercase text-primary bg-primary/20 px-2 py-0.5 rounded">
              94% Ocupação
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Agendamentos Ativos</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">128</p>
            <p className="text-xs text-on-surface-variant font-medium">Capacidade quase esgotada para sábado</p>
          </div>
        </div>
        
        {/* Card 3: Orçamentos Pendentes */}
        <div className="gsap-card bg-surface dark:bg-surface-container p-5 rounded-lg shadow-md border-l-4 border-l-amber-500 border border-outline-variant/40 dark:border-outline-variant/60 hover:border-amber-500/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-md flex items-center justify-center text-amber-500 shadow-sm">
              <span className="material-symbols-outlined text-xl">pending_actions</span>
            </div>
            <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/20 px-2 py-0.5 rounded">
              Aguardando
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Orçamentos Pendentes</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">14</p>
            <p className="text-xs text-on-surface-variant font-medium">Leads WhatsApp aguardando retorno</p>
          </div>
        </div>
        
        {/* Card 4: Alertas de Estoque */}
        <div className="gsap-card bg-surface dark:bg-surface-container p-5 rounded-lg shadow-md border-l-4 border-l-error border border-outline-variant/40 dark:border-outline-variant/60 hover:border-error/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-error/20 rounded-md flex items-center justify-center text-error shadow-sm">
              <span className="material-symbols-outlined text-xl">warning</span>
            </div>
            <span className="text-[10px] font-black uppercase text-error bg-error/20 px-2 py-0.5 rounded">
              Crítico
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Alertas de Estoque</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">02</p>
            <p className="text-xs text-on-surface-variant font-medium">Detergente Enzimático & Desengordurante</p>
          </div>
        </div>

      </section>

      {/* Grid Principal: 12 Colunas expandidas */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* Coluna Esquerda: Gráfico Semanal + Atividades (8 Colunas no desktop) */}
        <div className="gsap-block xl:col-span-8 bg-surface dark:bg-surface-container p-5 sm:p-6 rounded-lg shadow-md border border-outline-variant/30 dark:border-outline-variant/40 flex flex-col justify-between space-y-6">
          
          <div>
            {/* Header do Gráfico */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-on-surface font-headline">Performance Financeira Semanal</h3>
                <p className="text-on-surface-variant text-[11px] font-semibold uppercase tracking-wider">Receitas vs Custos Operacionais</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <div className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-md bg-primary"></span>
                  <span>Receita</span>
                </div>
                <div className="flex items-center gap-1.5 text-on-surface">
                  <span className="w-3 h-3 rounded-md bg-secondary"></span>
                  <span>Despesa</span>
                </div>
              </div>
            </div>
            
            {/* Gráfico de Barras com altura ajustada */}
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 px-3 border-b border-outline-variant/20 pb-3">
              {[
                { day: 'SEG', rev: 65, exp: 30, valRev: '4.2k', valExp: '1.8k' },
                { day: 'TER', rev: 85, exp: 25, valRev: '5.8k', valExp: '1.5k' },
                { day: 'QUA', rev: 50, exp: 40, valRev: '3.5k', valExp: '2.4k' },
                { day: 'QUI', rev: 92, exp: 20, valRev: '6.4k', valExp: '1.3k' },
                { day: 'SEX', rev: 75, exp: 35, valRev: '5.1k', valExp: '2.1k' },
                { day: 'SAB', rev: 60, exp: 15, valRev: '4.0k', valExp: '900' },
              ].map(item => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full flex justify-center items-end gap-1.5 sm:gap-2.5 h-full">
                    {/* Barra Receita */}
                    <div 
                      className="gsap-bar w-5 sm:w-8 bg-primary rounded-t-md transition-all duration-500 relative group-hover:brightness-110 shadow-sm"
                      style={{ height: `${item.rev}%` }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none z-20">
                        R$ {item.valRev}
                      </span>
                    </div>
                    {/* Barra Despesa */}
                    <div 
                      className="gsap-bar w-5 sm:w-8 bg-secondary rounded-t-md transition-all duration-500 relative group-hover:brightness-110 shadow-sm"
                      style={{ height: `${item.exp}%` }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none z-20">
                        R$ {item.valExp}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-on-surface-variant">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Operations */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold text-on-surface text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">history</span>
                Atividades Operacionais Recentes
              </h4>
              <Link to="/portal/finance" className="text-primary text-xs font-bold hover:underline bg-primary/10 px-3 py-1 rounded-lg">
                Ver Todas
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                { title: 'Higienização + Blindagem Sofá 3 Lugares', client: 'Juliana Paes (Asa Sul)', val: '+ R$ 1.450,00', status: 'Concluído', color: 'text-secondary' },
                { title: 'Aquisição Impermeabilizante Shield Pro HP-900', client: 'Distribuidora Química Pro', val: '- R$ 1.890,00', status: 'Pago', color: 'text-error' },
                { title: 'Limpeza 6 Cadeiras Jantar + Tapete Persa', client: 'Roberto Alves (Lago Sul)', val: '+ R$ 980,00', status: 'Concluído', color: 'text-secondary' }
              ].map((op, idx) => (
                <div key={idx} className="p-3.5 bg-surface-container-low dark:bg-surface-container-high/60 rounded-xl flex items-center justify-between border border-outline-variant/15 hover:border-outline-variant/30 transition-all">
                  <div>
                    <h5 className="font-bold text-xs text-on-surface">{op.title}</h5>
                    <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">{op.client}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-black text-xs sm:text-sm font-mono ${op.color}`}>{op.val}</p>
                    <span className="text-[9px] uppercase font-bold text-on-surface-variant/70">{op.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Coluna Direita: Agenda de Hoje (4 Colunas no desktop) */}
        <div className="gsap-block xl:col-span-4 bg-surface dark:bg-surface-container p-5 sm:p-6 rounded-lg shadow-md border border-outline-variant/30 dark:border-outline-variant/40 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold font-headline text-on-surface">Agenda de Hoje</h3>
                <p className="text-xs text-on-surface-variant font-medium">3 equipes em campo no DF</p>
              </div>
              <span className="bg-primary text-slate-950 font-black px-3 py-1 rounded-full text-xs font-mono shadow-sm">
                Terça, 13
              </span>
            </div>
            
            <div className="space-y-2.5">
              {/* Slot 1 */}
              <div className="p-3 bg-surface-container-low dark:bg-surface-container-high/60 border-l-4 border-secondary rounded-xl border border-outline-variant/15">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-secondary uppercase">09:00 • Concluído</span>
                  <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                </div>
                <p className="text-xs font-bold text-on-surface mt-1">Roberto Alves (Lago Sul)</p>
                <p className="text-[11px] text-on-surface-variant">Impermeabilização Premium Sofá</p>
              </div>

              {/* Slot 2 (Em andamento - Alto Contraste com texto preto profundo) */}
              <div className="p-3.5 bg-primary text-slate-950 border-l-4 border-slate-900 rounded-xl shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-black text-slate-900 bg-black/10 px-2 py-0.5 rounded uppercase">
                    13:30 • EM ANDAMENTO
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 animate-ping"></span>
                </div>
                <p className="text-xs font-black mt-1.5 text-slate-950">Juliana Paes (Asa Sul)</p>
                <p className="text-[11px] text-slate-900/80 font-semibold">Higienização Clínica + Veludo Italiano</p>
              </div>

              {/* Slot 3 */}
              <div className="p-3 bg-surface-container-low dark:bg-surface-container-high/60 border-l-4 border-outline-variant rounded-xl border border-outline-variant/15 opacity-80">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase">16:00 • Agendado</span>
                  <span className="material-symbols-outlined text-outline-variant text-sm">schedule</span>
                </div>
                <p className="text-xs font-bold text-on-surface mt-1">Dr. Marcos Albuquerque (SCN)</p>
                <p className="text-[11px] text-on-surface-variant">Limpeza 60 Cadeiras Escritório</p>
              </div>
            </div>
          </div>
          
          {/* Card Dica */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-3.5 border border-primary/20">
            <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">lightbulb</span> Dica do Especialista
            </p>
            <p className="text-[11px] text-on-surface font-medium leading-relaxed">
              Antes de iniciar a impermeabilização da tarde, verifique a secagem e o teste de repelência com gota d'água.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
