
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { enUS, arDZ } from "date-fns/locale";

// Import language files
import { core as enCore } from './en/core';
import { common as enCommon } from './en/common';
import { services as enServices } from './en/services';
import { order as enOrder } from './en/order';
import { customer as enCustomer } from './en/customer';
import { finance as enFinance } from './en/finance';
import { payment as enPayment } from './en/payment';

import { core as arCore } from './ar/core';
import { common as arCommon } from './ar/common';
import { services as arServices } from './ar/services';
import { order as arOrder } from './ar/order';
import { customer as arCustomer } from './ar/customer';
import { finance as arFinance } from './ar/finance';

import { locales, rtlLanguages } from './constants';
import { useLanguageStore } from './store';
import { Language, TranslationCore } from './types';

// Export constants and types
export { locales, rtlLanguages };
export { useLanguageStore };
export type { Language };

// Merge all translations
export const translations = {
  en: {
    ...enCore,
    ...enCommon,
    ...enServices,
    ...enOrder,
    ...enFinance,
    ...enPayment,
    customer: enCustomer,
    finance: enFinance,
    order: enOrder,
    payment: enPayment,
    dashboard: enCore.dashboard,
    services: enServices.services
  },
  ar: {
    ...arCore,
    ...arCommon,
    ...arServices,
    ...arOrder,
    ...arFinance,
    customer: arCustomer,
    finance: arFinance,
    order: arOrder,
    dashboard: arCore.dashboard,
    services: arServices.services
  }
};

// Re-export for backward compatibility
export * from './en/core';
export * from './en/common';
export * from './en/services';
export * from './en/order';

