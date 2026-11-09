/**
 * Camada de Persistência Segura - ED Limp
 * Garante que clientes, finanças, estoque, notas e agenda nunca sejam perdidos ao recarregar a página.
 */

// Chaves de armazenamento
export const STORAGE_KEYS = {
  CLIENTS: '@EDLimp:Clients',
  FINANCE: '@EDLimp:Finance',
  INVENTORY: '@EDLimp:Inventory',
  SCHEDULE: '@EDLimp:Schedule',
  NOTES: '@EDLimp:Notes',
  PROFILES: '@EDLimp:Profiles',
  SERVICES: '@EDLimp:Services',
};

// Dados Padrão Iniciais (Mock Inicial caso vazio)
const DEFAULT_CLIENTS = [
  { id: 'cli-1', name: 'Ana Carolina Mendonça', phone: '(61) 98122-3344', cpf: '023.456.789-01', address: 'SQS 308 Bloco D, Asa Sul, Brasília', notes: 'Sofá 3 lugares Linho', status: 'Ativo' },
  { id: 'cli-2', name: 'Dr. Roberto Silveira', phone: '(61) 99233-4455', cpf: '124.567.890-12', address: 'Condomínio Solar da Serra, Jardim Botânico', notes: 'Impermeabilização Sofá + Cadeiras', status: 'Ativo' },
  { id: 'cli-3', name: 'Mariana Duarte', phone: '(61) 98765-4321', cpf: '345.678.901-23', address: 'Rua 36 Norte, Águas Claras', notes: 'Higienização Colchão Queen', status: 'Ativo' },
];

const DEFAULT_INVENTORY = [
  { id: 1, name: 'Bactericida Desinfetante Finisher', category: 'Higienização', volume: 42, maxVolume: 50, unit: 'Litros', lot: 'LT-2026-08', minAlert: 10, dilution: '1:50', price: 189.90 },
  { id: 2, name: 'Resina Impermeabilizante Pro Shield', category: 'Impermeabilização', volume: 18, maxVolume: 30, unit: 'Litros', lot: 'LT-2026-04', minAlert: 8, dilution: 'Pronto Uso', price: 420.00 },
  { id: 3, name: 'Removedor Enzimático de Odores e Manchas', category: 'Higienização', volume: 8, maxVolume: 20, unit: 'Litros', lot: 'LT-2026-02', minAlert: 5, dilution: '1:20', price: 145.50 },
  { id: 4, name: 'Detergente Flotador Alcalino para Tecidos', category: 'Lavagem', volume: 25, maxVolume: 40, unit: 'Litros', lot: 'LT-2026-05', minAlert: 10, dilution: '1:40', price: 110.00 },
];

const DEFAULT_TRANSACTIONS = [
  { id: 1, desc: 'Higienização de Sofá Retrátil 3L + Puff', client: 'Ana Carolina Mendonça', type: 'entrada', amount: 380.00, date: '09/11/2026', category: 'Serviço Concluído', method: 'PIX' },
  { id: 2, desc: 'Blindagem e Impermeabilização Sofá Linho', client: 'Dr. Roberto Silveira', type: 'entrada', amount: 650.00, date: '08/11/2026', category: 'Serviço Concluído', method: 'Cartão de Crédito' },
  { id: 3, desc: 'Reposição Insumo Resina Pro Shield (20L)', client: 'Distribuidora Química DF', type: 'saida', amount: 420.00, date: '07/11/2026', category: 'Insumos', method: 'PIX' },
  { id: 4, desc: 'Higienização Colchão Casal Queen Size', client: 'Mariana Duarte', type: 'entrada', amount: 250.00, date: '06/11/2026', category: 'Serviço Concluído', method: 'PIX' },
];

