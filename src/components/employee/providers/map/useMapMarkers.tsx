
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
      markerEl.style.width = '36px';
      markerEl.style.height = '36px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.display = 'flex';
      markerEl.style.alignItems = 'center';
      markerEl.style.justifyContent = 'center';
      markerEl.style.backgroundColor = provider.availabilityStatus === 'online' 
        ? 'rgba(34, 197, 94, 0.9)' // green for online
        : 'rgba(148, 163, 184, 0.9)'; // gray for offline
      markerEl.style.border = '2px solid white';
      markerEl.style.boxShadow = '0 2px 6px rgba(0,0,0,0.4)';
      markerEl.style.cursor = 'pointer';
      markerEl.style.transition = 'transform 0.2s';
      
      // Add hover effect
      markerEl.onmouseover = () => {
        markerEl.style.transform = 'scale(1.1)';
      };
      markerEl.onmouseout = () => {
        markerEl.style.transform = 'scale(1)';
      };
      
      // Add initials
      const initials = provider.fullName.split(' ')
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join('');
      markerEl.innerHTML = `<span style="color: white; font-weight: bold; font-size: 14px;">${initials}</span>`;

      // Create and add the marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(lngLat)
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
              <div style="padding: 12px; min-width: 200px;">
                <h3 style="margin-bottom: 8px; font-weight: bold; font-size: 16px;">${provider.fullName}</h3>
                <p style="margin-bottom: 6px;"><strong>Phone:</strong> ${provider.phoneNumber}</p>
                <p style="margin-bottom: 6px;"><strong>Status:</strong> 
                  <span style="color: ${provider.availabilityStatus === 'online' ? '#22c55e' : '#94a3b8'}; font-weight: bold;">
                    ${provider.availabilityStatus === 'online' ? 'Online' : 'Offline'}
                  </span>
                </p>
                <p style="margin-bottom: 6px;"><strong>Region:</strong> ${provider.region}</p>
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
