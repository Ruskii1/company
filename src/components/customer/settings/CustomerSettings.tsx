
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useLanguageStore, translations } from "@/lib/i18n"
import { SecuritySettings } from "./SecuritySettings"
import { PreferencesSettings } from "./PreferencesSettings"

export function CustomerSettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState("security")
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t.settings}</h1>
        <p className="text-muted-foreground mt-1">{t.manageYourAccountSettings}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-2xl">
          <TabsTrigger value="security">{t.security}</TabsTrigger>
          <TabsTrigger value="preferences">{t.preferences}</TabsTrigger>
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
