
import { useState, useEffect } from 'react'
import { ProviderCompany } from '@/types/corporate'
import { mockProviderCompanies } from '@/data/mockProviderCompanies'

export const useProviderCompanies = () => {
  const [companies, setCompanies] = useState<ProviderCompany[]>(mockProviderCompanies)
  
  // Add any company-related functionality here
  const updateCompanyStatus = (companyId: string, status: string) => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === companyId ? { ...company, status } : company
      )
    )
  }
  
  return {
    companies,
    updateCompanyStatus
  }
}
