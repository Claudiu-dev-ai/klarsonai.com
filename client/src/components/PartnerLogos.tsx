/**
 * PartnerLogos Component
 * Logos ficticios de partners internacionales para la sección "Trusted by"
 * Diseño: Signal Grid - Estilo minimalista y profesional
 */

interface PartnerLogoProps {
  className?: string;
}

// Logo 1: MedTech Solutions (Healthcare Tech - Germany)
export function MedTechLogo({ className = '' }: PartnerLogoProps) {
  return (
    <svg 
      viewBox="0 0 140 40" 
      className={className}
      fill="currentColor"
    >
      <path d="M8 20L14 8L20 20L14 32L8 20Z" opacity="0.8" />
      <path d="M14 8L20 20L14 32" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="28" y="24" fontFamily="system-ui" fontSize="14" fontWeight="600">
        MedTech
      </text>
      <text x="28" y="35" fontFamily="system-ui" fontSize="8" opacity="0.6">
        SOLUTIONS
      </text>
    </svg>
  );
}

// Logo 2: Clinica Nova (Medical Chain - Spain)
export function ClinicaNovaLogo({ className = '' }: PartnerLogoProps) {
  return (
    <svg 
      viewBox="0 0 130 40" 
      className={className}
      fill="currentColor"
    >
      <circle cx="16" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 12V28M10 20H22" stroke="currentColor" strokeWidth="2" />
      <text x="34" y="24" fontFamily="system-ui" fontSize="14" fontWeight="500">
        Clínica Nova
      </text>
    </svg>
  );
}

// Logo 3: DentaCare Group (Dental Chain - UK)
export function DentaCareLogo({ className = '' }: PartnerLogoProps) {
  return (
    <svg 
      viewBox="0 0 140 40" 
      className={className}
      fill="currentColor"
    >
      <path d="M8 28C8 28 12 12 16 12C20 12 20 28 24 28C28 28 28 12 32 12" 
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <text x="40" y="24" fontFamily="system-ui" fontSize="13" fontWeight="600">
        DentaCare
      </text>
      <text x="40" y="34" fontFamily="system-ui" fontSize="8" opacity="0.6">
        GROUP
      </text>
    </svg>
  );
}

// Logo 4: Hotel Lux International (Hospitality - France)
export function HotelLuxLogo({ className = '' }: PartnerLogoProps) {
  return (
    <svg 
      viewBox="0 0 150 40" 
      className={className}
      fill="currentColor"
    >
      <rect x="8" y="14" width="20" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="12" y="18" width="5" height="5" fill="currentColor" opacity="0.5" />
      <rect x="19" y="18" width="5" height="5" fill="currentColor" opacity="0.5" />
      <rect x="15" y="26" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="34" y="24" fontFamily="system-ui" fontSize="14" fontWeight="500" letterSpacing="1">
        HOTEL LUX
      </text>
    </svg>
  );
}

// Logo 5: PropTech Realty (Real Estate - USA)
export function PropTechLogo({ className = '' }: PartnerLogoProps) {
  return (
    <svg 
      viewBox="0 0 140 40" 
      className={className}
      fill="currentColor"
    >
      <path d="M16 32V16L8 22V32H16ZM16 32V16L24 10V32H16Z" 
            fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="32" y="24" fontFamily="system-ui" fontSize="13" fontWeight="600">
        PropTech
      </text>
      <text x="32" y="34" fontFamily="system-ui" fontSize="8" opacity="0.6">
        REALTY
      </text>
    </svg>
  );
}

// Logo 6: VoiceFirst AI (Tech Partner - Romania)
export function VoiceFirstLogo({ className = '' }: PartnerLogoProps) {
  return (
    <svg 
      viewBox="0 0 140 40" 
      className={className}
      fill="currentColor"
    >
      <path d="M8 20C8 20 10 14 14 14C18 14 18 26 22 26C26 26 28 20 28 20" 
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="20" r="2" fill="currentColor" />
      <circle cx="22" cy="20" r="2" fill="currentColor" />
      <text x="36" y="24" fontFamily="system-ui" fontSize="12" fontWeight="600">
        VoiceFirst
      </text>
      <text x="36" y="34" fontFamily="system-ui" fontSize="8" opacity="0.6">
        AI SOLUTIONS
      </text>
    </svg>
  );
}

// Componente que muestra todos los logos
export function AllPartnerLogos({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-8 lg:gap-12 ${className}`}>
      <MedTechLogo className="h-8 w-auto text-muted-foreground/70 hover:text-muted-foreground transition-colors" />
      <ClinicaNovaLogo className="h-8 w-auto text-muted-foreground/70 hover:text-muted-foreground transition-colors" />
      <DentaCareLogo className="h-8 w-auto text-muted-foreground/70 hover:text-muted-foreground transition-colors" />
      <HotelLuxLogo className="h-8 w-auto text-muted-foreground/70 hover:text-muted-foreground transition-colors" />
      <PropTechLogo className="h-8 w-auto text-muted-foreground/70 hover:text-muted-foreground transition-colors" />
      <VoiceFirstLogo className="h-8 w-auto text-muted-foreground/70 hover:text-muted-foreground transition-colors" />
    </div>
  );
}

export default AllPartnerLogos;
