
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

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
        <CardTitle>{t.attentionRequired}</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertTitle>{t.providerIssues}</AlertTitle>
          <AlertDescription>
            {t.thereAre} {providerIssues.length} {t.requestsWithoutProvider}
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
