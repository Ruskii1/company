
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { serviceTypeValues } from '@/components/forms/ServiceTypeField'

export function useServiceTypes() {
  return useQuery({
    queryKey: ['service-types'],
    queryFn: async () => {
      try {
        // Fetch all unique service types from provider_services table
        const { data, error } = await supabase
          .from('provider_services')
          .select('service')
        
        if (error) {
          console.error('Error fetching service types:', error)
          return serviceTypeValues // Fallback to predefined values
        }
        
        // Extract unique service values
        const serviceTypes = [...new Set(data.map(row => row.service))]
        
        // If no services found, return the predefined list
        return serviceTypes.length > 0 ? serviceTypes : serviceTypeValues
      } catch (err) {
        console.error('Error in useServiceTypes:', err)
        return serviceTypeValues // Fallback to predefined values
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })
}
