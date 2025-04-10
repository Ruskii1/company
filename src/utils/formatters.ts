
import { useLanguageStore } from "@/lib/i18n";

export const formatCurrency = (amount: number): string => {
  // Use the current language from global state when possible
  // For now, we'll use 'en-SA' for English and 'ar-SA' for Arabic
  const language = useLanguageStore.getState().language;
  
  return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2
  }).format(amount);
};
