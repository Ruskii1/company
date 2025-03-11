
import { useState } from "react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"
import { AddPaymentSheet } from "./payment/AddPaymentSheet"
import { PaymentMethodList } from "./payment/PaymentMethodList"

const mockCreditCards = [
  { id: "1", type: "Visa", last4: "4242", expiry: "12/24", default: true },
  { id: "2", type: "Mastercard", last4: "5555", expiry: "09/25", default: false }
]

const mockBankAccounts = [
  { id: "1", bankName: "Bank of America", accountType: "Checking", last4: "1234", default: true }
]

export function PaymentSettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [creditCards, setCreditCards] = useState(mockCreditCards)
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts)
  
  const handleSetDefaultCreditCard = (id: string) => {
    setCreditCards(prevCards => 
      prevCards.map(card => ({ ...card, default: card.id === id }))
    )
    
    toast({
      title: t.defaultPaymentMethodUpdated,
      description: t.yourDefaultPaymentMethodHasBeenUpdated,
    })
  }
  
  const handleSetDefaultBankAccount = (id: string) => {
    setBankAccounts(prevAccounts => 
      prevAccounts.map(account => ({ ...account, default: account.id === id }))
    )
    
    toast({
      title: t.defaultPaymentMethodUpdated,
      description: t.yourDefaultPaymentMethodHasBeenUpdated,
    })
  }
  
  const handleDeleteCreditCard = (id: string) => {
    setCreditCards(prevCards => prevCards.filter(card => card.id !== id))
    
    toast({
      title: t.creditCardRemoved,
      description: t.yourCreditCardHasBeenRemoved,
    })
  }
  
  const handleDeleteBankAccount = (id: string) => {
    setBankAccounts(prevAccounts => prevAccounts.filter(account => account.id !== id))
    
    toast({
      title: t.bankAccountRemoved,
      description: t.yourBankAccountHasBeenRemoved,
    })
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t.paymentMethods}</h3>
        <p className="text-sm text-muted-foreground">
          {t.manageYourPaymentMethodsForBillingAndPayments}
        </p>
      </div>
      
      <div className="flex justify-end">
        <AddPaymentSheet />
      </div>
      
      <PaymentMethodList
        type="creditCards"
        items={creditCards}
        onSetDefault={handleSetDefaultCreditCard}
        onDelete={handleDeleteCreditCard}
      />
      
      <PaymentMethodList
        type="bankAccounts"
        items={bankAccounts}
        onSetDefault={handleSetDefaultBankAccount}
        onDelete={handleDeleteBankAccount}
      />
    </div>
  )
}
