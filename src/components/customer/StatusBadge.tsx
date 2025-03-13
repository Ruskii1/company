
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case 'Waiting for provider':
      return <Badge className="bg-yellow-500 text-black">{status}</Badge>
    case 'In route':
      return <Badge className="bg-blue-500">{status}</Badge>
    case 'Arrived at the pick-up location':
      return <Badge className="bg-indigo-500">{status}</Badge>
    case 'In service':
      return <Badge className="bg-purple-500">{status}</Badge>
    case 'Completed':
      return <Badge className="bg-green-500">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}
