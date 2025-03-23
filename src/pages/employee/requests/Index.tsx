
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar, Clock, History } from 'lucide-react'
import { useRequestsData } from '@/hooks/useRequestsData'
import { OrderTable } from '@/components/OrderTable'
import { OrderManagementFilter } from '@/components/employee/OrderManagementFilter'
import { FilterValues } from '@/types/orderManagement'
import { serviceTypeValues } from '@/components/forms/ServiceTypeField'

// Define the proper type for the requests with city property
interface RequestWithCity {
  id: string
  taskId: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes: string
  city?: string
}

const AllRequestsPage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('today')
  const { pastRequests, todayRequests, futureRequests } = useRequestsData()
  const [filters, setFilters] = useState<FilterValues>({
    taskId: '',
    serviceType: '',
    status: '',
    city: '',
    providerId: '',
    providerPhone: ''
  })

  // Filter requests based on current filters
  const filterRequests = (requests: RequestWithCity[]) => {
    return requests.filter(request => {
      // Filter by task ID if provided
      if (filters.taskId && !request.taskId.toLowerCase().includes(filters.taskId.toLowerCase())) {
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

  const filteredPastRequests = filterRequests(pastRequests as RequestWithCity[])
  const filteredTodayRequests = filterRequests(todayRequests as RequestWithCity[])
  const filteredFutureRequests = filterRequests(futureRequests as RequestWithCity[])

  const handleSubmit = (data: FilterValues) => {
    setFilters(data)
  }

  const handleFilterChange = (data: FilterValues) => {
    setFilters(data)
  }

  // Get unique status values
  const statusValues = [
    "Pending", 
    "Waiting for provider", 
    "In route", 
    "Arrived at the pick-up location", 
    "In service", 
    "Completed"
  ]
  
  // Extract cities from all requests
  const getCities = () => {
    const citySet = new Set<string>();
    [...pastRequests, ...todayRequests, ...futureRequests].forEach(request => {
      const city = (request as RequestWithCity).city || extractCityFromLocation(request.pickupLocation);
      if (city) citySet.add(city);
    });
    return Array.from(citySet).sort();
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.allRequests}</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderManagementFilter 
          onSubmit={handleSubmit} 
          onFilterChange={handleFilterChange}
          serviceTypeValues={serviceTypeValues}
          statusValues={statusValues}
          cityValues={getCities()}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
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
            {filteredPastRequests.length > 0 ? (
              <OrderTable orders={filteredPastRequests.map(req => ({
                id: req.id,
                taskId: req.taskId,
                companyName: 'Company ' + req.id,
                employeeName: 'Employee ' + req.id,
                serviceType: req.serviceType,
                pickupTime: req.pickupTime,
                pickupLocation: req.pickupLocation,
                dropoffLocation: req.dropoffLocation,
                notes: req.notes,
                status: req.status
              }))} />
            ) : (
              <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                <h3 className="font-medium text-lg mb-2">{t.pastRequests}</h3>
                <p className="text-gray-500 dark:text-gray-300">{t.noPastRequests}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="today" className="space-y-4">
            {filteredTodayRequests.length > 0 ? (
              <OrderTable orders={filteredTodayRequests.map(req => ({
                id: req.id,
                taskId: req.taskId,
                companyName: 'Company ' + req.id,
                employeeName: 'Employee ' + req.id,
                serviceType: req.serviceType,
                pickupTime: req.pickupTime,
                pickupLocation: req.pickupLocation,
                dropoffLocation: req.dropoffLocation,
                notes: req.notes,
                status: req.status
              }))} />
            ) : (
              <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                <h3 className="font-medium text-lg mb-2">{t.todaysRequests}</h3>
                <p className="text-gray-500 dark:text-gray-300">{t.noTodayRequests}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="future" className="space-y-4">
            {filteredFutureRequests.length > 0 ? (
              <OrderTable orders={filteredFutureRequests.map(req => ({
                id: req.id,
                taskId: req.taskId,
                companyName: 'Company ' + req.id,
                employeeName: 'Employee ' + req.id,
                serviceType: req.serviceType,
                pickupTime: req.pickupTime,
                pickupLocation: req.pickupLocation,
                dropoffLocation: req.dropoffLocation,
                notes: req.notes,
                status: req.status
              }))} />
            ) : (
              <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
                <h3 className="font-medium text-lg mb-2">{t.futureRequests}</h3>
                <p className="text-gray-500 dark:text-gray-300">{t.noFutureRequests}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Helper function to extract city from location string
const extractCityFromLocation = (location: string): string => {
  const parts = location.split(',');
  return parts.length > 1 ? parts[1].trim() : '';
}

export default AllRequestsPage
