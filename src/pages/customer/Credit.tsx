
import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Transaction, TransactionFilterState } from '@/types/transaction'
import { TransactionItem } from '@/components/customer/credit/TransactionItem'
import { TransactionFilters } from '@/components/customer/credit/TransactionFilters'
import { useTransactions } from '@/hooks/useTransactions'
import { filterTransactions } from '@/utils/transactionUtils'

const Credit = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [currentBalance] = useState(250)
  
  // Initial transactions data
  const initialTransactions: Transaction[] = [
    {
      id: 'TRX-10001',
      type: 'credit',
      amount: 100,
      description: 'Added credit',
      date: new Date(2023, 8, 10)
    },
    {
      id: 'TRX-10002',
      type: 'debit',
      amount: 50,
      description: 'Payment for order #ORD-9002',
      date: new Date(2023, 8, 12)
    },
    {
      id: 'TRX-10003',
      type: 'credit',
      amount: 200,
      description: 'Added credit',
      date: new Date(2023, 8, 15)
    }
  ]
  
  // Transaction management
  const { transactions, handleUploadReceipt, handleDownloadReceipt } = useTransactions(initialTransactions)
  
  // Filtering state
  const [filters, setFilters] = useState<TransactionFilterState>({
    dateRange: {
      from: addDays(new Date(), -30),
      to: new Date(),
    },
    transactionType: 'all'
  })
  
  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<TransactionFilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }
  
  // Get filtered transactions
  const filteredTransactions = filterTransactions(
    transactions, 
    filters.dateRange, 
    filters.transactionType
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Credit</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">
            ${currentBalance.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Transaction History</span>
            <TransactionFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No transactions found for the selected filters
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <TransactionItem 
                  key={transaction.id}
                  transaction={transaction}
                  onUploadReceipt={handleUploadReceipt}
                  onDownloadReceipt={handleDownloadReceipt}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Credit
