
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
import ProvidersMap from '@/components/employee/providers/ProvidersMap'

const ServiceProvidersMapPage = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          <CardTitle>Service Providers Map</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ProvidersMap />
      </CardContent>
    </Card>
  )
}

export default ServiceProvidersMapPage
