import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import gsap from 'gsap';

export default function AcessoPinPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.gsap-pin-logo', 
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 }
      )
      .fromTo('.gsap-pin-card', 
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 }, 
        '-=0.2'
      )
      .fromTo('.gsap-pin-title', 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 }, 
        '-=0.2'
      )
      .fromTo('.gsap-pin-key', 
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.025, duration: 0.4, ease: 'back.out(1.5)' }, 
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleKeyPress = async (num) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg('');
      if (newPin.length === 6) {
        const attempt = await login(newPin);
        if (attempt.success) {
          setTimeout(() => navigate('/portal'), 300);
        } else {
          setErrorMsg(attempt.error || 'Acesso não autorizado');
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center p-2">
      <div className="w-full max-w-xs flex flex-col items-center">
        {/* Logo Section Compacta */}
        <div className="gsap-pin-logo flex flex-col items-center text-center mb-5">
          <img src="/logo-green.svg" alt="ED Limp Logo" className="w-40 mb-2 filter drop-shadow-lg" />
          <p className="text-[10px] text-emerald-400 font-label tracking-[0.3em] uppercase font-black">Portal Administrativo</p>
        </div>

        {/* PIN Card Compacto */}
        <div className="gsap-pin-card bg-slate-900/90 backdrop-blur-2xl px-6 py-6 rounded-3xl border border-slate-800 shadow-2xl w-full space-y-5">
          <div className="gsap-pin-title text-center">
            <h2 className="font-headline text-lg font-extrabold text-white tracking-tight">Acesso Seguro</h2>
            <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mt-0.5">Digite o PIN (6 dígitos)</p>
          </div>
          
          {/* PIN Dots (6 dígitos compactos) */}
          <div className="flex justify-center gap-2.5 py-1">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ease-out ${
                  index < pin.length 
                    ? 'bg-emerald-400 scale-110 shadow-[0_0_12px_rgba(52,211,153,0.6)]' 
                    : 'bg-slate-800 border border-slate-700'
                }`}
              />
            ))}
          </div>

          {errorMsg && (
            <div className="text-center animate-in fade-in duration-200">
              <p className="text-red-400 font-bold text-[10px] uppercase tracking-wider bg-red-950/60 py-1.5 px-3 rounded-full inline-block border border-red-800/40">
                {errorMsg}
              </p>
            </div>
          )}
          
          {/* Numeric Keypad Compacto */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[210px] mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button 
                key={num} 
                onClick={() => handleKeyPress(num.toString())}
                className="gsap-pin-key w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:bg-emerald-500 hover:text-slate-950 active:scale-95 transition-all flex items-center justify-center text-slate-100 font-extrabold text-xl shadow-md cursor-pointer"
              >
                {num}
              </button>
            ))}
            <div className="w-14 h-14"></div>
            <button 
              onClick={() => handleKeyPress('0')}
              className="gsap-pin-key w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:bg-emerald-500 hover:text-slate-950 active:scale-95 transition-all flex items-center justify-center text-slate-100 font-extrabold text-xl shadow-md cursor-pointer"
            >
              0
            </button>
            <button 
              onClick={handleBackspace}
              className="gsap-pin-key w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all active:scale-95 cursor-pointer"
              title="Apagar"
            >
              <span className="material-symbols-outlined text-xl">backspace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
