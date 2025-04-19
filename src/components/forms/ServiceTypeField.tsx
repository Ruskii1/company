import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { OrderFormValues } from "./types"
import { useServiceTypes } from "@/hooks/useServiceTypes"

type ServiceTypeFieldProps = {
  control: Control<OrderFormValues>
}

export const serviceTypeValues = [
  'regular-towing',
  'winch-towing',
  'half-down-towing',
  'full-down-towing',
  'closed-towing',
  'heavy-lifting-towing',
  'eight-cars-towing',
  'four-cars-towing',
  'battery-jumpstart',
  'battery-replacement',
  'fuel-delivery-95',
  'fuel-delivery-91',
  'fuel-delivery-diesel',
  'locksmith-service',
  'tire-spare-installation',
  'tire-repair-station',
  'tire-change-station',
  'tire-repair-site',
  'tire-inflation-site',
  'mvpi',
  'between-cities-regular-towing',
  'between-cities-winch-towing',
  'between-cities-half-down-towing',
  'between-cities-full-down-towing',
  'between-cities-closed-towing',
  'between-cities-heavy-lifting-towing',
  'between-cities-eight-cars-towing',
  'between-cities-four-cars-towing',
  'taqdeer'
]

export const ServiceTypeField = ({ control }: ServiceTypeFieldProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { data: serviceTypes = serviceTypeValues } = useServiceTypes()

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
                  {t.services[type]}
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
