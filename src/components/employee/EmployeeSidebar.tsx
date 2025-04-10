import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguageStore, translations } from '@/lib/i18n'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Building2,
  Calendar,
  Home,
  LogOut,
  Map,
  PlusCircle,
  Settings,
  Store,
  Ticket,
  User,
  ShieldCheck,
  DollarSign,
  UserCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/lib/auth'
import { Logo } from '@/components/Logo'

export function EmployeeSidebar() {
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { user, logout, isAdmin } = useAuth()
  
  const commonMenuItems = [
    {
      title: t.home,
      url: '/employee/home',
      icon: Home,
    },
    {
      title: t.orderManagement,
      url: '/employee',
      icon: Calendar,
    },
    {
      title: t.createNewRequest,
      url: '/employee/new-request',
      icon: PlusCircle,
    },
    {
      title: t.tickets,
      url: '/employee/tickets',
      icon: Ticket,
    },
    {
      title: t.serviceProviders,
      url: '/employee/providers',
      icon: User,
    },
    {
      title: t.serviceProvidersMap,
      url: '/employee/providers-map',
      icon: Map,
    },
    {
      title: t.financeAndReports,
      url: '/employee/finance',
      icon: DollarSign,
    },
  ]
  
  const adminMenuItems = [
    {
      title: t.corporateAccounts,
      url: '/employee/corporate',
      icon: Building2,
      adminOnly: true,
    },
    {
      title: t.serviceProviderCompanies,
      url: '/employee/provider-companies',
      icon: Store,
      adminOnly: true,
    },
    {
      title: 'Approval Management',
      url: '/employee/admin/approvals',
      icon: UserCheck,
      adminOnly: true,
    },
  ]
  
  const menuItems = [
    ...commonMenuItems,
    ...(isAdmin() ? adminMenuItems : [])
  ]

  return (
    <Sidebar side={language === 'ar' ? 'right' : 'left'}>
      <SidebarHeader className="flex h-20 items-center border-b px-6">
        <div className="flex flex-1 items-center gap-2">
          <Logo size="medium" showText={true} />
          {isAdmin() && (
            <span className="bg-primary/10 text-primary text-xs rounded-full px-2 py-0.5 flex items-center">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Admin
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.navigation}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>{t.settings}</span>
              </Button>
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
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t.signOut}</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
