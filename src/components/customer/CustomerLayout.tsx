
import { SidebarProvider } from "@/components/ui/sidebar"
import { CustomerSidebar } from "./CustomerSidebar"
import { useLanguageStore } from "@/lib/i18n"

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguageStore()
  
  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <CustomerSidebar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
