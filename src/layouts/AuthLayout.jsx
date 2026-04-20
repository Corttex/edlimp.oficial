import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center text-on-background font-body overflow-hidden bg-white">
      {/* Background Image - Thematic Upholstery/Sofa */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&auto=format&fit=crop&q=80" 
          className="w-full h-full object-cover object-center scale-105 opacity-80"
          alt="Premium Upholstery Cleaning Background"
        />
      </div>
      
      {/* Mix with white / Frosted gradients (Top to bottom flow) */}
      <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-[3px]"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      
      {/* Floating White Card Content */}
      <main className="relative z-10 w-full max-w-md sm:bg-white/80 sm:backdrop-blur-xl p-6 sm:p-10 sm:rounded-[2.5rem] sm:shadow-2xl sm:border sm:border-white h-full sm:h-auto overflow-y-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
}
