
import { supabase } from "@/integrations/supabase/client";

export interface ProviderLocationUpdate {
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
}

/**
 * Updates the provider's location in the database
 */
export async function updateProviderLocation(
  providerId: string, 
  location: ProviderLocationUpdate
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('providers_location')
      .upsert({
        provider_id: providerId,
        lat: location.lat,
        lng: location.lng,
        heading: location.heading || 0,
        speed: location.speed || 0,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'provider_id'
      });

    if (error) {
      console.error('Error updating provider location:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error updating location:', error);
    return false;
  }
}

/**
 * Simulates a provider moving along a route
 * (This is for demonstration purposes)
 */
export function simulateProviderRoute(
  providerId: string,
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  durationSeconds: number = 60,
  updateIntervalMs: number = 2000
): {
  start: () => void;
  stop: () => void;
} {
  let intervalId: number | null = null;
  
  // Calculate increments for each update
  const totalUpdates = (durationSeconds * 1000) / updateIntervalMs;
  const latIncrement = (endLat - startLat) / totalUpdates;
  const lngIncrement = (endLng - startLng) / totalUpdates;
  
  let currentStep = 0;
  
  const startSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    currentStep = 0;
    
    // Update location immediately with starting position
    updateProviderLocation(providerId, {
      lat: startLat,
      lng: startLng,
      heading: calculateHeading(startLat, startLng, endLat, endLng),
      speed: 30 // km/h, just a placeholder
    });
    
    // Set up interval for updates
    intervalId = window.setInterval(() => {
      currentStep++;
      
      // Calculate current position
      const progress = currentStep / totalUpdates;
      const lat = startLat + (latIncrement * currentStep);
      const lng = startLng + (lngIncrement * currentStep);
      
      // Update location
      updateProviderLocation(providerId, {
        lat,
        lng,
        heading: calculateHeading(startLat, startLng, endLat, endLng),
        speed: 30 * (1 - Math.abs(2 * progress - 1)) // Simulate slowing down at start/end
      });
      
      // Stop when we reach the end
      if (currentStep >= totalUpdates) {
        stopSimulation();
      }
    }, updateIntervalMs);
  };
  
  const stopSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
  
  return {
    start: startSimulation,
    stop: stopSimulation
  };
}

/**
 * Calculate heading in degrees (0-360) between two points
 */
function calculateHeading(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  
  const y = Math.sin(dLng) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
  
  let heading = Math.atan2(y, x) * 180 / Math.PI;
  
  // Convert to 0-360 degrees
  heading = (heading + 360) % 360;
  
  return heading;
}
