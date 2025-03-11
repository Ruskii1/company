import { useState } from "react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CreditCard, Building, PlusCircle, Trash2, Edit } from "lucide-react"

const mockCreditCards = [
  { id: "1", type: "Visa", last4: "4242", expiry: "12/24", default: true },
  { id: "2", type: "Mastercard", last4: "5555", expiry: "09/25", default: false }
]

const mockBankAccounts = [
  { id: "1", bankName: "Bank of America", accountType: "Checking", last4: "1234", default: true }
]

const creditCardSchema = z.object({
  cardNumber: z.string().min(16, {
    message: "Card number must be at least 16 digits.",
  }).max(19),
  cardholderName: z.string().min(2, {
    message: "Cardholder name must be at least 2 characters.",
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in format MM/YY.",
  }),
  cvv: z.string().min(3, {
    message: "CVV must be at least 3 digits.",
  }).max(4),
})

const bankAccountSchema = z.object({
  accountNumber: z.string().min(8, {
    message: "Account number must be at least 8 characters.",
  }),
  routingNumber: z.string().min(9, {
    message: "Routing number must be at least 9 characters.",
  }),
  accountHolderName: z.string().min(2, {
    message: "Account holder name must be at least 2 characters.",
  }),
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
})

type CreditCardFormValues = z.infer<typeof creditCardSchema>
type BankAccountFormValues = z.infer<typeof bankAccountSchema>

export function PaymentSettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [creditCards, setCreditCards] = useState(mockCreditCards)
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts)
  const [addMethodType, setAddMethodType] = useState("creditCard")
  
  const creditCardForm = useForm<CreditCardFormValues>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
  })
  
  const bankAccountForm = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      accountNumber: "",
      routingNumber: "",
      accountHolderName: "",
      bankName: "",
    },
  })
  
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
  
  const onSubmitCreditCard = (data: CreditCardFormValues) => {
    const newCard = {
      id: Date.now().toString(),
      type: "Visa",
      last4: data.cardNumber.slice(-4),
      expiry: data.expiryDate,
      default: creditCards.length === 0
    }
    
    setCreditCards(prev => [...prev, newCard])
    creditCardForm.reset()
    
    toast({
      title: t.creditCardAdded,
      description: t.yourCreditCardHasBeenAddedSuccessfully,
    })
  }
  
  const onSubmitBankAccount = (data: BankAccountFormValues) => {
    const newAccount = {
      id: Date.now().toString(),
      bankName: data.bankName,
      accountType: "Checking",
      last4: data.accountNumber.slice(-4),
      default: bankAccounts.length === 0
    }
    
    setBankAccounts(prev => [...prev, newAccount])
    bankAccountForm.reset()
    
    toast({
      title: t.bankAccountAdded,
      description: t.yourBankAccountHasBeenAddedSuccessfully,
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
                  <Form {...creditCardForm}>
                    <form onSubmit={creditCardForm.handleSubmit(onSubmitCreditCard)} className="space-y-4">
                      <FormField
                        control={creditCardForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.cardNumber}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="1234 5678 9012 3456" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={creditCardForm.control}
                        name="cardholderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.cardholderName}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={creditCardForm.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.expiryDate}</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="MM/YY" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={creditCardForm.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.cvv}</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" placeholder="123" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        {t.addCreditCard}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="bankAccount" className="mt-4">
                  <Form {...bankAccountForm}>
                    <form onSubmit={bankAccountForm.handleSubmit(onSubmitBankAccount)} className="space-y-4">
                      <FormField
                        control={bankAccountForm.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.bankName}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Bank of America" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={bankAccountForm.control}
                        name="accountHolderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.accountHolderName}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="John Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={bankAccountForm.control}
                        name="routingNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.routingNumber}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="123456789" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={bankAccountForm.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.accountNumber}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="12345678" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        {t.addBankAccount}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t.creditCards}
          </CardTitle>
          <CardDescription>
            {t.manageYourCreditCardsForPayments}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {creditCards.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {t.noCreditCardsAdded}
            </p>
          ) : (
            <div className="space-y-4">
              {creditCards.map((card) => (
                <div 
                  key={card.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border ${card.default ? 'bg-muted' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {card.type} •••• {card.last4}
                        {card.default && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({t.default})
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t.expires}: {card.expiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!card.default && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefaultCreditCard(card.id)}
                      >
                        {t.setAsDefault}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeleteCreditCard(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {t.bankAccounts}
          </CardTitle>
          <CardDescription>
            {t.manageYourBankAccountsForPayments}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bankAccounts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {t.noBankAccountsAdded}
            </p>
          ) : (
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div 
                  key={account.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border ${account.default ? 'bg-muted' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Building className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {account.bankName}
                        {account.default && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({t.default})
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {account.accountType} •••• {account.last4}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!account.default && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefaultBankAccount(account.id)}
                      >
                        {t.setAsDefault}
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeleteBankAccount(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

