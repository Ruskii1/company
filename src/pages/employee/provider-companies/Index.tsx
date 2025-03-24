
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CompanyList } from '@/components/employee/provider-companies/CompanyList'
import { CompanyDetails } from '@/components/employee/provider-companies/CompanyDetails'
import { useProviderCompanies } from '@/hooks/useProviderCompanies'

const ServiceProviderCompaniesPage = () => {
  const { companies } = useProviderCompanies()
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)
  const selectedCompany = companies.find(company => company.id === selectedCompanyId)
  
  return (
    <Card className="backdrop-blur-sm bg-white/80">
      <CardHeader>
        <CardTitle>Service Provider Companies</CardTitle>
      </CardHeader>
      <CardContent>
        {!selectedCompanyId ? (
          <CompanyList 
            companies={companies} 
            onSelectCompany={(id) => setSelectedCompanyId(id)} 
          />
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedCompanyId(null)}
              className="mb-4 text-blue-600 hover:underline flex items-center"
            >
              ← Back to companies list
            </button>
            
            {selectedCompany && (
              <CompanyDetails company={selectedCompany} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ServiceProviderCompaniesPage
