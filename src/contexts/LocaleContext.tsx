import { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

interface LocaleContextType {
  locale: string;
  currency: string;
  setLocale: (locale: string) => void;
  setCurrency: (currency: string) => void;
  formatPrice: (price: number) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// Exchange rates cache (update if needed)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.42,
  INR: 74.5,
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(() => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || navigator.language.split('-')[0] || 'en';
  });

  const [currency, setCurrency] = useState(() => {
    const savedCurrency = localStorage.getItem('currency');
    return savedCurrency || 'USD'; // default to USD
  });

  // Update language when locale changes
  useEffect(() => {
    localStorage.setItem('locale', locale);
    i18n.changeLanguage(locale);
  }, [locale]);

  // Update currency when it changes
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  // Format price based on selected currency
  const formatPrice = (price: number): string => {
    const rate = exchangeRates[currency] || 1;
    const convertedPrice = price * rate;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedPrice);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        currency,
        setLocale,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
