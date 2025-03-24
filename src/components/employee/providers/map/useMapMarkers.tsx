
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ServiceProvider } from '@/types/provider';

export const useMapMarkers = (
  map: React.MutableRefObject<mapboxgl.Map | null>,
  filteredProviders: ServiceProvider[],
  mapLoaded: boolean
) => {
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Random locations in Saudi Arabia for demo purposes
    // In a real app, these would come from the provider data
    const saudiCities = [
      { name: 'Riyadh', coordinates: [46.6753, 24.7136] },
      { name: 'Jeddah', coordinates: [39.1925, 21.4858] },
      { name: 'Mecca', coordinates: [39.8579, 21.3891] },
      { name: 'Medina', coordinates: [39.6142, 24.5247] },
      { name: 'Dammam', coordinates: [50.1033, 26.4207] },
      { name: 'Taif', coordinates: [40.4168, 21.2570] },
    ];

    // Add markers for each provider
    filteredProviders.forEach((provider, index) => {
      // For demo: assign providers to random cities
      const cityIndex = index % saudiCities.length;
      const randomOffset = () => (Math.random() - 0.5) * 0.5 // Small random offset for visual separation
      const lngLat = [
        saudiCities[cityIndex].coordinates[0] + randomOffset(),
        saudiCities[cityIndex].coordinates[1] + randomOffset()
      ] as [number, number];

      // Create HTML element for marker
      const markerEl = document.createElement('div');
      markerEl.className = 'provider-marker';
      markerEl.style.width = '30px';
      markerEl.style.height = '30px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.display = 'flex';
      markerEl.style.alignItems = 'center';
      markerEl.style.justifyContent = 'center';
      markerEl.style.backgroundColor = provider.availabilityStatus === 'online' 
        ? 'rgba(34, 197, 94, 0.8)' // green for online
        : 'rgba(148, 163, 184, 0.8)'; // gray for offline
      markerEl.style.border = '2px solid white';
      markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      markerEl.style.cursor = 'pointer';
      
      // Add initials
      const initials = provider.fullName.split(' ')
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join('');
      markerEl.innerHTML = `<span style="color: white; font-weight: bold; font-size: 12px;">${initials}</span>`;

      // Create and add the marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(lngLat)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px;">
                <h3 style="margin-bottom: 8px; font-weight: bold;">${provider.fullName}</h3>
                <p style="margin-bottom: 4px;"><strong>Phone:</strong> ${provider.phoneNumber}</p>
                <p style="margin-bottom: 4px;"><strong>Status:</strong> ${provider.availabilityStatus}</p>
                <p style="margin-bottom: 4px;"><strong>Region:</strong> ${provider.region}</p>
                <p><strong>Services:</strong> ${provider.serviceTypes.join(', ')}</p>
              </div>
            `)
        )
        .addTo(map.current!);

      markersRef.current[provider.id] = marker;
    });

    // Adjust map bounds to fit all markers if there are any
    if (filteredProviders.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      
      Object.values(markersRef.current).forEach(marker => {
        bounds.extend(marker.getLngLat());
      });
      
      map.current.fitBounds(bounds, {
        padding: 70,
        maxZoom: 15,
        duration: 1000
      });
    }
  }, [filteredProviders, mapLoaded]);

  return markersRef;
};
