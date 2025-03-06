
import { Link, useLocation } from 'react-router-dom'
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
import { CreditCard, Home, PlusCircle, Settings, Ticket } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import { Button } from '@/components/ui/button'

export function CustomerSidebar() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const location = useLocation()
  
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
      title: "Credit",
      url: '/credit',
      icon: CreditCard,
    },
  ]

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
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
          >
            <Settings />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
