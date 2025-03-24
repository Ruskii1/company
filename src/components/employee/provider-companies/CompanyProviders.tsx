
import { useState } from 'react'
import { Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ServiceProvider } from '@/types/provider'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

interface CompanyProvidersProps {
  providers: ServiceProvider[]
}

export function CompanyProviders({ providers }: CompanyProvidersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const filteredProviders = providers.filter(provider => 
    provider.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.phoneNumber.includes(searchQuery)
  )
  
  const navigateToProviderDetails = (providerId: string) => {
    // Store the ID and navigate to providers page
    localStorage.setItem('selectedProviderId', providerId)
    navigate('/employee/providers')
  }
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search providers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Total Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProviders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No providers found
                </TableCell>
              </TableRow>
            ) : (
              filteredProviders.map((provider) => (
                <TableRow key={provider.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigateToProviderDetails(provider.id)}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {provider.fullName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{provider.phoneNumber}</div>
                      <div className="text-muted-foreground">{provider.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {provider.serviceTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={provider.status === 'active' ? 'default' : 
                              provider.status === 'pending_review' ? 'secondary' : 'destructive'}
                    >
                      {provider.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{provider.commissionPercentage}%</TableCell>
                  <TableCell>{provider.orders.length}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
