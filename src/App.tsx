
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import CustomerPortal from './pages/customer/Index'
import CustomerNewOrder from './pages/customer/NewOrder'
import CustomerRequests from './pages/customer/Requests'
import CustomerTickets from './pages/customer/Tickets'
import CustomerCredit from './pages/customer/Credit'
import CustomerOrderDetails from './pages/customer/OrderDetails'
import EmployeePortal from './pages/employee/Index'
import EmployeeHomePage from './pages/employee/home/Index'
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
import CustomerSignIn from './pages/auth/CustomerSignIn'
import EmployeeSignIn from './pages/auth/EmployeeSignIn'
import { CustomerSettings } from './components/customer/settings/CustomerSettings'
import { AuthProvider } from './lib/auth'

const queryClient = new QueryClient()

// Create the router outside of the App component
const router = createBrowserRouter([
  {
    path: '/signin/customer',
    element: <CustomerSignIn />,
  },
  {
    path: '/signin/employee',
    element: <EmployeeSignIn />,
  },
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
    path: '/settings',
    element: <CustomerLayout><CustomerSettings /></CustomerLayout>,
  },
  {
    path: '/order-details/:taskId',
    element: <CustomerLayout><CustomerOrderDetails /></CustomerLayout>,
  },
  {
    path: '/employee',
    element: <EmployeeLayout><EmployeePortal /></EmployeeLayout>,
  },
  {
    path: '/employee/home',
    element: <EmployeeLayout><EmployeeHomePage /></EmployeeLayout>,
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
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
