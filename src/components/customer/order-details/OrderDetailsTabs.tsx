
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Request } from '@/types/request'
import { OrderDetailsTab } from './tabs/OrderDetailsTab'
import { TimeTrackingTab } from './tabs/TimeTrackingTab'
import { ProviderInfoTab } from './tabs/ProviderInfoTab'
import { CarDetailsTab } from './tabs/CarDetailsTab'
import { ConversationTab } from './tabs/ConversationTab'

interface OrderDetailsTabsProps {
  order: Request
  canCancelOrder: boolean
  handleCancelOrder: () => Promise<void>
  addNoteToConversation: (message: string) => void
}

export const OrderDetailsTabs = ({ 
  order, 
  canCancelOrder, 
  handleCancelOrder, 
  addNoteToConversation 
}: OrderDetailsTabsProps) => {
  const [activeTab, setActiveTab] = useState('details')

  return (
    <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-5 w-full md:w-auto">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="time">Time</TabsTrigger>
        <TabsTrigger value="provider">Provider</TabsTrigger>
        <TabsTrigger value="car">Car Details</TabsTrigger>
        <TabsTrigger value="external-notes">External Notes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details">
        <OrderDetailsTab 
          order={order} 
          canCancelOrder={canCancelOrder} 
          handleCancelOrder={handleCancelOrder} 
        />
      </TabsContent>
      
      <TabsContent value="time">
        <TimeTrackingTab 
          pickupTime={order.pickupTime} 
          timeTracking={order.timeTracking} 
        />
      </TabsContent>
      
      <TabsContent value="provider">
        <ProviderInfoTab provider={order.provider} />
      </TabsContent>
      
      <TabsContent value="car">
        <CarDetailsTab car={order.car} />
      </TabsContent>

      <TabsContent value="external-notes">
        <ConversationTab 
          conversation={order.conversation} 
          onSendNote={addNoteToConversation} 
        />
      </TabsContent>
    </Tabs>
  )
}
