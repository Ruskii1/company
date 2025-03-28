
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AddPaymentSheet } from "./payment/AddPaymentSheet"
import { PaymentMethodList } from "./payment/PaymentMethodList"

// Define the PaymentMethod type
interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  default: boolean;
  // Card specific properties
  cardType?: string;
  last4?: string;
  expiryDate?: string;
  // Bank specific properties
  bankName?: string;
  accountType?: string;
}

export function PaymentSettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState("cards")
  
  // Mock data for credit cards
  const [creditCards, setCreditCards] = useState<PaymentMethod[]>([
    {
      id: "card-1",
      type: "card",
      cardType: "visa", 
      last4: "4242",
      expiryDate: "12/2024",
      default: true
    },
    {
      id: "card-2",
      type: "card",
      cardType: "mastercard",
      last4: "5678",
      expiryDate: "09/2025",
      default: false
    }
  ])
  
  // Mock data for bank accounts
  const [bankAccounts, setBankAccounts] = useState<PaymentMethod[]>([
    {
      id: "bank-1",
      type: "bank",
      bankName: "National Bank",
      accountType: "Checking",
      last4: "1234",
      default: false
    },
    {
      id: "bank-2",
      type: "bank",
      bankName: "Global Bank",
      accountType: "Savings",
      last4: "5678",
      default: true
    }
  ])
  
  const handleSetDefault = (id: string, type: 'card' | 'bank') => {
    if (type === 'card') {
      const updatedCards = creditCards.map(card => ({
        ...card,
        default: card.id === id
      }))
      setCreditCards(updatedCards)
    } else {
      const updatedAccounts = bankAccounts.map(account => ({
        ...account,
        default: account.id === id
      }))
      setBankAccounts(updatedAccounts)
    }
  }
  
  const handleDelete = (id: string, type: 'card' | 'bank') => {
    if (type === 'card') {
      setCreditCards(creditCards.filter(card => card.id !== id))
    } else {
      setBankAccounts(bankAccounts.filter(account => account.id !== id))
    }
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">{t.customer.settings.payment.paymentMethods}</h3>
        <p className="text-sm text-muted-foreground">
          {t.customer.settings.payment.manageYourPaymentMethodsForBillingAndPayments}
        </p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-lg">{t.customer.settings.payment.paymentMethods}</CardTitle>
            <CardDescription>
              {activeTab === "cards" 
                ? t.customer.settings.payment.manageYourCreditCardsForPayments
                : t.customer.settings.payment.manageYourBankAccountsForPayments}
            </CardDescription>
          </div>
          <AddPaymentSheet />
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="cards">{t.customer.settings.payment.creditCards}</TabsTrigger>
              <TabsTrigger value="accounts">{t.customer.settings.payment.bankAccounts}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cards">
              <PaymentMethodList 
                paymentMethods={creditCards}
                type="card"
                onSetDefault={handleSetDefault}
                onDelete={handleDelete}
                emptyMessage={t.customer.settings.payment.noCreditCardsAdded}
              />
            </TabsContent>
            
            <TabsContent value="accounts">
              <PaymentMethodList 
                paymentMethods={bankAccounts}
                type="bank"
                onSetDefault={handleSetDefault}
                onDelete={handleDelete}
                emptyMessage={t.customer.settings.payment.noBankAccountsAdded}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
