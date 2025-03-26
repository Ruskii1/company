import { AlertCircle, Navigation } from "lucide-react";
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
  const providerMarker = useRef<mapboxgl.Marker | null>(null);
  const pickupMarker = useRef<mapboxgl.Marker | null>(null);
  const dropoffMarker = useRef<mapboxgl.Marker | null>(null);
  const routeLine = useRef<any>(null);
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
    
    try {
      // Initialize Mapbox with token
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      // Create map instance
      const initialCenter = location 
        ? [location.lng, location.lat] 
        : [46.6753, 24.7136]; // Default to Riyadh, Saudi Arabia
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: initialCenter as [number, number],
        zoom: 15, // Start with a closer zoom level
        attributionControl: false,
        dragRotate: false, // Disable 3D rotation for simpler UI
        pitchWithRotate: false // Disable pitch with rotate
      });

      // Add minimal controls - only zoom
      map.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }), 
        'top-right'
      );
      map.current.addControl(
        new mapboxgl.AttributionControl({ compact: true })
      );
      
      // Disable map rotation to keep UI simple
      map.current.dragRotate.disable();
      map.current.touchZoomRotate.disableRotation();
      
      // Set up event listeners
      map.current.on('load', () => {
        setMapInitialized(true);
        
        // Add route source when map loads
        if (map.current) {
          map.current.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: []
              }
            }
          });
          
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#4338ca',
              'line-width': 4,
              'line-opacity': 0.8
            }
          });
          
          routeLine.current = map.current.getSource('route');
        }
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

  // Update markers and route when locations change
  useEffect(() => {
    if (!map.current || !mapInitialized) return;
    
    // Update provider marker
    if (location) {
      const lngLat: [number, number] = [location.lng, location.lat];
      
      try {
        // If the marker doesn't exist yet, create it
        if (!providerMarker.current) {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'provider-marker';
          el.style.width = '24px';
          el.style.height = '24px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = '#4338ca';
          el.style.border = '3px solid white';
          el.style.boxShadow = '0 3px 8px rgba(0,0,0,0.3)';
          
          if (location.heading !== undefined) {
            // Add direction indicator if heading is available
            const arrow = document.createElement('div');
            arrow.style.position = 'absolute';
            arrow.style.top = '-12px';
            arrow.style.left = '50%';
            arrow.style.transform = `translateX(-50%) rotate(${location.heading}deg)`;
            arrow.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L19 12L12 19M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
            el.appendChild(arrow);
          }
          
          // Create marker at location
          providerMarker.current = new mapboxgl.Marker(el)
            .setLngLat(lngLat)
            .addTo(map.current);
            
          // Add popup with provider name
          new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setLngLat(lngLat)
            .setHTML(`<p style="margin: 0; font-weight: bold;">${providerName}</p>`)
            .addTo(map.current);
        } else {
          // Update marker position
          providerMarker.current.setLngLat(lngLat);
          
          // Update rotation based on heading if available
          if (location.heading !== undefined) {
            const el = providerMarker.current.getElement();
            const arrow = el.querySelector('div');
            if (arrow) {
              arrow.style.transform = `translateX(-50%) rotate(${location.heading}deg)`;
            }
          }
        }
      } catch (error) {
        console.error('Error updating provider marker:', error);
      }
    }
    
    // Handle pickup location marker
    if (pickupLocation) {
      try {
        const pickupLngLat: [number, number] = [pickupLocation.lng, pickupLocation.lat];
        
        if (!pickupMarker.current) {
          // Create pickup marker with custom element
          const el = document.createElement('div');
          el.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="#10b981" stroke="white" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>`;
          
          pickupMarker.current = new mapboxgl.Marker(el)
            .setLngLat(pickupLngLat)
            .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`<p style="margin: 0;"><strong>Pickup:</strong> ${pickupLocation.address}</p>`))
            .addTo(map.current);
        } else {
          pickupMarker.current.setLngLat(pickupLngLat);
        }
      } catch (error) {
        console.error('Error updating pickup marker:', error);
      }
    } else if (pickupMarker.current) {
      pickupMarker.current.remove();
      pickupMarker.current = null;
    }
    
    // Handle dropoff location marker
    if (dropoffLocation) {
      try {
        const dropoffLngLat: [number, number] = [dropoffLocation.lng, dropoffLocation.lat];
        
        if (!dropoffMarker.current) {
          // Create dropoff marker with custom element
          const el = document.createElement('div');
          el.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="#ef4444" stroke="white" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>`;
          
          dropoffMarker.current = new mapboxgl.Marker(el)
            .setLngLat(dropoffLngLat)
            .setPopup(new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`<p style="margin: 0;"><strong>Dropoff:</strong> ${dropoffLocation.address}</p>`))
            .addTo(map.current);
        } else {
          dropoffMarker.current.setLngLat(dropoffLngLat);
        }
      } catch (error) {
        console.error('Error updating dropoff marker:', error);
      }
    } else if (dropoffMarker.current) {
      dropoffMarker.current.remove();
      dropoffMarker.current = null;
    }
    
    // Update route line if we have provider location and destination points
    if (routeLine.current && location && (pickupLocation || dropoffLocation)) {
      try {
        const coordinates = [];
        
        // Add provider location
        coordinates.push([location.lng, location.lat]);
        
        // Add pickup location if exists and not yet reached
        if (pickupLocation) {
          coordinates.push([pickupLocation.lng, pickupLocation.lat]);
        }
        
        // Add dropoff location if exists
        if (dropoffLocation) {
          coordinates.push([dropoffLocation.lng, dropoffLocation.lat]);
        }
        
        // Update the route line
        routeLine.current.setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        });
      } catch (error) {
        console.error('Error updating route line:', error);
      }
    }
    
    // Auto-fit the map to show only relevant markers
    if (map.current && mapInitialized && (location || pickupLocation || dropoffLocation)) {
      try {
        const bounds = new mapboxgl.LngLatBounds();
        
        if (location) {
          bounds.extend([location.lng, location.lat]);
        }
        
        if (pickupLocation) {
          bounds.extend([pickupLocation.lng, pickupLocation.lat]);
        }
        
        if (dropoffLocation) {
          bounds.extend([dropoffLocation.lng, dropoffLocation.lat]);
        }
        
        if (!bounds.isEmpty()) {
          map.current.fitBounds(bounds, {
            padding: { top: 40, bottom: 40, left: 40, right: 40 },
            maxZoom: 16,
            duration: 500
          });
        }
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    }
  }, [location, pickupLocation, dropoffLocation, mapInitialized, providerName]);

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
          <div className="flex items-center gap-1">
            <Navigation className="h-4 w-4" />
            <p className="font-medium">{providerName}</p>
          </div>
          
          {location.updated_at && (
            <p className="text-xs">Last updated: {new Date(location.updated_at).toLocaleTimeString()}</p>
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
    </div>
  );
};
