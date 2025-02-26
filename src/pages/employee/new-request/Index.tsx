
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NewOrderForm } from '@/components/NewOrderForm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLanguageStore, translations } from '@/lib/i18n'
import { useState } from 'react'

const CreateRequestPage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [customerId, setCustomerId] = useState('')

  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <CardTitle>{t.createNewRequest}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="customerId">{t.customerId}</Label>
          <Input
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder={t.customerId}
            className="max-w-xs"
          />
        </div>
        <NewOrderForm />
      </CardContent>
    </Card>
  )
}

export default CreateRequestPage
