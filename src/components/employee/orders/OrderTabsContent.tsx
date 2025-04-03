
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Order } from '@/types/order'
import { OrderDetailsTab } from '@/components/employee/orders/OrderDetailsTab'
import { ProviderInfoTab } from '@/components/employee/orders/ProviderInfoTab'
import { InternalNotesTab } from '@/components/employee/orders/InternalNotesTab'
import { ConversationTab } from '@/components/employee/orders/ConversationTab'
import { TimeTrackingComponent } from '@/components/customer/TimeTrackingComponent'

interface OrderTabsContentProps {
  order: Order
  activeTab: string
  setActiveTab: (value: string) => void
  openInGoogleMaps: (location: string) => void
  addNoteToConversation: (message: string) => void
  addInternalNote: (message: string) => void
}

export const OrderTabsContent = ({
  order,
  activeTab,
  setActiveTab,
  openInGoogleMaps,
  addNoteToConversation,
  addInternalNote
}: OrderTabsContentProps) => {
  return (
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
  )
}
