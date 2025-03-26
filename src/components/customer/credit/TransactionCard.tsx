
import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Transaction, TransactionFilterState } from '@/types/transaction'
import { TransactionHeader } from './TransactionHeader'
import { TransactionFilters } from './TransactionFilters'
import { TransactionList } from './TransactionList'
import { filterTransactions } from '@/utils/transactionUtils'

interface TransactionCardProps {
  transactions: Transaction[]
  filters: TransactionFilterState
  onFilterChange: (filters: Partial<TransactionFilterState>) => void
  handleDownloadTransaction: (transaction: Transaction) => void
  handleDownloadAllTransactions: () => void
}

export const TransactionCard = ({
  transactions,
  filters,
  onFilterChange,
  handleDownloadTransaction,
  handleDownloadAllTransactions
}: TransactionCardProps) => {
  const [showFilters, setShowFilters] = useState(false)

  // Toggle filters visibility
  const toggleFilters = () => {
    setShowFilters(prev => !prev)
  }

  // Get filtered transactions
  const filteredTransactions = showFilters 
    ? filterTransactions(transactions, filters.dateRange, filters.transactionType)
    : transactions

  return (
    <Card>
      <CardHeader>
        <TransactionHeader 
          showFilters={showFilters}
          toggleFilters={toggleFilters}
          handleDownloadAllTransactions={handleDownloadAllTransactions}
        />
      </CardHeader>
      <CardContent>
        {showFilters && (
          <div className="mb-4">
            <TransactionFilters 
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </div>
        )}
        <TransactionList 
          transactions={filteredTransactions}
          onDownloadTransaction={handleDownloadTransaction}
        />
      </CardContent>
    </Card>
  )
}
