
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Clock } from "lucide-react"

interface TimeTrackingComponentProps {
  pickupTime: string
  timeTracking: {
    acceptedAt: string
    inRouteAt: string
    arrivedAt: string
    inServiceAt: string
    dropoffAt: string
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
              <TableCell className="font-medium">Order Accepted</TableCell>
              <TableCell>{timeTracking.acceptedAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">In Route</TableCell>
              <TableCell>{timeTracking.inRouteAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Arrived at Pick-up</TableCell>
              <TableCell>{timeTracking.arrivedAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">In Service</TableCell>
              <TableCell>{timeTracking.inServiceAt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Dropoff Time</TableCell>
              <TableCell>{timeTracking.dropoffAt}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
