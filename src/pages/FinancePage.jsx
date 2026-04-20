import { useState } from 'react';

export default function FinancePage() {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tighter text-primary">Gestão Financeira</h2>
          <p className="text-on-surface-variant font-label text-sm">Acompanhe a saúde econômica da sua clínica de limpeza.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <input className="pl-10 pr-4 py-2.5 bg-surface-container-highest border-none rounded-full text-sm font-label focus:ring-2 focus:ring-primary/20 w-full" placeholder="Buscar transação..." type="text"/>
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-xl">search</span>
          </div>
          <button className="bg-primary text-white font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
             <span className="material-symbols-outlined text-sm text-secondary">add</span>
             Lançar
          </button>
        </div>
      </header>

      {/* Financial Summary Cards (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[40px_0_60px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            </div>
            <span className="bg-lime-100 text-lime-700 text-[10px] font-bold px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-label uppercase tracking-widest">Saldo Atual</p>
            <h3 className="text-2xl font-extrabold text-primary">R$ 45.230,00</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[40px_0_60px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-full">Meta: 90%</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-label uppercase tracking-widest">Receita Mensal</p>
            <h3 className="text-2xl font-extrabold text-primary">R$ 18.750,00</h3>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-lg shadow-[40px_0_60px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-full bg-error-container/30 flex items-center justify-center text-error">
              <span className="material-symbols-outlined">trending_down</span>
            </div>
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full">-4.2%</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-label uppercase tracking-widest">Despesas Totais</p>
            <h3 className="text-2xl font-extrabold text-primary">R$ 6.420,00</h3>
          </div>
        </div>
        
        <div className="bg-primary p-6 rounded-lg shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
          {/* Decorative water drop texture effect */}
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
          </div>
          <div>
            <p className="text-indigo-200 text-xs font-label uppercase tracking-widest">Liquidez</p>
            <h3 className="text-2xl font-extrabold">R$ 12.310,00</h3>
          </div>
          <button className="mt-4 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-opacity self-start">
            Exportar PDF
          </button>
        </div>
      </section>

      {/* Charts Section (Asymmetric Layout) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Monthly Cash Flow Chart Placeholder */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-lg shadow-[40px_0_60px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-8">
            <h4 className="font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">bar_chart</span>
              Fluxo de Caixa Mensal
            </h4>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs font-label text-on-surface-variant">
                <span className="w-3 h-3 rounded-full bg-primary-container"></span> Receitas
              </span>
              <span className="flex items-center gap-1 text-xs font-label text-on-surface-variant">
                <span className="w-3 h-3 rounded-full bg-secondary"></span> Despesas
              </span>
            </div>
          </div>
          {/* Visual Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full flex gap-1 items-end h-full">
                <div className="bg-primary-container/20 w-1/2 h-[60%] rounded-t-sm"></div>
                <div className="bg-secondary/20 w-1/2 h-[30%] rounded-t-sm"></div>
              </div>
              <span className="text-[10px] font-label text-on-surface-variant uppercase">Jan</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full flex gap-1 items-end h-full">
                <div className="bg-primary-container/20 w-1/2 h-[75%] rounded-t-sm"></div>
                <div className="bg-secondary/20 w-1/2 h-[25%] rounded-t-sm"></div>
              </div>
              <span className="text-[10px] font-label text-on-surface-variant uppercase">Fev</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full flex gap-1 items-end h-full">
                <div className="bg-primary-container/20 w-1/2 h-[85%] rounded-t-sm"></div>
                <div className="bg-secondary/20 w-1/2 h-[40%] rounded-t-sm"></div>
              </div>
              <span className="text-[10px] font-label text-on-surface-variant uppercase">Mar</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full flex gap-1 items-end h-full">
                <div className="bg-primary-container w-1/2 h-[95%] rounded-t-md"></div>
                <div className="bg-secondary w-1/2 h-[35%] rounded-t-md"></div>
              </div>
              <span className="text-[10px] font-bold text-primary uppercase">Abr</span>
            </div>
            <div className="flex flex-col items-center gap-2 flex-1 opacity-50">
              <div className="w-full flex gap-1 items-end h-full border-b border-dashed border-outline-variant">
                <div className="bg-outline-variant w-1/2 h-[70%] rounded-t-sm"></div>
                <div className="bg-outline-variant w-1/2 h-[30%] rounded-t-sm"></div>
              </div>
              <span className="text-[10px] font-label text-on-surface-variant uppercase">Mai</span>
            </div>
          </div>
        </div>
        
        {/* Expense Distribution (Donut Style) */}
        <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-subtle">
          <h4 className="font-bold text-primary flex items-center gap-2 mb-8">
            <span className="material-symbols-outlined text-secondary">pie_chart</span>
            Distribuição de Despesas
          </h4>
          <div className="flex flex-col items-center gap-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#e3e1eb" strokeWidth="3"></circle>
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#0f238e" strokeDasharray="45 100" strokeDashoffset="0" strokeWidth="3"></circle>
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#92f859" strokeDasharray="30 100" strokeDashoffset="-45" strokeWidth="3"></circle>
                <circle cx="18" cy="18" fill="none" r="15.915" stroke="#003941" strokeDasharray="25 100" strokeDashoffset="-75" strokeWidth="3"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-label text-on-surface-variant">Total</span>
                <span className="font-bold text-primary">R$ 6.4k</span>
              </div>
            </div>
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 font-label"><span className="w-2 h-2 rounded-full bg-primary"></span> Mão de Obra</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 font-label"><span className="w-2 h-2 rounded-full bg-secondary-container"></span> Insumos</span>
                <span className="font-bold">30%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center gap-2 font-label"><span className="w-2 h-2 rounded-full bg-tertiary"></span> Logística</span>
                <span className="font-bold">25%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Transactions Table */}
      <section className="bg-surface-container-lowest rounded-lg shadow-[40px_0_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-surface-container">
          <h4 className="font-bold text-primary">Transações Recentes</h4>
          <button 
            onClick={() => setShowAllTransactions(true)}
            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
          >
            Ver tudo <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant bg-surface-container-low">
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">cleaning_services</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">Impermeabilização Sofá - Unidade Centro</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-label">Serviços Clínicos</td>
                <td className="px-6 py-4 text-xs font-label">12 Abr, 2024</td>
                <td className="px-6 py-4 text-sm font-bold text-secondary">+ R$ 1.250,00</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container text-[10px] font-bold">Concluído</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-error-container/10 flex items-center justify-center text-error">
                      <span className="material-symbols-outlined text-lg">inventory_2</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">Compra de Insumos - Resinas Pro-Shield</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-label">Materiais</td>
                <td className="px-6 py-4 text-xs font-label">11 Abr, 2024</td>
                <td className="px-6 py-4 text-sm font-bold text-error">- R$ 2.400,00</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-error-container/20 text-error text-[10px] font-bold">Pago</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">medical_services</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">Sanitização Hospitalar - Clínica Sorriso</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-label">Serviços Clínicos</td>
                <td className="px-6 py-4 text-xs font-label">10 Abr, 2024</td>
                <td className="px-6 py-4 text-sm font-bold text-secondary">+ R$ 4.800,00</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-[10px] font-bold">Pendente</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">local_shipping</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">Manutenção Frota - Van 02</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-label">Logística</td>
                <td className="px-6 py-4 text-xs font-label">09 Abr, 2024</td>
                <td className="px-6 py-4 text-sm font-bold text-error">- R$ 850,00</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container text-[10px] font-bold">Concluído</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Ver Tudo */}
      {showAllTransactions && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-20">
          <div className="bg-surface w-full max-w-6xl h-[90vh] sm:h-full rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <header className="p-6 sm:p-8 border-b border-outline-variant/10 flex justify-between items-center bg-white dark:bg-surface-container">
              <div>
                <h3 className="text-2xl font-black text-primary">Todas as Transações</h3>
                <p className="text-on-surface-variant text-sm font-medium">Relatório expandido do fluxo de caixa.</p>
              </div>
              <button 
                onClick={() => setShowAllTransactions(false)}
                className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center hover:bg-error/10 hover:text-error transition-all"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-8">
               <section className="bg-white dark:bg-surface-container rounded-3xl shadow-subtle border border-outline-variant/10 overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-surface-container-low border-b border-outline-variant/10">
                      <tr className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                        <th className="px-6 py-4">Data</th>
                        <th className="px-6 py-4">Descrição</th>
                        <th className="px-6 py-4">Categoria</th>
                        <th className="px-6 py-4">Valor</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                       {/* Repeat basic mock data for demo */}
                       {[1,2,3,4,5,6,7,8,9,10].map(i => (
                         <tr key={i} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 text-xs font-bold text-slate-500">12 Abr, 2024</td>
                           <td className="px-6 py-4 font-bold text-primary text-sm">Serviço de Higienização #{i}09</td>
                           <td className="px-6 py-4 text-xs font-bold uppercase text-slate-400">Serviços</td>
                           <td className="px-6 py-4 font-black text-secondary">R$ 450,00</td>
                           <td className="px-6 py-4">
                             <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-on-secondary-container font-black text-[9px] uppercase">Concluído</span>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </section>
            </div>
            <footer className="p-8 border-t border-outline-variant/10 bg-slate-50 flex justify-between items-center font-black">
               <p className="text-on-surface-variant">Total Exibido: <span className="text-primary text-xl">R$ 4.500,00</span></p>
               <button className="bg-primary text-white px-8 py-3 rounded-2xl hover:scale-105 transition-transform">Baixar XLSX</button>
            </footer>
          </div>
        </div>
      )}

      {/* Contextual FAB */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform group z-50">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
        <div className="absolute right-20 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Nova Transação
        </div>
      </button>
    </>
  );
}
