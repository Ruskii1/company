
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Calendar } from 'lucide-react'
import { ReactNode } from 'react'

interface RequestsTabNavigationProps {
  activeTab: string
  onTabChange: (value: string) => void
  pastTabContent: ReactNode
  todayTabContent: ReactNode
  futureTabContent: ReactNode
}

export const RequestsTabNavigation = ({
  activeTab,
  onTabChange,
  pastTabContent,
  todayTabContent,
  futureTabContent
}: RequestsTabNavigationProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full mt-4">
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="past" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t.pastRequests || "Past Requests"}
        </TabsTrigger>
        <TabsTrigger value="today" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t.todaysRequests || "Today's Requests"}
        </TabsTrigger>
        <TabsTrigger value="future" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t.futureRequests || "Future Requests"}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="past" className="space-y-4">
        {pastTabContent}
      </TabsContent>
      
      <TabsContent value="today" className="space-y-4">
        {todayTabContent}
      </TabsContent>
      
      <TabsContent value="future" className="space-y-4">
        {futureTabContent}
      </TabsContent>
    </Tabs>
  )
}
