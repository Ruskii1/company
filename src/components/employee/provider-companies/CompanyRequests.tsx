
import { useState } from 'react'
import { Search, Calendar, Download } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProviderCompany } from '@/types/corporate'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CompanyRequestsProps {
  company: ProviderCompany
}

export function CompanyRequests({ company }: CompanyRequestsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  
  // Combine all requests from all providers in the company
  const allRequests = company.providers.flatMap(provider => 
    provider.orders.map(order => ({
      ...order,
      providerName: provider.fullName,
      providerId: provider.id
    }))
  )
  
  // Get unique service types
  const serviceTypes = Array.from(new Set(allRequests.map(request => request.serviceType)))
  
  // Get unique statuses
  const statuses = Array.from(new Set(allRequests.map(request => request.status)))
  
  const filteredRequests = allRequests.filter(request => {
    const matchesSearch = 
      request.taskId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesService = serviceFilter === 'all' || request.serviceType === serviceFilter
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    
    return matchesSearch && matchesService && matchesStatus
  })
  
  // Sort by date, newest first
  const sortedRequests = [...filteredRequests].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Service type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            {serviceTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No requests found
                </TableCell>
              </TableRow>
            ) : (
              sortedRequests.map((request) => (
                <TableRow key={`${request.providerId}-${request.id}`}>
                  <TableCell className="font-medium">{request.taskId}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {new Date(request.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{request.providerName}</TableCell>
                  <TableCell>{request.customerName}</TableCell>
                  <TableCell>{request.serviceType}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === 'Completed' ? 'default' :
                        request.status === 'Scheduled' ? 'secondary' :
                        request.status === 'Pending' ? 'secondary' :
                        request.status === 'In service' ? 'outline' : 'destructive'
                      }
                    >
                      {request.status === 'Pending' && isFutureDate(request.date) ? 'Scheduled' : request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Helper function to determine if a date is in the future
function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}
