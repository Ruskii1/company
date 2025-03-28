
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  Translations,
  baseTranslations,
  arabicTranslations,
  locales,
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

// Import all translation files
import { commonTranslations, common } from './common';
import { orderTranslations } from './order';
import { orderTranslationsExt } from './orders';
import { securityTranslations } from './security';
import { profileTranslations } from './profile';
import { paymentTranslations } from './payment';
import { providerTranslations } from './providers';
import { serviceTranslations } from './services';
import { financeTranslations } from './finance';
import { accountTranslations } from './account';
import { navigationTranslations } from './navigation';

// Merge all translations
const mergeTranslations = (language: Language) => {
  return {
    ...baseTranslations,
    ...commonTranslations[language],
    ...orderTranslations[language],
    ...orderTranslationsExt[language],
    ...securityTranslations?.[language] || {},
    ...profileTranslations?.[language] || {},
    ...paymentTranslations?.[language] || {},
    ...providerTranslations?.[language] || {},
    ...serviceTranslations?.[language] || {},
    ...financeTranslations?.[language] || {},
    ...accountTranslations?.[language] || {},
    ...navigationTranslations?.[language] || {},
    ...(language === 'ar' ? arabicTranslations : {}),
  };
};

// Create translations object with all translations
export const translations: Record<Language, any> = {
  en: mergeTranslations('en'),
  ar: mergeTranslations('ar'),
};

// Make the translations available globally
export * from './core';
export * from './common';
export * from './services';
export * from './security';
export * from './order';
export * from './orders';
export * from './profile';
export * from './payment';
export * from './providers';
export * from './finance';
export * from './account';
export * from './navigation';
