
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

interface CustomerInfoSectionProps {
  customerName: string
  customerId: string
}

export const CustomerInfoSection = ({ customerName, customerId }: CustomerInfoSectionProps) => {
  const navigate = useNavigate()

  return (
    <div>
      <h3 className="text-lg font-semibold mb-1">Customer Name</h3>
      <p>{customerName}</p>
      <Button 
        variant="link" 
        className="p-0 h-auto mt-1"
        onClick={() => navigate(`/employee/customers/${customerId}`)}
      >
        View Customer Details
      </Button>
    </div>
  )
}
