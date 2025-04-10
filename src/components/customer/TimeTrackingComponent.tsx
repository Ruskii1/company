
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Clock } from "lucide-react"

interface TimeTrackingComponentProps {
  pickupTime: string
  timeTracking: {
    scheduled: string
    accepted: string
    arrivedPickup: string | null
    inService: string | null
    completed: string | null
  }
}

export const TimeTrackingComponent = ({ 
  pickupTime, 
  timeTracking 
}: TimeTrackingComponentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Tracking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Pick-up Time</TableCell>
              <TableCell>{pickupTime}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Scheduled</TableCell>
              <TableCell>{timeTracking.scheduled}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Order Accepted</TableCell>
              <TableCell>{timeTracking.accepted}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Arrived at Pick-up</TableCell>
              <TableCell>{timeTracking.arrivedPickup || 'Not yet'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">In Service</TableCell>
              <TableCell>{timeTracking.inService || 'Not yet'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Completed</TableCell>
              <TableCell>{timeTracking.completed || 'Not yet'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
