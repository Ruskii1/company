
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLanguageStore, translations } from "@/lib/i18n"

const filterSchema = z.object({
  taskId: z.string().optional()
})

export type FilterValues = z.infer<typeof filterSchema>

interface OrderManagementFilterProps {
  onSubmit: (data: FilterValues) => void
  onFilterChange: (data: FilterValues) => void
}

export const OrderManagementFilter = ({ onSubmit, onFilterChange }: OrderManagementFilterProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      taskId: ''
    }
  })
  
  // Watch for changes in the search field and filter as user types
  form.watch((value) => {
    onFilterChange(value as FilterValues)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2">
        <FormField
          control={form.control}
          name="taskId"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2">
              <FormLabel className="whitespace-nowrap">{t.taskId}:</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder={`${t.enterRequestNumber}`}
                    className="pr-8 min-w-[250px]" 
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
      </form>
    </Form>
  )
}
