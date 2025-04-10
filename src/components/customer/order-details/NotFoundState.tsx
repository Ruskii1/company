
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const NotFoundState = () => {
  const navigate = useNavigate()
  
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardContent className="p-6">
        <div className="text-center">
          <p>Order not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
