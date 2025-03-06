
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
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LanguageToggle } from '@/components/LanguageToggle'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { useTheme } from '@/lib/theme'

export function CustomerSidebar() {
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useTheme()
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
      title: t.credit,
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
              <SidebarMenuItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton>
                      <Settings />
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
        <div className="flex items-center justify-end">
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
