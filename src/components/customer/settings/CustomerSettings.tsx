
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useLanguageStore, translations } from "@/lib/i18n"
import { SecuritySettings } from "./SecuritySettings"
import { PreferencesSettings } from "./PreferencesSettings"
import { Lock, Settings } from "lucide-react"

export function CustomerSettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const cs = t.customer.settings
  const [activeTab, setActiveTab] = useState("security")
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t.settings}</h1>
        <p className="text-muted-foreground mt-1">{cs.manageYourAccountSettings}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-2xl">
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>{cs.securitySettings.securitySettings}</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{cs.preferences}</span>
          </TabsTrigger>
        </TabsList>
        
        <Card>
          <TabsContent value="security" className="p-4">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="preferences" className="p-4">
            <PreferencesSettings />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
