
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ServiceProvider } from '@/types/provider';
import { createMarkerElement, getCityCoordinates } from './mapMarkerUtils';
import { createProviderPopup } from './popupUtils';
import { fitMapToMarkers } from './mapViewUtils';
import { useLanguageStore } from '@/lib/i18n';

export const useMapMarkers = (
  map: React.MutableRefObject<mapboxgl.Map | null>,
  filteredProviders: ServiceProvider[],
  mapLoaded: boolean
) => {
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const { language } = useLanguageStore();

  useEffect(() => {
    if (!map.current || !mapLoaded) {
      console.log('Map not ready yet', { mapCurrent: !!map.current, mapLoaded });
      return;
    }

    console.log('Adding markers for', filteredProviders.length, 'providers');

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add markers for each provider
    filteredProviders.forEach((provider, index) => {
      // Get coordinates for the marker
      const lngLat = getCityCoordinates(provider, index);
      
      // Create the marker element
      const markerEl = createMarkerElement(provider);

      // Create popup for the marker with current language
      const popup = createProviderPopup(provider, language);

      // Create and add the marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(lngLat)
        .setPopup(popup)
        .addTo(map.current!);

      // Fix: Open popup on marker click with proper event handling
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        
        // Close all other popups first
        Object.values(markersRef.current).forEach(m => {
          if (m !== marker) {
            m.getPopup().remove();
          }
        });
        
        // Open this marker's popup
        popup.addTo(map.current!);
      });

      markersRef.current[provider.id] = marker;
    });

    // Adjust map bounds to fit all markers
    if (map.current) {
      fitMapToMarkers(map.current, markersRef.current);
    }
  }, [filteredProviders, mapLoaded, language]);

  return markersRef;
};
