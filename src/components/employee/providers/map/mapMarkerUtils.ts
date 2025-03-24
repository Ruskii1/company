
import mapboxgl from 'mapbox-gl';
import { ServiceProvider } from '@/types/provider';
import { markerColors, saudiCities } from './mapConstants';

// Helper function to create a small random offset for marker positions
export const randomOffset = (): number => (Math.random() - 0.5) * 0.2;

// Get city coordinates based on provider region or assign to a random city
export const getCityCoordinates = (provider: ServiceProvider, index: number): [number, number] => {
  // Try to find a city match from the provider's region
  const cityMatch = saudiCities.find(city => 
    provider.region?.toLowerCase().includes(city.name.toLowerCase())
  );
  
  let cityCoordinates;
  if (cityMatch) {
    cityCoordinates = cityMatch.coordinates;
  } else {
    // For demo: assign providers to random cities
    const cityIndex = index % saudiCities.length;
    cityCoordinates = saudiCities[cityIndex].coordinates;
  }
  
  // Add a small random offset to avoid overlapping markers
  return [
    cityCoordinates[0] + randomOffset(),
    cityCoordinates[1] + randomOffset()
  ] as [number, number];
};

// Create marker element for the map
export const createMarkerElement = (provider: ServiceProvider): HTMLDivElement => {
  const markerBgColor = provider.availabilityStatus === 'online' 
    ? markerColors.online 
    : markerColors.offline;

  // Create container element
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
  
  // Create inner content element for hover effects
  const markerContent = document.createElement('div');
  markerContent.style.width = '100%';
  markerContent.style.height = '100%';
  markerContent.style.display = 'flex';
  markerContent.style.alignItems = 'center';
  markerContent.style.justifyContent = 'center';
  markerContent.style.transition = 'transform 0.2s';
  markerEl.appendChild(markerContent);
  
  // Add hover effects
  markerEl.onmouseover = () => {
    markerContent.style.transform = 'scale(1.2)';
    markerEl.style.boxShadow = '0 5px 12px rgba(0,0,0,0.4)';
  };
  
  markerEl.onmouseout = () => {
    markerContent.style.transform = 'scale(1)';
    markerEl.style.boxShadow = '0 3px 8px rgba(0,0,0,0.2)';
  };
  
  // Add provider initials
  const initials = provider.fullName.split(' ')
    .map(name => name.charAt(0))
    .slice(0, 2)
    .join('');
  markerContent.innerHTML = `<span style="color: white; font-weight: bold; font-size: 16px;">${initials}</span>`;

  return markerEl;
};
