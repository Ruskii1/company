
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar, Clock, History } from 'lucide-react'

const AllRequestsPage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState('today')

  return (
    <Card className="backdrop-blur-sm bg-white/80">
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
            <div className="border rounded-md p-4 bg-white">
              <h3 className="font-medium text-lg mb-2">{t.pastRequests}</h3>
              <p className="text-gray-500">{t.noPastRequests}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="today" className="space-y-4">
            <div className="border rounded-md p-4 bg-white">
              <h3 className="font-medium text-lg mb-2">{t.todaysRequests}</h3>
              <p className="text-gray-500">{t.noTodayRequests}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="future" className="space-y-4">
            <div className="border rounded-md p-4 bg-white">
              <h3 className="font-medium text-lg mb-2">{t.futureRequests}</h3>
              <p className="text-gray-500">{t.noFutureRequests}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default AllRequestsPage
