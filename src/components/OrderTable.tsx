
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
                <TableCell>{order.pickupLocation}</TableCell>
                <TableCell>{order.dropoffLocation}</TableCell>
                <TableCell>{order.notes}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
