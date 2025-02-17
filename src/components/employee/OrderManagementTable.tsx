
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
}

export const OrderManagementTable = ({ orders }: OrderManagementTableProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()

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
                <TableCell>{order.pickupLocation}</TableCell>
                <TableCell>{order.dropoffLocation}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    {t.viewDetails}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
