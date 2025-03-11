
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useLanguageStore, translations } from "@/lib/i18n"
import { ProfileSettings } from "./ProfileSettings"
import { SecuritySettings } from "./SecuritySettings"
import { ProviderSettings } from "./ProviderSettings"
import { PaymentSettings } from "./PaymentSettings"

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
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="profile">{t.profile}</TabsTrigger>
          <TabsTrigger value="security">{t.security}</TabsTrigger>
          <TabsTrigger value="providers">{t.providers}</TabsTrigger>
          <TabsTrigger value="payment">{t.paymentMethods}</TabsTrigger>
        </TabsList>
        
        <Card>
          <TabsContent value="profile" className="p-4">
            <ProfileSettings />
          </TabsContent>
          
          <TabsContent value="security" className="p-4">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="providers" className="p-4">
            <ProviderSettings />
          </TabsContent>
          
          <TabsContent value="payment" className="p-4">
            <PaymentSettings />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  )
}
