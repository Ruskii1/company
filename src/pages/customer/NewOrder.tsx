
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NewOrderForm } from '@/components/NewOrderForm'

const NewOrder = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.placeNewOrder}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.placeNewOrder}</CardTitle>
        </CardHeader>
        <CardContent>
          <NewOrderForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default NewOrder
