
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
import { Calendar, CreditCard, Home, LogOut, PlusCircle, Settings, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme'
import { useToast } from '@/hooks/use-toast'
import { Logo } from '@/components/Logo'

export function CustomerSidebar() {
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  const ct = t.customer
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
      title: ct.placeNewOrder,
      url: '/new-order',
      icon: PlusCircle,
    },
    {
      title: ct.allRequests,
      url: '/requests',
      icon: Calendar,
    },
    {
      title: t.tickets,
      url: '/tickets',
      icon: Ticket,
    },
    {
      title: ct.credit,
      url: '/credit',
      icon: CreditCard,
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
      <SidebarHeader className="flex h-20 items-center border-b px-6">
        <div className="flex flex-1 items-center gap-2">
          <Logo size="medium" showText={true} />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{ct.navigation}</SidebarGroupLabel>
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
            className="w-full justify-start"
            onClick={() => navigate('/settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>{t.settings}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-black hover:text-black"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{ct.signOut}</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
