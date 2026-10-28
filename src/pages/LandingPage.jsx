import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <iframe 
        src="/edlimp_site_socialkit.html" 
        className="w-full h-full border-none"
        title="ED Limp Institucional"
      />
    </div>
  );
}
