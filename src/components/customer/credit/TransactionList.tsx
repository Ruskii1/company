
import { Transaction } from '@/types/transaction'
import { TransactionItem } from '@/components/customer/credit/TransactionItem'

interface TransactionListProps {
  transactions: Transaction[]
  onDownloadTransaction: (transaction: Transaction) => void
}

export const TransactionList = ({ 
  transactions, 
  onDownloadTransaction 
}: TransactionListProps) => {
  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          No transactions found for the selected filters
        </div>
      ) : (
        transactions.map((transaction) => (
          <TransactionItem 
            key={transaction.id}
            transaction={transaction}
            onDownloadTransaction={onDownloadTransaction}
          />
        ))
      )}
    </div>
  )
}
