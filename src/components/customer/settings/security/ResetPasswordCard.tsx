
import { useState } from "react"
import { useLanguageStore, translations } from "@/lib/i18n"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export function ResetPasswordCard() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false)

  function handleResetPassword() {
    setIsResetPasswordSent(true)
    toast({
      title: t.customer.settings.securitySettings.resetPasswordEmailSent,
      description: t.customer.settings.securitySettings.pleaseCheckYourEmailToResetYourPassword,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {t.customer.settings.securitySettings.resetPassword}
        </CardTitle>
        <CardDescription>
          {t.customer.settings.securitySettings.requestAPasswordResetEmail}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          {t.customer.settings.securitySettings.resetPasswordDescription}
        </p>
        <Button 
          variant="outline" 
          onClick={handleResetPassword} 
          disabled={isResetPasswordSent}
        >
          {isResetPasswordSent ? t.customer.settings.securitySettings.emailSent : t.customer.settings.securitySettings.sendResetEmail}
        </Button>
      </CardContent>
    </Card>
  )
}
