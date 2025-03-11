
import { CreditCard, Building, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PaymentMethod {
  id: string
  type: string
  last4: string
  expiry?: string
  default: boolean
  bankName?: string
  accountType?: string
}

interface PaymentMethodListProps {
  type: "creditCards" | "bankAccounts"
  items: PaymentMethod[]
  onSetDefault: (id: string) => void
  onDelete: (id: string) => void
}

export function PaymentMethodList({ type, items, onSetDefault, onDelete }: PaymentMethodListProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  const Icon = type === "creditCards" ? CreditCard : Building
  const title = type === "creditCards" ? t.creditCards : t.bankAccounts
  const description = type === "creditCards" 
    ? t.manageYourCreditCardsForPayments 
    : t.manageYourBankAccountsForPayments
  const emptyMessage = type === "creditCards" 
    ? t.noCreditCardsAdded 
    : t.noBankAccountsAdded

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-4 rounded-lg border ${item.default ? 'bg-muted' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {type === "creditCards" ? `${item.type} •••• ${item.last4}` : `${item.bankName}`}
                      {item.default && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({t.default})
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {type === "creditCards" 
                        ? `${t.expires}: ${item.expiry}`
                        : `${item.accountType} •••• ${item.last4}`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!item.default && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSetDefault(item.id)}
                    >
                      {t.setAsDefault}
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => onDelete(item.id)}
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
  )
}
