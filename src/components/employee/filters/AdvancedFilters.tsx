
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { FilterValues } from "@/types/orderManagement"

interface AdvancedFiltersProps {
  control: Control<FilterValues>
  statusValues: string[]
  cityValues: string[]
}

export const AdvancedFilters = ({ control, statusValues, cityValues }: AdvancedFiltersProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Status Filter */}
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.status}</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectStatus} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="">
                  {t.all}
                </SelectItem>
                {statusValues.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      
      {/* City Filter */}
      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.city}</FormLabel>
            {cityValues.length > 0 ? (
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectCity} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">
                    {t.all}
                  </SelectItem>
                  {cityValues.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input 
                placeholder={t.enterCity}
                {...field} 
              />
            )}
          </FormItem>
        )}
      />
      
      {/* Provider ID Filter */}
      <FormField
        control={control}
        name="providerId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.providerId}</FormLabel>
            <Input 
              placeholder={t.enterProviderId}
              {...field} 
            />
          </FormItem>
        )}
      />
      
      {/* Provider Phone Filter */}
      <FormField
        control={control}
        name="providerPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.providerPhone}</FormLabel>
            <Input 
              placeholder={t.enterProviderPhone}
              {...field} 
            />
          </FormItem>
        )}
      />
    </div>
  )
}