const DEFAULT_NOTES = [
  { id: 1, title: 'Revisão da Extratora IPC', content: 'Trocar o anel de vedação do bico de estofados antes de quinta-feira.', category: 'Manutenção', date: '09/11/2026', archived: false },
  { id: 2, title: 'Ligar para condomínio Solar da Serra', content: 'Confirmar autorização de entrada na portaria para o atendimento das 14h.', category: 'Clientes', date: '09/11/2026', archived: false },
];

// Funções Utilitárias com Fallback e Proteção
function getItem(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error(`Erro ao carregar chave ${key}:`, e);
    return defaultValue;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Erro ao salvar chave ${key}:`, e);
    return false;
  }
}

// 1. CLIENTES
export const getStoredClients = () => getItem(STORAGE_KEYS.CLIENTS, DEFAULT_CLIENTS);
export const saveStoredClient = (client) => {
  const current = getStoredClients();
  const index = current.findIndex(c => c.id === client.id);
  let updated;
  if (index >= 0) {
    updated = [...current];
    updated[index] = client;
  } else {
    updated = [{ ...client, id: client.id || `cli-${Date.now()}` }, ...current];
  }
  setItem(STORAGE_KEYS.CLIENTS, updated);
  return updated;
};
export const deleteStoredClient = (id) => {
  const current = getStoredClients();
  const updated = current.filter(c => c.id !== id);
  setItem(STORAGE_KEYS.CLIENTS, updated);
  return updated;
};

// 2. FINANCEIRO
export const getStoredFinance = () => getItem(STORAGE_KEYS.FINANCE, DEFAULT_TRANSACTIONS);
export const saveStoredTransaction = (trans) => {
  const current = getStoredFinance();
  const item = { ...trans, id: trans.id || Date.now() };
  const updated = [item, ...current];
  setItem(STORAGE_KEYS.FINANCE, updated);
  return updated;
};
export const deleteStoredTransaction = (id) => {
  const current = getStoredFinance();
  const updated = current.filter(t => t.id !== id);
  setItem(STORAGE_KEYS.FINANCE, updated);
  return updated;
};

// 3. ESTOQUE
export const getStoredInventory = () => getItem(STORAGE_KEYS.INVENTORY, DEFAULT_INVENTORY);
export const saveStoredInventoryItem = (item) => {
  const current = getStoredInventory();
  const newItem = { ...item, id: item.id || Date.now() };
  const updated = [newItem, ...current];
  setItem(STORAGE_KEYS.INVENTORY, updated);
  return updated;
};
export const updateStoredInventoryVolume = (id, newVolume) => {
  const current = getStoredInventory();
  const updated = current.map(c => c.id === id ? { ...c, volume: newVolume } : c);
  setItem(STORAGE_KEYS.INVENTORY, updated);
  return updated;
};

// 4. NOTAS
export const getStoredNotes = () => getItem(STORAGE_KEYS.NOTES, DEFAULT_NOTES);
export const saveStoredNote = (note) => {
  const current = getStoredNotes();
  const newNote = { ...note, id: note.id || Date.now(), date: note.date || new Date().toLocaleDateString('pt-BR'), archived: false };
  const updated = [newNote, ...current];
  setItem(STORAGE_KEYS.NOTES, updated);
  return updated;
};
export const toggleArchiveNote = (id) => {
  const current = getStoredNotes();
  const updated = current.map(n => n.id === id ? { ...n, archived: !n.archived } : n);
  setItem(STORAGE_KEYS.NOTES, updated);
  return updated;
};
export const deleteStoredNote = (id) => {
  const current = getStoredNotes();
  const updated = current.filter(n => n.id !== id);
  setItem(STORAGE_KEYS.NOTES, updated);
  return updated;
};

// Exportar Backup Completo (JSON)
export const exportFullBackup = () => {
  const backup = {
    exportedAt: new Date().toISOString(),
    system: 'ED Limp Gestão Comercial',
    clients: getStoredClients(),
    finance: getStoredFinance(),
    inventory: getStoredInventory(),
    notes: getStoredNotes(),
    profiles: getItem(STORAGE_KEYS.PROFILES, []),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `edlimp-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
