
import { useState } from 'react'
import { Transaction } from '@/types/transaction'
import { useToast } from '@/hooks/use-toast'

export const useTransactions = (initialTransactions: Transaction[]) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const { toast } = useToast()
  
  // Upload receipt function
  const handleUploadReceipt = (transactionId: string, file: File | null) => {
    if (!file && file !== null) return
    
    // If file is null, we're removing the receipt
    if (file === null) {
      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === transactionId 
            ? { ...transaction, receipt: null } 
            : transaction
        )
      )
      
      toast({
        title: "Receipt removed",
        description: `Receipt for transaction ${transactionId} removed successfully`,
      })
      
      return
    }
    
    // Update transaction with receipt
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === transactionId 
          ? { ...transaction, receipt: file } 
          : transaction
      )
    )
    
    toast({
      title: "Receipt uploaded",
      description: `Receipt for transaction ${transactionId} uploaded successfully`,
    })
  }
  
  // Download receipt function
  const handleDownloadReceipt = (transaction: Transaction) => {
    if (!transaction.receipt) return
    
    const url = URL.createObjectURL(transaction.receipt)
    const a = document.createElement('a')
    a.href = url
    a.download = `receipt-${transaction.id}.${transaction.receipt.type.includes('pdf') ? 'pdf' : 'jpg'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  
  return {
    transactions,
    handleUploadReceipt,
    handleDownloadReceipt
  }
}
