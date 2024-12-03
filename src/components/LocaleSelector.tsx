import { useState, useRef } from 'react';
import { Globe } from 'lucide-react';
import { useLocale } from '../contexts/LocaleContext';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
];

export default function LocaleSelector() {
  const { locale, currency, setLocale, setCurrency } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'currency'>(
    'language'
  );
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  const currentLanguage = languages.find((lang) => lang.code === locale);
  const currentCurrency = currencies.find((curr) => curr.code === currency);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
      >
        <Globe className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {currentLanguage?.flag} / {currentCurrency?.symbol}
        </span>

        {/* Tooltip */}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Change language or currency
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          {/* Tabs */}
          <div className="flex border-b dark:border-gray-700">
            <button
              onClick={() => setActiveTab('language')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'language'
                  ? 'text-accent-600 border-b-2 border-accent-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Language
            </button>
            <button
              onClick={() => setActiveTab('currency')}
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'currency'
                  ? 'text-accent-600 border-b-2 border-accent-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Currency
            </button>
          </div>

          <div className="p-2 max-h-80 overflow-y-auto">
            {activeTab === 'language' ? (
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                      locale === lang.code
                        ? 'bg-accent-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {locale === lang.code && (
                      <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => {
                      setCurrency(curr.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-2 text-sm rounded-md ${
                      currency === curr.code
                        ? 'bg-accent-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{curr.flag}</span>
                    <span className="flex-1 text-left">
                      {curr.name} ({curr.symbol})
                    </span>
                    {currency === curr.code && (
                      <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
