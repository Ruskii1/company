
import { z } from "zod"

export const orderFormSchema = z.object({
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

export type OrderFormValues = z.infer<typeof orderFormSchema>
