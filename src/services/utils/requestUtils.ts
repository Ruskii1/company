
import { Json } from "@/integrations/supabase/types";
import { Request } from "@/types/request";

/**
 * Safely extracts car information from JSON data
 */
export function extractCarInfo(carData: Json | null): Request['car'] | undefined {
  if (!carData || typeof carData !== 'object' || Array.isArray(carData)) {
    return undefined;
  }
  
  const car = carData as Record<string, Json>;
  
  return {
    model: typeof car.model === 'string' ? car.model : '',
    year: typeof car.year === 'string' ? car.year : '',
    licensePlate: typeof car.licensePlate === 'string' ? car.licensePlate : '',
    licensePlateArabic: typeof car.licensePlateArabic === 'string' ? car.licensePlateArabic : '',
    vin: typeof car.vin === 'string' ? car.vin : ''
  };
}

/**
 * Extracts city from a location string
 */
export function extractCityFromLocation(location: string): string {
  if (!location) return '';
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}

/**
 * Creates a default provider object with empty values
 */
export function createDefaultProvider(): Request['provider'] {
  return {
    name: '',
    phone: '',
    rating: 0,
    corporationName: '',
    images: {
      pickup: [],
      dropoff: []
    },
    location: {
      lat: 0,
      lng: 0
    }
  };
}

/**
 * Creates a default time tracking object with empty values
 */
export function createDefaultTimeTracking(): Request['timeTracking'] {
  return {
    acceptedAt: '',
    inRouteAt: '',
    arrivedAt: '',
    inServiceAt: '',
    dropoffAt: ''
  };
}
