
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { ArrowUp, X, AlertCircle } from 'lucide-react'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Order } from '@/types/order'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface OrderActionButtonsProps {
  order: Order | null
  userRole: 'admin' | 'employee' | 'provider' | 'client'
  cancelOrder: (reason: string) => void
  escalateStatus: () => void
}

export const OrderActionButtons = ({
  order,
  userRole,
  cancelOrder,
  escalateStatus
}: OrderActionButtonsProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [cancelReason, setCancelReason] = useState('')
  const [cancelPopoverOpen, setCancelPopoverOpen] = useState(false)
  
  if (!order) return null

  // Determine if the cancel button should be shown based on role and order status
  const showCancelButton = () => {
    if (!order) return false
    
    // Order is completed or cancelled - no one can cancel
    if (order.status === 'Complete' || order.status === 'Cancelled') {
      return false
    }
    
    // Admin can cancel any non-completed/cancelled order
    if (userRole === 'admin') {
      return true
    } else if (userRole === 'employee') {
      // Regular employees can cancel based on permissions (this would use a real permission check)
      return true
    } else if (userRole === 'client') {
      // Clients can only cancel if order is still in Scheduled status
      return order.status === 'Scheduled'
    }
    
    return false
  }

  // Determine if the escalate button should be shown
  const showEscalateButton = () => {
    // Only admins can escalate status
    if (userRole !== 'admin') return false
    
    // Can't escalate if order is completed or cancelled
    return order.status !== 'Complete' && order.status !== 'Cancelled'
  }

  // Add debugging to see what's happening
  console.log({
    orderStatus: order.status,
    userRole,
    showCancel: showCancelButton(),
    showEscalate: showEscalateButton()
  })

  const handleCancelSubmit = () => {
    if (!cancelReason.trim()) return
    
    cancelOrder(cancelReason)
    setCancelReason('')
    setCancelPopoverOpen(false)
  }

  return (
    <CardFooter className="w-full bg-white dark:bg-gray-800 border-t p-4 shadow-lg flex justify-end gap-4 z-50">
      {showCancelButton() && (
        <Popover open={cancelPopoverOpen} onOpenChange={setCancelPopoverOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="destructive" 
              className="gap-2"
            >
              <X size={16} />
              Cancel Order
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Cancel Order</h4>
                <p className="text-sm text-muted-foreground">
                  Please provide a reason for cancellation.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cancelReason">Reason</Label>
                <Input
                  id="cancelReason"
                  placeholder="Enter cancellation reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleCancelSubmit}
                disabled={!cancelReason.trim()}
              >
                Submit
              </Button>
            </div>
          </PopoverContent>
        </Popover>
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
      
      {/* Emergency button for severe issues (admin only) */}
      {userRole === 'admin' && (
        <Button 
          variant="outline"
          className="gap-2 border-amber-500 text-amber-500 hover:bg-amber-50 hover:text-amber-600"
        >
          <AlertCircle size={16} />
          Report Issue
        </Button>
      )}
    </CardFooter>
  )
}
