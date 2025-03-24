
import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ServiceProvider } from '@/types/provider';
import { useMapMarkers } from './useMapMarkers';

// Define map token - in a real app, this would come from environment variables
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xvdmFibGVhcHAifQ.eCt6U_V-5lYPtYRXD_m9DQ';

interface MapContainerProps {
  filteredProviders: ServiceProvider[];
}

const MapContainer: React.FC<MapContainerProps> = ({ filteredProviders }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

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
    <div ref={mapContainer} className="w-full h-full min-h-[600px] rounded-lg" />
  );
};

export default MapContainer;
