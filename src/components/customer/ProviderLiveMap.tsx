
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useEffect, useRef } from "react"

interface ProviderLiveMapProps {
  providerLocation: {
    lat: number
    lng: number
  }
  providerName: string
}

export const ProviderLiveMap = ({ providerLocation, providerName }: ProviderLiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // This is a placeholder for the actual map implementation
    // In a real implementation, this would use a mapping library like Mapbox, Google Maps, etc.
    const { lat, lng } = providerLocation
    
    // For now, we'll just display the coordinates in the UI
    console.log(`Provider location: ${lat}, ${lng}`)
    
    // Return cleanup function if needed
    return () => {
      // Cleanup map instance if needed
    }
  }, [providerLocation])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Provider Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapRef} 
          className="h-64 rounded-md border bg-gray-100 flex flex-col items-center justify-center text-gray-500"
        >
          <p>Live location tracking</p>
          <p className="text-sm mt-2">
            Provider: {providerName} is currently at position:
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Latitude: {providerLocation.lat.toFixed(6)}, Longitude: {providerLocation.lng.toFixed(6)}
          </p>
          <p className="text-xs text-gray-400 mt-4 max-w-md text-center">
            (This is a placeholder. In a real implementation, this would show an interactive map with the provider's location)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
