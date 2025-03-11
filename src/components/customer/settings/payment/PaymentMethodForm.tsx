
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Building } from "lucide-react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { CreditCardForm } from "./CreditCardForm"
import { BankAccountForm } from "./BankAccountForm"

export function PaymentMethodForm() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [addMethodType, setAddMethodType] = useState("creditCard")

  return (
    <Tabs defaultValue={addMethodType} onValueChange={setAddMethodType}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="creditCard">
          <CreditCard className="mr-2 h-4 w-4" />
          {t.creditCard}
        </TabsTrigger>
        <TabsTrigger value="bankAccount">
          <Building className="mr-2 h-4 w-4" />
          {t.bankAccount}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="creditCard" className="mt-4">
        <CreditCardForm />
      </TabsContent>
      
      <TabsContent value="bankAccount" className="mt-4">
        <BankAccountForm />
      </TabsContent>
    </Tabs>
  )
}
