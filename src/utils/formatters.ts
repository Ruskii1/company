export const formatCurrency = (amount: number): string => {
  // Use the current language from global state when possible
  // For now, we'll keep SAR as the currency since we're using 'en-SA'
  return new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 2
  }).format(amount);
};
