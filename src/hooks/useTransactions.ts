
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  WalletTransaction, 
  TransactionFilterState, 
  FilterableTransactionType,
  TransactionType,
  mapDbTypeToUiType,
  isPositiveTransaction 
} from '@/types/transaction';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf';

// Define a type for wallet ledger entries
interface WalletLedgerEntry {
  id: string;
  provider_id?: string;
  company_id?: string;
  amount: number;
  transaction_type: string;
  ref_text?: string;
  related_order_id?: string;
  created_at: string;
}

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
        // Convert UI transaction type to database transaction types
        if (filters.transactionType === 'credit') {
          // Credit = any positive amount transaction
          query = query.gt('amount', 0);
        } else if (filters.transactionType === 'debit') {
          // Debit = any negative amount transaction
          query = query.lt('amount', 0);
        } else {
          // Direct type mapping
          query = query.eq('transaction_type', filters.transactionType);
        }
      }

      // Execute the query and order by date
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }

      // Transform data to match our Transaction interface
      const mappedTransactions: WalletTransaction[] = (data as WalletLedgerEntry[]).map(item => {
        // Determine the transaction type based on database info
        let transactionType: TransactionType;
        
        if (item.transaction_type) {
          transactionType = mapDbTypeToUiType(item.transaction_type);
        } else {
          // Fallback based on amount
          transactionType = item.amount > 0 ? 'credit' : 'debit';
        }

        return {
          id: item.id,
          type: transactionType,
          amount: Math.abs(item.amount), // Store as positive number
          description: item.ref_text || '',
          date: new Date(item.created_at),
          reference: item.ref_text,
          relatedOrderId: item.related_order_id,
          providerId: item.provider_id,
          companyId: item.company_id
        };
      });

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

  // Helper functions for transactions
  const handleDownloadTransaction = (transaction: WalletTransaction) => {
    try {
      const doc = new jsPDF();
      
      // Add logo
      // doc.addImage("/logo.png", "PNG", 10, 10, 40, 40);
      
      // Add title
      doc.setFontSize(20);
      doc.text("Transaction Receipt", 105, 20, { align: "center" });
      
      // Add transaction details
      doc.setFontSize(12);
      doc.text(`Transaction ID: ${transaction.id}`, 20, 40);
      doc.text(`Date: ${format(transaction.date, 'PPP')}`, 20, 50);
      doc.text(`Type: ${transaction.type}`, 20, 60);
      doc.text(`Amount: $${transaction.amount.toFixed(2)}`, 20, 70);
      doc.text(`Description: ${transaction.description}`, 20, 80);
      
      if (transaction.reference) {
        doc.text(`Reference: ${transaction.reference}`, 20, 90);
      }
      
      // Save the PDF
      doc.save(`transaction-${transaction.id}.pdf`);
      
      toast({
        title: "Receipt Downloaded",
        description: "Transaction receipt has been downloaded successfully",
      });
    } catch (err: any) {
      console.error('Error downloading transaction:', err);
      toast({
        title: "Download Failed",
        description: `Failed to download receipt: ${err.message}`,
        variant: "destructive"
      });
    }
  };

  const handleDownloadAllTransactions = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text("Transactions Report", 105, 20, { align: "center" });
      
      // Add date range if available
      if (filters.dateRange.from && filters.dateRange.to) {
        doc.setFontSize(12);
        doc.text(
          `Period: ${format(filters.dateRange.from, 'PPP')} - ${format(filters.dateRange.to, 'PPP')}`, 
          105, 30, 
          { align: "center" }
        );
      }
      
      // Add transactions table
      doc.setFontSize(10);
      let y = 50;
      
      // Table headers
      doc.text("Date", 20, y);
      doc.text("Type", 60, y);
      doc.text("Description", 90, y);
      doc.text("Amount", 170, y, { align: "right" });
      y += 10;
      
      // Divider
      doc.line(20, y - 5, 190, y - 5);
      
      // Table rows
      transactions.forEach(tx => {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        
        doc.text(format(tx.date, 'PP'), 20, y);
        doc.text(tx.type, 60, y);
        
        // Truncate long descriptions
        const desc = tx.description.length > 40 ? 
          tx.description.substring(0, 37) + '...' : 
          tx.description;
        doc.text(desc, 90, y);
        
        // Right align amount
        const amount = isPositiveTransaction(tx.type) ? 
          `+$${tx.amount.toFixed(2)}` : 
          `-$${tx.amount.toFixed(2)}`;
        doc.text(amount, 190, y, { align: "right" });
        
        y += 7;
      });
      
      // Save the PDF
      doc.save(`transactions-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      
      toast({
        title: "Report Downloaded",
        description: "Transactions report has been downloaded successfully",
      });
    } catch (err: any) {
      console.error('Error downloading transactions report:', err);
      toast({
        title: "Download Failed",
        description: `Failed to download report: ${err.message}`,
        variant: "destructive"
      });
    }
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
    refreshTransactions: fetchTransactions,
    handleDownloadTransaction,
    handleDownloadAllTransactions
  };
};
