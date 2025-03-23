
import { OrderManagementFilter } from '@/components/employee/OrderManagementFilter'
import { FilterValues } from '@/types/orderManagement'
import { Request } from '@/types/request'
import { useState, useEffect } from 'react'

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
  const [cities, setCities] = useState<string[]>([])
  
  // Extract cities from all requests
  useEffect(() => {
    const getCities = () => {
      const citySet = new Set<string>();
      requests.forEach(request => {
        const city = request.city || extractCityFromLocation(request.pickupLocation);
        if (city) citySet.add(city);
      });
      return Array.from(citySet).sort();
    }
    
    setCities(getCities())
  }, [requests])
  
  // Handle filter submission
  const handleFilterSubmit = (filters: FilterValues) => {
    console.log("Filter submitted:", filters) // Debug log
    onFilterChange(filters)
  }
  
  // Handle filter changes
  const handleFilterChange = (filters: FilterValues) => {
    console.log("Filter changed:", filters) // Debug log
    onFilterChange(filters)
  }

  return (
    <OrderManagementFilter 
      onSubmit={handleFilterSubmit} 
      onFilterChange={handleFilterChange}
      serviceTypeValues={serviceTypeValues}
      statusValues={statusValues}
      cityValues={cities}
    />
  )
}

// Helper function to extract city from location string
const extractCityFromLocation = (location: string): string => {
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}
