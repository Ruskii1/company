
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterValues } from "@/types/orderManagement"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

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
  serviceTypeValues: string[]
  statusValues?: string[]
  cityValues?: string[]
}

export const OrderManagementFilter = ({ 
  onSubmit, 
  onFilterChange, 
  serviceTypeValues,
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
  
  form.watch((value) => {
    onFilterChange(value as FilterValues)
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
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
        </div>
        
        {/* Advanced filters */}
        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              type="button"
              variant="outline" 
              className="flex items-center gap-2 mb-2"
            >
              {t.advancedFilters}
              <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? "transform rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status Filter */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.status}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.selectStatus} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">
                          {t.all}
                        </SelectItem>
                        {statusValues.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              {/* City Filter */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.city}</FormLabel>
                    {cityValues.length > 0 ? (
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectCity} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">
                            {t.all}
                          </SelectItem>
                          {cityValues.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input 
                        placeholder={t.enterCity}
                        {...field} 
                      />
                    )}
                  </FormItem>
                )}
              />
              
              {/* Provider ID Filter */}
              <FormField
                control={form.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.providerId}</FormLabel>
                    <Input 
                      placeholder={t.enterProviderId}
                      {...field} 
                    />
                  </FormItem>
                )}
              />
              
              {/* Provider Phone Filter */}
              <FormField
                control={form.control}
                name="providerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.providerPhone}</FormLabel>
                    <Input 
                      placeholder={t.enterProviderPhone}
                      {...field} 
                    />
                  </FormItem>
                )}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <div className="flex justify-end">
          <Button type="submit">{t.applyFilters}</Button>
        </div>
      </form>
    </Form>
  )
}
