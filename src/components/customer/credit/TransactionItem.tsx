
import { format } from 'date-fns'
import { Transaction } from '@/types/transaction'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, DollarSign, Download } from 'lucide-react'

interface TransactionItemProps {
  transaction: Transaction
  onDownloadTransaction: (transaction: Transaction) => void
}

export const TransactionItem = ({ 
  transaction, 
  onDownloadTransaction 
}: TransactionItemProps) => {
  return (
    <div 
      className="flex items-center justify-between border-b pb-4 last:border-0"
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-full p-2 ${
          transaction.type === 'credit' 
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        }`}>
          {transaction.type === 'credit' 
            ? <DollarSign className="h-4 w-4" /> 
            : <Clock className="h-4 w-4" />}
        </div>
        <div>
          <div className="font-medium">
            {transaction.description}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(transaction.date, 'PPP')}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className={`font-semibold ${
          transaction.type === 'credit' 
            ? 'text-green-600 dark:text-green-400' 
            : 'text-red-600 dark:text-red-400'
        }`}>
          {transaction.type === 'credit' ? '+' : '-'} 
          ${transaction.amount.toFixed(2)}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex gap-1"
          onClick={() => onDownloadTransaction(transaction)}
        >
          <Download className="h-3 w-3" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
