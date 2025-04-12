
import { CardContent } from '@/components/ui/card'
import { Order } from '@/types/order'
import { OrderDetailsTab } from '@/components/employee/orders/OrderDetailsTab'
import { ProviderInfoTab } from '@/components/employee/orders/ProviderInfoTab'
import { InternalNotesTab } from '@/components/employee/orders/InternalNotesTab'
import { ExternalNotesTab } from '@/components/employee/orders/ExternalNotesTab'
import { TimeTrackingComponent } from '@/components/customer/TimeTrackingComponent'
import { TabsContainer } from './tabs/TabsContainer'
import { InvoiceTab } from './tabs/InvoiceTab'
import { InfoTab } from './tabs/InfoTab'
import { ActionLogTab } from './tabs/ActionLogTab'
import { useState } from 'react'
import { ManualAssignmentSection } from './ManualAssignmentSection'
import { toast } from 'sonner'

interface OrderTabsContentProps {
  order: Order
  activeTab: string
  setActiveTab: (value: string) => void
  openInGoogleMaps: (location: string) => void
  addNoteToConversation: (message: string) => void
  addInternalNote: (message: string) => void
  userRole: 'admin' | 'employee' | 'provider' | 'client'
  onResearchProviders?: () => void
  onManualAssign?: (providerId: string) => void
}

export const OrderTabsContent = ({
  order,
  activeTab,
  setActiveTab,
  openInGoogleMaps,
  addNoteToConversation,
  addInternalNote,
  userRole,
  onResearchProviders,
  onManualAssign
}: OrderTabsContentProps) => {
  const canViewInternalNotes = userRole === 'admin' || userRole === 'employee'
  const canEditExternalNotes = userRole === 'admin' || userRole === 'employee'
  const canViewActionLog = userRole === 'admin' || userRole === 'employee'
  
  // Mock functions for demonstration purposes
  const handleResearchProviders = () => {
    if (onResearchProviders) {
      onResearchProviders();
    } else {
      toast.info("Research for providers initiated");
    }
  };
  
  const handleManualAssign = (providerId: string) => {
    if (onManualAssign) {
      onManualAssign(providerId);
    } else {
      toast.success(`Request sent to provider ${providerId}`);
    }
  };
  
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
          <>
            <OrderDetailsTab 
              order={order} 
              openInGoogleMaps={openInGoogleMaps} 
            />
            
            {/* Add manual assignment options for NPF/NPA statuses */}
            {(userRole === 'admin' || userRole === 'employee') && (
              <ManualAssignmentSection
                order={order}
                onResearchProviders={handleResearchProviders}
                onManualAssign={handleManualAssign}
              />
            )}
          </>
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
          <ExternalNotesTab 
            notes={order.conversation || []} 
            onSendNote={addNoteToConversation} 
            canEditNotes={canEditExternalNotes}
          />
        }
        invoiceTab={<InvoiceTab order={order} />}
        infoTab={<InfoTab order={order} userRole={userRole} />}
        actionLogTab={canViewActionLog ? <ActionLogTab actionLog={order.actionLog || []} /> : undefined}
      />
    </CardContent>
  )
}
