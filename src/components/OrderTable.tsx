
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLanguageStore, translations } from '@/lib/i18n'
import { useNavigate } from 'react-router-dom'
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/customer/StatusBadge"
import { formatDateTimeTable } from "@/utils/formatters"

interface Order {
  id: string
  companyName: string
  employeeName: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  notes: string
  status: string
  taskId?: string
}

interface OrderTableProps {
  orders: Order[]
}

export const OrderTable = ({ orders }: OrderTableProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()

  const handleOrderClick = (taskId: string) => {
    navigate(`/order-details/${taskId}`)
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
            <TableHead>{t.companyName}</TableHead>
            <TableHead>{t.employeeName}</TableHead>
            <TableHead>{t.serviceType}</TableHead>
            <TableHead>{t.pickupTime}</TableHead>
            <TableHead>{t.pickupLocation}</TableHead>
            <TableHead>{t.dropoffLocation}</TableHead>
            <TableHead>{t.notes}</TableHead>
            <TableHead>{t.status}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                {t.noOrders}
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <button 
                    onClick={() => handleOrderClick(order.taskId || order.id)}
                    className="text-blue-600 hover:underline"
                  >
                    {order.taskId || order.id}
                  </button>
                </TableCell>
                <TableCell>{order.companyName}</TableCell>
                <TableCell>{order.employeeName}</TableCell>
                <TableCell>{order.serviceType}</TableCell>
                <TableCell>
                  {formatDateTimeTable(order.pickupTime)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-44">{order.pickupLocation}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={(e) => {
                        e.stopPropagation();
                        openInGoogleMaps(order.pickupLocation);
                      }}
                      className="h-8 w-8"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        openInGoogleMaps(order.dropoffLocation);
                      }}
                      className="h-8 w-8"
                    >
                      <MapPin size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{order.notes}</TableCell>
                <TableCell><StatusBadge status={order.status} /></TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
