
import { useLanguageStore } from './core'
import { commonTranslations } from './common'
import { profileTranslations } from './profile'
import { securityTranslations } from './security'
import { providerTranslations } from './providers'
import { paymentTranslations } from './payment'
import { orderTranslations } from './order'
import { serviceTranslations } from './services'

// Merge all translations into a single object
const mergeTranslations = () => {
  return {
    en: {
      ...commonTranslations.en,
      ...profileTranslations.en,
      ...securityTranslations.en,
      ...providerTranslations.en,
      ...paymentTranslations.en,
      ...orderTranslations.en,
      ...serviceTranslations.en,
    },
    ar: {
      ...commonTranslations.ar,
      ...profileTranslations.ar,
      ...securityTranslations.ar,
      ...providerTranslations.ar,
      ...paymentTranslations.ar,
      ...orderTranslations.ar,
      ...serviceTranslations.ar,
    }
  }
}

// Export the merged translations as the main translations object
export const translations = mergeTranslations()
export { useLanguageStore }
