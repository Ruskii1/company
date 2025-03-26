
import { AlertCircle, Navigation } from "lucide-react";
import { useRef, useState } from "react";
import { useProviderLocation } from "@/hooks/useProviderLocation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { initializeMap, setupMapSources } from "./map/mapInitialization";
import { useMapMarkers } from "./map/useMapMarkers";
import { Skeleton } from "@/components/ui/skeleton";

interface ProviderLiveMapProps {
  providerLocation?: {
    lat: number;
    lng: number;
    heading?: number;
    speed?: number;
    updated_at?: string;
  };
  providerId?: string;
  providerName: string;
  pickupLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  dropoffLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
}

export const ProviderLiveMap = ({ 
  providerLocation: initialLocation, 
  providerId, 
  providerName,
  pickupLocation,
  dropoffLocation
}: ProviderLiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Only use our custom hook if we have a providerId
  const { 
    location: realtimeLocation, 
    loading: locationLoading, 
    error: locationError,
    lastUpdated 
  } = useProviderLocation(providerId);
  
  // Determine which location to use - realtime or provided static location
  const location = providerId ? realtimeLocation : initialLocation;

  // Initialize the map once when the component mounts
  useState(() => {
    if (!mapContainer.current || map.current) return;
    
    try {
      // Get initial center point
      const initialCenter = location 
        ? [location.lng, location.lat] 
        : [46.6753, 24.7136]; // Default to Riyadh, Saudi Arabia
        
      // Initialize the map
      map.current = initializeMap(mapContainer.current, initialCenter as [number, number]);
      
      // Set up sources and layers
      setupMapSources(map.current, () => {
        setMapInitialized(true);
      });
      
      // Error handler
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map. Please check your internet connection.');
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your console for details.');
    }
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Use the custom hook to manage markers
  useMapMarkers({
    map: map.current,
    mapInitialized,
    providerLocation: location,
    providerName,
    pickupLocation,
    dropoffLocation
  });

  return (
    <div className="w-full">
      {locationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading provider location: {locationError}
          </AlertDescription>
        </Alert>
      )}

      {mapError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {mapError}
          </AlertDescription>
        </Alert>
      )}
      
      <div 
        ref={mapContainer} 
        className="h-64 rounded-md border overflow-hidden relative"
      >
        {locationLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        )}
      </div>
      
      {location && (
        <div className="mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Navigation className="h-4 w-4" />
            <p className="font-medium">{providerName}</p>
          </div>
          
          {(location.updated_at || lastUpdated) && (
            <p className="text-xs">
              Last updated: {new Date(location.updated_at || lastUpdated || '').toLocaleTimeString()}
            </p>
          )}
          
          {(location.speed !== undefined || location.heading !== undefined) && (
            <p className="text-xs mt-1">
              {location.speed !== undefined && `Speed: ${Math.round(location.speed)} km/h`}
              {location.speed !== undefined && location.heading !== undefined && ' • '}
              {location.heading !== undefined && `Heading: ${Math.round(location.heading)}°`}
            </p>
          )}
        </div>
      )}
      
      {!location && !locationLoading && (
        <div className="mt-2">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-36" />
        </div>
      )}
    </div>
  );
};
