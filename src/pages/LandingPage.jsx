import React from 'react';

export default function LandingPage() {
  return (
    <div className="w-screen h-screen overflow-hidden relative" style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <iframe 
        src="/edlimp_site_socialkit.html" 
        className="w-full h-full border-none"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="ED Limp Institucional"
      />
    </div>
  );
}
