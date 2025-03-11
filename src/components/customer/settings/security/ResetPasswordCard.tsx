
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
      title: t.resetPasswordEmailSent,
      description: t.pleaseCheckYourEmailToResetYourPassword,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {t.resetPassword}
        </CardTitle>
        <CardDescription>
          {t.requestAPasswordResetEmail}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          {t.resetPasswordDescription}
        </p>
        <Button 
          variant="outline" 
          onClick={handleResetPassword} 
          disabled={isResetPasswordSent}
        >
          {isResetPasswordSent ? t.emailSent : t.sendResetEmail}
        </Button>
      </CardContent>
    </Card>
  )
}
