
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const filterSchema = z.object({
  taskId: z.string().optional(),
  serviceType: z.string().optional()
})

export type FilterValues = z.infer<typeof filterSchema>

interface OrderManagementFilterProps {
  onSubmit: (data: FilterValues) => void
  onFilterChange: (data: FilterValues) => void
  serviceTypeValues: string[]
}

export const OrderManagementFilter = ({ onSubmit, onFilterChange, serviceTypeValues }: OrderManagementFilterProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      taskId: '',
      serviceType: ''
    }
  })
  
  // Watch for changes in the fields and filter as user types or selects
  form.watch((value) => {
    onFilterChange(value as FilterValues)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 md:items-end">
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{t.taskId}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={t.enterRequestNumber}
                    className="pr-8" 
                    {...field} 
                  />
                  <Button 
                    type="submit" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
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
                  {serviceTypeValues.map((type) => (
                    <SelectItem key={type} value={t.services[type]}>
                      {t.services[type]}
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
