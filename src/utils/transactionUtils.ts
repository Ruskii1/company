
import { Transaction } from '@/types/transaction'
import { DateRange } from 'react-day-picker'

export const filterTransactions = (
  transactions: Transaction[], 
  dateRange: DateRange,
  transactionType: 'all' | 'credit' | 'debit'
): Transaction[] => {
  return transactions.filter(transaction => {
    const dateMatches = (!dateRange.from || transaction.date >= dateRange.from) && 
                        (!dateRange.to || transaction.date <= dateRange.to)
    const typeMatches = transactionType === 'all' || transaction.type === transactionType
    
    return dateMatches && typeMatches
  })
}
