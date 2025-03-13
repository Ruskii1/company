
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { OrderFormValues } from "./types"

type LocationFieldsProps = {
  control: Control<OrderFormValues>
}

export const LocationFields = ({ control }: LocationFieldsProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <>
      <FormField
        control={control}
        name="pickupLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.pickupLocation}</FormLabel>
            <FormControl>
              <Input placeholder={t.pickupLocation} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="dropoffLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.dropoffLocation}</FormLabel>
            <FormControl>
              <Input placeholder={t.dropoffLocation} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
