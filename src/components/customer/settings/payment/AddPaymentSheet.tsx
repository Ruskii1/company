
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { PaymentMethodForm } from "./PaymentMethodForm"

export function AddPaymentSheet() {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t.addPaymentMethod}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t.addPaymentMethod}</SheetTitle>
          <SheetDescription>
            {t.addANewPaymentMethodToYourAccount}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <PaymentMethodForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
