
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Briefcase, Camera, MapPin, Car } from "lucide-react"
import { Order } from "@/hooks/useOrderDetailsEmployee"
import { ProviderLiveMap } from "@/components/customer/ProviderLiveMap"
import { useLanguageStore } from "@/lib/i18n"

interface ProviderInfoTabProps {
  provider: Order['provider']
  car: Order['car']
}

export const ProviderInfoTab = ({ provider, car }: ProviderInfoTabProps) => {
  const { language } = useLanguageStore()
  
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
              <p className="text-sm font-semibold mb-1">Phone</p>
              <p>{provider.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Rating</p>
              <p>{provider.rating} / 5.0</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1 flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                Corporation
              </p>
              <p>{provider.corporationName}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicle Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-1">License Plate</p>
                <p className="flex flex-col">
                  <span>{car.plate}</span>
                  {language === 'ar' && car.plateArabic && 
                    <span className="text-sm text-muted-foreground">{car.plateArabic}</span>
                  }
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Model</p>
                <p>{car.model}</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Type</p>
                <p>{car.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Model Year</p>
                <p>{car.year || "N/A"}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm font-semibold mb-1">VIN</p>
                <p className="font-mono text-sm">{car.vin}</p>
              </div>
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
        providerLocation={provider.location} 
        providerName={provider.name} 
      />
    </div>
  )
}
