
import { Transaction, FilterableTransactionType, isPositiveTransaction } from '@/types/transaction'
import { DateRange } from 'react-day-picker'

export const filterTransactions = (
  transactions: Transaction[], 
  dateRange: DateRange,
  transactionType: FilterableTransactionType
): Transaction[] => {
  return transactions.filter(transaction => {
    // Date filtering
    const dateMatches = (!dateRange.from || transaction.date >= dateRange.from) && 
                        (!dateRange.to || transaction.date <= dateRange.to);
    
    // Type filtering
    let typeMatches = true;
    
    if (transactionType !== 'all') {
      if (transactionType === 'credit') {
        typeMatches = isPositiveTransaction(transaction.type);
      } else if (transactionType === 'debit') {
        typeMatches = !isPositiveTransaction(transaction.type);
      } else {
        typeMatches = transaction.type === transactionType;
      }
    }
    
    return dateMatches && typeMatches;
  });
}
