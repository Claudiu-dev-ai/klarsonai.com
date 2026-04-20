import { createContext, useContext, useState, useCallback, ReactNode, useMemo, useEffect } from 'react';
import { Locale, defaultLocale, getTranslations, TranslationKeys } from '@/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Mapeo de países a idiomas
const countryToLocale: Record<string, Locale> = {
  // Rumania -> Rumano
  'RO': 'ro',
  // España y países hispanohablantes -> Español
  'ES': 'es',
  'MX': 'es',
  'AR': 'es',
  'CO': 'es',
  'PE': 'es',
  'CL': 'es',
  'VE': 'es',
  'EC': 'es',
  'GT': 'es',
  'CU': 'es',
  'BO': 'es',
  'DO': 'es',
  'HN': 'es',
  'PY': 'es',
  'SV': 'es',
  'NI': 'es',
  'CR': 'es',
  'PA': 'es',
  'UY': 'es',
  // Resto del mundo -> Inglés (default)
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Get initial locale from localStorage, URL path, or browser preference
  const getInitialLocale = (): Locale => {
    // Check localStorage first (user's previous choice)
    const savedLocale = localStorage.getItem('klarson-locale');
    if (savedLocale && ['en', 'es', 'ro'].includes(savedLocale)) {
      return savedLocale as Locale;
    }

    // Check URL path
    const pathLocale = window.location.pathname.split('/')[1] as Locale;
    if (['en', 'es', 'ro'].includes(pathLocale)) {
      return pathLocale;
    }
    
    // Check browser language preference
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'es', 'ro'].includes(browserLang)) {
      return browserLang as Locale;
    }
    
    return defaultLocale;
  };

  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [geoDetected, setGeoDetected] = useState(false);

  // Detección automática de idioma por geolocalización
  useEffect(() => {
    // Solo detectar si no hay preferencia guardada
    const savedLocale = localStorage.getItem('klarson-locale');
    if (savedLocale || geoDetected) return;

    const detectLocationAndSetLocale = async () => {
      try {
        // Usar un servicio de geolocalización gratuito
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(3000), // 3 second timeout
        });
        
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code;
          
          if (countryCode && countryToLocale[countryCode]) {
            const detectedLocale = countryToLocale[countryCode];
            setLocaleState(detectedLocale);
            // No guardar en localStorage para que el usuario pueda cambiar
          }
        }
      } catch (error) {
        // Silently fail - use default locale
        console.log('Geolocation detection failed, using default locale');
      } finally {
        setGeoDetected(true);
      }
    };

    detectLocationAndSetLocale();
  }, [geoDetected]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    // Guardar preferencia del usuario
    localStorage.setItem('klarson-locale', newLocale);
    
    // Update URL without page reload
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    
    // Remove existing locale from path if present
    if (['en', 'es', 'ro'].includes(pathParts[0])) {
      pathParts.shift();
    }
    
    // Add new locale to path (except for default English)
    const newPath = newLocale === 'en' 
      ? '/' + pathParts.join('/')
      : '/' + newLocale + '/' + pathParts.join('/');
    
    window.history.pushState({}, '', newPath || '/');
  }, []);

  const t = useMemo(() => getTranslations(locale), [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t,
  }), [locale, setLocale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
