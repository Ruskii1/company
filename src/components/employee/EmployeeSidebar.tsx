
import {
  Home,
  Ticket,
  List,
  FilePlus,
  Building2,
  Users,
  Map,
  Building
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from '@/components/ui/sidebar'
import { useLanguageStore, translations } from '@/lib/i18n'
import { useNavigate, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'

export function EmployeeSidebar() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      title: t.orderManagement,
      icon: Home,
      path: '/employee'
    },
    {
      title: t.tickets,
      icon: Ticket,
      path: '/employee/tickets'
    },
    {
      title: t.allRequests,
      icon: List,
      path: '/employee/requests'
    },
    {
      title: t.createNewRequest,
      icon: FilePlus,
      path: '/employee/new-request'
    },
    {
      title: t.corporateAccounts,
      icon: Building2,
      path: '/employee/corporate'
    },
    {
      title: t.serviceProviders,
      icon: Users,
      path: '/employee/providers'
    },
    {
      title: t.serviceProvidersMap,
      icon: Map,
      path: '/employee/providers-map'
    },
    {
      title: t.serviceProviderCompanies,
      icon: Building,
      path: '/employee/provider-companies'
    }
  ]

  return (
    <Sidebar side={language === 'ar' ? 'right' : 'left'}>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">{t.employeePortal}</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.navigation}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    isActive={location.pathname === item.path}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
