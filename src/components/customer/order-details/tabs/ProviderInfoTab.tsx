
import { ProviderInfoComponent } from '@/components/customer/ProviderInfoComponent'

interface ProviderInfoTabProps {
  provider?: {
    id: string
    name: string
    phone: string
    rating: number
    totalOrders: number
    vehicleInfo: {
      model: string
      licensePlate: string
    }
  }
}

export const ProviderInfoTab = ({ provider }: ProviderInfoTabProps) => {
  // Create a provider object with all the required properties for ProviderInfoComponent
  const formattedProvider = provider ? {
    id: provider.id,
    name: provider.name,
    phone: provider.phone,
    rating: provider.rating,
    totalOrders: provider.totalOrders,
    corporationName: 'Provider Company', // Default value
    images: {
      pickup: [], // Default empty arrays
      dropoff: []
    },
    location: {
      lat: 24.7136, // Default coordinates
      lng: 46.6753
    }
  } : {
    id: '',
    name: 'Not assigned',
    phone: '',
    rating: 0,
    corporationName: 'Not assigned',
    images: { 
      pickup: [], 
      dropoff: [] 
    },
    location: { 
      lat: 24.7136, 
      lng: 46.6753 
    }
  }
  
  return <ProviderInfoComponent provider={formattedProvider} />
}
