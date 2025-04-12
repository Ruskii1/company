
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import { Mail, Phone, Building, User } from "lucide-react"

interface CustomerInfoSectionProps {
  customerName: string
  customerId: string
  customerEmail?: string
  customerPhone?: string
  customerCompany?: string
}

export const CustomerInfoSection = ({ 
  customerName, 
  customerId, 
  customerEmail, 
  customerPhone, 
  customerCompany 
}: CustomerInfoSectionProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <User className="h-4 w-4" />
          Customer Name
        </h3>
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

      {customerCompany && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
            <Building className="h-4 w-4" />
            Company
          </h3>
          <p>{customerCompany}</p>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-4">
        {customerPhone && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </h3>
            <p>{customerPhone}</p>
          </div>
        )}
        
        {customerEmail && (
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </h3>
            <p>{customerEmail}</p>
          </div>
        )}
      </div>
    </div>
  )
}
