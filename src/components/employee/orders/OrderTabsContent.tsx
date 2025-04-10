
import { CardContent } from '@/components/ui/card'
import { Order } from '@/types/order'
import { OrderDetailsTab } from '@/components/employee/orders/OrderDetailsTab'
import { ProviderInfoTab } from '@/components/employee/orders/ProviderInfoTab'
import { InternalNotesTab } from '@/components/employee/orders/InternalNotesTab'
import { ConversationTab } from '@/components/employee/orders/ConversationTab'
import { TimeTrackingComponent } from '@/components/customer/TimeTrackingComponent'
import { TabsContainer } from './tabs/TabsContainer'
import { InvoiceTab } from './tabs/InvoiceTab'
import { InfoTab } from './tabs/InfoTab'

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
      <TabsContainer
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notesTab={
          <InternalNotesTab 
            notes={order.internalNotes} 
            onSaveNote={addInternalNote} 
          />
        }
        detailsTab={
          <OrderDetailsTab 
            order={order} 
            openInGoogleMaps={openInGoogleMaps} 
          />
        }
        timeTab={
          <TimeTrackingComponent 
            pickupTime={order.pickupTime} 
            timeTracking={order.timeTracking} 
          />
        }
        providerTab={
          <ProviderInfoTab 
            provider={order.provider} 
            car={order.car}
            pickupLocation={order.pickupLocation}
            dropoffLocation={order.dropoffLocation}
          />
        }
        externalNotesTab={
          <ConversationTab 
            conversation={order.conversation} 
            onSendNote={addNoteToConversation} 
          />
        }
        invoiceTab={<InvoiceTab />}
        infoTab={<InfoTab />}
      />
    </CardContent>
  )
}
