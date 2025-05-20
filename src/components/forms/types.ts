
import { z } from "zod"
import { ServiceType } from "@/types/serviceType";

export const orderFormSchema = z.object({
  serviceType: z.string().min(1, {
    message: "Service type is required",
  }) as z.ZodType<ServiceType>,
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
  carModel: z.string().min(1, {
    message: "Car model is required",
  }),
  carYear: z.string().min(1, {
    message: "Model year is required",
  }),
  licensePlate: z.string().min(1, {
    message: "License plate is required",
  }),
  licensePlateArabic: z.string().min(1, {
    message: "Arabic license plate is required",
  }),
  vin: z.string().min(1, {
    message: "VIN number is required",
  }),
  attachments: z.instanceof(Array).optional()
})

export type OrderFormValues = z.infer<typeof orderFormSchema>
