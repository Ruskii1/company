
import mapboxgl from 'mapbox-gl';

interface GeoJSONFeature {
  type: 'Feature';
  properties: Record<string, any>;
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
}

// Get directions between two points using Mapbox Directions API
export const getDirections = async (
  start: [number, number],
  end: [number, number],
  mapboxToken: string
): Promise<GeoJSONFeature | null> => {
  try {
    // Build request URL - using the Mapbox Directions API
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxToken}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.routes || !data.routes.length) {
      console.error('No routes found', data);
      return null;
    }
    
    return {
      type: 'Feature',
      properties: {},
      geometry: data.routes[0].geometry
    };
  } catch (error) {
    console.error('Error fetching directions:', error);
    return null;
  }
};

// Calculate routes between multiple points
export const calculateRoutes = async (
  locations: Array<{ lng: number; lat: number } | undefined>,
  mapboxToken: string
): Promise<{
  providerToPickup: GeoJSONFeature | null;
  pickupToDropoff: GeoJSONFeature | null;
}> => {
  const validLocations = locations.filter(Boolean) as { lng: number; lat: number }[];
  
  if (validLocations.length < 2) {
    return {
      providerToPickup: null,
      pickupToDropoff: null
    };
  }
  
  let providerToPickup = null;
  let pickupToDropoff = null;
  
  // Provider to pickup route (if we have both provider and pickup locations)
  if (validLocations.length >= 2) {
    const start: [number, number] = [validLocations[0].lng, validLocations[0].lat];
    const end: [number, number] = [validLocations[1].lng, validLocations[1].lat];
    providerToPickup = await getDirections(start, end, mapboxToken);
  }
  
  // Pickup to dropoff route (if we have all three locations)
  if (validLocations.length >= 3) {
    const start: [number, number] = [validLocations[1].lng, validLocations[1].lat];
    const end: [number, number] = [validLocations[2].lng, validLocations[2].lat];
    pickupToDropoff = await getDirections(start, end, mapboxToken);
  }
  
  return {
    providerToPickup,
    pickupToDropoff
  };
};
