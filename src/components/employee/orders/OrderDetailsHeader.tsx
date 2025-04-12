
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguageStore, translations } from '@/lib/i18n'
import { ArrowLeft, Clock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StatusBadge } from '@/components/employee/orders/StatusBadge'
import { Order } from '@/types/order'
import { formatDistanceToNow } from 'date-fns'

interface OrderDetailsHeaderProps {
  order: Order
}

export const OrderDetailsHeader = ({ order }: OrderDetailsHeaderProps) => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Format the creation time
  const createdTimeAgo = order.createdAt 
    ? formatDistanceToNow(new Date(order.createdAt), { addSuffix: true }) 
    : '';

  return (
    <CardHeader className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="flex flex-col space-y-1 sm:space-y-0">
        <Button 
          variant="outline" 
          className="w-fit" 
          onClick={() => navigate('/employee')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.orderManagement}
        </Button>
        
        <div className="mt-3">
          <CardTitle className="text-2xl flex items-center gap-2">
            {t.taskId}: {order.taskId}
          </CardTitle>
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" /> 
            {createdTimeAgo}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center gap-2">
          {t.status}: <StatusBadge status={order.status} />
        </div>
        
        <div className="text-sm text-muted-foreground">
          {t.serviceType}: {order.serviceType}
        </div>
      </div>
    </CardHeader>
  )
}
