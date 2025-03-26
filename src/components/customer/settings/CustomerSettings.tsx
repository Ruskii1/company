
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useLanguageStore, translations } from "@/lib/i18n"
import { SecuritySettings } from "./SecuritySettings"
import { PreferencesSettings } from "./PreferencesSettings"
import { ProfileSettings } from "./ProfileSettings"
import { PaymentSettings } from "./PaymentSettings"
import { ProviderSettings } from "./ProviderSettings"
import { User, CreditCard, Lock, Settings, Link } from "lucide-react"

export function CustomerSettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState("profile")
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{t.settings}</h1>
        <p className="text-muted-foreground mt-1">{t.manageYourAccountSettings}</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{t.profile}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>{t.security}</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>{t.paymentMethods}</span>
          </TabsTrigger>
          <TabsTrigger value="providers" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span>{t.providers}</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{t.preferences}</span>
          </TabsTrigger>
        </TabsList>
        
        <Card>
          <TabsContent value="profile" className="p-4">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="security" className="p-4">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="payment" className="p-4">
            <PaymentSettings />
          </TabsContent>
          
          <TabsContent value="providers" className="p-4">
            <ProviderSettings />
          </TabsContent>
          
          <TabsContent value="preferences" className="p-4">
            <PreferencesSettings />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
