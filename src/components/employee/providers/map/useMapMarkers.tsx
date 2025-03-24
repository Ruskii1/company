
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
    if (!map.current || !mapLoaded) {
      console.log('Map not ready yet', { mapCurrent: !!map.current, mapLoaded });
      return;
    }

    console.log('Adding markers for', filteredProviders.length, 'providers');

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Saudi Arabia cities with coordinates
    const saudiCities = [
      { name: 'Riyadh', coordinates: [46.6753, 24.7136] },
      { name: 'Jeddah', coordinates: [39.1925, 21.4858] },
      { name: 'Mecca', coordinates: [39.8579, 21.3891] },
      { name: 'Medina', coordinates: [39.6142, 24.5247] },
      { name: 'Dammam', coordinates: [50.1033, 26.4207] },
      { name: 'Taif', coordinates: [40.4168, 21.2570] },
      { name: 'Tabuk', coordinates: [36.5841, 28.3998] },
      { name: 'Abha', coordinates: [42.5053, 18.2164] },
      { name: 'Buraidah', coordinates: [43.9730, 26.3260] },
      { name: 'Khobar', coordinates: [50.2083, 26.2794] },
    ];

    // Add markers for each provider
    filteredProviders.forEach((provider, index) => {
      // Assign providers to cities based on region or randomly if region doesn't match
      let cityCoordinates;
      const cityMatch = saudiCities.find(city => 
        provider.region?.toLowerCase().includes(city.name.toLowerCase())
      );
      
      if (cityMatch) {
        cityCoordinates = cityMatch.coordinates;
      } else {
        // For demo: assign providers to random cities
        const cityIndex = index % saudiCities.length;
        cityCoordinates = saudiCities[cityIndex].coordinates;
      }
      
      const randomOffset = () => (Math.random() - 0.5) * 0.2; // Small random offset
      const lngLat = [
        cityCoordinates[0] + randomOffset(),
        cityCoordinates[1] + randomOffset()
      ] as [number, number];

      // Create HTML element for marker
      const markerEl = document.createElement('div');
      markerEl.className = 'provider-marker';
      markerEl.style.width = '40px';
      markerEl.style.height = '40px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.display = 'flex';
      markerEl.style.alignItems = 'center';
      markerEl.style.justifyContent = 'center';
      markerEl.style.backgroundColor = provider.availabilityStatus === 'online' 
        ? 'rgba(34, 197, 94, 0.95)' // green for online
        : 'rgba(100, 116, 139, 0.95)'; // darker gray for offline
      markerEl.style.border = '3px solid white';
      markerEl.style.boxShadow = '0 3px 8px rgba(0,0,0,0.5)';
      markerEl.style.cursor = 'pointer';
      markerEl.style.transition = 'transform 0.2s, box-shadow 0.2s';
      
      // Add hover effect
      markerEl.onmouseover = () => {
        markerEl.style.transform = 'scale(1.2)';
        markerEl.style.boxShadow = '0 5px 12px rgba(0,0,0,0.6)';
      };
      markerEl.onmouseout = () => {
        markerEl.style.transform = 'scale(1)';
        markerEl.style.boxShadow = '0 3px 8px rgba(0,0,0,0.5)';
      };
      
      // Add initials
      const initials = provider.fullName.split(' ')
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join('');
      markerEl.innerHTML = `<span style="color: white; font-weight: bold; font-size: 16px; text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">${initials}</span>`;

      // Create and add the marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(lngLat)
        .setPopup(
          new mapboxgl.Popup({ 
            offset: 25, 
            closeButton: true,
            closeOnClick: false,
            maxWidth: '300px'
          })
            .setHTML(`
              <div style="padding: 16px; min-width: 250px; font-family: system-ui, sans-serif;">
                <h3 style="margin-bottom: 12px; font-weight: bold; font-size: 18px; color: #111827; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
                  ${provider.fullName}
                </h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <p style="margin: 0; display: flex; justify-content: space-between;">
                    <span style="font-weight: 600; color: #4b5563;">Phone:</span>
                    <span style="color: #111827;">${provider.phoneNumber}</span>
                  </p>
                  <p style="margin: 0; display: flex; justify-content: space-between;">
                    <span style="font-weight: 600; color: #4b5563;">Status:</span>
                    <span style="color: ${provider.availabilityStatus === 'online' ? '#16a34a' : '#64748b'}; font-weight: bold;">
                      ${provider.availabilityStatus === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </p>
                  <p style="margin: 0; display: flex; justify-content: space-between;">
                    <span style="font-weight: 600; color: #4b5563;">Region:</span>
                    <span style="color: #111827;">${provider.region}</span>
                  </p>
                  <p style="margin: 0; margin-top: 4px; border-top: 1px solid #e5e7eb; padding-top: 8px;">
                    <span style="font-weight: 600; color: #4b5563; display: block; margin-bottom: 6px;">Services:</span>
                    <span style="color: #111827; display: block; line-height: 1.5;">
                      ${provider.serviceTypes.join(', ')}
                    </span>
                  </p>
                </div>
              </div>
            `)
        )
        .addTo(map.current!);

      // Open popup on marker click
      markerEl.addEventListener('click', () => {
        marker.togglePopup();
      });

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
        maxZoom: 12,
        duration: 1000
      });
    } else {
      // Default view of Saudi Arabia if no providers
      map.current.flyTo({
        center: [45.0792, 23.8859],
        zoom: 5,
        duration: 1000
      });
    }
  }, [filteredProviders, mapLoaded]);

  return markersRef;
};
