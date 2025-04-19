import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceProvider } from '@/types/provider';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface ProvidersMapViewProps {
  providers?: ServiceProvider[];
  onProviderSelect?: (provider: ServiceProvider) => void;
  centerAddress?: string;
  radiusKm?: number;
}

// Mock data for providers with locations if needed
const getProviderLocations = (providers: ServiceProvider[], centerLat = 24.7136, centerLng = 46.6753) => {
  return providers.map((provider, index) => {
    // If provider already has location data, use that
    if (provider.location) return provider;
    
    // Otherwise, generate mock locations in a circle around center point
    const angle = (index / providers.length) * 2 * Math.PI;
    const radiusKm = 2 + Math.random() * 5; // Random radius between 2-7km
    const lat = centerLat + (radiusKm / 111) * Math.cos(angle);
    const lng = centerLng + (radiusKm / 111) * Math.sin(angle);
    
    return {
      ...provider,
      location: { lat, lng }
    };
  });
};

export const ProvidersMapView: React.FC<ProvidersMapViewProps> = ({ 
  providers = [], 
  onProviderSelect,
  centerAddress,
  radiusKm = 7
}) => {
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [viewport, setViewport] = useState({
    latitude: 24.7136,
    longitude: 46.6753,
    zoom: 10
  });
  const [providersWithLocation, setProvidersWithLocation] = useState<ServiceProvider[]>([]);

  // Set initial position based on centerAddress if provided
  useEffect(() => {
    if (centerAddress) {
      // In a real app, you would geocode the address here
      // For now, we'll just use Riyadh coordinates
      setViewport(prev => ({
        ...prev,
        latitude: 24.7136,
        longitude: 46.6753
      }));
    }
  }, [centerAddress]);

  // Set providers with location data
  useEffect(() => {
    if (providers.length > 0) {
      const providersWithLoc = getProviderLocations(providers);
      setProvidersWithLocation(providersWithLoc);
    }
  }, [providers]);

  // Access token - in a real app, this would come from environment variables
  const mapboxToken = 'pk.eyJ1IjoibWVzaGFyaXNoIiwiYSI6ImNtOG1mMzBtMzE4Z2kyaXNlbnFkamtyOGIifQ.iOVBnnIexOXqR8oHq2H00w';

  return (
    <Map
      {...viewport}
      width="100%"
      height="600px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewStateChange={({ viewState }) => {
        setViewport({
          latitude: viewState.latitude,
          longitude: viewState.longitude,
          zoom: viewState.zoom
        });
      }}
      mapboxApiAccessToken={mapboxToken}
    >
      {/* Show radius circle around center */}
      {radiusKm && centerAddress && (
        <div className="absolute top-4 left-4 bg-white p-2 rounded shadow z-10">
          <p className="text-sm font-medium">Showing providers within {radiusKm}km</p>
        </div>
      )}
      
      {providersWithLocation.map((provider) => (
        <Marker
          key={provider.id}
          latitude={provider.location?.lat || 0}
          longitude={provider.location?.lng || 0}
          onClick={() => {
            setSelectedProvider(provider);
            if (onProviderSelect) {
              onProviderSelect(provider);
            }
          }}
        >
          <div className={`bg-primary text-white p-2 rounded-full cursor-pointer ${
            provider.availabilityStatus === 'online' ? 'bg-green-500' : 'bg-gray-500'
          }`}>
            <span className="text-xs">{provider.fullName.charAt(0)}</span>
          </div>
        </Marker>
      ))}

      {selectedProvider && (
        <Popup
          latitude={selectedProvider.location?.lat || 0}
          longitude={selectedProvider.location?.lng || 0}
          onClose={() => setSelectedProvider(null)}
          closeButton={true}
          closeOnClick={false}
        >
          <div className="p-2">
            <h3 className="font-semibold text-sm">{selectedProvider.fullName}</h3>
            <p className="text-xs">Status: {selectedProvider.availabilityStatus}</p>
            <p className="text-xs">Services: {selectedProvider.serviceTypes.join(', ')}</p>
            {onProviderSelect && (
              <Button 
                size="sm" 
                onClick={() => onProviderSelect(selectedProvider)}
                className="mt-2 w-full"
              >
                <Phone className="h-3 w-3 mr-1" />
                Assign Order
              </Button>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
};
