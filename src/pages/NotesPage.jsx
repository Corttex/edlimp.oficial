import { useState, useEffect } from 'react';

export default function NotesPage() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Checklist Impermeabilização', content: '1. Aspirar fundo\n2. Escovação leve\n3. Aplicação Shield Pro', category: 'Técnico', date: '12 Abr', archived: false },
    { id: 2, title: 'Fornecedor novo - Tecidos', content: 'Contato: (11) 9888-7777 - Falar com Marcos.', category: 'Contatos', date: '10 Abr', archived: false },
  ]);
  const [showArchived, setShowArchived] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 h-full flex flex-col">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight font-headline">Central de Notas Práticas</h2>
          <p className="text-on-surface-variant font-medium mt-1">Lembretes técnicos e contatos rápidos.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowArchived(!showArchived)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${showArchived ? 'bg-primary text-white border-primary' : 'bg-white text-on-surface-variant border-outline-variant/20'}`}
          >
            {showArchived ? 'Ver Ativas' : 'Ver Arquivadas'}
          </button>
          <button className="bg-primary text-white font-black px-8 py-2.5 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-secondary">add</span>
            Nova Nota
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.filter(n => n.archived === showArchived).map(note => (
          <div key={note.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 hover:shadow-xl hover:scale-[1.02] transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{note.category}</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {
                    setNotes(notes.map(n => n.id === note.id ? { ...n, archived: !n.archived } : n));
                  }}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                >
                  <span className="material-symbols-outlined text-lg">{note.archived ? 'unarchive' : 'archive'}</span>
                </button>
                <button 
                  onClick={() => {
                    if (confirm('Deseja excluir esta nota permanentemente?')) {
                      setNotes(notes.filter(n => n.id !== note.id));
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">{note.title}</h3>
            <p className="text-sm text-on-surface-variant whitespace-pre-wrap">{note.content}</p>
            <p className="text-[10px] font-bold opacity-60 text-right mt-6">{note.date}</p>
          </div>
        ))}
        {notes.filter(n => n.archived === showArchived).length === 0 && (
          <div className="col-span-full py-20 text-center text-on-surface-variant/50">
             <span className="material-symbols-outlined text-6xl mb-4 opacity-50">note_stack</span>
             <p className="font-bold">Nenhuma nota por enquanto.</p>
          </div>
        )}
      </div>
    </div>
  );
}
