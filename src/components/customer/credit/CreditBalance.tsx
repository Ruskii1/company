
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import { formatCurrency } from '@/utils/formatters'

interface CreditBalanceProps {
  currentBalance: number
}

export const CreditBalance = ({ currentBalance }: CreditBalanceProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Current Balance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary">
          {formatCurrency(currentBalance)}
        </div>
      </CardContent>
    </Card>
  )
}
