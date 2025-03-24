
import { Building2, Mail, Phone, Calendar, FileText, CreditCard } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { ProviderCompany } from '@/types/corporate'
import { Badge } from '@/components/ui/badge'

interface CompanyOverviewProps {
  company: ProviderCompany
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Company Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Company:</span>
                <span>{company.name}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Phone:</span>
                <span>{company.phone}</span>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                <span className="text-sm text-muted-foreground mr-2">Email:</span>
                <span>{company.email}</span>
              </div>
              
              <div className="flex items-start">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                <span className="text-sm text-muted-foreground mr-2">Registration No:</span>
                <span>{company.registrationNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Contract Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Start Date:</span>
                <span>{new Date(company.contractStartDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">End Date:</span>
                <span>{new Date(company.contractEndDate).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Commission:</span>
                <span>{company.commissionRate}%</span>
              </div>
              
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Status:</span>
                <Badge
                  variant={company.status === 'active' ? 'default' : 
                          company.status === 'pending' ? 'secondary' : 'destructive'}
                  className="ml-1"
                >
                  {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Contact Person</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Name:</span>
              <span>{company.contactPerson}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Position:</span>
              <span>{company.contactPosition}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Phone:</span>
              <span>{company.contactPhone}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Email:</span>
              <span>{company.contactEmail}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
