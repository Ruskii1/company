
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Language } from './types';

// Create language store
type LanguageState = {
  language: Language;
  setLanguage: (language: Language) => void;
};

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
