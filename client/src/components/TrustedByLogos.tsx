/**
 * Trusted By Logos Component - Signal Grid Design
 * 
 * Logos ficticios con:
 * - Colores del sitio (índigo #6366F1, gris #64748B, blanco)
 * - Estilo minimalista y profesional
 * - Nombres específicos de empresas ficticias
 */

export default function TrustedByLogos() {
  const logos = [
    {
      name: 'MedTech Solutions',
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="medtech-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#medtech-grad)" strokeWidth="2" />
          <path d="M 50 30 L 60 45 L 50 60 L 40 45 Z" fill="url(#medtech-grad)" />
          <circle cx="50" cy="50" r="8" fill="none" stroke="url(#medtech-grad)" strokeWidth="1.5" />
        </svg>
      ),
      subtitle: 'SOLUTIONS'
    },
    {
      name: 'Clínica Nova',
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="clinica-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#clinica-grad)" strokeWidth="2" />
          <circle cx="50" cy="35" r="12" fill="url(#clinica-grad)" />
          <path d="M 35 55 Q 50 70 65 55" fill="none" stroke="url(#clinica-grad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      subtitle: 'HEALTHCARE'
    },
    {
      name: 'DentaCare Group',
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="denta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#denta-grad)" strokeWidth="2" />
          <path d="M 45 35 Q 45 45 50 50 Q 55 45 55 35" fill="url(#denta-grad)" />
          <line x1="45" y1="50" x2="45" y2="65" stroke="url(#denta-grad)" strokeWidth="2" />
          <line x1="55" y1="50" x2="55" y2="65" stroke="url(#denta-grad)" strokeWidth="2" />
        </svg>
      ),
      subtitle: 'DENTAL'
    },
    {
      name: 'Hotel Lux',
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="hotel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#hotel-grad)" strokeWidth="2" />
          <rect x="40" y="35" width="20" height="30" fill="none" stroke="url(#hotel-grad)" strokeWidth="2" />
          <line x1="45" y1="35" x2="45" y2="65" stroke="url(#hotel-grad)" strokeWidth="1" />
          <line x1="55" y1="35" x2="55" y2="65" stroke="url(#hotel-grad)" strokeWidth="1" />
          <circle cx="45" cy="42" r="2" fill="url(#hotel-grad)" />
          <circle cx="55" cy="42" r="2" fill="url(#hotel-grad)" />
          <circle cx="45" cy="52" r="2" fill="url(#hotel-grad)" />
          <circle cx="55" cy="52" r="2" fill="url(#hotel-grad)" />
        </svg>
      ),
      subtitle: 'HOSPITALITY'
    },
    {
      name: 'PropTech Realty',
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="prop-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#prop-grad)" strokeWidth="2" />
          <path d="M 50 30 L 65 45 L 65 65 L 35 65 L 35 45 Z" fill="none" stroke="url(#prop-grad)" strokeWidth="2" />
          <line x1="50" y1="45" x2="50" y2="65" stroke="url(#prop-grad)" strokeWidth="1.5" />
          <rect x="42" y="50" width="6" height="6" fill="url(#prop-grad)" />
          <rect x="52" y="50" width="6" height="6" fill="url(#prop-grad)" />
        </svg>
      ),
      subtitle: 'REAL ESTATE'
    },
    {
      name: 'VoiceFirst AI',
      icon: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="voice-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#voice-grad)" strokeWidth="2" />
          <path d="M 45 35 L 45 65 M 50 32 L 50 68 M 55 35 L 55 65" stroke="url(#voice-grad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      subtitle: 'AI SOLUTIONS'
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        {logos.map((logo, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              {logo.icon}
            </div>
            <div className="text-center">
              <div className="text-sm md:text-base font-semibold text-foreground">
                {logo.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {logo.subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
