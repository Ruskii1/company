
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ReactNode } from "react"
import { useLanguageStore, translations } from "@/lib/i18n"

interface FilterCollapsibleProps {
  children: ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const FilterCollapsible = ({ children, isOpen, onOpenChange }: FilterCollapsibleProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <CollapsibleTrigger asChild>
        <Button 
          type="button"
          variant="outline" 
          className="flex items-center gap-2 mb-2"
        >
          {t.advancedFilters}
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="space-y-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
