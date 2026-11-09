import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { getStoredFinance, getStoredClients, getStoredInventory, getStoredSchedule } from '../lib/storage';

export default function DashboardPage() {
  const containerRef = useRef(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    clientsCount: 0,
    inventoryAlerts: 0,
    scheduleCount: 0,
    recentTransactions: [],
    recentSchedule: [],
  });

  useEffect(() => {
    // Carregar dados reais dinâmicos
    const finance = getStoredFinance();
    const clients = getStoredClients();
    const inventory = getStoredInventory();
    const schedule = getStoredSchedule();

    const revenue = finance
      .filter(t => t.type === 'entrada')
      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    const expenses = finance
      .filter(t => t.type === 'saida')
      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    const alerts = inventory.filter(i => (Number(i.volume) || 0) <= (Number(i.minAlert) || 10)).length;

    setStats({
      totalRevenue: revenue,
      totalExpenses: expenses,
      clientsCount: clients.length,
      inventoryAlerts: alerts,
      scheduleCount: schedule.length,
      recentTransactions: finance.slice(0, 3),
      recentSchedule: schedule.slice(0, 3),
    });

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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div ref={containerRef} className="w-full pb-8 font-body">
      
      {/* Top Header - Otimizado e Compacto */}
      <header className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/15 pb-4">
        <div className="gsap-header-item">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-wider font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">analytics</span> Centro de Controle
            </span>
            <span className="text-xs text-on-surface-variant font-medium">ED Limp Brasília • Dados Reais</span>
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
              {stats.totalRevenue > 0 ? 'Ativo' : 'Inicial'}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Receita Real Registrada</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">{formatCurrency(stats.totalRevenue)}</p>
            <p className="text-xs text-on-surface-variant font-medium">Despesas: {formatCurrency(stats.totalExpenses)}</p>
          </div>
        </div>
        
        {/* Card 2: Clientes Cadastrados */}
        <div className="gsap-card bg-surface dark:bg-surface-container p-5 rounded-lg shadow-md border-l-4 border-l-secondary border border-outline-variant/40 dark:border-outline-variant/60 hover:border-secondary/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-md flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined text-xl">people</span>
            </div>
            <Link to="/portal/clients" className="text-[10px] font-black uppercase text-primary bg-primary/20 px-2 py-0.5 rounded hover:underline">
              Gerenciar
            </Link>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Clientes Cadastrados</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">{stats.clientsCount}</p>
            <p className="text-xs text-on-surface-variant font-medium">Base de clientes protegida</p>
          </div>
        </div>
        
        {/* Card 3: Agendamentos Ativos */}
        <div className="gsap-card bg-surface dark:bg-surface-container p-5 rounded-lg shadow-md border-l-4 border-l-amber-500 border border-outline-variant/40 dark:border-outline-variant/60 hover:border-amber-500/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-md flex items-center justify-center text-amber-500 shadow-sm">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </div>
            <Link to="/portal/schedule" className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/20 px-2 py-0.5 rounded hover:underline">
              Agenda
            </Link>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Agendamentos Marcados</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">{stats.scheduleCount}</p>
            <p className="text-xs text-on-surface-variant font-medium">Equipes e slots cadastrados</p>
          </div>
        </div>
        
        {/* Card 4: Alertas de Estoque */}
        <div className="gsap-card bg-surface dark:bg-surface-container p-5 rounded-lg shadow-md border-l-4 border-l-error border border-outline-variant/40 dark:border-outline-variant/60 hover:border-error/80 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-error/20 rounded-md flex items-center justify-center text-error shadow-sm">
              <span className="material-symbols-outlined text-xl">inventory_2</span>
            </div>
            <Link to="/portal/inventory" className="text-[10px] font-black uppercase text-error bg-error/20 px-2 py-0.5 rounded hover:underline">
              Estoque
            </Link>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Insumos em Alerta</p>
            <p className="text-2xl sm:text-3xl font-headline font-black text-on-surface tracking-tight">{String(stats.inventoryAlerts).padStart(2, '0')}</p>
            <p className="text-xs text-on-surface-variant font-medium">Produtos abaixo do nível mínimo</p>
          </div>
        </div>

      </section>

      {/* Grid Principal: 12 Colunas */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* Coluna Esquerda: Transações Recentes e Operação (8 Colunas no desktop) */}
        <div className="gsap-block xl:col-span-8 bg-surface dark:bg-surface-container p-5 sm:p-6 rounded-lg shadow-md border border-outline-variant/30 dark:border-outline-variant/40 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-bold text-on-surface text-base flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-lg">history</span>
                  Últimos Lançamentos Financeiros
                </h4>
                <p className="text-on-surface-variant text-[11px] font-semibold uppercase tracking-wider">Entradas e saídas registradas</p>
              </div>
              <Link to="/portal/finance" className="text-primary text-xs font-bold hover:underline bg-primary/10 px-3 py-1.5 rounded-lg">
                Novo Lançamento
              </Link>
            </div>

            {stats.recentTransactions.length === 0 ? (
              <div className="p-8 text-center bg-surface-container-low dark:bg-surface-container-high/40 rounded-xl border border-dashed border-outline-variant/30">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-2">account_balance_wallet</span>
                <p className="text-sm font-bold text-on-surface">Nenhum lançamento financeiro registrado ainda.</p>
                <p className="text-xs text-on-surface-variant mt-1">Os lançamentos reais cadastrados no módulo Financeiro aparecerão aqui.</p>
                <Link to="/portal/finance" className="mt-3 inline-block text-xs font-black text-primary underline">
                  + Registrar primeira entrada/saída
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.recentTransactions.map((t) => (
                  <div key={t.id} className="p-3.5 bg-surface-container-low dark:bg-surface-container-high/60 rounded-xl flex items-center justify-between border border-outline-variant/15 hover:border-outline-variant/30 transition-all">
                    <div>
                      <h5 className="font-bold text-xs text-on-surface">{t.desc || 'Serviço'}</h5>
                      <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">{t.client || t.category} • {t.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-xs sm:text-sm font-mono ${t.type === 'entrada' ? 'text-secondary' : 'text-error'}`}>
                        {t.type === 'entrada' ? '+' : '-'} {formatCurrency(t.amount)}
                      </p>
                      <span className="text-[9px] uppercase font-bold text-on-surface-variant/70">{t.method || 'PIX'}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dica Operacional ED Limp */}
          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
            <p className="text-xs font-black text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">verified</span>
              Operação em Modo Produção Limpo
            </p>
            <p className="text-xs text-on-surface font-medium leading-relaxed">
              O sistema agora está pronto para receber os clientes, notas e receitas reais da ED Limp. Todos os dados adicionados nos formulários são salvos e protegidos localmente com opção de exportação em JSON.
            </p>
          </div>

        </div>
        
        {/* Coluna Direita: Agenda de Hoje (4 Colunas no desktop) */}
        <div className="gsap-block xl:col-span-4 bg-surface dark:bg-surface-container p-5 sm:p-6 rounded-lg shadow-md border border-outline-variant/30 dark:border-outline-variant/40 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold font-headline text-on-surface">Agenda Operacional</h3>
                <p className="text-xs text-on-surface-variant font-medium">Atendimentos no DF</p>
              </div>
              <Link to="/portal/schedule" className="bg-primary text-slate-950 font-black px-3 py-1 rounded-full text-xs font-mono shadow-sm hover:scale-105 transition-all">
                Ver Agenda
              </Link>
            </div>
            
            {stats.recentSchedule.length === 0 ? (
              <div className="p-6 text-center bg-surface-container-low dark:bg-surface-container-high/40 rounded-xl border border-dashed border-outline-variant/30">
                <span className="material-symbols-outlined text-2xl text-on-surface-variant/40 mb-1">event_available</span>
                <p className="text-xs font-bold text-on-surface">Nenhum atendimento agendado.</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Adicione clientes na agenda para acompanhar a frota.</p>
                <Link to="/portal/schedule" className="mt-2 inline-block text-xs font-bold text-primary underline">
                  + Agendar atendimento
                </Link>
              </div>
            ) : (
              <div className="space-y-2.5">
                {stats.recentSchedule.map((slot) => (
                  <div key={slot.id} className="p-3 bg-surface-container-low dark:bg-surface-container-high/60 border-l-4 border-secondary rounded-xl border border-outline-variant/15">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-secondary uppercase">{slot.time} • {slot.status || 'Agendado'}</span>
                      <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                    </div>
                    <p className="text-xs font-bold text-on-surface mt-1">{slot.clientName || slot.client}</p>
                    <p className="text-[11px] text-on-surface-variant">{slot.title || slot.address}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Card Backup */}
          <div className="bg-surface-container-low dark:bg-surface-container-high/40 rounded-xl p-3.5 border border-outline-variant/20">
            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-secondary">cloud_done</span> Backup & Segurança
            </p>
            <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
              Acesse Configurações para exportar cópias de segurança em formato JSON a qualquer momento.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
