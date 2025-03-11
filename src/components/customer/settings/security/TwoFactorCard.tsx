
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
      title: isTwoFactorEnabled ? t.twoFactorDisabled : t.twoFactorEnabled,
      description: isTwoFactorEnabled ? t.twoFactorAuthenticationIsNowDisabled : t.twoFactorAuthenticationIsNowEnabled,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {t.twoFactorAuthentication}
        </CardTitle>
        <CardDescription>
          {t.enhanceYourAccountSecurity}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="two-factor">{t.enableTwoFactor}</Label>
            <p className="text-sm text-muted-foreground">
              {t.twoFactorDescription}
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
