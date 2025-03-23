
import { FilterValues } from '@/types/orderManagement'
import { Request } from '@/types/request'

// Filter requests based on filters
export const filterRequests = (requests: Request[], filters: FilterValues) => {
  console.log("Filtering requests:", requests.length, "with filters:", filters)
  
  return requests.filter(request => {
    // Filter by task ID if provided
    if (filters.taskId && !request.taskId?.toLowerCase().includes(filters.taskId.toLowerCase())) {
      return false
    }
    
    // Filter by service type if provided
    if (filters.serviceType && filters.serviceType !== 'all' && request.serviceType !== filters.serviceType) {
      return false
    }
    
    // Filter by status if provided
    if (filters.status && request.status !== filters.status) {
      return false
    }
    
    // Filter by city if provided
    if (filters.city) {
      const city = request.city || extractCityFromLocation(request.pickupLocation);
      if (!city.toLowerCase().includes(filters.city.toLowerCase())) {
        return false;
      }
    }
    
    // Filter by provider ID if provided
    if (filters.providerId && (!request.providerId || !request.providerId.toLowerCase().includes(filters.providerId.toLowerCase()))) {
      return false
    }
    
    // Filter by provider phone if provided
    if (filters.providerPhone && (!request.providerPhone || !request.providerPhone.toLowerCase().includes(filters.providerPhone.toLowerCase()))) {
      return false
    }
    
    return true
  })
}

// Helper function to extract city from location string
export const extractCityFromLocation = (location: string): string => {
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}
