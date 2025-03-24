
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { serviceTypeValues as defaultServiceTypeValues } from "@/components/forms/ServiceTypeField"

const filterSchema = z.object({
  requestNumber: z.string().optional(),
  serviceType: z.string().optional()
})

export type FilterValues = z.infer<typeof filterSchema>

interface RequestFilterProps {
  onFilterChange: (data: FilterValues) => void
  serviceTypeValues?: string[]
}

export const RequestFilter = ({ onFilterChange, serviceTypeValues }: RequestFilterProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Use provided serviceTypeValues or default to the imported ones
  const types = serviceTypeValues || defaultServiceTypeValues
  
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      requestNumber: '',
      serviceType: ''
    }
  })
  
  // Watch for changes in the fields and filter as user types or selects
  form.watch((value) => {
    onFilterChange(value as FilterValues)
  })

  return (
    <Form {...form}>
      <form className="flex flex-col md:flex-row gap-4 md:items-end">
        <FormField
          control={form.control}
          name="requestNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t.requestNumber}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={t.enterRequestNumber}
                    className="pr-8" 
                    {...field} 
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t.serviceType}</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.serviceType} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">
                    {t.all}
                  </SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t.services[type] || type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
