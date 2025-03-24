
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLanguageStore, translations } from "@/lib/i18n"
import { FilterValues } from "@/types/orderManagement"
import { useState, useEffect } from "react"
import { BasicFilters } from "./filters/BasicFilters"
import { AdvancedFilters } from "./filters/AdvancedFilters"
import { FilterCollapsible } from "./filters/FilterCollapsible"

const filterSchema = z.object({
  taskId: z.string().optional(),
  serviceType: z.string().optional(),
  status: z.string().optional(),
  city: z.string().optional(),
  providerId: z.string().optional(),
  providerPhone: z.string().optional()
})

interface OrderManagementFilterProps {
  onSubmit: (data: FilterValues) => void
  onFilterChange: (data: FilterValues) => void
  statusValues?: string[]
  cityValues?: string[]
}

export const OrderManagementFilter = ({ 
  onSubmit, 
  onFilterChange, 
  statusValues = ["Pending", "Waiting for provider", "In route", "Arrived at the pick-up location", "In service", "Completed"],
  cityValues = []
}: OrderManagementFilterProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      taskId: '',
      serviceType: '',
      status: '',
      city: '',
      providerId: '',
      providerPhone: ''
    }
  })
  
  // Watch for changes and trigger filter updates
  useEffect(() => {
    const subscription = form.watch((value) => {
      onFilterChange(value as FilterValues)
    })
    return () => subscription.unsubscribe()
  }, [form, onFilterChange])
  
  // Handle form submission
  const handleSubmit = (data: FilterValues) => {
    console.log("Form submitted with:", data) // Debug log
    onSubmit(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Basic filters */}
        <BasicFilters control={form.control} />
        
        {/* Advanced filters */}
        <FilterCollapsible 
          isOpen={isAdvancedOpen} 
          onOpenChange={setIsAdvancedOpen}
        >
          <AdvancedFilters 
            control={form.control} 
            statusValues={statusValues} 
            cityValues={cityValues} 
          />
        </FilterCollapsible>
        
        <div className="flex justify-end">
          <Button type="submit">{t.applyFilters}</Button>
        </div>
      </form>
    </Form>
  )
}
