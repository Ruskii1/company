
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { StatusBadge } from '@/components/customer/StatusBadge'
import { Request } from '@/types/request'

interface OrderDetailsCardProps {
  order: Request
  children: React.ReactNode
}

export const OrderDetailsCard = ({ order, children }: OrderDetailsCardProps) => {
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> {t.customerPortal}
        </Button>
        <div>
          <CardTitle className="text-2xl">{t.taskId}: {order.taskId}</CardTitle>
          <div className="text-sm text-muted-foreground mt-1">
            {t.status}: <StatusBadge status={order.status} />
          </div>
        </div>
      </CardHeader>
      {children}
    </Card>
  )
}
