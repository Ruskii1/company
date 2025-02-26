
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NewOrderForm } from '@/components/NewOrderForm'

const CreateRequestPage = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <CardTitle>Create New Request</CardTitle>
      </CardHeader>
      <CardContent>
        <NewOrderForm />
      </CardContent>
    </Card>
  )
}

export default CreateRequestPage
