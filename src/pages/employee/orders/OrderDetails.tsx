
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { useOrderDetailsEmployee } from '@/hooks/useOrderDetailsEmployee'
import { toast } from 'sonner'
import { getNextStatus } from '@/utils/orderManagementUtils'
import { OrderDetailsHeader } from '@/components/employee/orders/OrderDetailsHeader'
import { OrderTabsContent } from '@/components/employee/orders/OrderTabsContent'
import { OrderActionButtons } from '@/components/employee/orders/OrderActionButtons'
import { OrderLoadingState } from '@/components/employee/orders/LoadingState'
import { OrderNotFoundState } from '@/components/employee/orders/NotFoundState'

const OrderDetails = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('notes')

  const { 
    order, 
    loading, 
    addNoteToConversation, 
    addInternalNote,
    updateOrderStatus
  } = useOrderDetailsEmployee(taskId)

  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  const escalateStatus = () => {
    if (!order) return
    
    if (order.status === 'Completed') {
      toast.info("Order is already completed")
      return
    }
    
    const newStatus = getNextStatus(order.status)
    console.log(`Escalating order status from ${order.status} to ${newStatus}`)
    
    updateOrderStatus(newStatus)
    toast.success(`Order status updated to ${newStatus}`)
  }

  const cancelOrder = () => {
    if (!order) return
    
    updateOrderStatus('Cancelled')
    toast.success("Order has been cancelled")
  }

  // Determine if the cancel button should be shown
  const showCancelButton = () => {
    if (!order) return false
    
    // User role logic would be implemented here
    const isAdmin = true // This should be replaced with actual role check
    
    if (order.status === 'Completed' || order.status === 'Cancelled') {
      return false
    }
    
    if (isAdmin) {
      return order.status !== 'Completed' && order.status !== 'Cancelled'
    } else {
      return order.status === 'Pending' || order.status === 'Scheduled'
    }
  }

  if (loading) {
    return <OrderLoadingState />
  }

  if (!order) {
    return <OrderNotFoundState />
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 relative pb-24">
      <OrderDetailsHeader order={order} />
      
      <OrderTabsContent 
        order={order}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openInGoogleMaps={openInGoogleMaps}
        addNoteToConversation={addNoteToConversation}
        addInternalNote={addInternalNote}
      />
      
      <OrderActionButtons 
        order={order}
        showCancelButton={showCancelButton}
        cancelOrder={cancelOrder}
        escalateStatus={escalateStatus}
      />
    </Card>
  )
}

export default OrderDetails
