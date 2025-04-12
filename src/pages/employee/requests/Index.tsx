
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguageStore, translations } from '@/lib/i18n'
import { useRequestsData } from '@/hooks/useRequestsData'
import { FilterValues } from '@/types/orderManagement'
import { serviceTypeValues } from '@/components/forms/ServiceTypeField'
import { RequestsFilter } from '@/components/employee/requests/RequestsFilter'
import { RequestsTabNavigation } from '@/components/employee/requests/RequestsTabNavigation'
import { RequestsTab } from '@/components/employee/requests/RequestsTab'
import { filterRequests } from '@/components/employee/requests/requestsUtils'
import { Request } from '@/types/request'

const AllRequestsPage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('today')
  const { pastRequests, todayRequests, futureRequests, loading } = useRequestsData()
  const [filters, setFilters] = useState<FilterValues>({
    taskId: '',
    serviceType: '',
    status: '',
    city: '',
    providerId: '',
    providerPhone: ''
  })

  // Cast the requests to the proper type
  const typedPastRequests = pastRequests as Request[]
  const typedTodayRequests = todayRequests as Request[]
  const typedFutureRequests = futureRequests as Request[]
  
  // Apply filters to all request types
  const filteredPastRequests = filterRequests(typedPastRequests, filters)
  const filteredTodayRequests = filterRequests(typedTodayRequests, filters)
  const filteredFutureRequests = filterRequests(typedFutureRequests, filters)

  // Handle filter changes
  const handleFilterChange = (data: FilterValues) => {
    console.log("Filter applied:", data) // Debug log
    setFilters(data)
  }

  // Define status values - updated to match our new enum
  const statusValues = [
    "Scheduled", 
    "Waiting for Provider", 
    "NPA",
    "NPF",
    "In Route", 
    "Arrived at Pickup Location",
    "In Service", 
    "Complete",
    "Cancelled"
  ]
  
  // Combine all requests for the filter component
  const allRequests = [...typedPastRequests, ...typedTodayRequests, ...typedFutureRequests]

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.allRequests || "All Requests"}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="text-center">
              <p>{t.loadingRequests}</p>
            </div>
          </div>
        ) : (
          <>
            <RequestsFilter 
              onFilterChange={handleFilterChange}
              serviceTypeValues={serviceTypeValues}
              statusValues={statusValues}
              requests={allRequests}
            />
            
            <RequestsTabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              pastTabContent={
                <RequestsTab 
                  requests={filteredPastRequests}
                  tabType="past"
                />
              }
              todayTabContent={
                <RequestsTab 
                  requests={filteredTodayRequests}
                  tabType="today"
                />
              }
              futureTabContent={
                <RequestsTab 
                  requests={filteredFutureRequests}
                  tabType="future"
                />
              }
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default AllRequestsPage
