
import { LanguageToggle } from '@/components/LanguageToggle'
import { EmployeeSidebar } from '@/components/employee/EmployeeSidebar'
import { useLanguageStore } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { LogOut, Home } from 'lucide-react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface EmployeeLayoutProps {
  children: ReactNode
}

export function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const { language } = useLanguageStore()
  const navigate = useNavigate()

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
            <Button 
              variant="outline" 
              size="icon"
              className="bg-background hover:bg-accent"
            >
              <SidebarTrigger className="h-5 w-5" />
            </Button>
            <LanguageToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="bg-background hover:bg-accent"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="max-w-7xl mx-auto space-y-8 pt-16">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
