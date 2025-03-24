
import { useState } from 'react'
import { Search, Building, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ProviderCompany } from '@/types/corporate'
import { Badge } from '@/components/ui/badge'

interface CompanyListProps {
  companies: ProviderCompany[]
  onSelectCompany: (id: string) => void
}

export function CompanyList({ companies, onSelectCompany }: CompanyListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.email.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Providers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contract End</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No companies found
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      {company.name}
                    </div>
                  </TableCell>
                  <TableCell>{company.contactPerson}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{company.providers.length}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={company.status === 'active' ? 'default' : 
                              company.status === 'pending' ? 'secondary' : 'destructive'}
                    >
                      {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(company.contractEndDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectCompany(company.id)}
                    >
                      View <ChevronRight className="ml-1 h-4 w-4" />
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
