
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { CustomerSidebar } from "./CustomerSidebar"
import { useLanguageStore } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore()
  const navigate = useNavigate()
  
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
