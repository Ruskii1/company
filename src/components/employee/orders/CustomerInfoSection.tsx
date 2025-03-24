
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"

interface CustomerInfoSectionProps {
  customerName: string
  customerId: string
}

export const CustomerInfoSection = ({ customerName, customerId }: CustomerInfoSectionProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">Customer Name</h3>
      <p>{customerName}</p>
      <Button 
        variant="link" 
        className="p-0 h-auto mt-1"
        onClick={() => navigate(`/employee/customers/${customerId}`, { 
          state: { from: location.pathname } 
        })}
      >
        View Customer Details
      </Button>
    </div>
  )
}
