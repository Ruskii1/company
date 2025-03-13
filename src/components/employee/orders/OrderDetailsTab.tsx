
import { Order } from "@/hooks/useOrderDetailsEmployee"
import { CustomerInfoSection } from "./CustomerInfoSection"
import { ServiceInfoSection } from "./ServiceInfoSection"
import { ProviderResponseSection } from "./ProviderResponseSection" 
import { LocationSection } from "./LocationSection"

interface OrderDetailsTabProps {
  order: Order
  openInGoogleMaps: (location: string) => void
}

export const OrderDetailsTab = ({ order, openInGoogleMaps }: OrderDetailsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <CustomerInfoSection 
          customerName={order.customerName} 
          customerId={order.id}
        />
        
        <ServiceInfoSection 
          serviceType={order.serviceType} 
          pickupTime={order.pickupTime} 
        />
        
        <ProviderResponseSection 
          acceptedBy={order.acceptedBy} 
          declinedBy={order.declinedBy} 
          pendingProviders={order.pendingProviders} 
        />
      </div>
      
      <div className="space-y-4">
        <LocationSection 
          pickupLocation={order.pickupLocation} 
          dropoffLocation={order.dropoffLocation} 
          notes={order.notes} 
          openInGoogleMaps={openInGoogleMaps} 
        />
      </div>
    </div>
  )
}
