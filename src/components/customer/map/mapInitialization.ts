
import mapboxgl from 'mapbox-gl';

/**
 * Initialize a new mapbox map
 */
export const initializeMap = (container: HTMLDivElement, center: [number, number]) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWVzaGFyaXNoIiwiYSI6ImNtOG1mMzBtMzE4Z2kyaXNlbnFkamtyOGIifQ.iOVBnnIexOXqR8oHq2H00w';
  
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v12',
    center,
    zoom: 10,
  });
  
  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
  return map;
};

/**
 * Set up map sources and layers for routing
 */
export const setupMapSources = (map: mapboxgl.Map, onComplete: () => void) => {
  map.on('load', () => {
    // Add source for provider-to-pickup route
    map.addSource('route-provider-to-pickup', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    });
    
    // Add source for pickup-to-dropoff route
    map.addSource('route-pickup-to-dropoff', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    });
    
    // Add layer for provider-to-pickup route (blue)
    map.addLayer({
      id: 'route-provider-to-pickup-line',
      type: 'line',
      source: 'route-provider-to-pickup',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#1EAEDB', // Blue
        'line-width': 4,
        'line-opacity': 0.75
      }
    });
    
    // Add layer for pickup-to-dropoff route (red)
    map.addLayer({
      id: 'route-pickup-to-dropoff-line',
      type: 'line',
      source: 'route-pickup-to-dropoff',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#ea384c', // Red
        'line-width': 4,
        'line-opacity': 0.75
      }
    });
    
    onComplete();
  });
};

/**
 * Fit the map bounds to include all relevant markers
 */
export const fitMapBounds = (
  map: mapboxgl.Map,
  points: Array<{ lng: number; lat: number } | undefined>
) => {
  const validPoints = points.filter(Boolean) as Array<{ lng: number; lat: number }>;
  
  if (validPoints.length === 0) return;
  
  const bounds = new mapboxgl.LngLatBounds();
  
  // Add all points to bounds
  validPoints.forEach(point => {
    bounds.extend([point.lng, point.lat]);
  });
  
  // Add padding around bounds
  map.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    maxZoom: 14
  });
};
