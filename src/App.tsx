
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CustomerPortal from './pages/customer/Index'
import CustomerNewOrder from './pages/customer/NewOrder'
import CustomerRequests from './pages/customer/Requests'
import CustomerTickets from './pages/customer/Tickets'
import CustomerCredit from './pages/customer/Credit'
import EmployeePortal from './pages/employee/Index'
import NotFound from './pages/NotFound'
import TicketsPage from './pages/employee/tickets/Index'
import AllRequestsPage from './pages/employee/requests/Index'
import CreateRequestPage from './pages/employee/new-request/Index'
import CorporateAccountsPage from './pages/employee/corporate/Index'
import ServiceProvidersPage from './pages/employee/providers/Index'
import ServiceProvidersMapPage from './pages/employee/providers-map/Index'
import ServiceProviderCompaniesPage from './pages/employee/provider-companies/Index'
import OrderDetails from './pages/employee/orders/OrderDetails'
import CustomerDetails from './pages/employee/customers/CustomerDetails'
import { EmployeeLayout } from './components/employee/EmployeeLayout'
import { CustomerLayout } from './components/customer/CustomerLayout'
import { ThemeProvider } from './lib/theme'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerLayout><CustomerPortal /></CustomerLayout>,
    errorElement: <NotFound />
  },
  {
    path: '/new-order',
    element: <CustomerLayout><CustomerNewOrder /></CustomerLayout>,
  },
  {
    path: '/requests',
    element: <CustomerLayout><CustomerRequests /></CustomerLayout>,
  },
  {
    path: '/tickets',
    element: <CustomerLayout><CustomerTickets /></CustomerLayout>,
  },
  {
    path: '/credit',
    element: <CustomerLayout><CustomerCredit /></CustomerLayout>,
  },
  {
    path: '/employee',
    element: <EmployeeLayout><EmployeePortal /></EmployeeLayout>,
  },
  {
    path: '/employee/tickets',
    element: <EmployeeLayout><TicketsPage /></EmployeeLayout>,
  },
  {
    path: '/employee/requests',
    element: <EmployeeLayout><AllRequestsPage /></EmployeeLayout>,
  },
  {
    path: '/employee/new-request',
    element: <EmployeeLayout><CreateRequestPage /></EmployeeLayout>,
  },
  {
    path: '/employee/corporate',
    element: <EmployeeLayout><CorporateAccountsPage /></EmployeeLayout>,
  },
  {
    path: '/employee/providers',
    element: <EmployeeLayout><ServiceProvidersPage /></EmployeeLayout>,
  },
  {
    path: '/employee/providers-map',
    element: <EmployeeLayout><ServiceProvidersMapPage /></EmployeeLayout>,
  },
  {
    path: '/employee/provider-companies',
    element: <EmployeeLayout><ServiceProviderCompaniesPage /></EmployeeLayout>,
  },
  {
    path: '/employee/orders/:taskId',
    element: <EmployeeLayout><OrderDetails /></EmployeeLayout>,
  },
  {
    path: '/employee/customers/:customerId',
    element: <EmployeeLayout><CustomerDetails /></EmployeeLayout>,
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
