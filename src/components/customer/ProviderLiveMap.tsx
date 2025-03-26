
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, AlertCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useProviderLocation } from "@/hooks/useProviderLocation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use the Mapbox token from our code
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVzaGFyaXNoIiwiYSI6ImNtOG1mMzBtMzE4Z2kyaXNlbnFkamtyOGIifQ.iOVBnnIexOXqR8oHq2H00w';

interface ProviderLiveMapProps {
  providerLocation?: {
    lat: number
    lng: number
  }
  providerId?: string
  providerName: string
}

export const ProviderLiveMap = ({ providerLocation: initialLocation, providerId, providerName }: ProviderLiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // Use our custom hook if we have a providerId, otherwise use the prop
  const { 
    location: realtimeLocation, 
    loading: locationLoading, 
    error: locationError 
  } = useProviderLocation(providerId);
  
  // Determine which location to use
  const location = providerId ? realtimeLocation : initialLocation;

  // Initialize the map once when the component mounts
  useEffect(() => {
    if (!mapContainer.current || mapInitialized) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: location ? [location.lng, location.lat] : [45.0792, 23.8859], // Default to Saudi Arabia
        zoom: 13
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      setMapInitialized(true);
      
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [mapContainer.current, mapInitialized]);

  // Update marker position when location changes
  useEffect(() => {
    if (!mapInitialized || !map.current || !location) return;
    
    // If the marker doesn't exist yet, create it
    if (!marker.current) {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'provider-marker';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = '#4338ca';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 3px 8px rgba(0,0,0,0.3)';
      
      // Create marker at location
      marker.current = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);
        
      // Add popup with provider name
      new mapboxgl.Popup({ offset: 25 })
        .setLngLat([location.lng, location.lat])
        .setHTML(`<p style="margin: 0; font-weight: bold;">${providerName}</p>`)
        .addTo(map.current);
    } else {
      // Update marker position
      marker.current.setLngLat([location.lng, location.lat]);
    }
    
    // Animate to the new location
    map.current.flyTo({
      center: [location.lng, location.lat],
      essential: true,
      speed: 0.5
    });
    
  }, [location, mapInitialized, providerName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Live Provider Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        {locationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error loading provider location: {locationError}
            </AlertDescription>
          </Alert>
        )}
        
        <div 
          ref={mapContainer} 
          className="h-64 rounded-md border overflow-hidden"
        />
        
        {location && (
          <div className="mt-2 text-sm text-muted-foreground">
            <p>Provider: {providerName}</p>
            {location.updated_at && (
              <p>Last updated: {new Date(location.updated_at).toLocaleTimeString()}</p>
            )}
            <p className="text-xs mt-1">
              Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
