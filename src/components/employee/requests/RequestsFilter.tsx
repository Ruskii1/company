
import { OrderManagementFilter } from '@/components/employee/OrderManagementFilter'
import { FilterValues } from '@/types/orderManagement'
import { Request } from '@/types/request'

interface RequestsFilterProps {
  onFilterChange: (filters: FilterValues) => void
  serviceTypeValues: string[]
  statusValues: string[]
  requests: Request[]
}

export const RequestsFilter = ({ 
  onFilterChange, 
  serviceTypeValues, 
  statusValues,
  requests
}: RequestsFilterProps) => {
  // Extract cities from all requests
  const getCities = () => {
    const citySet = new Set<string>();
    requests.forEach(request => {
      const city = request.city || extractCityFromLocation(request.pickupLocation);
      if (city) citySet.add(city);
    });
    return Array.from(citySet).sort();
  }

  return (
    <OrderManagementFilter 
      onSubmit={onFilterChange} 
      onFilterChange={onFilterChange}
      serviceTypeValues={serviceTypeValues}
      statusValues={statusValues}
      cityValues={getCities()}
    />
  )
}

// Helper function to extract city from location string
const extractCityFromLocation = (location: string): string => {
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}
