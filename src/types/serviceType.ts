
/**
 * Service type string literals for type checking
 */
export type ServiceType = 
  | 'regular-towing'
  | 'winch-towing'
  | 'half-down-towing'
  | 'full-down-towing'
  | 'closed-towing'
  | 'heavy-lifting-towing'
  | 'eight-cars-towing'
  | 'four-cars-towing'
  | 'battery-jumpstart'
  | 'battery-replacement'
  | 'fuel-delivery-95'
  | 'fuel-delivery-91'
  | 'fuel-delivery-diesel'
  | 'locksmith-service'
  | 'tire-spare-installation'
  | 'tire-repair-station'
  | 'tire-change-station'
  | 'tire-repair-site'
  | 'tire-inflation-site'
  | 'mvpi'
  | 'between-cities-regular-towing'
  | 'between-cities-winch-towing'
  | 'between-cities-half-down-towing'
  | 'between-cities-full-down-towing'
  | 'between-cities-closed-towing'
  | 'between-cities-heavy-lifting-towing'
  | 'between-cities-eight-cars-towing'
  | 'between-cities-four-cars-towing'
  | 'taqdeer';

/**
 * Get all valid service types as an array
 */
export function getAllServiceTypes(): ServiceType[] {
  return [
    'regular-towing',
    'winch-towing',
    'half-down-towing',
    'full-down-towing',
    'closed-towing',
    'heavy-lifting-towing',
    'eight-cars-towing',
    'four-cars-towing',
    'battery-jumpstart',
    'battery-replacement',
    'fuel-delivery-95',
    'fuel-delivery-91',
    'fuel-delivery-diesel',
    'locksmith-service',
    'tire-spare-installation',
    'tire-repair-station',
    'tire-change-station',
    'tire-repair-site',
    'tire-inflation-site',
    'mvpi',
    'between-cities-regular-towing',
    'between-cities-winch-towing',
    'between-cities-half-down-towing',
    'between-cities-full-down-towing',
    'between-cities-closed-towing',
    'between-cities-heavy-lifting-towing',
    'between-cities-eight-cars-towing',
    'between-cities-four-cars-towing',
    'taqdeer'
  ];
}
