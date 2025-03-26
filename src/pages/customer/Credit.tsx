
import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react'
import { addDays } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { Transaction, TransactionFilterState } from '@/types/transaction'
import { TransactionItem } from '@/components/customer/credit/TransactionItem'
import { TransactionFilters } from '@/components/customer/credit/TransactionFilters'
import { useTransactions } from '@/hooks/useTransactions'
import { filterTransactions } from '@/utils/transactionUtils'
import { Button } from '@/components/ui/button'

const Credit = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [currentBalance] = useState(845.75)
  const [showFilters, setShowFilters] = useState(false)
  
  // Enhanced transactions data with a variety of entries
  const initialTransactions: Transaction[] = [
    {
      id: 'TRX-10001',
      type: 'credit',
      amount: 100,
      description: 'Added credit via bank transfer',
      date: new Date(2023, 8, 10)
    },
    {
      id: 'TRX-10002',
      type: 'debit',
      amount: 50,
      description: 'Payment for towing service #ORD-9002',
      date: new Date(2023, 8, 12)
    },
    {
      id: 'TRX-10003',
      type: 'credit',
      amount: 200,
      description: 'Refund for cancelled service #ORD-8954',
      date: new Date(2023, 8, 15)
    },
    {
      id: 'TRX-10004',
      type: 'debit',
      amount: 75.25,
      description: 'Tire change service #ORD-9125',
      date: new Date(2023, 8, 18)
    },
    {
      id: 'TRX-10005',
      type: 'credit',
      amount: 500,
      description: 'Credit card deposit',
      date: new Date(2023, 8, 22)
    },
    {
      id: 'TRX-10006',
      type: 'debit',
      amount: 35,
      description: 'Fuel delivery service #ORD-9241',
      date: new Date(2023, 8, 25)
    },
    {
      id: 'TRX-10007',
      type: 'credit',
      amount: 150,
      description: 'Loyalty program bonus',
      date: new Date(2023, 8, 28)
    },
    {
      id: 'TRX-10008',
      type: 'debit',
      amount: 120,
      description: 'Premium roadside assistance #ORD-9356',
      date: new Date(2023, 9, 3)
    },
    {
      id: 'TRX-10009',
      type: 'credit',
      amount: 75,
      description: 'Promotional credit',
      date: new Date(2023, 9, 8)
    },
    {
      id: 'TRX-10010',
      type: 'debit',
      amount: 45,
      description: 'Battery jump start service #ORD-9412',
      date: new Date(2023, 9, 10)
    },
    {
      id: 'TRX-10011',
      type: 'credit',
      amount: 150,
      description: 'Referral program bonus',
      date: new Date(2023, 9, 15)
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
  const filteredTransactions = showFilters 
    ? filterTransactions(transactions, filters.dateRange, filters.transactionType)
    : transactions

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(prev => !prev)
  }

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
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className="flex items-center gap-1"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
              {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showFilters && (
            <div className="mb-4">
              <TransactionFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          )}
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
