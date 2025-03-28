
import { useState } from "react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Shield } from "lucide-react"

export function TwoFactorCard() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false)

  function handleToggleTwoFactor() {
    setIsTwoFactorEnabled(!isTwoFactorEnabled)
    toast({
      title: isTwoFactorEnabled ? t.customer.settings.securitySettings.twoFactorDisabled : t.customer.settings.securitySettings.twoFactorEnabled,
      description: isTwoFactorEnabled ? t.customer.settings.securitySettings.twoFactorAuthenticationIsNowDisabled : t.customer.settings.securitySettings.twoFactorAuthenticationIsNowEnabled,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t.customer.settings.securitySettings.twoFactorAuthentication}
        </CardTitle>
        <CardDescription>
          {t.customer.settings.securitySettings.enhanceYourAccountSecurity}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="two-factor">{t.customer.settings.securitySettings.enableTwoFactor}</Label>
            <p className="text-sm text-muted-foreground">
              {t.customer.settings.securitySettings.twoFactorDescription}
            </p>
          </div>
          <Switch
            id="two-factor"
            checked={isTwoFactorEnabled}
            onCheckedChange={handleToggleTwoFactor}
          />
        </div>
      </CardContent>
    </Card>
  )
}
