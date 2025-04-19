
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export function useServiceTypes() {
  return useQuery({
    queryKey: ['service-types'],
    queryFn: async () => {
      // Fetch all unique service types that are offered by at least one provider
      const { data, error } = await supabase
        .from('provider_services')
        .select('service')
        .distinct()
        
      if (error) {
        console.error('Error fetching service types:', error)
        return []
      }
      
      return data.map(row => row.service)
    }
  })
}
