
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { createProviderMarker, createLocationMarker } from './markerUtils';
import { updateRouteLine } from './routeUtils';
import { fitMapBounds } from './mapInitialization';

interface UseMapMarkersProps {
  map: mapboxgl.Map | null;
  mapInitialized: boolean;
  providerLocation?: {
    lat: number;
    lng: number;
    heading?: number;
  };
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

export const useMapMarkers = ({
  map,
  mapInitialized,
  providerLocation,
  providerName,
  pickupLocation,
  dropoffLocation
}: UseMapMarkersProps) => {
  const providerMarker = useRef<mapboxgl.Marker | null>(null);
  const pickupMarker = useRef<mapboxgl.Marker | null>(null);
  const dropoffMarker = useRef<mapboxgl.Marker | null>(null);
  const routeLine = useRef<mapboxgl.GeoJSONSource | null>(null);

  // Initialize route source reference
  useEffect(() => {
    if (!map || !mapInitialized) return;

    routeLine.current = map.getSource('route') as mapboxgl.GeoJSONSource;
  }, [mapInitialized, map]);

  // Update markers and route when locations change
  useEffect(() => {
    if (!map || !mapInitialized) return;
    
    // Update provider marker
    if (providerLocation) {
      try {
        // If the marker doesn't exist yet, create it
        if (!providerMarker.current) {
          const { marker, popup } = createProviderMarker(providerLocation, providerName);
          marker.addTo(map);
          popup.addTo(map);
          providerMarker.current = marker;
        } else {
          // Update marker position
          providerMarker.current.setLngLat([providerLocation.lng, providerLocation.lat]);
          
          // Update rotation based on heading if available
          if (providerLocation.heading !== undefined) {
            const el = providerMarker.current.getElement();
            const arrow = el.querySelector('div');
            if (arrow) {
              arrow.style.transform = `translateX(-50%) rotate(${providerLocation.heading}deg)`;
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
        if (!pickupMarker.current) {
          pickupMarker.current = createLocationMarker(pickupLocation, 'pickup');
          pickupMarker.current.addTo(map);
        } else {
          pickupMarker.current.setLngLat([pickupLocation.lng, pickupLocation.lat]);
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
        if (!dropoffMarker.current) {
          dropoffMarker.current = createLocationMarker(dropoffLocation, 'dropoff');
          dropoffMarker.current.addTo(map);
        } else {
          dropoffMarker.current.setLngLat([dropoffLocation.lng, dropoffLocation.lat]);
        }
      } catch (error) {
        console.error('Error updating dropoff marker:', error);
      }
    } else if (dropoffMarker.current) {
      dropoffMarker.current.remove();
      dropoffMarker.current = null;
    }
    
    // Update route line if we have provider location and destination points
    if (routeLine.current && providerLocation) {
      updateRouteLine(
        routeLine.current, 
        [providerLocation, pickupLocation, dropoffLocation]
      );
    }
    
    // Auto-fit the map to show only relevant markers
    if (map && (providerLocation || pickupLocation || dropoffLocation)) {
      fitMapBounds(map, [providerLocation, pickupLocation, dropoffLocation]);
    }
  }, [providerLocation, pickupLocation, dropoffLocation, mapInitialized, providerName, map]);

  return {
    providerMarker: providerMarker.current,
    pickupMarker: pickupMarker.current,
    dropoffMarker: dropoffMarker.current
  };
};
