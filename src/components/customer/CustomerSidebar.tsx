
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
import { CreditCard, Home, LogOut, PlusCircle, Settings, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import { useToast } from '@/hooks/use-toast'

export function CustomerSidebar() {
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const menuItems = [
    {
      title: t.home,
      url: '/',
      icon: Home,
    },
    {
      title: t.placeNewOrder,
      url: '/new-order',
      icon: PlusCircle,
    },
    {
      title: t.allRequests,
      url: '/requests',
      icon: Home,
    },
    {
      title: t.tickets,
      url: '/tickets',
      icon: Ticket,
    },
    {
      title: t.credit,
      url: '/credit',
      icon: CreditCard,
    },
    {
      title: t.settings,
      url: '/settings',
      icon: Settings,
    },
  ]

  const handleSignOut = () => {
    // Remove authentication state
    localStorage.removeItem("customerAuthenticated")
    
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    })
    
    // Redirect to customer sign in page
    navigate("/signin/customer")
  }

  return (
    <Sidebar side={language === 'ar' ? 'right' : 'left'}>
      <SidebarHeader className="flex h-14 items-center border-b px-6">
        <div className="flex flex-1 items-center gap-2 font-semibold">
          {t.customerPortal}
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
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t.signOut}</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
