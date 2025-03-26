
import { useState, useRef } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, DollarSign, Calendar, Clock, FileUp, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format } from 'date-fns'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { addDays } from 'date-fns'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: Date
  receipt?: File | null
}

const Credit = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [currentBalance] = useState(250)
  const [transactions, setTransactions] = useState<Transaction[]>([
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
  ])
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Filtering state
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [transactionType, setTransactionType] = useState<'all' | 'credit' | 'debit'>('all')
  
  // Upload receipt function
  const handleUploadReceipt = (transactionId: string, file: File | null) => {
    if (!file) return
    
    // Validate file is PDF or image
    if (!file.type.match('application/pdf|image/jpeg|image/png|image/jpg')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or image file",
        variant: "destructive"
      })
      return
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size should not exceed 5MB",
        variant: "destructive"
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
  
  // Filter transactions based on date range and type
  const filteredTransactions = transactions.filter(transaction => {
    const dateMatches = (!dateRange.from || transaction.date >= dateRange.from) && 
                        (!dateRange.to || transaction.date <= dateRange.to)
    const typeMatches = transactionType === 'all' || transaction.type === transactionType
    
    return dateMatches && typeMatches
  })

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
            <div className="flex gap-2 items-center">
              <Select value={transactionType} onValueChange={(value: 'all' | 'credit' | 'debit') => setTransactionType(value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="credit">Credits Only</SelectItem>
                  <SelectItem value="debit">Debits Only</SelectItem>
                </SelectContent>
              </Select>
              
              <DateRangePicker
                date={dateRange}
                onDateChange={setDateRange}
              />
            </div>
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
                <div 
                  key={transaction.id}
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
                      {transaction.receipt && (
                        <div className="mt-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs flex items-center gap-1"
                            onClick={() => handleDownloadReceipt(transaction)}
                          >
                            <Download className="h-3 w-3" />
                            Receipt
                          </Button>
                        </div>
                      )}
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-xs flex gap-1">
                          <FileUp className="h-3 w-3" />
                          {transaction.receipt ? 'Update Receipt' : 'Upload Receipt'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Upload Transaction Receipt</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="border-2 border-dashed rounded-lg p-6 text-center">
                            <FileUp className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">Drop file here or click to upload</p>
                            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, JPEG, PNG (max 5MB)</p>
                            <Input 
                              ref={fileInputRef}
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null
                                handleUploadReceipt(transaction.id, file)
                              }}
                            />
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              Select File
                            </Button>
                          </div>
                          {transaction.receipt && (
                            <div className="bg-muted p-2 rounded flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <FileUp className="h-4 w-4" />
                                <span className="text-sm truncate max-w-[200px]">
                                  {transaction.receipt.name}
                                </span>
                              </div>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                  setTransactions(prev => 
                                    prev.map(t => 
                                      t.id === transaction.id 
                                        ? { ...t, receipt: null } 
                                        : t
                                    )
                                  )
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Credit
