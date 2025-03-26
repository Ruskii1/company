
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'

interface ProviderIssue {
  id: string
  customerName: string
  serviceType: string
  pickupTime: number
  status: string
}

interface AttentionRequiredCardProps {
  providerIssues: ProviderIssue[]
}

export function AttentionRequiredCard({ providerIssues }: AttentionRequiredCardProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  if (providerIssues.length === 0) {
    return null
  }
  
  return (
    <Card className="col-span-1 lg:col-span-2 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
          {t.attentionRequired}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertTitle className="font-bold">{t.providerIssues}</AlertTitle>
          <AlertDescription>
            {t.thereAre} <span className="font-bold">{providerIssues.length}</span> {t.requestsWithoutProvider}
            <p className="mt-2">
              {t.attention}: {t.requestsRequireImmediate}
            </p>
          </AlertDescription>
        </Alert>
        
        <div className="mt-4">
          <Button asChild>
            <Link to="/employee">{t.reviewRequests}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
