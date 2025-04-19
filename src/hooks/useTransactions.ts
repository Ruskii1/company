
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { WalletTransaction, TransactionFilterState, FilterableTransactionType } from '@/types/transaction';
import { toast } from '@/hooks/use-toast';

export const useTransactions = (entityId?: string, entityType: 'provider' | 'company' = 'provider') => {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilterState>({
    dateRange: {
      from: undefined,
      to: undefined
    },
    transactionType: 'all'
  });

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      if (!entityId) {
        setTransactions([]);
        return;
      }

      let query = supabase
        .from('provider_wallet_ledger')
        .select('*');

      // Apply entity filter based on type
      if (entityType === 'provider') {
        query = query.eq('provider_id', entityId);
      } else {
        query = query.eq('company_id', entityId);
      }

      // Apply date range filter if set
      if (filters.dateRange.from) {
        const fromDate = new Date(filters.dateRange.from);
        query = query.gte('created_at', fromDate.toISOString());
      }
      
      if (filters.dateRange.to) {
        const toDate = new Date(filters.dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        query = query.lte('created_at', toDate.toISOString());
      }

      // Apply transaction type filter if not 'all'
      if (filters.transactionType !== 'all') {
        query = query.eq('transaction_type', filters.transactionType);
      }

      // Execute the query and order by date
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      // Transform data to match our Transaction interface
      const mappedTransactions: WalletTransaction[] = data.map(item => ({
        id: item.id,
        type: item.transaction_type,
        amount: item.amount,
        description: item.ref_text || '',
        date: new Date(item.created_at),
        reference: item.ref_text,
        relatedOrderId: item.related_order_id,
        providerId: item.provider_id,
        companyId: item.company_id
      }));

      setTransactions(mappedTransactions);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching transactions:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: `Failed to load transactions: ${err.message}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<TransactionFilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  useEffect(() => {
    fetchTransactions();
  }, [entityId, entityType, filters]);

  return {
    transactions,
    loading,
    error,
    filters,
    updateFilters,
    refreshTransactions: fetchTransactions
  };
};
