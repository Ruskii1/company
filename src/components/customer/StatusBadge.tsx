
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
    // Map legacy status values to the new format
    default:
      // Use mapDatabaseToStatus to normalize any other status value
      const mappedStatus = mapLegacyStatus(status);
      return <StatusBadge status={mappedStatus} />;
  }
}

// Helper function to map legacy status values to our standardized OrderStatus
function mapLegacyStatus(status: string): OrderStatus {
  switch (status) {
    case 'Pending': return 'Scheduled';
    case 'Arrived at the pick-up location': return 'Arrived at Pickup Location';
    case 'Completed': return 'Complete';
    case 'Waiting for provider': return 'Waiting for Provider';
    case 'In route': return 'In Route';
    case 'In service': return 'In Service';
    default:
      // If it's already a valid OrderStatus, return it; otherwise default to Scheduled
      return 'Scheduled';
  }
}
