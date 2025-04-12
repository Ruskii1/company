
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { ArrowUp, X } from 'lucide-react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Order } from '@/types/order'
import { useState } from 'react'
import { canCancelOrder } from '@/utils/orderCancellationRules'
import { toast } from 'sonner'

interface OrderActionButtonsProps {
  order: Order | null
  isAdmin: boolean
  isEmployee: boolean
  cancelOrder: () => void
  escalateStatus: () => void
}

export const OrderActionButtons = ({
  order,
  isAdmin,
  isEmployee,
  cancelOrder,
  escalateStatus
}: OrderActionButtonsProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [isAttemptingCancel, setIsAttemptingCancel] = useState(false)
  
  if (!order) return null

  // Determine if the cancel button should be shown based on rules
  const showCancelButton = () => {
    if (!order) return false
    
    // Check if the order can be cancelled based on rules
    const cancellationCheck = canCancelOrder(
      order.status as any, // TODO: Fix type casting when order types are updated
      order.pickupTime,
      isEmployee,
      isAdmin
    )
    
    return cancellationCheck.allowed
  }

  // Determine if the escalate button should be shown
  const showEscalateButton = () => {
    return order.status !== 'Complete' && order.status !== 'Cancelled'
  }
  
  // Handle cancel button click
  const handleCancelClick = () => {
    if (!order) return
    
    // Double-check cancellation rules
    const cancellationCheck = canCancelOrder(
      order.status as any, // TODO: Fix type casting when order types are updated
      order.pickupTime,
      isEmployee,
      isAdmin
    )
    
    if (cancellationCheck.allowed) {
      cancelOrder()
    } else {
      toast.error(`Cannot cancel order: ${cancellationCheck.reason}`)
    }
  }

  // Add debugging to see what's happening
  console.log({
    orderStatus: order.status,
    isAdmin,
    isEmployee,
    showCancel: showCancelButton(),
    showEscalate: showEscalateButton()
  })

  return (
    <CardFooter className="w-full bg-white dark:bg-gray-800 border-t p-4 shadow-lg flex justify-end gap-4 z-50">
      {showCancelButton() && (
        <Button 
          variant="destructive" 
          onClick={handleCancelClick}
          className="gap-2"
        >
          <X size={16} />
          Cancel Order
        </Button>
      )}
      
      {showEscalateButton() && (
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
