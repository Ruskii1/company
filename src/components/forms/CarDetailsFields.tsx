
import { useLanguageStore, translations } from '@/lib/i18n'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Control } from 'react-hook-form'
import { OrderFormValues } from './types'

interface CarDetailsFieldsProps {
  control: Control<OrderFormValues>
}

export const CarDetailsFields = ({ control }: CarDetailsFieldsProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t.vehicleDetails}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="carModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.model}</FormLabel>
              <FormControl>
                <Input placeholder={t.model} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="carYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.modelYear}</FormLabel>
              <FormControl>
                <Input placeholder={t.modelYear} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.licensePlate}</FormLabel>
              <FormControl>
                <Input placeholder={t.licensePlate} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="licensePlateArabic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.licensePlate} (العربية)</FormLabel>
              <FormControl>
                <Input placeholder="رقم اللوحة" dir="rtl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="vin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.vin}</FormLabel>
            <FormControl>
              <Input placeholder={t.vin} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
