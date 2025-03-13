
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar, Clock, History } from 'lucide-react'
import { RequestsTable } from '@/components/customer/RequestsTable'
import { NoRequestsMessage } from '@/components/customer/NoRequestsMessage'
import { useRequestsData } from '@/hooks/useRequestsData'

const Requests = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('today')
  const { pastRequests, todayRequests, futureRequests } = useRequestsData()

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
                <RequestsTable requests={pastRequests} />
              ) : (
                <NoRequestsMessage messageKey="noPastRequests" />
              )}
            </TabsContent>
            
            <TabsContent value="today" className="space-y-4">
              {todayRequests.length > 0 ? (
                <RequestsTable requests={todayRequests} />
              ) : (
                <NoRequestsMessage messageKey="noTodayRequests" />
              )}
            </TabsContent>
            
            <TabsContent value="future" className="space-y-4">
              {futureRequests.length > 0 ? (
                <RequestsTable requests={futureRequests} />
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
