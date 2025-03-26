
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Briefcase, Camera, MapPin, Car, Navigation } from "lucide-react";
import { Order } from "@/hooks/useOrderDetailsEmployee";
import { ProviderLiveMap } from "@/components/customer/ProviderLiveMap";
import { useLanguageStore } from "@/lib/i18n";

interface ProviderInfoTabProps {
  provider: Order['provider'];
  car: Order['car'];
  pickupLocation?: string;
  dropoffLocation?: string;
}

export const ProviderInfoTab = ({ provider, car, pickupLocation, dropoffLocation }: ProviderInfoTabProps) => {
  const { language } = useLanguageStore();
  
  // Convert address strings to coordinates for the map
  // In a real app, you would use geocoding here or get coordinates from backend
  const pickupCoordinates = pickupLocation ? {
    lat: 24.7136 + (Math.random() * 0.04 - 0.02), // Add small random offset for demo
    lng: 46.6753 + (Math.random() * 0.04 - 0.02),
    address: pickupLocation
  } : undefined;
  
  const dropoffCoordinates = dropoffLocation ? {
    lat: 24.7236 + (Math.random() * 0.04 - 0.02), // Add small random offset for demo
    lng: 46.6853 + (Math.random() * 0.04 - 0.02),
    address: dropoffLocation
  } : undefined;
  
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
                  {car.plateArabic && 
                    <span className="text-sm text-muted-foreground" dir={language === 'ar' ? "rtl" : "ltr"}>
                      {car.plateArabic}
                    </span>
                  }
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">License Plate (Arabic)</p>
                <p className="flex flex-col">
                  <span dir="rtl" className="font-arabic">{car.plateArabic || "N/A"}</span>
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
              <div>
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
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Provider Live Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProviderLiveMap 
            providerId={provider.id}
            providerName={provider.name}
            pickupLocation={pickupCoordinates}
            dropoffLocation={dropoffCoordinates}
          />
        </CardContent>
      </Card>
    </div>
  );
};
