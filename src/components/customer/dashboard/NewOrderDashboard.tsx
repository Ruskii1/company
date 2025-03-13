
import { NewOrderForm } from '@/components/NewOrderForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguageStore, translations } from '@/lib/i18n'

export const NewOrderDashboard = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.placeNewOrder}</CardTitle>
      </CardHeader>
      <CardContent>
        <NewOrderForm />
      </CardContent>
    </Card>
  );
};
