
import mapboxgl from 'mapbox-gl';

// Adjust map bounds to fit all markers
export const fitMapToMarkers = (
  map: mapboxgl.Map,
  markers: { [key: string]: mapboxgl.Marker }
): void => {
  if (Object.keys(markers).length === 0) {
    // Default view of Saudi Arabia if no providers
    map.flyTo({
      center: [45.0792, 23.8859],
      zoom: 5,
      duration: 1000
    });
    return;
  }

  const bounds = new mapboxgl.LngLatBounds();
  
  Object.values(markers).forEach(marker => {
    bounds.extend(marker.getLngLat());
  });
  
  map.fitBounds(bounds, {
    padding: 70,
    maxZoom: 12,
    duration: 1000
  });
};
