
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card } from '@/components/ui/card'
import { useState, useEffect } from 'react'
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
    updateOrderStatus,
    reassignProvider,
    researchProviders
  } = useOrderDetailsEmployee(taskId)

  // In a real application, this would come from an auth context or user store
  // For this demo, we're using a mock value
  const userRole = 'admin' as 'admin' | 'employee' | 'provider' | 'client'

  // Log when the component mounts
  useEffect(() => {
    console.log("OrderDetails mounted with taskId:", taskId);
  }, [taskId]);

  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  const escalateStatus = () => {
    if (!order) return
    
    if (order.status === 'Complete') {
      toast.info("Order is already completed")
      return
    }
    
    const newStatus = getNextStatus(order.status)
    console.log(`Escalating order status from ${order.status} to ${newStatus}`)
    
    updateOrderStatus(newStatus)
    toast.success(`Order status updated to ${newStatus}`)
  }

  const cancelOrder = (reason: string) => {
    if (!order) return
    
    updateOrderStatus('Cancelled', reason)
    toast.success("Order has been cancelled")
  }
  
  const handleResearchProviders = () => {
    if (!order) return
    
    researchProviders()
    toast.success("Looking for providers near pickup location")
  }
  
  const handleManualAssign = (providerId: string) => {
    if (!order) return
    
    reassignProvider(providerId)
    toast.success(`Order manually assigned to provider ${providerId}`)
  }

  if (loading) {
    return <OrderLoadingState />
  }

  if (!order) {
    return <OrderNotFoundState />
  }

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-4rem)]">
      <Card className="flex-1 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 mb-20">
        <OrderDetailsHeader order={order} />
        
        <OrderTabsContent 
          order={order}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openInGoogleMaps={openInGoogleMaps}
          addNoteToConversation={addNoteToConversation}
          addInternalNote={addInternalNote}
          userRole={userRole}
          onResearchProviders={handleResearchProviders}
          onManualAssign={handleManualAssign}
        />
      </Card>
      
      <div className="fixed bottom-0 left-0 right-0">
        <OrderActionButtons 
          order={order}
          userRole={userRole}
          cancelOrder={cancelOrder}
          escalateStatus={escalateStatus}
        />
      </div>
    </div>
  )
}

export default OrderDetails
