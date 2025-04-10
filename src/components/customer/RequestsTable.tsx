
import { useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { StatusBadge } from './StatusBadge'
import { LocationDisplay } from './LocationDisplay'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { format, parseISO } from 'date-fns'

interface Request {
  id: string
  taskId: string
  serviceType: string
  pickupTime: string
  pickupLocation: string
  dropoffLocation: string
  status: string
  notes: string
}

interface RequestsTableProps {
  requests: Request[]
}

export const RequestsTable = ({ requests }: RequestsTableProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()

  const handleRequestClick = (taskId: string) => {
    // Fixed: Now properly navigating to the specific task ID
    navigate(`/order-details/${taskId}`)
  }

  // Format date to show YYYY-MM-DD with time below it
  const formatPickupTime = (dateTimeString: string) => {
    try {
      const date = parseISO(dateTimeString)
      return (
        <div className="flex flex-col">
          <span className="font-medium">{format(date, 'yyyy-MM-dd')}</span>
          <span className="text-sm text-muted-foreground">{format(date, 'HH:mm')}</span>
        </div>
      )
    } catch (error) {
      // Fallback for invalid dates
      return dateTimeString
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.taskId}</TableHead>
            <TableHead>{t.serviceType}</TableHead>
            <TableHead>{t.pickupTime}</TableHead>
            <TableHead>{t.pickupLocation}</TableHead>
            <TableHead>{t.dropoffLocation}</TableHead>
            <TableHead>{t.notes}</TableHead>
            <TableHead>{t.status}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <Button
                  variant="link"
                  onClick={() => handleRequestClick(request.id)}
                >
                  {request.taskId}
                </Button>
              </TableCell>
              <TableCell>{request.serviceType}</TableCell>
              <TableCell>
                {formatPickupTime(request.pickupTime)}
              </TableCell>
              <TableCell>
                <LocationDisplay location={request.pickupLocation} />
              </TableCell>
              <TableCell>
                <LocationDisplay location={request.dropoffLocation} />
              </TableCell>
              <TableCell>{request.notes}</TableCell>
              <TableCell>
                <StatusBadge status={request.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
