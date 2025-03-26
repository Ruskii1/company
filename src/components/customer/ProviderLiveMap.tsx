
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useProviderLocation } from "@/hooks/useProviderLocation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Use the Mapbox token from our code
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVzaGFyaXNoIiwiYSI6ImNtOG1mMzBtMzE4Z2kyaXNlbnFkamtyOGIifQ.iOVBnnIexOXqR8oHq2H00w';

interface ProviderLiveMapProps {
  providerLocation?: {
    lat: number;
    lng: number;
    updated_at?: string;
  };
  providerId?: string;
  providerName: string;
}

export const ProviderLiveMap = ({ providerLocation: initialLocation, providerId, providerName }: ProviderLiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Only use our custom hook if we have a providerId
  const { 
    location: realtimeLocation, 
    loading: locationLoading, 
    error: locationError 
  } = useProviderLocation(providerId);
  
  // Determine which location to use - realtime or provided static location
  const location = providerId ? realtimeLocation : initialLocation;

  // Initialize the map once when the component mounts
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    console.log('Initializing map with Mapbox token:', MAPBOX_TOKEN ? 'Token provided' : 'No token');
    
    try {
      // Initialize Mapbox with token
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      // Create map instance
      const initialCenter = location 
        ? [location.lng, location.lat] 
        : [46.6753, 24.7136]; // Default to Riyadh, Saudi Arabia
      
      console.log('Creating map with center:', initialCenter);
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: initialCenter as [number, number],
        zoom: 13,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));
      
      // Set up event listeners
      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapInitialized(true);
      });
      
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
  }, [mapContainer.current]); // Only run once when mapContainer is available

  // Update marker position when location changes
  useEffect(() => {
    if (!map.current || !mapInitialized || !location) {
      console.log('Cannot update marker:', {
        map: !!map.current,
        initialized: mapInitialized,
        location
      });
      return;
    }
    
    console.log('Updating marker position to:', location);
    
    const lngLat: [number, number] = [location.lng, location.lat];
    
    try {
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
          .setLngLat(lngLat)
          .addTo(map.current);
          
        // Add popup with provider name
        new mapboxgl.Popup({ offset: 25 })
          .setLngLat(lngLat)
          .setHTML(`<p style="margin: 0; font-weight: bold;">${providerName}</p>`)
          .addTo(map.current);
      } else {
        // Update marker position
        marker.current.setLngLat(lngLat);
      }
      
      // Animate to the new location
      map.current.flyTo({
        center: lngLat,
        essential: true,
        speed: 0.5
      });
    } catch (error) {
      console.error('Error updating marker:', error);
    }
  }, [location, mapInitialized, providerName]);

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
      />
      
      {locationLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      )}
      
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
    </div>
  );
};
