
import { useState } from 'react'
import { CorporateAccount, Employee, CorporateRequest, CorporateTicket } from '@/types/corporate'

// Dummy data for corporate accounts
const mockCorporateAccounts: CorporateAccount[] = [
  {
    id: 'corp-001',
    name: 'ABC Corporation',
    contactPerson: 'John Smith',
    email: 'john.smith@abccorp.com',
    phone: '+966 55 123 4567',
    address: 'King Fahd Road, Riyadh, Saudi Arabia',
    accountBalance: 50000,
    employees: [
      {
        id: 'emp-001',
        name: 'Sarah Johnson',
        email: 'sarah.j@abccorp.com',
        phone: '+966 55 987 6543',
        position: 'Operations Manager',
        department: 'Operations'
      },
      {
        id: 'emp-002',
        name: 'Mohammed Al-Fahad',
        email: 'm.alfahad@abccorp.com',
        phone: '+966 55 456 7890',
        position: 'Finance Director',
        department: 'Finance'
      }
    ],
    requests: [
      {
        id: 'req-001',
        taskId: 'T100123',
        serviceType: 'Airport Transfer',
        status: 'Completed',
        date: '2023-10-15T09:30:00',
        employeeName: 'Sarah Johnson',
        pickupLocation: 'King Khalid International Airport, Riyadh',
        dropoffLocation: 'ABC Corporation HQ, King Fahd Road, Riyadh',
        amount: 150.00
      },
      {
        id: 'req-002',
        taskId: 'T100124',
        serviceType: 'City Tour',
        status: 'In service',
        date: '2023-10-17T13:00:00',
        employeeName: 'Mohammed Al-Fahad',
        pickupLocation: 'ABC Corporation HQ, King Fahd Road, Riyadh',
        dropoffLocation: 'Various locations in Riyadh',
        amount: 300.00
      }
    ],
    tickets: [
      {
        id: 'ticket-001',
        title: 'Billing Discrepancy',
        description: "We noticed a discrepancy in our last month's invoice. Some of the trips appear to be charged twice.",
        status: 'open',
        createdAt: '2023-10-10T11:20:00',
        createdBy: 'Mohammed Al-Fahad',
        tags: ['#Finance', '#Urgent']
      }
    ]
  },
  {
    id: 'corp-002',
    name: 'XYZ Industries Ltd.',
    contactPerson: 'Fatima Al-Saud',
    email: 'fatima@xyzindustries.com',
    phone: '+966 55 222 3333',
    address: 'Industrial City, Jeddah, Saudi Arabia',
    accountBalance: 75000,
    employees: [
      {
        id: 'emp-003',
        name: 'Ahmed Hassan',
        email: 'ahmed.h@xyzindustries.com',
        phone: '+966 55 111 2222',
        position: 'General Manager',
        department: 'Executive'
      },
      {
        id: 'emp-004',
        name: 'Layla Mahmoud',
        email: 'layla.m@xyzindustries.com',
        phone: '+966 55 333 4444',
        position: 'HR Manager',
        department: 'Human Resources'
      }
    ],
    requests: [
      {
        id: 'req-003',
        taskId: 'T100125',
        serviceType: 'Staff Transportation',
        status: 'Completed',
        date: '2023-10-12T07:00:00',
        employeeName: 'Ahmed Hassan',
        pickupLocation: 'XYZ Industries HQ, Industrial City, Jeddah',
        dropoffLocation: 'Client Meeting, Business District, Jeddah',
        amount: 200.00
      }
    ],
    tickets: [
      {
        id: 'ticket-002',
        title: 'Service Quality Concern',
        description: "We've had several complaints about the punctuality of drivers for our executive transportation service.",
        status: 'open',
        createdAt: '2023-10-14T09:15:00',
        createdBy: 'Layla Mahmoud',
        tags: ['#Operations', '#Providers']
      }
    ]
  },
  {
    id: 'corp-003',
    name: 'Saudi Global Trading Co.',
    contactPerson: 'Khalid Al-Rashid',
    email: 'khalid@saudiglobal.com',
    phone: '+966 55 555 6666',
    address: 'Dammam Business Park, Dammam, Saudi Arabia',
    accountBalance: 120000,
    employees: [
      {
        id: 'emp-005',
        name: 'Nasser Al-Qahtani',
        email: 'nasser@saudiglobal.com',
        phone: '+966 55 777 8888',
        position: 'CEO',
        department: 'Executive'
      }
    ],
    requests: [
      {
        id: 'req-004',
        taskId: 'T100126',
        serviceType: 'VIP Transfer',
        status: 'Pending',
        date: '2023-10-20T15:30:00',
        employeeName: 'Nasser Al-Qahtani',
        pickupLocation: 'Dammam International Airport',
        dropoffLocation: 'Kempinski Hotel, Dammam',
        amount: 400.00
      }
    ],
    tickets: []
  }
];

export const useCorporateAccounts = () => {
  const [corporateAccounts, setCorporateAccounts] = useState<CorporateAccount[]>(mockCorporateAccounts);
  
  const addEmployee = (corporateId: string, employee: Employee) => {
    setCorporateAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === corporateId) {
          return {
            ...account,
            employees: [...account.employees, employee]
          };
        }
        return account;
      })
    );
  };
  
  const addRequest = (corporateId: string, request: CorporateRequest) => {
    setCorporateAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === corporateId) {
          return {
            ...account,
            requests: [...account.requests, request]
          };
        }
        return account;
      })
    );
  };
  
  const addTicket = (corporateId: string, ticket: CorporateTicket) => {
    setCorporateAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === corporateId) {
          return {
            ...account,
            tickets: [...account.tickets, ticket]
          };
        }
        return account;
      })
    );
  };
  
  const updateAccountBalance = (corporateId: string, newBalance: number) => {
    setCorporateAccounts(prevAccounts => 
      prevAccounts.map(account => {
        if (account.id === corporateId) {
          return {
            ...account,
            accountBalance: newBalance
          };
        }
        return account;
      })
    );
  };
  
  return {
    corporateAccounts,
    addEmployee,
    addRequest,
    addTicket,
    updateAccountBalance
  };
};
