
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguageStore, translations } from '@/lib/i18n'

const EmployeeHomePage = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12">{t.home}</h1>
      
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardHeader>
          <CardTitle>{t.welcomeToEmployeePortal}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t.employeeHomeDescription || "This page is under construction."}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default EmployeeHomePage
