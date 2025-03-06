
import { LanguageToggle } from '@/components/LanguageToggle'
import { EmployeeSidebar } from '@/components/employee/EmployeeSidebar'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { LogOut, Home, Settings } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface EmployeeLayoutProps {
  children: ReactNode
}

export function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const { language } = useLanguageStore()
  const navigate = useNavigate()
  const t = translations[language]

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
  }

  return (
    <SidebarProvider>
      <div className={`min-h-screen w-full flex ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <EmployeeSidebar />
        
        <div className="flex-1 p-8">
          <div className={`fixed ${language === 'ar' ? 'left-4' : 'right-4'} top-4 z-50 flex items-center gap-4 dir-ltr`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
              className="bg-background hover:bg-accent"
              title="Go to Customer Portal"
            >
              <Home className="h-5 w-5" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-background hover:bg-accent"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="grid gap-2">
                  <h4 className="font-medium leading-none mb-2">{t.settings}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.theme}</span>
                    <div className="ml-auto"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.language}</span>
                    <div className="ml-auto"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t.notifications}</span>
                    <div className="ml-auto"></div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full justify-start"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {t.signOut}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button 
              variant="outline" 
              size="icon"
              className="bg-background hover:bg-accent"
            >
              <SidebarTrigger className="h-5 w-5" />
            </Button>
            <LanguageToggle />
          </div>
          
          <div className="max-w-7xl mx-auto space-y-8 pt-16">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
