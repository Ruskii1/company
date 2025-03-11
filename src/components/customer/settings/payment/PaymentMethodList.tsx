
import { CreditCard, Building, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguageStore, translations } from "@/lib/i18n"

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

interface PaymentMethodListProps {
  paymentMethods: PaymentMethod[];
  type: 'card' | 'bank';
  onSetDefault: (id: string, type: 'card' | 'bank') => void;
  onDelete: (id: string, type: 'card' | 'bank') => void;
  emptyMessage: string;
}

export function PaymentMethodList({ 
  paymentMethods, 
  type, 
  onSetDefault, 
  onDelete,
  emptyMessage
}: PaymentMethodListProps) {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  const Icon = type === "card" ? CreditCard : Building;

  return (
    <div className="space-y-4">
      {paymentMethods.length === 0 ? (
        <p className="text-muted-foreground text-center py-6">
          {emptyMessage}
        </p>
      ) : (
        <div className="space-y-4">
          {paymentMethods.map((item) => (
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
                    {type === "card" 
                      ? `${item.cardType} •••• ${item.last4}` 
                      : `${item.bankName}`}
                    {item.default && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        ({t.default})
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {type === "card" 
                      ? `${t.expires}: ${item.expiryDate}`
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
                    onClick={() => onSetDefault(item.id, item.type)}
                  >
                    {t.setAsDefault}
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onDelete(item.id, item.type)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
