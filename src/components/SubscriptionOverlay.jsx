import { useAuth } from '../contexts/AuthContext';

export default function SubscriptionOverlay() {
  const { user, renewSubscription } = useAuth();
  
  if (!user || user.subscription?.active) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-primary/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl text-center space-y-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary via-primary to-secondary"></div>
        
        <div className="w-20 h-20 bg-error-container rounded-3xl flex items-center justify-center text-error mx-auto shadow-inner">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
        </div>

        <div>
          <h2 className="text-3xl font-black text-primary tracking-tight">Assinatura Suspensa</h2>
          <p className="text-on-surface-variant font-medium mt-3 leading-relaxed">
            Sua conta **{user.subscription?.plan}** venceu. Para continuar acessando os módulos de gestão e geração de documentos, realize o pagamento via PIX.
          </p>
        </div>

        <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/20 flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            {/* Mock QR Code representation */}
            <div className="w-32 h-32 bg-slate-100 flex items-center justify-center rounded-lg border-2 border-dashed border-primary/20">
               <span className="material-symbols-outlined text-4xl text-primary/30">qr_code_2</span>
            </div>
          </div>
          <div className="w-full">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest text-center">Código Copia e Cola</p>
            <div className="bg-white border border-outline-variant/30 px-4 py-3 rounded-xl text-xs font-mono text-primary truncate">
              {user.subscription?.pixCode || 'edlimp-pix-rev-09923'}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={renewSubscription}
            className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-wider"
          >
            Confirmar Pagamento
          </button>
          <p className="text-[10px] text-on-surface-variant italic">
            *Após a confirmação (via webhook), o sistema será liberado instantaneamente.
          </p>
        </div>

        <button className="text-primary font-bold text-xs hover:underline flex items-center gap-2 mx-auto">
          <span className="material-symbols-outlined text-sm">support_agent</span>
          Falar com Suporte Técnico
        </button>
      </div>
    </div>
  );
}
