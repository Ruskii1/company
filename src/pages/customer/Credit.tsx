
import { useState } from 'react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CreditCard, DollarSign, Calendar, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  date: Date
}

const Credit = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [amount, setAmount] = useState('')
  const [currentBalance, setCurrentBalance] = useState(250)
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

  const handleAddCredit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      })
      return
    }
    
    const amountValue = parseFloat(amount)
    
    const newTransaction: Transaction = {
      id: `TRX-${10000 + transactions.length + 1}`,
      type: 'credit',
      amount: amountValue,
      description: 'Added credit',
      date: new Date()
    }
    
    setTransactions([newTransaction, ...transactions])
    setCurrentBalance(currentBalance + amountValue)
    setAmount('')
    
    toast({
      title: "Success",
      description: `$${amountValue.toFixed(2)} has been added to your account`,
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Credit</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
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
            <CardTitle>Add Credit</CardTitle>
            <CardDescription>
              Add funds to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCredit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="amount" 
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="0.00" 
                    className="pl-9"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">Add Credit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
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
                      {transaction.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'credit' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'credit' ? '+' : '-'} 
                  ${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Credit
