
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Camera } from "lucide-react"
import { ProviderLiveMap } from "./ProviderLiveMap"

interface ProviderInfoComponentProps {
  provider: {
    id?: string
    name: string
    phone: string
    rating: number
    corporationName: string
    images: {
      pickup: string[]
      dropoff: string[]
    }
    location: {
      lat: number
      lng: number
    }
  }
}

export const ProviderInfoComponent = ({ provider }: ProviderInfoComponentProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Provider Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-1">Provider Name</p>
              <p>{provider.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Rating</p>
              <p>{provider.rating} / 5.0</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Pickup Photos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {provider.images.pickup.map((imageUrl, index) => (
                  <div key={`pickup-${index}`} className="aspect-square relative border rounded-md overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={`Pickup ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Dropoff Photos
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {provider.images.dropoff.map((imageUrl, index) => (
                  <div key={`dropoff-${index}`} className="aspect-square relative border rounded-md overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={`Dropoff ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ProviderLiveMap 
        providerId={provider.id}
        providerLocation={provider.location} 
        providerName={provider.name} 
      />
    </div>
  )
}
