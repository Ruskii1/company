
import { useParams, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Phone, Building, User } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CustomerDetails {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
  contactPerson: string
}

const CustomerDetails = () => {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguageStore()
  const t = translations[language]
  const [customer, setCustomer] = useState<CustomerDetails | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate data fetching
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      // Mock data - in a real app, fetch from API using customerId
      const mockCustomer = {
        id: '1001',
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1 (555) 123-4567',
        company: 'Acme Corporation Ltd.',
        address: '123 Business Ave, Tower A, Suite 500, Business District',
        contactPerson: 'John Smith',
      }
      
      setCustomer(mockCustomer)
      setLoading(false)
    }, 500)
  }, [customerId])

  if (loading) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!customer) {
    return (
      <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
        <CardContent className="p-6">
          <div className="text-center">
            <p>Customer not found</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/employee')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Order Management
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
      <CardHeader className="flex flex-row items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/employee')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Order Management
        </Button>
        <CardTitle className="text-2xl">{t.customerName}: {customer.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Company</h3>
                <p>{customer.company}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Contact Person</h3>
                <p>{customer.contactPerson}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>{customer.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>{customer.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Address</h3>
          <p>{customer.address}</p>
        </div>
        
        <div className="mt-6">
          <Button 
            variant="outline"
            onClick={() => navigate(`/employee/customers/${customer.id}/orders`)}
          >
            View All Orders
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerDetails
