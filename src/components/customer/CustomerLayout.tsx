
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "./CustomerSidebar"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Home, Settings, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore()
  const navigate = useNavigate()
  const t = translations[language]
  
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
  }
  
  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <CustomerSidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className={`fixed ${language === 'ar' ? 'left-4' : 'right-4'} top-4 z-50 flex items-center gap-4 dir-ltr`}>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/employee')}
              className="bg-background hover:bg-accent"
              title="Go to Employee Portal"
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
          </div>
          <div className="pt-16">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
