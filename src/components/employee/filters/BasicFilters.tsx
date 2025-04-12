
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Control } from "react-hook-form"
import { FilterValues } from "@/types/orderManagement"
import { serviceTypeValues as defaultServiceTypeValues } from "@/components/forms/ServiceTypeField"

interface BasicFiltersProps {
  control: Control<FilterValues>
  serviceTypeValues?: string[]
}

export const BasicFilters = ({ control, serviceTypeValues }: BasicFiltersProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  // Use provided serviceTypeValues or default to the imported ones
  const types = serviceTypeValues || defaultServiceTypeValues

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-end">
      <FormField
        control={control}
        name="taskId"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>{t.taskId}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  placeholder={t.enterRequestNumber || "Enter order number"}
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
        control={control}
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
                  {t.all || "All"}
                </SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {t.services && t.services[type] ? t.services[type] : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  )
}
