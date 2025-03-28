
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { enUS, arDZ } from "date-fns/locale";

// Import language files
import { common as enCommon } from './en/common';
import { services as enServices } from './en/services';
import { core as enCore } from './en/core';

import { common as arCommon } from './ar/common';
import { services as arServices } from './ar/services';
import { core as arCore } from './ar/core';

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

// Export locales for date-fns
export const locales = {
  en: enUS,
  ar: arDZ,
};

// Define rtl languages
export const rtlLanguages: Language[] = ["ar"];

// Merge all translations
export const translations = {
  en: {
    ...enCore,
    ...enCommon,
    ...enServices,
    dashboard: enCore.dashboard,
    services: enServices.services
  },
  ar: {
    ...arCore,
    ...arCommon,
    ...arServices,
    dashboard: arCore.dashboard,
    services: arServices.services
  }
};

// Re-export for backward compatibility
export * from './en/core';
export * from './en/common';
export * from './en/services';
