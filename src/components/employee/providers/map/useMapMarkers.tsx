
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { ServiceProvider } from '@/types/provider';

// Bright background colors for provider markers
const markerColors = {
  online: [
    '#F2FCE2', // Soft Green 
    '#FEF7CD', // Soft Yellow
    '#FFDEE2', // Soft Pink
    '#E5DEFF', // Soft Purple
    '#D3E4FD', // Soft Blue
  ],
  offline: [
    '#FDE1D3', // Soft Peach
    '#FEC6A1', // Soft Orange
    '#E5E7EB', // Light Gray
  ]
};

// Get a random bright color based on provider status
const getMarkerColor = (status: string): string => {
  const colorArray = status === 'online' ? markerColors.online : markerColors.offline;
  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
};

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

      // Get bright background color for marker
      const markerBgColor = getMarkerColor(provider.availabilityStatus);

      // Create HTML element for marker
      const markerEl = document.createElement('div');
      markerEl.className = 'provider-marker';
      markerEl.style.width = '40px';
      markerEl.style.height = '40px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.display = 'flex';
      markerEl.style.alignItems = 'center';
      markerEl.style.justifyContent = 'center';
      markerEl.style.backgroundColor = markerBgColor;
      markerEl.style.border = '3px solid white';
      markerEl.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
      markerEl.style.cursor = 'pointer';
      
      // Fix: Apply transform to the content inside the marker element, not the marker itself
      // This prevents the marker from moving positions on hover
      const markerContent = document.createElement('div');
      markerContent.style.width = '100%';
      markerContent.style.height = '100%';
      markerContent.style.display = 'flex';
      markerContent.style.alignItems = 'center';
      markerContent.style.justifyContent = 'center';
      markerContent.style.transition = 'transform 0.2s';
      markerEl.appendChild(markerContent);
      
      // Add hover effect to the inner content, not the marker container
      markerEl.onmouseover = () => {
        markerContent.style.transform = 'scale(1.2)';
        markerEl.style.boxShadow = '0 5px 12px rgba(0,0,0,0.4)';
      };
      
      markerEl.onmouseout = () => {
        markerContent.style.transform = 'scale(1)';
        markerEl.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
      };
      
      // Add initials
      const initials = provider.fullName.split(' ')
        .map(name => name.charAt(0))
        .slice(0, 2)
        .join('');
      markerContent.innerHTML = `<span style="color: #222222; font-weight: bold; font-size: 16px;">${initials}</span>`;

      // Create popup for the marker with improved contrast for visibility
      const popup = new mapboxgl.Popup({ 
        offset: 25, 
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px'
      })
      .setHTML(`
        <div style="padding: 16px; min-width: 250px; font-family: system-ui, sans-serif;">
          <h3 style="margin-bottom: 12px; font-weight: bold; font-size: 18px; color: #111827; background-color: ${markerBgColor}; padding: 8px; border-radius: 6px; text-align: center;">
            ${provider.fullName}
          </h3>
          <div style="display: flex; flex-direction: column; gap: 10px; background-color: white; padding: 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <p style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #4b5563; font-size: 14px;">Phone:</span>
              <span style="color: #111827; font-weight: 500; font-size: 14px; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${provider.phoneNumber}</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #4b5563; font-size: 14px;">Status:</span>
              <span style="color: white; font-weight: bold; font-size: 14px; background-color: ${provider.availabilityStatus === 'online' ? '#16a34a' : '#64748b'}; padding: 4px 8px; border-radius: 4px;">
                ${provider.availabilityStatus === 'online' ? 'Online' : 'Offline'}
              </span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 600; color: #4b5563; font-size: 14px;">Region:</span>
              <span style="color: #111827; font-weight: 500; font-size: 14px; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${provider.region}</span>
            </p>
            <div style="margin: 0; margin-top: 8px; border-top: 1px solid #e5e7eb; padding-top: 8px;">
              <span style="font-weight: 600; color: #4b5563; display: block; margin-bottom: 6px; font-size: 14px;">Services:</span>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${provider.serviceTypes.map(service => 
                  `<span style="color: #111827; background-color: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 500;">${service}</span>`
                ).join('')}
              </div>
            </div>
          </div>
          <div style="margin-top: 12px; font-size: 12px; color: #6b7280; text-align: center;">
            Click marker to show/hide this information
          </div>
        </div>
      `);

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
