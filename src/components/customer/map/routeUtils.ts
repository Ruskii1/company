
import mapboxgl from 'mapbox-gl';
import { calculateRoutes } from './directionsApi';

/**
 * Updates the route lines between points using the Mapbox Directions API
 */
export const updateRouteLine = async (
  map: mapboxgl.Map,
  locations: Array<{ lng: number; lat: number } | undefined>
): Promise<void> => {
  try {
    const validLocations = locations.filter(Boolean) as { lng: number; lat: number }[];
    
    if (validLocations.length < 2) return;
    
    // Get the access token from the map instance
    const accessToken = mapboxgl.accessToken;
    
    // Calculate the routes
    const { providerToPickup, pickupToDropoff } = await calculateRoutes(validLocations, accessToken);
    
    // Update the provider-to-pickup route source
    const providerToPickupSource = map.getSource('route-provider-to-pickup') as mapboxgl.GeoJSONSource;
    if (providerToPickupSource && providerToPickup) {
      providerToPickupSource.setData(providerToPickup);
    } else if (providerToPickupSource) {
      // If API failed but we have coordinates, fallback to straight line
      providerToPickupSource.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [validLocations[0].lng, validLocations[0].lat],
            [validLocations[1]?.lng || 0, validLocations[1]?.lat || 0]
          ]
        }
      });
    }
    
    // Update the pickup-to-dropoff route source
    const pickupToDropoffSource = map.getSource('route-pickup-to-dropoff') as mapboxgl.GeoJSONSource;
    if (pickupToDropoffSource && pickupToDropoff && validLocations.length >= 3) {
      pickupToDropoffSource.setData(pickupToDropoff);
    } else if (pickupToDropoffSource && validLocations.length >= 3) {
      // If API failed but we have coordinates, fallback to straight line
      pickupToDropoffSource.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [validLocations[1].lng, validLocations[1].lat],
            [validLocations[2].lng, validLocations[2].lat]
          ]
        }
      });
    }
  } catch (error) {
    console.error('Error updating route lines:', error);
  }
};
