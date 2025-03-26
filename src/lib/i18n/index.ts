
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  Translations,
  baseTranslations,
  arabicTranslations,
} from './core';

// Define language type
export type Language = 'en' | 'ar';

// Define language store state
type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

// Create language store
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Create translations object with all translations
export const translations: Record<Language, Translations> = {
  en: baseTranslations,
  ar: {
    ...baseTranslations,
    ...arabicTranslations,
  },
};

// Make the translations available globally
export * from './core';
export * from './common';
export * from './services';
export * from './security';
export * from './order';
export * from './profile';
export * from './payment';
export * from './providers';
