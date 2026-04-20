import en from './locales/en.json';
import es from './locales/es.json';
import ro from './locales/ro.json';

export type Locale = 'en' | 'es' | 'ro';

export const locales: Record<Locale, typeof en> = {
  en,
  es,
  ro,
};

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  ro: 'Română',
};

export const defaultLocale: Locale = 'en';

export function getTranslations(locale: Locale) {
  return locales[locale] || locales[defaultLocale];
}

// Type-safe translation key access
export type TranslationKeys = typeof en;
