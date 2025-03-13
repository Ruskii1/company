
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TimePicker } from "@/components/ui/time-picker"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { OrderFormValues } from "./types"

type PickupDateFieldProps = {
  control: Control<OrderFormValues>
}

export const PickupDateField = ({ control }: PickupDateFieldProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <FormField
      control={control}
      name="pickupDate"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{t.pickupDate}</FormLabel>
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'MM/dd/yyyy')
                    ) : (
                      <span>{t.selectDate}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <TimePicker
              date={field.value}
              setDate={(newDate) => field.onChange(newDate)}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
