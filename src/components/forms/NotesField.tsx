
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { OrderFormValues } from "./types"

type NotesFieldProps = {
  control: Control<OrderFormValues>
}

export const NotesField = ({ control }: NotesFieldProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t.notes} {t.optional}</FormLabel>
          <FormControl>
            <Textarea placeholder={t.notes} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
