
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { LocationDisplay } from '@/components/customer/LocationDisplay'
import { Request } from '@/types/request'
import { useLanguageStore, translations } from '@/lib/i18n'
import { formatDateTime } from '@/utils/formatters'

interface OrderDetailsTabProps {
  order: Request
  canCancelOrder: boolean
  handleCancelOrder: () => Promise<void>
}

export const OrderDetailsTab = ({ 
  order, 
  canCancelOrder, 
  handleCancelOrder 
}: OrderDetailsTabProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{t.serviceType}</h3>
            <p>{order.serviceType}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-1">{t.pickupTime}</h3>
            <p>{formatDateTime(order.pickupTime)}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{t.pickupLocation}</h3>
            <LocationDisplay location={order.pickupLocation} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-1">{t.dropoffLocation}</h3>
            <LocationDisplay location={order.dropoffLocation} />
          </div>
          
          {order.notes && (
            <div>
              <h3 className="text-lg font-semibold mb-1">{t.notes}</h3>
              <p>{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      {canCancelOrder && (
        <div className="pt-4 border-t mt-6">
          <Button 
            variant="destructive" 
            onClick={handleCancelOrder}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel Order
          </Button>
        </div>
      )}
    </div>
  )
}
