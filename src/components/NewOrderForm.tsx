
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useLanguageStore, translations } from '@/lib/i18n'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { ServiceTypeField } from './forms/ServiceTypeField'
import { PickupDateField } from './forms/PickupDateField'
import { LocationFields } from './forms/LocationFields'
import { NotesField } from './forms/NotesField'
import { orderFormSchema, OrderFormValues } from './forms/types'

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
        <ServiceTypeField control={form.control} />
        <PickupDateField control={form.control} />
        <LocationFields control={form.control} />
        <NotesField control={form.control} />

        <Button type="submit" className="w-full">
          {t.placeOrder}
        </Button>
      </form>
    </Form>
  )
}
