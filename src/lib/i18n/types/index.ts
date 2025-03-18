
import { SupportedLanguage } from './language-types'
import { CoreTranslations } from './core-types'
import { OrderTranslations } from './order-types'
import { ServicesTranslations } from './services-types'
import { CommonTranslations } from './common-types'
import { ProfileTranslations } from './profile-types'
import { SecurityTranslations } from './security-types'
import { PaymentTranslations } from './payment-types'
import { ProviderTranslations } from './provider-types'
import { SettingsTranslations } from './settings-types'

// Combined translations type
export type Translations = CoreTranslations & 
  OrderTranslations & 
  ServicesTranslations & 
  CommonTranslations & 
  ProfileTranslations & 
  SecurityTranslations & 
  PaymentTranslations & 
  ProviderTranslations & 
  SettingsTranslations

// Re-export all types for convenience
export * from './language-types'
export * from './core-types'
export * from './order-types'
export * from './services-types'
export * from './common-types'
export * from './profile-types'
export * from './security-types'
export * from './payment-types'
export * from './provider-types'
export * from './settings-types'
