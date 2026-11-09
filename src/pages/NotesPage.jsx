import { useState, useEffect } from 'react';
import { getStoredNotes, saveStoredNote, toggleArchiveNote, deleteStoredNote } from '../lib/storage';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', category: 'Geral' });

  useEffect(() => {
    setNotes(getStoredNotes());
  }, []);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.title) return alert('Informe o título da nota.');
    const updated = saveStoredNote(newNote);
    setNotes(updated);
    setShowModal(false);
    setNewNote({ title: '', content: '', category: 'Geral' });
  };

  const handleToggleArchive = (id) => {
    const updated = toggleArchiveNote(id);
    setNotes(updated);
  };

  const handleDelete = (id) => {
    if (confirm('Deseja excluir esta nota permanentemente?')) {
      const updated = deleteStoredNote(id);
      setNotes(updated);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 h-full flex flex-col">
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight font-headline">Central de Notas Práticas</h2>
          <p className="text-on-surface-variant font-medium mt-1">Lembretes técnicos e contatos rápidos salvos com segurança.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${showArchived ? 'bg-primary text-white border-primary' : 'bg-surface text-on-surface-variant border-outline-variant/20'}`}
          >
            {showArchived ? 'Ver Ativas' : 'Ver Arquivadas'}
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary text-white font-black px-8 py-2.5 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 shadow-md"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Nova Nota
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.filter(n => n.archived === showArchived).map(note => (
          <div key={note.id} className="bg-surface-container rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/10 hover:shadow-xl hover:scale-[1.01] transition-all group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{note.category}</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleToggleArchive(note.id)}
                    title={note.archived ? 'Desarquivar' : 'Arquivar'}
                    className="w-8 h-8 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">{note.archived ? 'unarchive' : 'archive'}</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(note.id)}
                    title="Excluir"
                    className="w-8 h-8 rounded-full bg-surface-container-highest/60 flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2 text-on-surface">{note.title}</h3>
              <p className="text-sm text-on-surface-variant whitespace-pre-wrap leading-relaxed">{note.content}</p>
            </div>
            <p className="text-[10px] font-bold opacity-60 text-right mt-6 border-t border-outline-variant/10 pt-2">{note.date}</p>
          </div>
        ))}
        {notes.filter(n => n.archived === showArchived).length === 0 && (
          <div className="col-span-full py-20 text-center text-on-surface-variant/50">
             <span className="material-symbols-outlined text-6xl mb-4 opacity-50">note_stack</span>
             <p className="font-bold">Nenhuma nota encontrada nesta visualização.</p>
          </div>
        )}
      </div>

      {/* Modal Nova Nota */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <form onSubmit={handleAddNote} className="bg-background w-full max-w-lg rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 border border-outline-variant/10 space-y-4">
            <h3 className="text-xl font-black text-primary font-headline">Criar Nova Nota</h3>
            <div>
              <label className="text-[10px] font-black uppercase text-on-surface-variant block mb-1">Título</label>
              <input 
                required
                value={newNote.title} 
                onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20"
                placeholder="Ex: Lembrete sobre produto"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-on-surface-variant block mb-1">Categoria</label>
              <select 
                value={newNote.category}
                onChange={e => setNewNote({ ...newNote, category: e.target.value })}
                className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20"
              >
                <option value="Geral">Geral</option>
                <option value="Clientes">Clientes</option>
                <option value="Manutenção">Manutenção</option>
                <option value="Química">Química & Insumos</option>
                <option value="Financeiro">Financeiro</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-on-surface-variant block mb-1">Conteúdo</label>
              <textarea 
                rows={4}
                value={newNote.content}
                onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20"
                placeholder="Escreva os detalhes da anotação..."
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-surface-container-high py-3 rounded-xl font-bold text-xs uppercase text-on-surface-variant hover:bg-surface-container-highest">Cancelar</button>
              <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase shadow-md hover:brightness-105">Salvar Nota</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
