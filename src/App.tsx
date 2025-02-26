
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerPortal />,
    errorElement: <NotFound />
  },
  {
    path: '/employee',
    element: <EmployeePortal />,
  },
  {
    path: '/employee/tickets',
    element: <TicketsPage />,
  },
  {
    path: '/employee/today',
    element: <TodayRequestsPage />,
  },
  {
    path: '/employee/new-request',
    element: <CreateRequestPage />,
  },
  {
    path: '/employee/corporate',
    element: <CorporateAccountsPage />,
  },
  {
    path: '/employee/providers',
    element: <ServiceProvidersPage />,
  },
  {
    path: '/employee/providers-map',
    element: <ServiceProvidersMapPage />,
  },
  {
    path: '/employee/provider-companies',
    element: <ServiceProviderCompaniesPage />,
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
