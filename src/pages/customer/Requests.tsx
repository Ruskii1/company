
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar, Clock, History } from 'lucide-react'
import { RequestsTable } from '@/components/customer/RequestsTable'
import { NoRequestsMessage } from '@/components/customer/NoRequestsMessage'
import { useRequestsData } from '@/hooks/useRequestsData'
import { RequestFilter, FilterValues } from '@/components/customer/RequestFilter'
import { serviceTypeValues } from '@/components/forms/ServiceTypeField'
import { useLocation } from 'react-router-dom'
import { parseISO, isSameDay } from 'date-fns'
import { extractCityFromLocation } from '@/utils/orderManagementUtils'

const Requests = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const location = useLocation()
  
  // Get the tab from URL query parameters
  const getInitialTab = () => {
    const searchParams = new URLSearchParams(location.search)
    const tab = searchParams.get('tab')
    return tab === 'past' || tab === 'today' || tab === 'future' ? tab : 'today'
  }
  
  const [activeTab, setActiveTab] = useState(getInitialTab)
  const { pastRequests, todayRequests, futureRequests } = useRequestsData()
  const [filters, setFilters] = useState<FilterValues>({
    requestNumber: '',
    serviceType: '',
    date: undefined,
    city: ''
  })

  // Extract unique cities from all requests
  const allRequests = [...pastRequests, ...todayRequests, ...futureRequests]
  const uniqueCities = Array.from(new Set(
    allRequests.map(request => 
      request.city || extractCityFromLocation(request.pickupLocation)
    ).filter(Boolean)
  )).sort()

  // Update the active tab when the URL query parameter changes
  useEffect(() => {
    setActiveTab(getInitialTab())
  }, [location.search])

  // Filter requests based on current filters
  const filterRequests = (requests) => {
    return requests.filter(request => {
      // Filter by request number if provided
      if (filters.requestNumber && !request.taskId.toLowerCase().includes(filters.requestNumber.toLowerCase())) {
        return false
      }
      
      // Filter by service type if provided
      if (filters.serviceType && filters.serviceType !== 'all' && request.serviceType !== filters.serviceType) {
        return false
      }
      
      // Filter by date if provided
      if (filters.date) {
        const requestDate = parseISO(request.pickupTime)
        if (!isSameDay(requestDate, filters.date)) {
          return false
        }
      }
      
      // Filter by city if provided
      if (filters.city && filters.city !== 'all') {
        const requestCity = request.city || extractCityFromLocation(request.pickupLocation)
        if (!requestCity.toLowerCase().includes(filters.city.toLowerCase())) {
          return false
        }
      }
      
      return true
    })
  }

  const filteredPastRequests = filterRequests(pastRequests)
  const filteredTodayRequests = filterRequests(todayRequests)
  const filteredFutureRequests = filterRequests(futureRequests)

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.allRequests}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.allRequests}</CardTitle>
        </CardHeader>
        <CardContent>
          <RequestFilter 
            onFilterChange={handleFilterChange} 
            serviceTypeValues={serviceTypeValues}
            cityValues={uniqueCities}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="past" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                {t.pastRequests} <span className="ml-1 text-xs text-muted-foreground">({filteredPastRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t.todaysRequests} <span className="ml-1 text-xs text-muted-foreground">({filteredTodayRequests.length})</span>
              </TabsTrigger>
              <TabsTrigger value="future" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t.futureRequests} <span className="ml-1 text-xs text-muted-foreground">({filteredFutureRequests.length})</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="past" className="space-y-4">
              {filteredPastRequests.length > 0 ? (
                <RequestsTable requests={filteredPastRequests} />
              ) : (
                <NoRequestsMessage messageKey="noPastRequests" />
              )}
            </TabsContent>
            
            <TabsContent value="today" className="space-y-4">
              {filteredTodayRequests.length > 0 ? (
                <RequestsTable requests={filteredTodayRequests} />
              ) : (
                <NoRequestsMessage messageKey="noTodayRequests" />
              )}
            </TabsContent>
            
            <TabsContent value="future" className="space-y-4">
              {filteredFutureRequests.length > 0 ? (
                <RequestsTable requests={filteredFutureRequests} />
              ) : (
                <NoRequestsMessage messageKey="noFutureRequests" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Requests
