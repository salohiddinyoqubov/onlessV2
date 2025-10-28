'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { latinToCyrillic } from '../utils/cyrillicConverter';

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('uz-latn');
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
    }
  }, [language, mounted]);

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

  // Prevent flash of wrong content
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
