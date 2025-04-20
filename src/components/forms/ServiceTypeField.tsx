
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { OrderFormValues } from "./types"
import { useServiceTypes } from "@/hooks/useServiceTypes"
import { ServiceType, getAllServiceTypes } from "@/types/serviceType"

type ServiceTypeFieldProps = {
  control: Control<OrderFormValues>
}

// Use the getAllServiceTypes function for the default values
export const serviceTypeValues = getAllServiceTypes();

export const ServiceTypeField = ({ control }: ServiceTypeFieldProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { data: serviceTypes = serviceTypeValues, isLoading, error } = useServiceTypes()

  return (
    <FormField
      control={control}
      name="serviceType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t.serviceType}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t.serviceType} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {t.services[type as ServiceType]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
