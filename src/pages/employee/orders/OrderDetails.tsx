
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowUp, X } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { StatusBadge } from '@/components/employee/orders/StatusBadge'
import { OrderDetailsTab } from '@/components/employee/orders/OrderDetailsTab'
import { ProviderInfoTab } from '@/components/employee/orders/ProviderInfoTab'
import { InternalNotesTab } from '@/components/employee/orders/InternalNotesTab'
import { ConversationTab } from '@/components/employee/orders/ConversationTab'
import { useOrderDetailsEmployee } from '@/hooks/useOrderDetailsEmployee'
import { TimeTrackingComponent } from '@/components/customer/TimeTrackingComponent'
import { toast } from 'sonner'
import { getNextStatus } from '@/utils/orderManagementUtils'

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
    
    if (order.status === 'Completed') {
      return false
    }
    
    if (isAdmin) {
      return order.status !== 'Completed'
    } else {
      return order.status === 'Pending' || order.status === 'Scheduled'
    }
  }

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!order) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="text-center">
            <p>Order not found</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/employee')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t.orderManagement}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 relative pb-20">
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
      <CardContent className="space-y-6">
        <Tabs defaultValue="notes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-7 w-full md:w-auto">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
            <TabsTrigger value="external-notes">External Notes</TabsTrigger>
            <TabsTrigger value="invoice">Invoice</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes">
            <InternalNotesTab 
              notes={order.internalNotes} 
              onSaveNote={addInternalNote} 
            />
          </TabsContent>
          
          <TabsContent value="details" className="space-y-6">
            <OrderDetailsTab order={order} openInGoogleMaps={openInGoogleMaps} />
          </TabsContent>
          
          <TabsContent value="time">
            <TimeTrackingComponent 
              pickupTime={order.pickupTime} 
              timeTracking={order.timeTracking} 
            />
          </TabsContent>
          
          <TabsContent value="provider">
            <ProviderInfoTab 
              provider={order.provider} 
              car={order.car}
              pickupLocation={order.pickupLocation}
              dropoffLocation={order.dropoffLocation}
            />
          </TabsContent>
          
          <TabsContent value="external-notes">
            <ConversationTab 
              conversation={order.conversation} 
              onSendNote={addNoteToConversation} 
            />
          </TabsContent>
          
          <TabsContent value="invoice">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Invoice content will be added here later.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Additional information content will be added here later.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Fixed action buttons at the bottom */}
      <CardFooter className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 shadow-lg flex justify-end gap-4">
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
    </Card>
  )
}

export default OrderDetails
