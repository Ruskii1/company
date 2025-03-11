
import { useLanguageStore, translations } from "@/lib/i18n"
import { PasswordChangeForm } from "./security/PasswordChangeForm"
import { ResetPasswordCard } from "./security/ResetPasswordCard"
import { TwoFactorCard } from "./security/TwoFactorCard"

export function SecuritySettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">{t.securitySettings}</h3>
        <p className="text-sm text-muted-foreground">
          {t.manageYourSecuritySettings}
        </p>
      </div>
      
      <PasswordChangeForm />
      <ResetPasswordCard />
      <TwoFactorCard />
    </div>
  )
}
