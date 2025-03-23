
import { ReactNode } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Calendar, 
  Ticket, 
  Check,
  User,
  Store,
  Clock,
  Building2,
  LucideIcon
} from 'lucide-react'

type IconName = 'Calendar' | 'Ticket' | 'Check' | 'User' | 'Store' | 'Clock' | 'Building2'

interface EmployeeStatCardProps {
  title: string
  value: number | string
  description?: string
  icon: IconName
}

export function EmployeeStatCard({ title, value, description, icon }: EmployeeStatCardProps) {
  const IconComponent = getIconComponent(icon)
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1 flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
            </div>
          </div>
        </div>
        {description && (
          <p className="mt-2 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

function getIconComponent(iconName: IconName): LucideIcon {
  switch (iconName) {
    case 'Calendar':
      return Calendar
    case 'Ticket':
      return Ticket
    case 'Check':
      return Check
    case 'User':
      return User
    case 'Store':
      return Store
    case 'Clock':
      return Clock
    case 'Building2':
      return Building2
    default:
      return Calendar
  }
}
