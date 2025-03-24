
import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceProvider } from '@/types/provider';
import { useMapMarkers } from './useMapMarkers';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { useTheme } from '@/lib/theme';

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
  const { theme } = useTheme();

  // Add custom CSS for mapbox popups
  useEffect(() => {
    // Add custom styles for Mapbox popups
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-popup {
        z-index: 1;
      }
      
      .mapboxgl-popup-content {
        padding: 0;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-color: white;
        color: #111827;
      }
      
      .mapboxgl-popup-close-button {
        top: 8px;
        right: 8px;
        padding: 6px;
        color: #4b5563;
        font-size: 20px;
        font-weight: bold;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0;
      }
      
      .mapboxgl-popup-close-button:hover {
        background: rgba(255, 255, 255, 1);
        color: #1f2937;
      }
      
      .dark .mapboxgl-popup-content {
        background-color: #1f2937;
        color: #f3f4f6;
      }
      
      .dark .mapboxgl-popup-content h3 {
        color: #f3f4f6;
        background-color: #374151;
      }
      
      .dark .mapboxgl-popup-content .provider-info {
        background-color: #1f2937;
      }
      
      .dark .mapboxgl-popup-content span[style*="background-color: #f3f4f6"] {
        background-color: #374151 !important;
        color: #f3f4f6 !important;
      }
      
      .dark .mapboxgl-popup-close-button {
        color: #f3f4f6;
        background: rgba(31, 41, 55, 0.8);
      }
      
      .dark .mapboxgl-popup-close-button:hover {
        background: rgba(31, 41, 55, 1);
      }
      
      .mapboxgl-ctrl-logo {
        margin: 0 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [theme]); // Add theme dependency to update styles when theme changes

  // Initialize the map
  useEffect(() => {
    if (map.current) return; // Don't initialize if map already exists
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: theme === 'dark' 
          ? 'mapbox://styles/mapbox/dark-v11'
          : 'mapbox://styles/mapbox/streets-v12',
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
  }, [theme]); // Add theme dependency to update map style when theme changes

  // Update map style when theme changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      map.current.setStyle(
        theme === 'dark'
          ? 'mapbox://styles/mapbox/dark-v11'
          : 'mapbox://styles/mapbox/streets-v12'
      );
    }
  }, [theme, mapLoaded]);

  // Handle markers
  useMapMarkers(map, filteredProviders, mapLoaded);

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Show error message if map fails to load */}
      {mapError && (
        <div className="absolute top-0 left-0 z-20 w-full p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-t-lg">
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
