
import { DateRange } from "react-day-picker"

// Unified transaction types
export type TransactionType = 
  | 'payment'    // payment to provider
  | 'commission' // commission taken from provider
  | 'refund'     // refund for cancelled service
  | 'bonus'      // bonus payment to provider
  | 'adjustment' // manual adjustment
  | 'credit'     // money into wallet (customer-facing)
  | 'debit';     // money out of wallet (customer-facing)

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

// Utility functions to map between transaction types
export const mapDbTypeToUiType = (dbType: string): TransactionType => {
  const mapping: Record<string, TransactionType> = {
    'payment': 'payment',
    'commission': 'commission',
    'refund': 'refund',
    'bonus': 'bonus',
    'adjustment': 'adjustment'
  };
  
  return mapping[dbType] || 
    (Number(dbType) > 0 ? 'credit' : 'debit');
};

export const isPositiveTransaction = (type: TransactionType): boolean => {
  return ['payment', 'bonus', 'refund', 'credit'].includes(type);
};
