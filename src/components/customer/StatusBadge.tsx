
import { Badge } from "@/components/ui/badge"
import { OrderStatus } from "@/types/orderStatus"

interface StatusBadgeProps {
  status: string
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const normalizedStatus = status as OrderStatus;
  
  switch (normalizedStatus) {
    case 'Scheduled':
      return <Badge className="bg-purple-500">{status}</Badge>
    case 'Waiting for Provider':
      return <Badge className="bg-yellow-500 text-black">{status}</Badge>
    case 'NPA':
      return <Badge className="bg-red-500">No Provider Accepted</Badge>
    case 'NPF':
      return <Badge className="bg-red-500">No Provider Found</Badge>
    case 'In Route':
      return <Badge className="bg-blue-500">{status}</Badge>
    case 'Arrived at Pickup Location':
      return <Badge className="bg-indigo-500">{status}</Badge>
    case 'In Service':
      return <Badge className="bg-purple-500">{status}</Badge>
    case 'Complete':
      return <Badge className="bg-green-500">{status}</Badge>
    case 'Cancelled':
      return <Badge className="bg-gray-500">{status}</Badge>
    // Backwards compatibility for any old status values
    case 'Pending':
      return <Badge className="bg-purple-500">Scheduled</Badge>
    case 'Arrived at the pick-up location':
      return <Badge className="bg-indigo-500">Arrived at Pickup Location</Badge>
    case 'Completed':
      return <Badge className="bg-green-500">Complete</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}
