
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CustomerPortal from './pages/customer/Index'
import EmployeePortal from './pages/employee/Index'
import NotFound from './pages/NotFound'
import TicketsPage from './pages/employee/tickets/Index'
import TodayRequestsPage from './pages/employee/today/Index'
import CreateRequestPage from './pages/employee/new-request/Index'
import CorporateAccountsPage from './pages/employee/corporate/Index'
import ServiceProvidersPage from './pages/employee/providers/Index'
import ServiceProvidersMapPage from './pages/employee/providers-map/Index'
import ServiceProviderCompaniesPage from './pages/employee/provider-companies/Index'
import { EmployeeLayout } from './components/employee/EmployeeLayout'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerPortal />,
    errorElement: <NotFound />
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
    path: '/employee/today',
    element: <EmployeeLayout><TodayRequestsPage /></EmployeeLayout>,
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
  }
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
