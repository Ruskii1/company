
import { useState } from 'react'
import { Transaction } from '@/types/transaction'
import { useToast } from '@/hooks/use-toast'

export const useTransactions = (initialTransactions: Transaction[]) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const { toast } = useToast()
  
  // Download transaction function
  const handleDownloadTransaction = (transaction: Transaction) => {
    // Create a blob with transaction data
    const data = {
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date.toISOString(),
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    // Create a temporary link and trigger download
    const a = document.createElement('a')
    a.href = url
    a.download = `transaction-${transaction.id}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    // Clean up the URL object
    URL.revokeObjectURL(url)
    
    toast({
      title: "Transaction downloaded",
      description: `Transaction ${transaction.id} has been downloaded successfully`,
    })
  }
  
  // Export all transactions
  const handleDownloadAllTransactions = () => {
    if (transactions.length === 0) {
      toast({
        title: "No transactions to download",
        description: "There are no transactions to download",
        variant: "destructive"
      })
      return
    }
    
    // Create a blob with all transactions data
    const data = transactions.map(transaction => ({
      id: transaction.id,
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date.toISOString(),
    }))
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    // Create a temporary link and trigger download
    const a = document.createElement('a')
    a.href = url
    a.download = `all-transactions-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    
    // Clean up the URL object
    URL.revokeObjectURL(url)
    
    toast({
      title: "All transactions downloaded",
      description: `${transactions.length} transactions have been downloaded successfully`,
    })
  }
  
  return {
    transactions,
    handleDownloadTransaction,
    handleDownloadAllTransactions
  }
}
