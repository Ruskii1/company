
import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { ServiceProvider } from '@/types/provider'
import { mockServiceProviders } from '@/data/mockProviders'

interface ProvidersMapViewProps {
  centerAddress: string
  radiusKm: number
  onProviderSelect: (provider: ServiceProvider) => void
}

export const ProvidersMapView = ({ 
  centerAddress, 
  radiusKm, 
  onProviderSelect 
}: ProvidersMapViewProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  
  // In a real app, this would fetch nearby providers from an API
  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true)
        // Simulating API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock data - in a real app, this would be filtered by location
        // using the centerAddress and radiusKm parameters
        setProviders(mockServiceProviders.slice(0, 5))
        setError(null)
      } catch (err) {
        console.error('Error loading providers:', err)
        setError('Failed to load nearby providers')
      } finally {
        setLoading(false)
      }
    }
    
    loadProviders()
  }, [centerAddress, radiusKm])
  
  if (loading) {
    return (
      <div className="h-[600px] w-full bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <p>Loading nearby providers...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="h-[600px] w-full border rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 mx-auto text-destructive" />
          <p>{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-[600px] w-full bg-muted rounded-lg overflow-hidden">
      <div className="p-4 bg-background border-b">
        <h3 className="font-medium">Providers within {radiusKm}km of pickup location</h3>
        <p className="text-sm text-muted-foreground">{centerAddress}</p>
      </div>
      
      {/* This would be a real map in production */}
      <div className="p-4 h-[calc(100%-4rem)] bg-slate-100 overflow-auto">
        <div className="mb-4 bg-white p-3 rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            Map view showing {providers.length} nearby providers
          </p>
        </div>
        
        <div className="space-y-2">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {provider.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Rating: {provider.rating}/5 ({provider.completedOrders} orders)
                  </p>
                </div>
                <Button 
                  size="sm"
                  onClick={() => onProviderSelect(provider)}
                >
                  Select
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
