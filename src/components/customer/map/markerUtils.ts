
import mapboxgl from 'mapbox-gl';

/**
 * Creates a provider marker with appropriate styling
 */
export const createProviderMarker = (
  location: { lng: number; lat: number; heading?: number },
  providerName: string
): { marker: mapboxgl.Marker; popup: mapboxgl.Popup } => {
  const lngLat: [number, number] = [location.lng, location.lat];
  
  // Create custom marker element
  const el = document.createElement('div');
  el.className = 'provider-marker';
  el.style.width = '24px';
  el.style.height = '24px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = '#4338ca';
  el.style.border = '3px solid white';
  el.style.boxShadow = '0 3px 8px rgba(0,0,0,0.3)';
  
  if (location.heading !== undefined) {
    // Add direction indicator if heading is available
    const arrow = document.createElement('div');
    arrow.style.position = 'absolute';
    arrow.style.top = '-12px';
    arrow.style.left = '50%';
    arrow.style.transform = `translateX(-50%) rotate(${location.heading}deg)`;
    arrow.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5L19 12L12 19M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    el.appendChild(arrow);
  }
  
  // Create marker at location
  const marker = new mapboxgl.Marker(el)
    .setLngLat(lngLat);
    
  // Create popup with provider name
  const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
    .setLngLat(lngLat)
    .setHTML(`<p style="margin: 0; font-weight: bold;">${providerName}</p>`);
    
  return { marker, popup };
};

/**
 * Creates a location marker (pickup or dropoff)
 */
export const createLocationMarker = (
  location: { lng: number; lat: number; address: string },
  type: 'pickup' | 'dropoff'
): mapboxgl.Marker => {
  const lngLat: [number, number] = [location.lng, location.lat];
  const color = type === 'pickup' ? '#10b981' : '#ef4444';
  
  // Create custom element
  const el = document.createElement('div');
  el.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>`;
  
  // Create and return marker
  return new mapboxgl.Marker(el)
    .setLngLat(lngLat)
    .setPopup(
      new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`<p style="margin: 0;"><strong>${type === 'pickup' ? 'Pickup' : 'Dropoff'}:</strong> ${location.address}</p>`)
    );
};
