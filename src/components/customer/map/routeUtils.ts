
import mapboxgl from 'mapbox-gl';

/**
 * Updates the route line between points
 */
export const updateRouteLine = (
  routeSource: mapboxgl.GeoJSONSource,
  locations: Array<{ lng: number; lat: number } | undefined>
): void => {
  try {
    const validLocations = locations.filter(Boolean) as { lng: number; lat: number }[];
    
    if (validLocations.length < 2) return;
    
    const coordinates = validLocations.map(loc => [loc.lng, loc.lat]);
    
    // Update the route line
    routeSource.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    });
  } catch (error) {
    console.error('Error updating route line:', error);
  }
};
