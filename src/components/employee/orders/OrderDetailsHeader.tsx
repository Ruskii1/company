
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguageStore, translations } from '@/lib/i18n'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBadge } from '@/components/employee/orders/StatusBadge'
import { Order } from '@/types/order'

interface OrderDetailsHeaderProps {
  order: Order
}

export const OrderDetailsHeader = ({ order }: OrderDetailsHeaderProps) => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <CardHeader className="flex flex-row items-center gap-4">
      <Button variant="outline" onClick={() => navigate('/employee')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> {t.orderManagement}
      </Button>
      <div>
        <CardTitle className="text-2xl">{t.taskId}: {order.taskId}</CardTitle>
        <div className="text-sm text-muted-foreground mt-1">
          {t.status}: <StatusBadge status={order.status} />
        </div>
      </div>
    </CardHeader>
  )
}
