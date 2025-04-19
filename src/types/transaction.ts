
import { DateRange } from "react-day-picker"

export type TransactionType = 'payment' | 'commission' | 'refund' | 'bonus' | 'adjustment';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  reference?: string;
  receipt?: File | null;
  relatedOrderId?: string;
}

export interface WalletTransaction extends Transaction {
  providerId?: string;
  companyId?: string;
}

export interface CorporateTransaction extends Transaction {
  corporateId: string;
}

export type FilterableTransactionType = 'all' | TransactionType;

export interface TransactionFilterState {
  dateRange: DateRange;
  transactionType: FilterableTransactionType;
}
