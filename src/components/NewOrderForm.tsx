
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
import { FileUploadField } from './forms/FileUploadField'
import { CarDetailsFields } from './forms/CarDetailsFields'
import { orderFormSchema, OrderFormValues } from './forms/types'
import { createRequest } from '@/services/requestService'
import { format } from 'date-fns'

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
      carModel: '',
      carYear: '',
      licensePlate: '',
      licensePlateArabic: '',
      vin: '',
      attachments: []
    },
  })

  const onSubmit = async (values: OrderFormValues) => {
    try {
      // Handle file uploads if any
      let attachmentUrls: string[] = [];
      
      if (values.attachments && values.attachments.length > 0) {
        // In a real implementation, this would upload files to storage
        // and collect URLs. For now, we'll just collect names for demo
        attachmentUrls = Array.from(values.attachments as File[]).map(file => file.name);
        console.log("Attachments to upload:", attachmentUrls);
      }
      
      // Prepare the request object
      const request = {
        companyName: 'Company Name', // You would get this from user context
        employeeName: 'Employee Name', // You would get this from user context
        serviceType: values.serviceType,
        pickupTime: format(values.pickupDate, "yyyy-MM-dd'T'HH:mm:ss"),
        pickupLocation: values.pickupLocation,
        dropoffLocation: values.dropoffLocation,
        status: 'Scheduled', // Updated to use the enum value directly
        notes: values.notes || '',
        car: {
          model: values.carModel,
          year: values.carYear,
          licensePlate: values.licensePlate,
          licensePlateArabic: values.licensePlateArabic,
          vin: values.vin
        },
        attachments: attachmentUrls
      };
      
      const result = await createRequest(request);
      
      if (result) {
        toast({
          title: 'Order placed successfully',
          description: `Your order has been submitted with Task ID: ${result.taskId}`,
        });
        form.reset();
      } else {
        toast({
          title: 'Failed to place order',
          description: 'There was an error submitting your order.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Failed to place order',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ServiceTypeField control={form.control} />
        <PickupDateField control={form.control} />
        <LocationFields control={form.control} />
        <CarDetailsFields control={form.control} />
        <NotesField control={form.control} />
        <FileUploadField control={form.control} />

        <Button type="submit" className="w-full">
          {t.placeOrder}
        </Button>
      </form>
    </Form>
  )
}
