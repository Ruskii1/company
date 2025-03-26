
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'Complete':
    case 'Completed': // for backward compatibility
      return <Badge className="bg-green-500">{status === 'Completed' ? 'Complete' : status}</Badge>
    case 'In Route':
    case 'In route': // for backward compatibility
      return <Badge className="bg-blue-500">{status === 'In route' ? 'In Route' : status}</Badge>
    case 'Scheduled':
    case 'Pending': // for backward compatibility
      return <Badge className="bg-purple-500">{status === 'Pending' ? 'Scheduled' : status}</Badge>
    case 'Waiting for Provider':
    case 'Waiting for provider': // for backward compatibility
      return <Badge className="bg-yellow-500 text-black">{status === 'Waiting for provider' ? 'Waiting for Provider' : status}</Badge>
    case 'NPA':
      return <Badge className="bg-red-500">No Provider Accepted</Badge>
    case 'NPF':
      return <Badge className="bg-red-500">No Provider Found</Badge>
    case 'In Service':
    case 'In service': // for backward compatibility
      return <Badge className="bg-purple-500">{status === 'In service' ? 'In Service' : status}</Badge>
    case 'Arrived at Pickup Location':
    case 'Arrived at the pick-up location': // for backward compatibility
      return <Badge className="bg-indigo-500">{status === 'Arrived at the pick-up location' ? 'Arrived at Pickup Location' : status}</Badge>
    case 'Cancelled':
      return <Badge className="bg-gray-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}
