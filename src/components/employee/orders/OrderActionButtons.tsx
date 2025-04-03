
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { ArrowUp, X } from 'lucide-react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Order } from '@/types/order'

interface OrderActionButtonsProps {
  order: Order | null
  isAdmin: boolean
  cancelOrder: () => void
  escalateStatus: () => void
}

export const OrderActionButtons = ({
  order,
  isAdmin,
  cancelOrder,
  escalateStatus
}: OrderActionButtonsProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  if (!order) return null

  // Determine if the cancel button should be shown based on role and order status
  const showCancelButton = () => {
    if (!order) return false
    
    // Order is completed or cancelled - no one can cancel
    if (order.status === 'Completed' || order.status === 'Cancelled') {
      return false
    }
    
    if (isAdmin) {
      // Admins can cancel unless completed
      return order.status !== 'Completed'
    } else {
      // Regular employees can only cancel if order is still in Scheduled status
      return order.status === 'Scheduled'
    }
  }

  return (
    <CardFooter className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 shadow-lg flex justify-end gap-4 z-10">
      {showCancelButton() && (
        <Button 
          variant="destructive" 
          onClick={cancelOrder}
          className="gap-2"
        >
          <X size={16} />
          Cancel Order
        </Button>
      )}
      
      {order.status !== 'Completed' && order.status !== 'Cancelled' && (
        <Button 
          variant="default"
          onClick={escalateStatus}
          className="gap-2"
        >
          <ArrowUp size={16} />
          {t.escalateStatus}
        </Button>
      )}
    </CardFooter>
  )
}
