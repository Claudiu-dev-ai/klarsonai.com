/**
 * Regional Currency Detection and Conversion
 * 
 * Detects user's region and provides appropriate currency formatting
 */

export type Currency = 'EUR' | 'RON' | 'USD';
export type Region = 'ES' | 'RO' | 'EU' | 'OTHER';

// European countries (excluding Romania which has its own currency)
const EU_COUNTRIES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'SK', 'SI', 'ES', 'SE'
];

// Exchange rates (base: EUR)
const EXCHANGE_RATES: Record<Currency, number> = {
  EUR: 1,
  RON: 5.09,  // 1 EUR = 5.09 RON (updated 2026-01-20)
  USD: 1.17   // 1 EUR = 1.17 USD (updated 2026-01-20)
};

/**
 * Detect user's region based on browser language and timezone
 */
export function detectRegion(): Region {
  // Try to get language from browser
  const language = navigator.language || (navigator as any).userLanguage;
  const countryCode = language.split('-')[1]?.toUpperCase();

  // Check for Romania
  if (countryCode === 'RO' || language.startsWith('ro')) {
    return 'RO';
  }

  // Check for Spain
  if (countryCode === 'ES' || language.startsWith('es-ES')) {
    return 'ES';
  }

  // Check for other EU countries
  if (countryCode && EU_COUNTRIES.includes(countryCode)) {
    return 'EU';
  }

  return 'OTHER';
}

/**
 * Get currency based on region
 */
export function getCurrencyForRegion(region: Region): Currency {
  switch (region) {
    case 'RO':
      return 'RON';
    case 'ES':
    case 'EU':
      return 'EUR';
    default:
      return 'USD';
  }
}

/**
 * Convert EUR price to target currency
 */
export function convertPrice(eurPrice: number, targetCurrency: Currency): number {
  const rate = EXCHANGE_RATES[targetCurrency];
  return Math.round(eurPrice * rate);
}

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: Currency): string {
  switch (currency) {
    case 'EUR':
      return `${price} €`;
    case 'RON':
      return `${price} RON`;
    case 'USD':
      return `$${price}`;
  }
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
  switch (currency) {
    case 'EUR':
      return '€';
    case 'RON':
      return 'RON';
    case 'USD':
      return '$';
  }
}

/**
 * Hook to get current currency based on user's region
 */
export function useCurrency(): { currency: Currency; region: Region; formatPrice: (eurPrice: number) => string } {
  const region = detectRegion();
  const currency = getCurrencyForRegion(region);

  return {
    currency,
    region,
    formatPrice: (eurPrice: number) => {
      const converted = convertPrice(eurPrice, currency);
      return formatPrice(converted, currency);
    }
  };
}
