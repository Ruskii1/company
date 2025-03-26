import mapboxgl from 'mapbox-gl';

// Use the Mapbox token from our code
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVzaGFyaXNoIiwiYSI6ImNtOG1mMzBtMzE4Z2kyaXNlbnFkamtyOGIifQ.iOVBnnIexOXqR8oHq2H00w';

/**
 * Initializes a Mapbox map instance with default settings
 */
export const initializeMap = (
  container: HTMLDivElement,
  initialCenter: [number, number]
): mapboxgl.Map => {
  // Initialize Mapbox with token
  mapboxgl.accessToken = MAPBOX_TOKEN;
  
  // Create map instance
  const map = new mapboxgl.Map({
    container: container,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: initialCenter,
    zoom: 15, // Start with a closer zoom level
    attributionControl: false,
    dragRotate: false, // Disable 3D rotation for simpler UI
    pitchWithRotate: false // Disable pitch with rotate
  });

  // Add minimal controls - only zoom
  map.addControl(
    new mapboxgl.NavigationControl({ showCompass: false }), 
    'top-right'
  );
  map.addControl(
    new mapboxgl.AttributionControl({ compact: true })
  );
  
  // Disable map rotation to keep UI simple
  map.dragRotate.disable();
  map.touchZoomRotate.disableRotation();
  
  return map;
};

/**
 * Sets up map event listeners and sources
 */
export const setupMapSources = (map: mapboxgl.Map, onMapLoad: () => void): void => {
  // Set up event listeners
  map.on('load', () => {
    // Add route source when map loads
    map.addSource('route', {
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
    
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#4338ca',
        'line-width': 4,
        'line-opacity': 0.8
      }
    });
    
    onMapLoad();
  });
};

/**
 * Fits the map bounds to show all markers
 */
export const fitMapBounds = (
  map: mapboxgl.Map,
  locations: Array<{ lng: number; lat: number } | undefined>
): void => {
  try {
    const validLocations = locations.filter(Boolean) as { lng: number; lat: number }[];
    
    if (validLocations.length === 0) return;
    
    const bounds = new mapboxgl.LngLatBounds();
    
    validLocations.forEach(location => {
      bounds.extend([location.lng, location.lat]);
    });
    
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
        maxZoom: 16,
        duration: 500
      });
    }
  } catch (error) {
    console.error('Error fitting bounds:', error);
  }
};
