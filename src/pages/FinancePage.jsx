import { useState } from 'react';

export default function FinancePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState('todos'); // todos, entrada, saida
  const [searchTerm, setSearchTerm] = useState('');

  // Transações Financeiras Clínicas
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      desc: 'Higienização Sofá Retrátil + Blindagem',
      client: 'Juliana Paes (Asa Sul)',
      date: 'Hoje, 14:20',
      type: 'entrada',
      amount: 1450.00,
      category: 'Serviço Concluído',
      method: 'PIX',
      status: 'Confirmado'
    },
    {
      id: 2,
      desc: 'Aquisição Impermeabilizante Shield HP-900 (Lote 50L)',
      client: 'Distribuidora Química Pro',
      date: 'Ontem, 16:45',
      type: 'saida',
      amount: 1890.00,
      category: 'Insumos',
      method: 'Boleto',
      status: 'Pago'
    },
    {
      id: 3,
      desc: 'Limpeza 6 Cadeiras Jantar + Tapete Persa',
      client: 'Roberto Alves (Lago Sul)',
      date: 'Ontem, 11:30',
      type: 'entrada',
      amount: 980.00,
      category: 'Serviço Concluído',
      method: 'Cartão de Crédito',
      status: 'Confirmado'
    },
    {
      id: 4,
      desc: 'Abastecimento Van 01 (Diesel)',
      client: 'Posto Shell Brasília',
      date: '26/10/2026',
      type: 'saida',
      amount: 320.00,
      category: 'Frota & Transporte',
      method: 'Cartão Corporativo',
      status: 'Pago'
    },
    {
      id: 5,
      desc: 'Higienização Estofado Automotivo Couro',
      client: 'Dra. Vanessa Martins (Sudoeste)',
      date: '25/10/2026',
      type: 'entrada',
      amount: 650.00,
      category: 'Serviço Concluído',
      method: 'PIX',
      status: 'Confirmado'
    }
  ]);

  // Novo Lançamento Modal
  const [newTrans, setNewTrans] = useState({
    desc: '',
    client: '',
    type: 'entrada',
    amount: '',
    category: 'Serviço Concluído',
    method: 'PIX'
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTrans.desc || !newTrans.amount) return;
    const t = {
      id: Date.now(),
      desc: newTrans.desc,
      client: newTrans.client || 'Cliente Particular',
      date: 'Hoje, ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      type: newTrans.type,
      amount: parseFloat(newTrans.amount),
      category: newTrans.category,
      method: newTrans.method,
      status: 'Confirmado'
    };
    setTransactions([t, ...transactions]);
    setShowAddModal(false);
    setNewTrans({ desc: '', client: '', type: 'entrada', amount: '', category: 'Serviço Concluído', method: 'PIX' });
  };

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'todos' && t.type !== filterType) return false;
    if (searchTerm) {
      return t.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
             t.client.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Gráfico Mensal de Fluxo de Caixa (Jan a Jun)
  const monthlyFlow = [
    { month: 'Jan', rev: 14.2, exp: 5.1 },
    { month: 'Fev', rev: 18.5, exp: 6.2 },
    { month: 'Mar', rev: 22.0, exp: 7.4 },
    { month: 'Abr', rev: 26.8, exp: 8.1 },
    { month: 'Mai', rev: 34.5, exp: 9.8 },
    { month: 'Jun', rev: 42.8, exp: 11.2, isCurrent: true },
  ];

  const maxVal = 45; // base para proporção em %

  return (
    <div className="w-full pb-16 font-body animate-fadeIn">
      
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4 border-b border-outline-variant/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[10px] font-black uppercase tracking-widest font-label flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">payments</span> Gestão Financeira Clínica
            </span>
            <span className="text-xs text-on-surface-variant font-medium">Fluxo de Caixa & Extrato em Tempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight font-headline">
            Financeiro & DRE
          </h2>
          <p className="text-on-surface-variant text-sm font-medium mt-1">
            Controle de faturamento de ordens de serviço, insumos e margem operacional líquida.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <input 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/10 rounded-full text-xs font-semibold focus:ring-2 focus:ring-primary/20 w-full text-on-surface shadow-sm" 
              placeholder="Buscar lançamento..." 
              type="text"
            />
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant/40 text-lg">search</span>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-full text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-sm font-black">add</span>
            <span>Novo Lançamento</span>
          </button>
        </div>
      </header>

      {/* Financial Summary Cards (Bento Style do financeiro_2) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Saldo Atual */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm">
              <span className="material-symbols-outlined text-2xl font-bold">account_balance_wallet</span>
            </div>
            <span className="bg-secondary-container/40 text-secondary text-[10px] font-black px-2.5 py-1 rounded-full">
              +12.5% vs mês ant.
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">Saldo em Caixa</p>
            <h3 className="text-3xl font-black text-primary font-headline mt-0.5">R$ 45.230,00</h3>
          </div>
        </div>

        {/* Card 2: Receita Mensal */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-2xl font-bold">trending_up</span>
            </div>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full">
              Meta: 90%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">Receita Mensal (Jun)</p>
            <h3 className="text-3xl font-black text-on-surface font-headline mt-0.5">R$ 18.750,00</h3>
          </div>
        </div>

        {/* Card 3: Despesas Totais */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-error-container text-error flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl font-bold">trending_down</span>
            </div>
            <span className="bg-error/10 text-error text-[10px] font-black px-2.5 py-1 rounded-full">
              -4.2% controlado
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">Despesas Totais</p>
            <h3 className="text-3xl font-black text-on-surface font-headline mt-0.5">R$ 6.420,00</h3>
          </div>
        </div>

        {/* Card 4: Liquidez Imediata (Design Destaque Verde Logo com texto preto de alto contraste) */}
        <div className="bg-primary p-6 rounded-2xl shadow-xl flex flex-col justify-between text-slate-950 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-slate-950">
            <span className="material-symbols-outlined text-[130px]">water_drop</span>
          </div>
          <div>
            <span className="text-slate-950/80 text-[10px] font-black uppercase tracking-widest">Liquidez Disponível</span>
            <h3 className="text-3xl font-black font-headline mt-1 text-slate-950">R$ 12.310,00</h3>
            <p className="text-xs text-slate-900/85 mt-1 font-bold">Livre para investimentos em marketing e novos insumos.</p>
          </div>
          <button 
            onClick={() => alert('Relatório financeiro exportado em PDF com sucesso!')}
            className="mt-4 bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:brightness-125 transition-all self-start shadow-sm"
          >
            Exportar PDF
          </button>
        </div>

      </section>

      {/* Gráfico Comparativo: Fluxo de Caixa Mensal (Receita vs Despesas) */}
      <section className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle mb-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
          <div>
            <h4 className="font-bold font-headline text-primary dark:text-white text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">bar_chart</span>
              Fluxo de Caixa Mensal (Semestre)
            </h4>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              Comparativo das entradas operacionais de limpeza vs custos com reagentes e despesas fixas.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="w-3.5 h-3.5 rounded-md bg-primary"></span> Receitas
            </span>
            <span className="flex items-center gap-1.5 text-on-surface">
              <span className="w-3.5 h-3.5 rounded-md bg-secondary"></span> Despesas
            </span>
          </div>
        </div>

        {/* Gráfico de Barras Estilizado */}
        <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 px-2 sm:px-6 border-b border-outline-variant/20 pb-4">
          {monthlyFlow.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="w-full flex justify-center items-end gap-1.5 sm:gap-2 h-full">
                {/* Barra de Receita */}
                <div 
                  className={`w-4 sm:w-7 rounded-t-lg transition-all duration-700 relative group-hover:brightness-110 ${item.isCurrent ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-primary/40'}`}
                  style={{ height: `${(item.rev / maxVal) * 100}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none">
                    R$ {item.rev}k
                  </span>
                </div>

                {/* Barra de Despesa */}
                <div 
                  className={`w-4 sm:w-7 rounded-t-lg transition-all duration-700 relative group-hover:brightness-110 ${item.isCurrent ? 'bg-secondary' : 'bg-secondary/40'}`}
                  style={{ height: `${(item.exp / maxVal) * 100}%` }}
                >
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none">
                    R$ {item.exp}k
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold uppercase ${item.isCurrent ? 'text-primary font-black' : 'text-on-surface-variant'}`}>
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Extrato de Lançamentos Recentes com Filtros */}
      <section className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h4 className="font-bold font-headline text-primary dark:text-white text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">receipt_long</span>
              Extrato Financeiro Recente
            </h4>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              Histórico detalhado de entradas e despesas da operação ED Limp.
            </p>
          </div>

          <div className="flex bg-surface-container rounded-full p-1 border border-outline-variant/10">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'entrada', label: 'Entradas' },
              { id: 'saida', label: 'Saídas' },
            ].map(f => (
              <button 
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterType === f.id ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-outline-variant/10">
          {filteredTransactions.map(item => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-surface-container/30 px-3 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'entrada' ? 'bg-secondary-container/40 text-secondary' : 'bg-error-container text-error'}`}>
                  <span className="material-symbols-outlined text-xl">
                    {item.type === 'entrada' ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                </div>
                <div>
                  <h5 className="font-bold text-sm text-on-surface">{item.desc}</h5>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {item.client} • <span className="font-mono">{item.date}</span> • <span className="font-semibold text-primary">{item.method}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${item.type === 'entrada' ? 'bg-secondary-container/30 text-secondary' : 'bg-slate-200 dark:bg-slate-700 text-on-surface-variant'}`}>
                  {item.category}
                </span>
                <span className={`text-base font-black font-headline ${item.type === 'entrada' ? 'text-secondary' : 'text-error'}`}>
                  {item.type === 'entrada' ? '+' : '-'} R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Novo Lançamento */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-container-low w-full max-w-md rounded-2xl p-8 shadow-2xl border border-outline-variant/20 animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-headline text-primary dark:text-white">Lançar no Fluxo de Caixa</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNewTrans({ ...newTrans, type: 'entrada' })}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${newTrans.type === 'entrada' ? 'bg-secondary text-white border-secondary' : 'bg-surface-container border-outline-variant/20 text-on-surface-variant'}`}
                >
                  Entrada (Receita)
                </button>
                <button
                  type="button"
                  onClick={() => setNewTrans({ ...newTrans, type: 'saida' })}
                  className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${newTrans.type === 'saida' ? 'bg-error text-white border-error' : 'bg-surface-container border-outline-variant/20 text-on-surface-variant'}`}
                >
                  Saída (Despesa)
                </button>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Descrição</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Higienização Sofá Retrátil"
                  value={newTrans.desc}
                  onChange={e => setNewTrans({ ...newTrans, desc: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Valor (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    placeholder="Ex: 450.00"
                    value={newTrans.amount}
                    onChange={e => setNewTrans({ ...newTrans, amount: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Forma de Pagto</label>
                  <select 
                    value={newTrans.method}
                    onChange={e => setNewTrans({ ...newTrans, method: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Boleto">Boleto</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 block mb-1">Cliente / Fornecedor</label>
                <input 
                  type="text" 
                  placeholder="Ex: Dra. Mariana (Asa Norte)"
                  value={newTrans.client}
                  onChange={e => setNewTrans({ ...newTrans, client: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-on-surface"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-surface-container hover:bg-surface-container-high py-3 rounded-xl text-xs font-bold text-on-surface"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-primary text-white py-3 rounded-xl text-xs font-bold hover:brightness-105 shadow-md"
                >
                  Confirmar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
