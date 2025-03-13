import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar, Clock, History, MapPin } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

const Requests = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('today')
  const navigate = useNavigate()
  
  // Dummy data for past requests with updated task IDs
  const pastRequests = [
    {
      id: '9001',
      taskId: '2025-004',
      serviceType: 'Document Delivery',
      pickupTime: '2025-09-10 11:30',
      pickupLocation: '123 Main St, Dubai',
      dropoffLocation: '456 Business Ave, Dubai',
      status: 'Completed',
      notes: 'Delivered on time'
    },
    {
      id: '9002',
      taskId: '2025-005',
      serviceType: 'Package Pickup',
      pickupTime: '2025-09-12 14:00',
      pickupLocation: '789 Market Blvd, Dubai',
      dropoffLocation: '321 Commerce St, Dubai',
      status: 'Completed',
      notes: 'Picked up successfully'
    }
  ]
  
  // Dummy data for today's requests
  const todayRequests = [
    {
      id: '10001',
      taskId: '2025-006',
      serviceType: 'Express Delivery',
      pickupTime: '2025-09-15 10:15',
      pickupLocation: '555 Tech Park, Dubai',
      dropoffLocation: '777 Innovation Center, Dubai',
      status: 'In service',
      notes: 'Urgent delivery'
    }
  ]
  
  // Dummy data for future requests
  const futureRequests = [
    {
      id: '10002',
      taskId: '2025-007',
      serviceType: 'Document Delivery',
      pickupTime: '2025-09-20 09:30',
      pickupLocation: '888 Future Ave, Dubai',
      dropoffLocation: '999 Tomorrow St, Dubai',
      status: 'Waiting for provider',
      notes: 'Schedule in advance'
    },
    {
      id: '10003',
      taskId: '2025-008',
      serviceType: 'Package Delivery',
      pickupTime: '2025-09-22 13:45',
      pickupLocation: '111 Next Week Rd, Dubai',
      dropoffLocation: '222 Coming Soon Blvd, Dubai',
      status: 'Waiting for provider',
      notes: 'Large package'
    }
  ]

  const handleRequestClick = (taskId: string) => {
    navigate(`/order-details/${taskId}`)
  }

  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Waiting for provider':
        return <Badge className="bg-yellow-500 text-black">{status}</Badge>
      case 'In route':
        return <Badge className="bg-blue-500">{status}</Badge>
      case 'Arrived at the pick-up location':
        return <Badge className="bg-indigo-500">{status}</Badge>
      case 'In service':
        return <Badge className="bg-purple-500">{status}</Badge>
      case 'Completed':
        return <Badge className="bg-green-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const renderRequestsTable = (requests: any[]) => {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.taskId}</TableHead>
              <TableHead>{t.serviceType}</TableHead>
              <TableHead>{t.pickupTime}</TableHead>
              <TableHead>{t.pickupLocation}</TableHead>
              <TableHead>{t.dropoffLocation}</TableHead>
              <TableHead>{t.notes}</TableHead>
              <TableHead>{t.status}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <button 
                    onClick={() => handleRequestClick(request.taskId)}
                    className="text-blue-600 hover:underline"
                  >
                    {request.taskId}
                  </button>
                </TableCell>
                <TableCell>{request.serviceType}</TableCell>
                <TableCell>{request.pickupTime}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-44">{request.pickupLocation}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        openInGoogleMaps(request.pickupLocation);
                      }}
                      className="h-8 w-8"
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-44">{request.dropoffLocation}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        openInGoogleMaps(request.dropoffLocation);
                      }}
                      className="h-8 w-8"
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{request.notes}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.allRequests}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.allRequests}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="past" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                {t.pastRequests}
              </TabsTrigger>
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t.todaysRequests}
              </TabsTrigger>
              <TabsTrigger value="future" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t.futureRequests}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="past" className="space-y-4">
              {pastRequests.length > 0 ? (
                renderRequestsTable(pastRequests)
              ) : (
                <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-300">{t.noPastRequests}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="today" className="space-y-4">
              {todayRequests.length > 0 ? (
                renderRequestsTable(todayRequests)
              ) : (
                <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-300">{t.noTodayRequests}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="future" className="space-y-4">
              {futureRequests.length > 0 ? (
                renderRequestsTable(futureRequests)
              ) : (
                <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-300">{t.noFutureRequests}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Requests
