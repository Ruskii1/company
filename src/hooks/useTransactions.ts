
import { useState } from 'react'
import { Transaction } from '@/types/transaction'
import { useToast } from '@/hooks/use-toast'
import jsPDF from 'jspdf'
import { format } from 'date-fns'

export const useTransactions = (initialTransactions: Transaction[]) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const { toast } = useToast()
  
  // Create a formatted PDF for a transaction
  const createTransactionPDF = (transaction: Transaction): jsPDF => {
    const pdf = new jsPDF()
    
    // Add company header
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text('RoadHelp Inc.', 105, 20, { align: 'center' })
    
    // Add transaction details
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Transaction Receipt', 105, 40, { align: 'center' })
    
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    
    // Transaction details
    const details = [
      `Transaction ID: ${transaction.id}`,
      `Date: ${format(transaction.date, 'PPP')}`,
      `Type: ${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}`,
      `Description: ${transaction.description}`,
      `Amount: ${transaction.type === 'credit' ? '+' : '-'} $${transaction.amount.toFixed(2)}`,
    ]
    
    details.forEach((detail, index) => {
      pdf.text(detail, 20, 60 + (index * 10))
    })
    
    // Add footer
    pdf.setFontSize(10)
    pdf.text('Thank you for using RoadHelp services!', 105, 130, { align: 'center' })
    pdf.text(`Generated on ${format(new Date(), 'PPP')}`, 105, 140, { align: 'center' })
    
    return pdf
  }
  
  // Download transaction as PDF
  const handleDownloadTransaction = (transaction: Transaction) => {
    try {
      const pdf = createTransactionPDF(transaction)
      pdf.save(`transaction-${transaction.id}.pdf`)
      
      toast({
        title: "Transaction downloaded",
        description: `Transaction ${transaction.id} has been downloaded as PDF`,
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download failed",
        description: "There was an error generating the PDF",
        variant: "destructive"
      })
    }
  }
  
  // Export all transactions as a single PDF
  const handleDownloadAllTransactions = () => {
    if (transactions.length === 0) {
      toast({
        title: "No transactions to download",
        description: "There are no transactions to download",
        variant: "destructive"
      })
      return
    }
    
    try {
      const pdf = new jsPDF()
      
      // Add company header
      pdf.setFontSize(20)
      pdf.setFont('helvetica', 'bold')
      pdf.text('RoadHelp Inc.', 105, 20, { align: 'center' })
      
      // Add transactions summary title
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Transactions Summary', 105, 35, { align: 'center' })
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Generated on: ${format(new Date(), 'PPP')}`, 105, 45, { align: 'center' })
      
      // Create a table for transactions
      pdf.setFontSize(9)
      
      // Table headers
      let yPos = 60
      const headers = ['Transaction ID', 'Date', 'Type', 'Description', 'Amount']
      const colWidths = [30, 30, 20, 70, 30]
      let xPos = 15
      
      // Draw header
      pdf.setFont('helvetica', 'bold')
      headers.forEach((header, i) => {
        pdf.text(header, xPos, yPos)
        xPos += colWidths[i]
      })
      
      // Draw horizontal line
      pdf.line(15, yPos + 2, 195, yPos + 2)
      yPos += 10
      
      // Draw data rows
      pdf.setFont('helvetica', 'normal')
      transactions.forEach((transaction, index) => {
        // Check if we need a new page
        if (yPos > 270) {
          pdf.addPage()
          yPos = 20
          
          // Redraw header on new page
          xPos = 15
          pdf.setFont('helvetica', 'bold')
          headers.forEach((header, i) => {
            pdf.text(header, xPos, yPos)
            xPos += colWidths[i]
          })
          
          // Draw horizontal line
          pdf.line(15, yPos + 2, 195, yPos + 2)
          yPos += 10
          pdf.setFont('helvetica', 'normal')
        }
        
        xPos = 15
        
        // Draw cells
        pdf.text(transaction.id, xPos, yPos)
        xPos += colWidths[0]
        
        pdf.text(format(transaction.date, 'PP'), xPos, yPos)
        xPos += colWidths[1]
        
        const typeText = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)
        pdf.text(typeText, xPos, yPos)
        xPos += colWidths[2]
        
        // Truncate description if too long
        const description = transaction.description.length > 40 
          ? transaction.description.substring(0, 37) + '...' 
          : transaction.description
        pdf.text(description, xPos, yPos)
        xPos += colWidths[3]
        
        const amountText = `${transaction.type === 'credit' ? '+' : '-'} $${transaction.amount.toFixed(2)}`
        pdf.text(amountText, xPos, yPos)
        
        // Draw light line between rows
        if (index < transactions.length - 1) {
          pdf.setDrawColor(200, 200, 200)
          pdf.line(15, yPos + 2, 195, yPos + 2)
          pdf.setDrawColor(0, 0, 0)
        }
        
        yPos += 8
      })
      
      // Save the PDF
      pdf.save(`all-transactions-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
      
      toast({
        title: "All transactions downloaded",
        description: `${transactions.length} transactions have been downloaded as PDF`,
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Download failed",
        description: "There was an error generating the PDF",
        variant: "destructive"
      })
    }
  }
  
  return {
    transactions,
    handleDownloadTransaction,
    handleDownloadAllTransactions
  }
}
