import { useState, useEffect } from 'react';
import { getStoredFinance, saveStoredTransaction, deleteStoredTransaction } from '../lib/storage';

export default function FinancePage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState('todos'); // todos, entrada, saida
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(getStoredFinance());
  }, []);

  // Novo Lançamento Modal com suporte a Comprovante / Anexo de NF / Recibo
  const [newTrans, setNewTrans] = useState({
    desc: '',
    client: '',
    type: 'entrada',
    amount: '',
    category: 'Serviço Concluído',
    method: 'PIX',
    attachment: null,
    attachmentName: '',
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewTrans(prev => ({
        ...prev,
        attachment: event.target.result,
        attachmentName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTrans.desc || !newTrans.amount) return;
    const t = {
      id: Date.now(),
      desc: newTrans.desc,
      client: newTrans.client || 'Cliente Particular',
      date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      type: newTrans.type,
      amount: parseFloat(newTrans.amount),
      category: newTrans.category,
      method: newTrans.method,
      status: 'Confirmado',
      attachment: newTrans.attachment,
      attachmentName: newTrans.attachmentName,
    };
    const updated = saveStoredTransaction(t);
    setTransactions(updated);
    setShowAddModal(false);
    setNewTrans({ desc: '', client: '', type: 'entrada', amount: '', category: 'Serviço Concluído', method: 'PIX', attachment: null, attachmentName: '' });
  };

  const handleDelete = (id) => {
    if (confirm('Deseja excluir este lançamento?')) {
      const updated = deleteStoredTransaction(id);
      setTransactions(updated);
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'todos' && t.type !== filterType) return false;
    if (searchTerm) {
      return (t.desc || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
             (t.client || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
             (t.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  // Cálculos Reais Dinâmicos
  const totalEntradas = transactions
    .filter(t => t.type === 'entrada')
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const totalSaidas = transactions
    .filter(t => t.type === 'saida')
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const saldoLiquido = totalEntradas - totalSaidas;

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

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
            Controle de faturamento de ordens de serviço, insumos, combustível e comprovantes de NF/Recibos.
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
            className="bg-primary text-slate-950 font-black px-6 py-2.5 rounded-full text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-sm font-black">add</span>
            <span>Novo Lançamento</span>
          </button>
        </div>
      </header>

      {/* Financial Summary Cards - 100% DINÂMICOS E REAIS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Saldo Líquido Real */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm">
              <span className="material-symbols-outlined text-2xl font-bold">account_balance_wallet</span>
            </div>
            <span className="bg-secondary-container/40 text-secondary text-[10px] font-black px-2.5 py-1 rounded-full">
              {transactions.length} registros
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">Saldo em Caixa Real</p>
            <h3 className={`text-3xl font-black font-headline mt-0.5 ${saldoLiquido >= 0 ? 'text-primary' : 'text-error'}`}>
              {formatCurrency(saldoLiquido)}
            </h3>
          </div>
        </div>

        {/* Card 2: Receita Total */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-2xl font-bold">trending_up</span>
            </div>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full">
              Entradas
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">Receita Total Registrada</p>
            <h3 className="text-3xl font-black text-on-surface font-headline mt-0.5">
              {formatCurrency(totalEntradas)}
            </h3>
          </div>
        </div>

        {/* Card 3: Despesas Totais */}
        <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-subtle flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-error-container text-error flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-2xl font-bold">trending_down</span>
            </div>
            <span className="bg-error/10 text-error text-[10px] font-black px-2.5 py-1 rounded-full">
              Saídas
            </span>
          </div>
          <div className="mt-4">
            <p className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest">Despesas & Custos Reais</p>
            <h3 className="text-3xl font-black text-on-surface font-headline mt-0.5">
              {formatCurrency(totalSaidas)}
            </h3>
          </div>
        </div>

        {/* Card 4: Liquidez Disponível */}
        <div className="bg-primary p-6 rounded-2xl shadow-xl flex flex-col justify-between text-slate-950 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none text-slate-950">
            <span className="material-symbols-outlined text-[130px]">water_drop</span>
          </div>
          <div>
            <span className="text-slate-950/80 text-[10px] font-black uppercase tracking-widest">Margem Operacional</span>
            <h3 className="text-3xl font-black font-headline mt-1 text-slate-950">
              {totalEntradas > 0 ? `${Math.round((saldoLiquido / totalEntradas) * 100)}%` : '100%'}
            </h3>
            <p className="text-xs text-slate-900/85 mt-1 font-bold">Rendimento sobre os serviços prestados.</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="mt-4 bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider hover:brightness-125 transition-all self-start shadow-sm"
          >
            Imprimir Relatório
          </button>
        </div>

      </section>

      {/* Lista de Transações */}
      <section className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 shadow-subtle">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-on-surface">Extrato Financeiro</h3>
            <span className="text-xs text-on-surface-variant">({filteredTransactions.length} lançamentos)</span>
          </div>

          <div className="flex gap-2">
            {['todos', 'entrada', 'saida'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  filterType === type 
                    ? 'bg-primary text-slate-950 shadow-sm' 
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {type === 'todos' ? 'Todos' : type === 'entrada' ? 'Receitas' : 'Despesas'}
              </button>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center bg-surface-container/30 rounded-2xl border border-dashed border-outline-variant/20">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">receipt_long</span>
            <h4 className="font-bold text-on-surface text-base">Nenhum lançamento encontrado</h4>
            <p className="text-xs text-on-surface-variant mt-1">Clique em "Novo Lançamento" para registrar entradas, combustíveis, insumos e anexar notas fiscais.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="mt-4 bg-primary text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              + Novo Lançamento
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70 border-b border-outline-variant/10 pb-3">
                  <th className="pb-3 px-4">Descrição / Categoria</th>
                  <th className="pb-3 px-4">Cliente / Fornecedor</th>
                  <th className="pb-3 px-4">Data</th>
                  <th className="pb-3 px-4">Comprovante</th>
                  <th className="pb-3 px-4 text-right">Valor</th>
                  <th className="pb-3 px-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-surface-container/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${t.type === 'entrada' ? 'bg-secondary-container/40 text-secondary' : 'bg-error-container text-error'}`}>
                          <span className="material-symbols-outlined text-lg">{t.type === 'entrada' ? 'arrow_downward' : 'arrow_upward'}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface">{t.desc}</p>
                          <span className="text-[10px] text-on-surface-variant uppercase font-semibold">{t.category} • {t.method}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-on-surface">{t.client}</td>
                    <td className="py-4 px-4 text-xs font-mono text-on-surface-variant">{t.date}</td>
                    <td className="py-4 px-4 text-xs">
                      {t.attachment ? (
                        <a 
                          href={t.attachment} 
                          target="_blank" 
                          rel="noreferrer"
                          download={t.attachmentName || 'comprovante'}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline bg-primary/10 px-2.5 py-1 rounded-lg"
                        >
                          <span className="material-symbols-outlined text-sm">attach_file</span>
                          <span className="truncate max-w-[120px]">{t.attachmentName || 'Anexo NF'}</span>
                        </a>
                      ) : (
                        <span className="text-on-surface-variant/40 text-[11px] italic">Sem anexo</span>
                      )}
                    </td>
                    <td className={`py-4 px-4 text-right text-sm font-black font-mono ${t.type === 'entrada' ? 'text-secondary' : 'text-error'}`}>
                      {t.type === 'entrada' ? '+' : '-'} {formatCurrency(t.amount)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => handleDelete(t.id)}
                        className="w-8 h-8 rounded-full hover:bg-error/10 text-error flex items-center justify-center transition-colors mx-auto"
                        title="Excluir"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Modal Novo Lançamento com Anexo de Recibo / NF / Gasolina */}
      {showAddModal && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface dark:bg-surface-container max-w-lg w-full rounded-2xl p-6 sm:p-8 border border-outline-variant/20 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/15">
              <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">add_card</span>
                Novo Lançamento Financeiro
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              {/* Tipo: Entrada ou Saída */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewTrans(prev => ({ ...prev, type: 'entrada', category: 'Serviço Concluído' }))}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                    newTrans.type === 'entrada'
                      ? 'bg-secondary-container text-on-secondary-container border-secondary shadow-sm'
                      : 'bg-surface-container border-outline-variant/20 text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">arrow_downward</span>
                  Entrada (Receita)
                </button>
                <button
                  type="button"
                  onClick={() => setNewTrans(prev => ({ ...prev, type: 'saida', category: 'Combustível / Frota' }))}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${
                    newTrans.type === 'saida'
                      ? 'bg-error-container text-error border-error shadow-sm'
                      : 'bg-surface-container border-outline-variant/20 text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">arrow_upward</span>
                  Saída (Despesa)
                </button>
              </div>

              {/* Descrição */}
              <div>
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Descrição do Lançamento</label>
                <input 
                  type="text"
                  required
                  placeholder={newTrans.type === 'entrada' ? 'Ex: Higienização Sofá 3 Lugares' : 'Ex: Abastecimento Van 01 (Posto Ipiranga)'}
                  value={newTrans.desc}
                  onChange={e => setNewTrans({ ...newTrans, desc: e.target.value })}
                  className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-xs font-bold text-on-surface focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Cliente / Fornecedor e Valor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">
                    {newTrans.type === 'entrada' ? 'Cliente' : 'Fornecedor / Posto'}
                  </label>
                  <input 
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={newTrans.client}
                    onChange={e => setNewTrans({ ...newTrans, client: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-xs font-bold text-on-surface"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Valor (R$)</label>
                  <input 
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={newTrans.amount}
                    onChange={e => setNewTrans({ ...newTrans, amount: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-xs font-black text-on-surface"
                  />
                </div>
              </div>

              {/* Categoria e Forma de Pagamento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Categoria</label>
                  <select 
                    value={newTrans.category}
                    onChange={e => setNewTrans({ ...newTrans, category: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-xs font-bold text-on-surface"
                  >
                    {newTrans.type === 'entrada' ? (
                      <>
                        <option value="Serviço Concluído">Serviço Concluído</option>
                        <option value="Impermeabilização">Impermeabilização</option>
                        <option value="Higienização Sofá">Higienização Sofá</option>
                        <option value="Contrato Corporativo">Contrato Corporativo</option>
                        <option value="Outros">Outros</option>
                      </>
                    ) : (
                      <>
                        <option value="Combustível / Frota">Combustível / Gasolina</option>
                        <option value="Insumos Químicos">Insumos Químicos / Reagentes</option>
                        <option value="Manutenção Máquinas">Manutenção de Máquinas</option>
                        <option value="Marketing / Anúncios">Marketing / Anúncios</option>
                        <option value="Pró-labore / Equipe">Pró-labore / Equipe</option>
                        <option value="Alimentação / Diárias">Alimentação / Diárias</option>
                        <option value="Outros Custos">Outros Custos</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block">Método</label>
                  <select 
                    value={newTrans.method}
                    onChange={e => setNewTrans({ ...newTrans, method: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-xs font-bold text-on-surface"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Boleto">Boleto</option>
                    <option value="Transferência">Transferência</option>
                  </select>
                </div>
              </div>

              {/* Upload de Nota Fiscal / Cupom / Recibo */}
              <div className="p-3 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/30">
                <label className="text-[10px] font-black uppercase text-on-surface-variant/70 mb-1 block flex items-center justify-between">
                  <span>Anexar Nota Fiscal / Recibo de Combustível</span>
                  <span className="text-[9px] text-primary">PDF ou Imagem (Máx 2MB)</span>
                </label>
                <div className="flex items-center gap-3 mt-1.5">
                  <label className="bg-primary text-slate-950 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-sm font-black">upload_file</span>
                    <span>Escolher Arquivo</span>
                    <input type="file" accept="image/*,application/pdf" onChange={handleFileUpload} className="hidden" />
                  </label>
                  <span className="text-xs text-on-surface-variant truncate font-medium max-w-[200px]">
                    {newTrans.attachmentName || 'Nenhum arquivo selecionado'}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-surface-container-high text-on-surface-variant font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-surface-container-highest"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
                >
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
