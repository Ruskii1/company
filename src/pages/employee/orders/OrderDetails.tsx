
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { StatusBadge } from '@/components/employee/orders/StatusBadge'
import { OrderDetailsTab } from '@/components/employee/orders/OrderDetailsTab'
import { ProviderInfoTab } from '@/components/employee/orders/ProviderInfoTab'
import { InternalNotesTab } from '@/components/employee/orders/InternalNotesTab'
import { ConversationTab } from '@/components/employee/orders/ConversationTab'
import { useOrderDetailsEmployee } from '@/hooks/useOrderDetailsEmployee'
import { CarDetailsComponent } from '@/components/customer/CarDetailsComponent'
import { TimeTrackingComponent } from '@/components/customer/TimeTrackingComponent'

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
    addInternalNote 
  } = useOrderDetailsEmployee(taskId)

  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
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
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
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
          <TabsList className="grid grid-cols-6 w-full md:w-auto">
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
            <TabsTrigger value="car">Car Details</TabsTrigger>
            <TabsTrigger value="external-notes">External Notes</TabsTrigger>
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
            <ProviderInfoTab provider={order.provider} />
          </TabsContent>
          
          <TabsContent value="car">
            <CarDetailsComponent car={order.car} />
          </TabsContent>
          
          <TabsContent value="external-notes">
            <ConversationTab 
              conversation={order.conversation} 
              onSendNote={addNoteToConversation} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default OrderDetails
