
import { Button } from "@/components/ui/button"
import { MapPin, Check, X, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Order } from "@/hooks/useOrderDetailsEmployee"

interface OrderDetailsTabProps {
  order: Order
  openInGoogleMaps: (location: string) => void
}

export const OrderDetailsTab = ({ order, openInGoogleMaps }: OrderDetailsTabProps) => {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Customer Name</h3>
          <p>{order.customerName}</p>
          <Button 
            variant="link" 
            className="p-0 h-auto mt-1"
            onClick={() => navigate(`/employee/customers/${order.id}`)}
          >
            View Customer Details
          </Button>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-1">Service Type</h3>
          <p>{order.serviceType}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-1">Pickup Time</h3>
          <p>{order.pickupTime}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Accepted By
          </h3>
          <p>{order.acceptedBy || 'N/A'}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <X className="h-5 w-5 text-red-500" />
            Declined By
          </h3>
          {order.declinedBy && order.declinedBy.length > 0 ? (
            <ul className="list-disc pl-5">
              {order.declinedBy.map((provider, index) => (
                <li key={index}>{provider}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Pending Response
          </h3>
          {order.pendingProviders && order.pendingProviders.length > 0 ? (
            <ul className="list-disc pl-5">
              {order.pendingProviders.map((provider, index) => (
                <li key={index}>{provider}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">Pickup Location</h3>
          <div className="flex items-center gap-2">
            <p>{order.pickupLocation}</p>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => openInGoogleMaps(order.pickupLocation)}
              className="h-8 w-8"
            >
              <MapPin size={16} />
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-1">Dropoff Location</h3>
          <div className="flex items-center gap-2">
            <p>{order.dropoffLocation}</p>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => openInGoogleMaps(order.dropoffLocation)}
              className="h-8 w-8"
            >
              <MapPin size={16} />
            </Button>
          </div>
        </div>
        
        {order.notes && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Notes</h3>
            <p>{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}
