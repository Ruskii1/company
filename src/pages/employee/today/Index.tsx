
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const TodayRequestsPage = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <CardTitle>Today's Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Today's requests will go here */}
      </CardContent>
    </Card>
  )
}

export default TodayRequestsPage
