
import { Badge } from "@/components/ui/badge"
import { OrderStatus, mapDatabaseToStatus } from "@/types/orderStatus"

interface StatusBadgeProps {
  status: string
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  // Normalize the status to ensure it matches our OrderStatus type
  const normalizedStatus = mapDatabaseToStatus(status);
  
  switch (normalizedStatus) {
    case 'Complete':
      return <Badge className="bg-green-500">{normalizedStatus}</Badge>
    case 'In Route':
      return <Badge className="bg-blue-500">{normalizedStatus}</Badge>
    case 'Scheduled':
      return <Badge className="bg-purple-500">{normalizedStatus}</Badge>
    case 'Waiting for Provider':
      return <Badge className="bg-yellow-500 text-black">{normalizedStatus}</Badge>
    case 'NPA':
      return <Badge className="bg-red-500">No Provider Accepted</Badge>
    case 'NPF':
      return <Badge className="bg-red-500">No Provider Found</Badge>
    case 'In Service':
      return <Badge className="bg-purple-500">{normalizedStatus}</Badge>
    case 'Arrived at Pickup Location':
      return <Badge className="bg-indigo-500">{normalizedStatus}</Badge>
    case 'Cancelled':
      return <Badge className="bg-gray-500">{normalizedStatus}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}
