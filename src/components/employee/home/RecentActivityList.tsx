
import { useLanguageStore, translations } from '@/lib/i18n'
import { Activity } from '@/types/activity'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

interface RecentActivityListProps {
  activities: Activity[]
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 border-b pb-3">
          <div className={`w-2 h-2 mt-2 rounded-full ${getActivityTypeColor(activity.type)}`} />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.entityType}: {" "}
                  <Link 
                    to={getActivityLink(activity)} 
                    className="text-primary hover:underline"
                  >
                    {activity.entityId}
                  </Link>
                </p>
              </div>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getActivityTypeColor(type: string): string {
  switch (type) {
    case 'ticket':
      return 'bg-blue-500'
    case 'request':
      return 'bg-green-500'
    case 'edit':
      return 'bg-amber-500'
    default:
      return 'bg-gray-500'
  }
}

function getActivityLink(activity: Activity): string {
  switch (activity.entityType) {
    case 'Ticket':
      return `/employee/tickets/${activity.entityId}`
    case 'Request':
    case 'Order':
      return `/employee/orders/${activity.entityId}`
    default:
      return '/employee'
  }
}
