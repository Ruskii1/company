
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
import { Badge } from "@/components/ui/badge"

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-orange-500 text-black">{status}</Badge>
      case 'Scheduled':
        return <Badge className="bg-purple-500">{status}</Badge>
      case 'Waiting for provider':
        return <Badge className="bg-yellow-500 text-black">{status}</Badge>
      case 'In route':
        return <Badge className="bg-blue-500">{status}</Badge>
      case 'Arrived at the pick-up location':
        return <Badge className="bg-indigo-500">{status}</Badge>
      case 'In service':
        return <Badge className="bg-purple-500">{status}</Badge>
      case 'Completed':
        return <Badge className="bg-green-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
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
                <TableCell>{order.pickupTime}</TableCell>
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
                <TableCell>{getStatusBadge(order.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
