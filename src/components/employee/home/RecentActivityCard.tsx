
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RecentActivityList } from '@/components/employee/home/RecentActivityList'
import { Activity } from '@/types/activity'

interface RecentActivityCardProps {
  activities: Activity[]
}

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader>
        <CardTitle>{t.recentActivity}</CardTitle>
      </CardHeader>
      <CardContent>
        <RecentActivityList activities={activities} />
        
        {activities.length === 0 && (
          <p className="text-muted-foreground text-center py-4">
            {t.noRecentActivity}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
