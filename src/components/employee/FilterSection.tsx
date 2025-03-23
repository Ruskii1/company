
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { OrderManagementFilter } from '@/components/employee/OrderManagementFilter'
import { useLanguageStore, translations } from '@/lib/i18n'
import { FilterValues } from '@/types/orderManagement'

interface FilterSectionProps {
  handleFilterSubmit: (data: FilterValues) => void
  handleFilterChange: (data: FilterValues) => void
  serviceTypeValues: string[]
  statusValues: string[]
  cityValues: string[]
}

export const FilterSection = ({
  handleFilterSubmit,
  handleFilterChange,
  serviceTypeValues,
  statusValues,
  cityValues
}: FilterSectionProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.orderManagement}</CardTitle>
      </CardHeader>
      <CardContent>
        <OrderManagementFilter 
          onSubmit={handleFilterSubmit}
          onFilterChange={handleFilterChange}
          serviceTypeValues={serviceTypeValues}
          statusValues={statusValues}
          cityValues={cityValues}
        />
      </CardContent>
    </Card>
  )
}
