
import { DateRange } from "react-day-picker"

export interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: Date
  receipt?: File | null
}

export type TransactionType = 'all' | 'credit' | 'debit'

export interface TransactionFilterState {
  dateRange: DateRange
  transactionType: TransactionType
}
