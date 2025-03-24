
import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceProvider } from '@/types/provider';
import { useMapMarkers } from './useMapMarkers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

// Use the token provided by the user
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVzaGFyaXNoIiwiYSI6ImNtOG1mMzBtMzE4Z2kyaXNlbnFkamtyOGIifQ.iOVBnnIexOXqR8oHq2H00w';

interface MapContainerProps {
  filteredProviders: ServiceProvider[];
}

const MapContainer: React.FC<MapContainerProps> = ({ filteredProviders }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize the map using the provided token
  useEffect(() => {
    // First clean up any existing map instance
    if (map.current) {
      map.current.remove();
      map.current = null;
      setMapLoaded(false);
      setMapError(null);
    }

    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [45.0792, 23.8859], // Center on Saudi Arabia
        zoom: 5,
        attributionControl: false
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));

      map.current.on('load', () => {
        setMapLoaded(true);
        console.log('Map loaded successfully');
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map. There may be an issue with the map token or connection.');
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your console for details.');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    }
  }, []);

  // Handle markers
  useMapMarkers(map, filteredProviders, mapLoaded);

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Show error message if map fails to load */}
      {mapError && (
        <div className="absolute top-0 left-0 z-20 w-full p-4 bg-white/90 backdrop-blur-sm rounded-t-lg">
          <Alert className="mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              {mapError}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full min-h-[600px] rounded-lg" />
    </div>
  );
};

export default MapContainer;
