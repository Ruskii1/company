
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
  el.style.width = '30px';
  el.style.height = '30px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = '#4338ca';
  el.style.border = '3px solid white';
  el.style.boxShadow = '0 3px 8px rgba(0,0,0,0.3)';
  el.style.position = 'relative';
  
  // Add inner circle for better visibility
  const innerCircle = document.createElement('div');
  innerCircle.style.position = 'absolute';
  innerCircle.style.top = '50%';
  innerCircle.style.left = '50%';
  innerCircle.style.transform = 'translate(-50%, -50%)';
  innerCircle.style.width = '10px';
  innerCircle.style.height = '10px';
  innerCircle.style.borderRadius = '50%';
  innerCircle.style.backgroundColor = 'white';
  el.appendChild(innerCircle);
  
  if (location.heading !== undefined) {
    // Add direction indicator if heading is available
    const arrow = document.createElement('div');
    arrow.style.position = 'absolute';
    arrow.style.top = '-15px';
    arrow.style.left = '50%';
    arrow.style.transform = `translateX(-50%) rotate(${location.heading}deg)`;
    arrow.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 5L19 12L12 19M19 12H5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    el.appendChild(arrow);
  }
  
  // Add pulsing animation for better visibility
  const pulseCircle = document.createElement('div');
  pulseCircle.style.position = 'absolute';
  pulseCircle.style.top = '50%';
  pulseCircle.style.left = '50%';
  pulseCircle.style.transform = 'translate(-50%, -50%)';
  pulseCircle.style.width = '30px';
  pulseCircle.style.height = '30px';
  pulseCircle.style.borderRadius = '50%';
  pulseCircle.style.backgroundColor = 'rgba(67, 56, 202, 0.3)';
  pulseCircle.style.animation = 'pulse 2s infinite';
  el.appendChild(pulseCircle);
  
  // Add CSS animation for pulse effect
  if (!document.getElementById('pulse-animation')) {
    const style = document.createElement('style');
    style.id = 'pulse-animation';
    style.textContent = `
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create marker at location
  const marker = new mapboxgl.Marker(el)
    .setLngLat(lngLat);
    
  // Create popup with provider name
  const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
    .setLngLat(lngLat)
    .setHTML(`
      <div style="font-weight: bold; padding: 5px 10px;">
        <span style="display: block; font-size: 14px;">${providerName}</span>
        <span style="display: block; font-size: 12px; opacity: 0.7;">Current location</span>
      </div>
    `);
    
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
  const color = type === 'pickup' ? '#10b981' : '#ea384c';
  const label = type === 'pickup' ? 'Pickup' : 'Dropoff';
  
  // Create custom element with SVG pin
  const el = document.createElement('div');
  el.innerHTML = `
    <div style="position: relative; width: 40px; height: 40px;">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3" fill="white"></circle>
      </svg>
      <div style="
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${color};
        color: white;
        font-size: 11px;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 10px;
        white-space: nowrap;
      ">${label}</div>
    </div>
  `;
  
  // Create and return marker
  return new mapboxgl.Marker(el)
    .setLngLat(lngLat)
    .setPopup(
      new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div style="padding: 8px 12px;">
            <strong style="display: block; margin-bottom: 4px; color: ${color};">${type === 'pickup' ? 'Pickup' : 'Dropoff'} Location</strong>
            <span style="font-size: 12px;">${location.address}</span>
          </div>
        `)
    );
};
