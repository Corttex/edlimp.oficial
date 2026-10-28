import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center font-body overflow-hidden bg-slate-950">
      {/* Background Decorativo Suave com Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover object-center scale-105 opacity-25 filter blur-sm"
          alt="Premium Upholstery Cleaning Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60"></div>
      </div>
      
      {/* Conteúdo central sem molduras duplas */}
      <main className="relative z-10 w-full flex items-center justify-center p-4">
        <Outlet />
      </main>
    </div>
  );
}
