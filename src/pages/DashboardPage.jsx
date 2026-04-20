import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <>
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Visão Geral</h2>
          <p className="text-on-surface-variant font-medium">Bem-vindo ao centro de controle ED Limp. Aqui está o resumo da sua operação clínica.</p>
        </div>
        <Link to="/settings" className="bg-surface-container border border-outline-variant/20 hover:bg-surface-container-high text-primary px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center gap-2 w-fit active:scale-95 hover-lift">
          <span className="material-symbols-outlined text-sm">tune</span> Configurações & Gestão
        </Link>
      </header>
      
      {/* Bento Grid Performance Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Revenue Card */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-subtle border-l-4 border-primary transition-all hover:shadow-premium">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-full">payments</span>
            <span className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Receita Mensal</span>
          </div>
          <p className="text-3xl font-extrabold text-on-surface">R$ 42.850</p>
          <div className="mt-2 flex items-center gap-1 text-secondary text-sm font-bold">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            <span>+12.5%</span>
            <span className="text-on-surface-variant font-normal ml-1">vs mês anterior</span>
          </div>
        </div>
        
        {/* Active Bookings */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-subtle border-l-4 border-secondary transition-all hover:shadow-premium">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-secondary bg-secondary-container p-2 rounded-full">verified</span>
            <span className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Agendamentos Ativos</span>
          </div>
          <p className="text-3xl font-extrabold text-on-surface">128</p>
          <div className="mt-2 flex items-center gap-1 text-primary text-sm font-bold">
            <span className="material-symbols-outlined text-xs">event</span>
            <span>94%</span>
            <span className="text-on-surface-variant font-normal ml-1">taxa de ocupação</span>
          </div>
        </div>
        
        {/* Pending Services */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-subtle border-l-4 border-tertiary-fixed-dim transition-all hover:shadow-premium">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-tertiary-container bg-tertiary-fixed p-2 rounded-full">pending_actions</span>
            <span className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Serviços Pendentes</span>
          </div>
          <p className="text-3xl font-extrabold text-on-surface">14</p>
          <div className="mt-2 flex items-center gap-1 text-error text-sm font-bold">
            <span className="material-symbols-outlined text-xs">schedule</span>
            <span>Aguardando</span>
            <span className="text-on-surface-variant font-normal ml-1">confirmação técnica</span>
          </div>
        </div>
        
        {/* Low Stock */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-subtle border-l-4 border-error transition-all hover:shadow-premium">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-error bg-error-container p-2 rounded-full">warning</span>
            <span className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Alertas de Estoque</span>
          </div>
          <p className="text-3xl font-extrabold text-on-surface">03</p>
          <div className="mt-2 flex items-center gap-1 text-error text-sm font-bold">
            <span className="material-symbols-outlined text-xs">inventory</span>
            <span>Itens críticos</span>
            <span className="text-on-surface-variant font-normal ml-1">necessitam compra</span>
          </div>
        </div>
      </section>

      {/* Charts and Lists Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue vs Expenses Chart Area */}
        <div className="bg-primary/5 dark:bg-primary/20 border border-primary/10 rounded-3xl p-8 relative overflow-hidden shadow-subtle">
           <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
             <div className="text-center sm:text-left">
               <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Oferta Especial</span>
               <h3 className="text-2xl font-headline font-black text-primary mt-3">Eleve o Nível da sua Clínica</h3>
               <p className="text-on-surface-variant max-w-sm mt-2 font-medium">Assine o plano Pro para desbloquear relatórios avançados e automação de agendamentos.</p>
             </div>
             <button className="bg-primary text-white font-black px-8 py-4 rounded-2xl shadow-premium hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest hover-lift">
                Fazer Upgrade Agora
             </button>
           </div>
           
           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary opacity-[0.03] rounded-full blur-3xl"></div>
        </div>
        
        <div className="lg:col-span-2 bg-surface-container-low p-4 sm:p-8 rounded-3xl shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-primary mb-1">Performance Financeira</h3>
              <p className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Receita vs Despesas - Semanal</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-semibold text-on-surface-variant uppercase">Receita</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                <span className="text-xs font-semibold text-on-surface-variant uppercase">Despesa</span>
              </div>
            </div>
          </div>
          
          {/* Simulated Chart */}
          <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-4 border-b border-outline-variant overflow-x-auto pb-2 custom-scrollbar">
            {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map((day, i) => (
              <div key={day} className="flex-1 min-w-[30px] flex flex-col items-center gap-2">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-4 bg-primary rounded-t-full" style={{ height: `${[60, 80, 45, 90, 70, 40][i]}%` }}></div>
                  <div className="w-4 bg-secondary rounded-t-full" style={{ height: `${[30, 25, 40, 20, 35, 15][i]}%` }}></div>
                </div>
                <span className="text-[10px] font-label font-bold text-on-surface-variant">{day}</span>
              </div>
            ))}
          </div>
          
          {/* Recent Transactions Overlay */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-on-surface">Transações Recentes</h4>
              <Link to="/finance" className="text-primary text-xs font-bold hover:underline bg-primary/10 px-3 py-1 rounded-full shrink-0">Ver Todas</Link>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-lg border-l-4 border-secondary gap-2">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary">add_circle</span>
                  <div>
                    <p className="font-bold text-on-surface text-sm">Serviço de Impermeabilização #882</p>
                    <p className="text-xs text-on-surface-variant font-label">Cliente: Residencial Alpha</p>
                  </div>
                </div>
                <span className="font-bold text-secondary text-sm whitespace-nowrap">+ R$ 1.250,00</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-lg border-l-4 border-primary gap-2">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary">remove_circle</span>
                  <div>
                    <p className="font-bold text-on-surface text-sm">Compra de Insumos Bio-Tech</p>
                    <p className="text-xs text-on-surface-variant font-label">Fornecedor: CleanSupplies Ltda</p>
                  </div>
                </div>
                <span className="font-bold text-primary text-sm whitespace-nowrap">- R$ 450,00</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Today's Schedule */}
        <div className="bg-surface-container-highest p-8 rounded-lg flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-primary">Agenda de Hoje</h3>
            <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-label font-bold">04 Jan</span>
          </div>
          <div className="flex-1 space-y-6">
            <div className="relative pl-8 border-l-2 border-primary-container pb-6">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-surface-container-highest"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary uppercase font-label tracking-tighter mb-1">08:00 - 10:30</span>
                <h5 className="font-bold text-on-surface mb-1">Limpeza Clínica - Unimed Sul</h5>
                <p className="text-xs text-on-surface-variant">Equipe Alpha - Unidade Higienização III</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img alt="Staff 1" className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5poZmQbRLyPtXDCdBGb4rgo-UE6edaOFhWekfPvX6MeSG4KTvqN7OnZR_ZzYhIkhfASWgwkJyvWIoyBQR0WrS6eYUtAQ3JIk2V_xwWjOp2pcudw_rFOTFSY4_y-uA1-RNiEqjaqSJfXhQQrHoXHo5zkjtFDyFYbSoaOjE6qPENlme4AbfzIr1cgqYGuFgJ58JySSRwDJHktZoW1bNNQXPp84g1c77BbtlNszp8ZCvzDs0vR_YoZIGGblB7iYM9txJNASz1iAK1Z2P"/>
                    <img alt="Staff 2" className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHev0P9DSg9jnozRu9ZuVFxZw06o6FxjyCWowyBGQFpWBMxlRRMZ_9a_HzgwneVyZ7Byv_O51XI_IbKDLGskt5Tn8BwRii3GDtxoS_ZshpmRTDmE2cyF1UvaL22ZuWerp7aI29v8i8_ITC27IdgWF9S6cQ4WIF1h0FEXyEGPjzWtieIZmm5YH-ZM9y3LnPodWUofjbe0tgHrmqO7JK5l_lyGx7CKFl4y2Ogf_ugzGuklx0y-bmwTPWQ6fOBle--IJdaSkkmxsj22VG"/>
                  </div>
                  <span className="text-[10px] font-label font-medium text-on-surface-variant">+2 em campo</span>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-primary-container pb-6">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-secondary border-4 border-surface-container-highest"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-secondary uppercase font-label tracking-tighter mb-1">11:00 - 15:00</span>
                <h5 className="font-bold text-on-surface mb-1">Impermeabilização Premium</h5>
                <p className="text-xs text-on-surface-variant">Residência Park Way - Sr. Carlos</p>
                <div className="mt-2 inline-flex items-center gap-1 bg-secondary-container px-2 py-0.5 rounded-full w-fit">
                  <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>opacity</span>
                  <span className="text-[10px] font-bold text-on-secondary-container uppercase">Protegido</span>
                </div>
              </div>
            </div>
            <div className="relative pl-8 border-l-2 border-primary-container pb-6">
              <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-outline-variant border-4 border-surface-container-highest"></div>
              <div className="flex flex-col opacity-60">
                <span className="text-xs font-bold text-on-surface-variant uppercase font-label tracking-tighter mb-1">16:30 - 18:00</span>
                <h5 className="font-bold text-on-surface mb-1">Vistoria Técnica Pós-Serviço</h5>
                <p className="text-xs text-on-surface-variant">Laboratório LabEx - Setor A</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-surface-container-lowest rounded-lg p-4 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs font-bold text-primary font-label uppercase mb-1">Dica do Especialista</p>
              <p className="text-[11px] text-on-surface leading-snug">Lembre-se de recalibrar os pulverizadores para o serviço de impermeabilização da tarde.</p>
            </div>
            <span className="material-symbols-outlined absolute -right-2 -bottom-2 text-primary-container/20 text-6xl">lightbulb</span>
          </div>
        </div>
      </div>

      <Link to="/quote" className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
      </Link>

    </>
  );
}
