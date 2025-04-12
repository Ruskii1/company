
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLanguageStore, translations } from '@/lib/i18n'
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { MapPin } from "lucide-react"
import { StatusBadge } from "@/components/employee/orders/StatusBadge"
import { toast } from "sonner"

interface Order {
  id: string
  taskId: string
  customerName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  city?: string
  providerId?: string
  providerPhone?: string
}

interface OrderManagementTableProps {
  orders: Order[]
  onStatusChange: (id: string, newStatus: string) => void
  isFutureTab?: boolean
}

export const OrderManagementTable = ({ 
  orders, 
  onStatusChange,
  isFutureTab = false 
}: OrderManagementTableProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()

  const openInGoogleMaps = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.taskId}</TableHead>
            <TableHead>{t.customerName}</TableHead>
            <TableHead>{t.serviceType}</TableHead>
            <TableHead>{t.pickupTime}</TableHead>
            <TableHead>{t.pickupLocation}</TableHead>
            <TableHead>{t.dropoffLocation}</TableHead>
            <TableHead>{t.status}</TableHead>
            <TableHead>{t.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                {t.noOrders}
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => navigate(`/employee/orders/${order.taskId}`)}
                  >
                    {order.taskId}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => navigate(`/employee/customers/${order.id}`)}
                  >
                    {order.customerName}
                  </Button>
                </TableCell>
                <TableCell>{order.serviceType}</TableCell>
                <TableCell>{order.pickupTime}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-44">{order.pickupLocation}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openInGoogleMaps(order.pickupLocation)}
                      className="ml-1 h-8 w-8"
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-44">{order.dropoffLocation}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openInGoogleMaps(order.dropoffLocation)}
                      className="ml-1 h-8 w-8"
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  {isFutureTab && order.status === 'Pending' ? (
                    <StatusBadge status="Scheduled" />
                  ) : (
                    <StatusBadge status={order.status} />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/employee/orders/${order.taskId}`)}
                    >
                      {t.viewDetails}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
