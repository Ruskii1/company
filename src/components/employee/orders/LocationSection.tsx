
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface LocationSectionProps {
  pickupLocation: string
  dropoffLocation: string
  notes?: string
  openInGoogleMaps: (location: string) => void
}

export const LocationSection = ({ 
  pickupLocation, 
  dropoffLocation, 
  notes, 
  openInGoogleMaps 
}: LocationSectionProps) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-1">Pickup Location</h3>
        <div className="flex items-center gap-2">
          <p>{pickupLocation}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => openInGoogleMaps(pickupLocation)}
            className="h-8 w-8"
          >
            <MapPin size={16} />
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-1">Dropoff Location</h3>
        <div className="flex items-center gap-2">
          <p>{dropoffLocation}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => openInGoogleMaps(dropoffLocation)}
            className="h-8 w-8"
          >
            <MapPin size={16} />
          </Button>
        </div>
      </div>
      
      {notes && (
        <div>
          <h3 className="text-lg font-semibold mb-1">Notes</h3>
          <p>{notes}</p>
        </div>
      )}
    </>
  )
}
