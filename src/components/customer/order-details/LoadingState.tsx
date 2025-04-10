
import { Card, CardContent } from '@/components/ui/card'

export const LoadingState = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardContent className="p-6">
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
        </div>
      </CardContent>
    </Card>
  )
}
