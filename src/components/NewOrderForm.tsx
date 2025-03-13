
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { useLanguageStore, translations } from '@/lib/i18n'
import { useToast } from '@/hooks/use-toast'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TimePicker } from './ui/time-picker'

const orderFormSchema = z.object({
  serviceType: z.string().min(1, {
    message: "Service type is required",
  }),
  pickupDate: z.date({
    required_error: "Pickup date is required",
  }),
  pickupLocation: z.string().min(1, {
    message: "Pickup location is required",
  }),
  dropoffLocation: z.string().min(1, {
    message: "Drop-off location is required",
  }),
  notes: z.string().optional(),
})

type OrderFormValues = z.infer<typeof orderFormSchema>

const serviceTypeValues = [
  'regular-towing',
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
  'between-cities-half-down-towing',
  'between-cities-full-down-towing',
  'between-cities-closed-towing',
  'between-cities-heavy-lifting-towing',
  'between-cities-eight-cars-towing',
  'between-cities-four-cars-towing'
]

export const NewOrderForm = () => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      serviceType: '',
      pickupDate: new Date(),
      pickupLocation: '',
      dropoffLocation: '',
      notes: '',
    },
  })

  const onSubmit = async (values: OrderFormValues) => {
    console.log(values)
    toast({
      title: 'Order placed successfully',
      description: 'Your order has been submitted and is being processed.',
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
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
                  {serviceTypeValues.map((type) => (
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

        <FormField
          control={form.control}
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

        <FormField
          control={form.control}
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
          control={form.control}
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

        <FormField
          control={form.control}
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

        <Button type="submit" className="w-full">
          {t.placeOrder}
        </Button>
      </form>
    </Form>
  )
}
