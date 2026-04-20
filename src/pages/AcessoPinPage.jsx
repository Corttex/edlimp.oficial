import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AcessoPinPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg('');
      if (newPin.length === 4) {
        const attempt = login(newPin);
        if(attempt.success) {
          setTimeout(() => navigate('/'), 300);
        } else {
          setErrorMsg(attempt.error);
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80" 
            className="w-full h-full object-cover opacity-10" 
            alt="Cleaning Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center mb-10 translate-y-[-20%]">
          <div className="w-40 mb-2">
            <img src="/logo-color.svg" alt="ED Limp Logo" className="w-full drop-shadow-sm" />
          </div>
          <p className="text-[10px] text-slate-400 font-label tracking-[0.3em] uppercase">Enterprise Suite</p>
        </div>

        {/* PIN Card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] border border-outline-variant/10 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-headline text-2xl font-black text-primary">Acesso Seguro</h2>
            <p className="text-slate-500 text-sm font-medium">Digite seu PIN de 4 dígitos</p>
          </div>
          
          {/* PIN Dots */}
          <div className="flex justify-center gap-4 py-4">
            {[0, 1, 2, 3].map((index) => (
              <div 
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index < pin.length 
                    ? 'bg-secondary scale-125 shadow-[0_0_15px_rgba(167,252,93,0.5)]' 
                    : 'bg-surface-container-highest'
                }`}
              />
            ))}
          </div>

          {errorMsg && (
            <div className="text-center animate-bounce">
              <p className="text-error font-bold text-xs bg-error-container/20 py-1.5 px-4 rounded-full inline-block">
                {errorMsg}
              </p>
            </div>
          )}
          
          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button 
                key={num} 
                onClick={() => handleKeyPress(num.toString())}
                className="w-16 h-16 mx-auto rounded-full bg-surface-container/50 hover:bg-primary hover:text-white active:scale-90 transition-all flex items-center justify-center group"
              >
                <span className="text-xl font-black text-primary group-hover:text-white">{num}</span>
              </button>
            ))}
            <div className="w-16 h-16"></div>
            <button 
              onClick={() => handleKeyPress('0')}
              className="w-16 h-16 mx-auto rounded-full bg-surface-container/50 hover:bg-primary hover:text-white active:scale-90 transition-all flex items-center justify-center group"
            >
              <span className="text-xl font-black text-primary group-hover:text-white">0</span>
            </button>
            <button 
              onClick={handleBackspace}
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center hover:bg-error-container text-slate-400 hover:text-error transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-2xl">backspace</span>
            </button>
          </div>
          
          {/* Footer */}
          <div className="pt-4 text-center space-y-4">
            <button className="text-primary font-bold text-xs hover:underline decoration-2 underline-offset-4 transition-all">
              Esqueceu o PIN? Solicitar senha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
