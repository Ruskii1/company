
import { useState } from 'react';
import { 
  CorporateAccount, 
  Employee, 
  CorporateRequest, 
  CorporateTicket,
  CorporateDocument
} from '@/types/corporate';
import { mockCorporateAccounts } from '@/data/mockCorporateAccounts';
import { useEmployees } from './corporate/useEmployees';
import { useRequests } from './corporate/useRequests';
import { useTickets } from './corporate/useTickets';
import { useDocuments } from './corporate/useDocuments';

export const useCorporateAccounts = () => {
  const [corporateAccounts, setCorporateAccounts] = useState<CorporateAccount[]>(mockCorporateAccounts);
  
  const updateAccountField = <T extends keyof CorporateAccount>(
    corporateId: string, 
    field: T, 
    value: CorporateAccount[T]
  ) => {
    setCorporateAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === corporateId) {
          return {
            ...account,
            [field]: value
          };
        }
        return account;
      })
    );
  };
  
  const updateAccountBalance = (corporateId: string, newBalance: number) => {
    updateAccountField(corporateId, 'accountBalance', newBalance);
  };
  
  const getAccountById = (corporateId: string) => {
    return corporateAccounts.find(account => account.id === corporateId);
  };
  
  const addEmployee = (corporateId: string, employee: Employee) => {
    const account = getAccountById(corporateId);
    if (account) {
      const employees = [...account.employees, employee];
      updateAccountField(corporateId, 'employees', employees);
    }
  };
  
  const addRequest = (corporateId: string, request: CorporateRequest) => {
    const account = getAccountById(corporateId);
    if (account) {
      const requests = [...account.requests, request];
      updateAccountField(corporateId, 'requests', requests);
    }
  };
  
  const addTicket = (corporateId: string, ticket: CorporateTicket) => {
    const account = getAccountById(corporateId);
    if (account) {
      const tickets = [...account.tickets, ticket];
      updateAccountField(corporateId, 'tickets', tickets);
    }
  };
  
  const addDocument = (corporateId: string, document: CorporateDocument) => {
    const account = getAccountById(corporateId);
    if (account) {
      const documents = [...(account.documents || []), document];
      updateAccountField(corporateId, 'documents', documents);
    }
  };
  
  const deleteDocument = (corporateId: string, documentId: string) => {
    const account = getAccountById(corporateId);
    if (account && account.documents) {
      const documents = account.documents.filter(doc => doc.id !== documentId);
      updateAccountField(corporateId, 'documents', documents);
    }
  };
  
  return {
    corporateAccounts,
    addEmployee,
    addRequest,
    addTicket,
    updateAccountBalance,
    addDocument,
    deleteDocument
  };
};
