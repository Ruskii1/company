
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
import { MapPin, ArrowUp } from "lucide-react"
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

  const getNextStatus = (currentStatus: string): string => {
    switch (currentStatus) {
      case 'Pending':
        return 'Waiting for provider'
      case 'Waiting for provider':
        return 'In route'
      case 'In route':
        return 'Arrived at the pick-up location'
      case 'Arrived at the pick-up location':
        return 'In service'
      case 'In service':
        return 'Completed'
      default:
        return currentStatus
    }
  }

  const escalateStatus = (id: string, currentStatus: string) => {
    // Skip for completed orders
    if (currentStatus === 'Completed') {
      toast.info("Order is already completed")
      return
    }
    
    // Get the next status
    const newStatus = getNextStatus(currentStatus)
    console.log(`Attempting to change order ${id} status from ${currentStatus} to ${newStatus}`)
    
    // Apply status change immediately - no conditions
    onStatusChange(id, newStatus)
  }

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
                  {/* Hide "Pending" word for future requests tab */}
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
                    {/* Do not show escalate button for future tab or completed orders */}
                    {!isFutureTab && order.status !== 'Completed' && (
                      <Button 
                        variant="default"
                        size="sm"
                        onClick={() => escalateStatus(order.id, order.status)}
                        className="flex items-center gap-1"
                      >
                        <ArrowUp size={14} />
                        <span>{t.escalateStatus}</span>
                      </Button>
                    )}
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
