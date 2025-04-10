
import { SidebarProvider } from "@/components/ui/sidebar"
import { CustomerSidebar } from "./CustomerSidebar"
import { useLanguageStore } from "@/lib/i18n"
import { AuthGuard } from "../AuthGuard"
import { CustomerTopBar } from "./CustomerTopBar"

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore()
  
  return (
    <AuthGuard type="customer">
      <SidebarProvider>
        <div className={`min-h-screen flex w-full ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          <CustomerSidebar />
          <main className="flex-1 overflow-auto">
            <CustomerTopBar />
            <div className="pt-16 p-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
}
