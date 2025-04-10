
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useOrderDetails } from '@/hooks/useOrderDetails'
import { StatusBadge } from '@/components/customer/StatusBadge'
import { LocationDisplay } from '@/components/customer/LocationDisplay'
import { TimeTrackingComponent } from '@/components/customer/TimeTrackingComponent'
import { ProviderInfoComponent } from '@/components/customer/ProviderInfoComponent'
import { CarDetailsComponent } from '@/components/customer/CarDetailsComponent'
import { ConversationComponent } from '@/components/customer/ConversationComponent'

const CustomerOrderDetails = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('details')
  const { order, loading, addNoteToConversation } = useOrderDetails(taskId)

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
            <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t.customerPortal}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.customerPortal}
        </Button>
        <div>
          <CardTitle className="text-2xl">{t.taskId}: {order.taskId}</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {t.status}: <StatusBadge status={order.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="provider">Provider</TabsTrigger>
            <TabsTrigger value="car">Car Details</TabsTrigger>
            <TabsTrigger value="external-notes">External Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.serviceType}</h3>
                  <p>{order.serviceType}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.pickupTime}</h3>
                  <p>{order.pickupTime}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.pickupLocation}</h3>
                  <LocationDisplay location={order.pickupLocation} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-1">{t.dropoffLocation}</h3>
                  <LocationDisplay location={order.dropoffLocation} />
                </div>
                
                {order.notes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{t.notes}</h3>
                    <p>{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="time">
            <TimeTrackingComponent 
              pickupTime={order.pickupTime} 
              timeTracking={order.timeTracking} 
            />
          </TabsContent>
          
          <TabsContent value="provider">
            <ProviderInfoComponent provider={order.provider} />
          </TabsContent>
          
          <TabsContent value="car">
            <CarDetailsComponent car={order.car} />
          </TabsContent>

          <TabsContent value="external-notes">
            <ConversationComponent 
              conversation={order.conversation} 
              onSendNote={addNoteToConversation} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default CustomerOrderDetails
