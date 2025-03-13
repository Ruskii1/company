
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface LocationDisplayProps {
  location: string
}

export const LocationDisplay = ({ location }: LocationDisplayProps) => {
  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  return (
    <div className="flex items-center gap-2">
      <span className="truncate max-w-44">{location}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={(e) => {
          e.stopPropagation();
          openInGoogleMaps(location);
        }}
        className="h-8 w-8"
      >
        <MapPin size={16} />
      </Button>
    </div>
  )
}
