
import { Order } from "@/types/order"
import { CustomerInfoSection } from "./CustomerInfoSection"
import { ServiceInfoSection } from "./ServiceInfoSection"
import { ProviderResponseSection } from "./ProviderResponseSection" 
import { LocationSection } from "./LocationSection"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle } from "lucide-react"
import { ClientNotesSection } from "./ClientNotesSection"

interface OrderDetailsTabProps {
  order: Order
  openInGoogleMaps: (location: string) => void
}

export const OrderDetailsTab = ({ order, openInGoogleMaps }: OrderDetailsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CustomerInfoSection 
              customerName={order.customerName} 
              customerId={order.id}
              customerEmail={order.customerEmail || 'N/A'}
              customerPhone={order.customerPhone || 'N/A'}
              customerCompany={order.customerCompany}
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
              openInGoogleMaps={openInGoogleMaps} 
            />
            
            <ClientNotesSection 
              notes={order.notes} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
