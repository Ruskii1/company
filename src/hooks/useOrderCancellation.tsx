
import { useState } from 'react'
import { toast } from 'sonner'
import { parseISO, differenceInMinutes } from 'date-fns'
import { Request } from '@/types/request'

export const useOrderCancellation = (
  order: Request | null, 
  updateOrderStatus: (status: string) => Promise<boolean>
) => {
  const [isCancelling, setIsCancelling] = useState(false)
  
  // Determine if the order can be cancelled by the customer
  const canCancelOrder = () => {
    if (!order) return false
    
    // Can only cancel if status is "Scheduled"
    if (order.status !== 'Scheduled') {
      return false
    }

    try {
      // Check if pickupTime is at least 30 minutes in the future
      const pickupTime = parseISO(order.pickupTime)
      const now = new Date()
      const minutesUntilPickup = differenceInMinutes(pickupTime, now)
      return minutesUntilPickup >= 30
    } catch (error) {
      console.error("Error calculating time difference:", error)
      return false
    }
  }

  const handleCancelOrder = async () => {
    if (!canCancelOrder()) {
      toast.error("You cannot cancel this order. Orders can only be cancelled if they are scheduled and at least 30 minutes before pickup time.")
      return
    }

    try {
      setIsCancelling(true)
      await updateOrderStatus('Cancelled')
      toast.success("Your order has been successfully cancelled")
    } catch (error) {
      toast.error("Failed to cancel the order. Please try again or contact support.")
    } finally {
      setIsCancelling(false)
    }
  }

  return {
    canCancelOrder: canCancelOrder(),
    handleCancelOrder,
    isCancelling
  }
}
