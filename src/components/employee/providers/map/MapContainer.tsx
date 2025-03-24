
import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceProvider } from '@/types/provider';
import { useMapMarkers } from './useMapMarkers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

// We'll use a default token initially, but allow the user to provide their own
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

interface MapContainerProps {
  filteredProviders: ServiceProvider[];
}

const MapContainer: React.FC<MapContainerProps> = ({ filteredProviders }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [token, setToken] = useState(() => {
    // Try to get token from localStorage if available
    const savedToken = localStorage.getItem('mapbox_token');
    return savedToken || DEFAULT_MAPBOX_TOKEN;
  });
  const [inputToken, setInputToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  // Initialize or reinitialize the map when token changes
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
      mapboxgl.accessToken = token;

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
        setMapError('Failed to load map. Your token might be invalid or restricted.');
        setShowTokenInput(true);
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please try with a different token.');
      setShowTokenInput(true);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    }
  }, [token]);

  // Handle markers
  useMapMarkers(map, filteredProviders, mapLoaded);

  // Save token to localStorage and update the active token
  const handleUpdateToken = () => {
    if (inputToken.trim()) {
      localStorage.setItem('mapbox_token', inputToken.trim());
      setToken(inputToken.trim());
      setShowTokenInput(false);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Token input section */}
      {(showTokenInput || mapError) && (
        <div className="absolute top-0 left-0 z-20 w-full p-4 bg-white/90 backdrop-blur-sm rounded-t-lg">
          <Alert className="mb-4">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Please enter your Mapbox token. You can get one for free at{' '}
              <a 
                href="https://www.mapbox.com/account/access-tokens" 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                mapbox.com
              </a>
            </AlertDescription>
          </Alert>
          
          {mapError && <p className="text-red-500 mb-2 text-sm">{mapError}</p>}
          
          <div className="flex gap-2">
            <Input
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              placeholder="Enter your Mapbox token"
              className="flex-1"
            />
            <Button onClick={handleUpdateToken}>Update Map</Button>
          </div>
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full min-h-[600px] rounded-lg" />
    </div>
  );
};

export default MapContainer;
