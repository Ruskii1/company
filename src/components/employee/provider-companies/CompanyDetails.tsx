
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProviderCompany } from '@/types/corporate'
import { CompanyProviders } from './CompanyProviders'
import { CompanyRequests } from './CompanyRequests'
import { CompanyInvoices } from './CompanyInvoices'
import { CompanyOverview } from './CompanyOverview'

interface CompanyDetailsProps {
  company: ProviderCompany
}

export function CompanyDetails({ company }: CompanyDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
          <CardDescription>
            {company.status === 'active' ? 'Active contract' : 
             company.status === 'pending' ? 'Pending approval' : 'Contract expired'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="providers">Providers ({company.providers.length})</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <CompanyOverview company={company} />
            </TabsContent>
            
            <TabsContent value="providers" className="pt-4">
              <CompanyProviders providers={company.providers} />
            </TabsContent>
            
            <TabsContent value="requests" className="pt-4">
              <CompanyRequests company={company} />
            </TabsContent>
            
            <TabsContent value="invoices" className="pt-4">
              <CompanyInvoices company={company} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
