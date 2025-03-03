
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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useState } from "react"
import { MapPin } from "lucide-react"

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
}

export const OrderManagementTable = ({ orders, onStatusChange }: OrderManagementTableProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-500">{status}</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-500">{status}</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-500 text-black">{status}</Badge>
      case 'Scheduled':
        return <Badge className="bg-purple-500">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const escalateStatus = (id: string, currentStatus: string) => {
    let newStatus: string
    
    switch (currentStatus) {
      case 'Pending':
        newStatus = 'Scheduled'
        break
      case 'Scheduled':
        newStatus = 'In Progress'
        break
      case 'In Progress':
        newStatus = 'Completed'
        break
      default:
        newStatus = currentStatus
        break
    }
    
    if (newStatus !== currentStatus) {
      onStatusChange(id, newStatus)
      toast.success(`Order status updated to ${newStatus}`)
    } else if (currentStatus === 'Completed') {
      toast.info("Order is already completed")
    }
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
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/employee/orders/${order.taskId}`)}
                    >
                      {t.viewDetails}
                    </Button>
                    {order.status !== 'Completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => escalateStatus(order.id, order.status)}
                        className="bg-blue-500 text-white hover:bg-blue-600"
                      >
                        {t.escalateStatus}
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
