
import {
  Home,
  Ticket,
  List,
  FilePlus,
  Building2,
  Users,
  Map,
  Building,
  Settings
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
import { useTheme } from '@/lib/theme'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

export function EmployeeSidebar() {
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useTheme()
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
      <SidebarHeader className="flex h-14 items-center border-b px-6">
        <div className="flex flex-1 items-center gap-2 font-semibold">
          {t.employeePortal}
        </div>
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
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>{t.settings}</span>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="grid gap-2">
                      <h4 className="font-medium leading-none mb-2">{t.settings}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.theme}</span>
                        <div className="ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                          >
                            {theme === "dark" ? (
                              <span className="text-xs">☀️</span>
                            ) : (
                              <span className="text-xs">🌙</span>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.language}</span>
                        <div className="ml-auto">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                            title={language === 'en' ? "Switch to Arabic" : "Switch to English"}
                          >
                            <span className="text-xs">{language === 'en' ? 'AR' : 'EN'}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        {/* Empty footer */}
      </SidebarFooter>
    </Sidebar>
  )
}
