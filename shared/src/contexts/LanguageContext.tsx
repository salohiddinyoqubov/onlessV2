/**
 * Unified LanguageContext for all platforms
 * Works with: Frontend (Next.js), Mobile (React Native), Desktop (Electron)
 */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { StorageAdapter } from '../adapters/storage';
import { latinToCyrillic } from '../utils/cyrillic-converter';

export type Language = 'uz-latn' | 'uz-cyrl' | 'qr-latn' | 'qr-cyrl' | 'ru-cyrl';

export const LANGUAGE_LABELS: Record<Language, string> = {
  'uz-latn': 'Uzb (lotin.)',
  'uz-cyrl': 'Uzb (кирил.)',
  'qr-latn': 'Qrq (lotin.)',
  'qr-cyrl': 'Qrq (кирил.)',
  'ru-cyrl': 'Rus (кирил.)',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  convertText: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  storageAdapter: StorageAdapter;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  storageAdapter,
  defaultLanguage = 'uz-latn',
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  // Load language from storage on mount
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await storageAdapter.getItem('language');

      if (
        savedLanguage === 'uz-latn' ||
        savedLanguage === 'uz-cyrl' ||
        savedLanguage === 'qr-latn' ||
        savedLanguage === 'qr-cyrl' ||
        savedLanguage === 'ru-cyrl'
      ) {
        setLanguageState(savedLanguage);
      }

      setMounted(true);
    };

    loadLanguage();
  }, [storageAdapter]);

  // Save language to storage when it changes
  useEffect(() => {
    if (mounted) {
      storageAdapter.setItem('language', language);
    }
  }, [language, mounted, storageAdapter]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  /**
   * Converts text based on current language
   * For Cyrillic languages, converts from Latin to Cyrillic
   * For Latin languages, returns text as-is
   */
  const convertText = (text: string): string => {
    // If language is Cyrillic, convert from Latin to Cyrillic
    if (language === 'uz-cyrl' || language === 'qr-cyrl' || language === 'ru-cyrl') {
      return latinToCyrillic(text);
    }
    // Otherwise return as-is (Latin)
    return text;
  };

  // Prevent flash of wrong content during hydration
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, convertText }}>
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
