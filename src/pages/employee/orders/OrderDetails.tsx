
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Order {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes?: string
}

const OrderDetails = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate data fetching
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data - in a real app, fetch from API using taskId
      const mockOrder = {
        id: '1001',
        taskId: 'TASK-2023-001',
        customerName: 'Acme Corporation',
        serviceType: 'Package Delivery',
        pickupTime: '2023-06-15 09:00 AM',
        pickupLocation: '123 Business Ave, Tower A',
        dropoffLocation: '456 Commerce St, Suite 300',
        status: 'Completed',
        notes: 'Handle with care. Fragile items inside.'
      }
      
      setOrder(mockOrder)
      setLoading(false)
    }, 500)
  }, [taskId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-500">{status}</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-500">{status}</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-500 text-black">{status}</Badge>
      case 'Scheduled':
        return <Badge className="bg-purple-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!order) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="text-center">
            <p>Order not found</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/employee')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {t.orderManagement}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/employee')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.orderManagement}
        </Button>
        <div>
          <CardTitle className="text-2xl">{t.taskId}: {order.taskId}</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {t.status}: {getStatusBadge(order.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">{t.customerName}</h3>
              <p>{order.customerName}</p>
              <Button 
                variant="link" 
                className="p-0 h-auto mt-1"
                onClick={() => navigate(`/employee/customers/${order.id}`)}
              >
                View Customer Details
              </Button>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-1">{t.serviceType}</h3>
              <p>{order.serviceType}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-1">{t.pickupTime}</h3>
              <p>{order.pickupTime}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">{t.pickupLocation}</h3>
              <div className="flex items-center gap-2">
                <p>{order.pickupLocation}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => openInGoogleMaps(order.pickupLocation)}
                  className="h-8 w-8"
                >
                  <MapPin size={16} />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-1">{t.dropoffLocation}</h3>
              <div className="flex items-center gap-2">
                <p>{order.dropoffLocation}</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => openInGoogleMaps(order.dropoffLocation)}
                  className="h-8 w-8"
                >
                  <MapPin size={16} />
                </Button>
              </div>
            </div>
            
            {order.notes && (
              <div>
                <h3 className="text-lg font-semibold mb-1">{t.notes}</h3>
                <p>{order.notes}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderDetails
