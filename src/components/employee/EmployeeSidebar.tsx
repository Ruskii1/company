
import {
  Home,
  Ticket,
  Clock,
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
} from '@/components/ui/sidebar'
import { useLanguageStore, translations } from '@/lib/i18n'
import { useNavigate, useLocation } from 'react-router-dom'

export function EmployeeSidebar() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      title: 'Home',
      icon: Home,
      path: '/employee'
    },
    {
      title: 'Tickets',
      icon: Ticket,
      path: '/employee/tickets'
    },
    {
      title: "Today's Requests",
      icon: Clock,
      path: '/employee/today'
    },
    {
      title: 'Create New Request',
      icon: FilePlus,
      path: '/employee/new-request'
    },
    {
      title: 'Corporate Accounts',
      icon: Building2,
      path: '/employee/corporate'
    },
    {
      title: 'Service Providers',
      icon: Users,
      path: '/employee/providers'
    },
    {
      title: 'Service Providers Map',
      icon: Map,
      path: '/employee/providers-map'
    },
    {
      title: 'Service Provider Companies',
      icon: Building,
      path: '/employee/provider-companies'
    }
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Employee Portal</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
    </Sidebar>
  )
}
