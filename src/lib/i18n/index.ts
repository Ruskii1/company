
import { create } from 'zustand'
import { coreTranslations } from './core'
import { orderTranslations } from './order'
import { serviceTranslations } from './services'
import { profileTranslations } from './profile'
import { securityTranslations } from './security'
import { paymentTranslations } from './payment'
import { providerTranslations } from './providers'
import { commonTranslations } from './common'
import { settingsTranslations } from './settings'
import { SupportedLanguage, Translations } from './types'

// Use one object to store all translations by language
export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    ...coreTranslations.en,
    ...orderTranslations.en,
    ...serviceTranslations.en,
    ...commonTranslations.en,
    ...profileTranslations.en,
    ...securityTranslations.en,
    ...paymentTranslations.en,
    ...providerTranslations.en,
    ...settingsTranslations.en,
  },
  ar: {
    ...coreTranslations.ar,
    ...orderTranslations.ar,
    ...serviceTranslations.ar,
    ...commonTranslations.ar,
    ...profileTranslations.ar,
    ...securityTranslations.ar,
    ...paymentTranslations.ar,
    ...providerTranslations.ar,
    ...settingsTranslations.ar,
  }
}

// Store to manage the language state
interface LanguageState {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}))

// Re-export types for convenience
export * from './types'
