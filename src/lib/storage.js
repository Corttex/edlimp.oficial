/**
 * Camada de Persistência Segura - ED Limp
 * Garante que clientes, finanças, estoque, notas, agenda e configurações
 * sejam salvos de forma resiliente e nunca sejam perdidos ao recarregar a página.
 */

// Chaves de armazenamento
export const STORAGE_KEYS = {
  CLIENTS: '@EDLimp:Clients',
  FINANCE: '@EDLimp:Finance',
  INVENTORY: '@EDLimp:Inventory',
  PATRIMONY: '@EDLimp:Patrimony',
  SCHEDULE: '@EDLimp:Schedule',
  NOTES: '@EDLimp:Notes',
  PROFILES: '@EDLimp:Profiles',
  SERVICES: '@EDLimp:Services',
  COMPANY: '@EDLimp:Company',
  MARKETING_GOALS: '@EDLimp:MarketingGoals',
  MARKETING_REVIEWS: '@EDLimp:MarketingReviews',
};

// Funções Utilitárias com Fallback e Proteção
function getItem(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    return data !== null ? JSON.parse(data) : defaultValue;
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

// 1. CLIENTES (Inicia vazio para novos dados reais)
export const getStoredClients = () => getItem(STORAGE_KEYS.CLIENTS, []);
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

// 2. FINANCEIRO (Inicia vazio para lançamentos reais)
export const getStoredFinance = () => getItem(STORAGE_KEYS.FINANCE, []);
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

// 3. ESTOQUE DE QUÍMICOS (Inicia vazio)
export const getStoredInventory = () => getItem(STORAGE_KEYS.INVENTORY, []);
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
export const deleteStoredInventoryItem = (id) => {
  const current = getStoredInventory();
  const updated = current.filter(c => c.id !== id);
  setItem(STORAGE_KEYS.INVENTORY, updated);
  return updated;
};

// 4. ATIVOS & PATRIMÔNIO (Máquinas, Extratoras, Veículos)
export const getStoredPatrimony = () => getItem(STORAGE_KEYS.PATRIMONY, []);
export const saveStoredPatrimonyItem = (item) => {
  const current = getStoredPatrimony();
  const newItem = { ...item, id: item.id || Date.now() };
  const updated = [newItem, ...current];
  setItem(STORAGE_KEYS.PATRIMONY, updated);
  return updated;
};
export const deleteStoredPatrimonyItem = (id) => {
  const current = getStoredPatrimony();
  const updated = current.filter(c => c.id !== id);
  setItem(STORAGE_KEYS.PATRIMONY, updated);
  return updated;
};

// 5. AGENDA / AGENDAMENTOS
export const getStoredSchedule = () => getItem(STORAGE_KEYS.SCHEDULE, []);
export const saveStoredScheduleSlot = (slot) => {
  const current = getStoredSchedule();
  const newSlot = { ...slot, id: slot.id || Date.now() };
  const updated = [newSlot, ...current];
  setItem(STORAGE_KEYS.SCHEDULE, updated);
  return updated;
};
export const deleteStoredScheduleSlot = (id) => {
  const current = getStoredSchedule();
  const updated = current.filter(s => s.id !== id);
  setItem(STORAGE_KEYS.SCHEDULE, updated);
  return updated;
};

// 6. NOTAS RÁPIDAS
export const getStoredNotes = () => getItem(STORAGE_KEYS.NOTES, []);
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

// 7. MARKETING (Metas e Avaliações reais)
export const getStoredMarketingGoals = () => getItem(STORAGE_KEYS.MARKETING_GOALS, {
  targetClients: 15,
  currentClients: 0,
  targetRevenue: 6000,
  currentRevenue: 0,
});
export const saveStoredMarketingGoals = (goals) => {
  setItem(STORAGE_KEYS.MARKETING_GOALS, goals);
  return goals;
};

export const getStoredReviews = () => getItem(STORAGE_KEYS.MARKETING_REVIEWS, []);
export const saveStoredReview = (rev) => {
  const current = getStoredReviews();
  const newRev = { ...rev, id: rev.id || Date.now(), date: rev.date || 'Hoje' };
  const updated = [newRev, ...current];
  setItem(STORAGE_KEYS.MARKETING_REVIEWS, updated);
  return updated;
};

// 8. ZERAR TODOS OS DADOS (Limpeza de Fábrica para Início Real)
// Preserva as credenciais de autenticação da sessão atual
export const clearAllData = (preserveAuth = true) => {
  const currentUser = preserveAuth ? localStorage.getItem('@EDLimp:User') : null;
  
  // Limpar chaves do sistema
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });

  // Restaurar usuário logado se solicitado
  if (currentUser) {
    localStorage.setItem('@EDLimp:User', currentUser);
  }
};

// 9. EXPORTAR BACKUP COMPLETO (JSON)
export const exportFullBackup = () => {
  const backup = {
    exportedAt: new Date().toISOString(),
    system: 'ED Limp Gestão Comercial',
    clients: getStoredClients(),
    finance: getStoredFinance(),
    inventory: getStoredInventory(),
    patrimony: getStoredPatrimony(),
    schedule: getStoredSchedule(),
    notes: getStoredNotes(),
    marketingGoals: getStoredMarketingGoals(),
    reviews: getStoredReviews(),
    profiles: getItem(STORAGE_KEYS.PROFILES, []),
    services: getItem(STORAGE_KEYS.SERVICES, []),
    company: getItem(STORAGE_KEYS.COMPANY, {}),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `edlimp-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
