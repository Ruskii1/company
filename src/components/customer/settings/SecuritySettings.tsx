
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useLanguageStore, translations } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { LockKeyhole, Shield, Mail } from "lucide-react"

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type PasswordFormValues = z.infer<typeof passwordFormSchema>

export function SecuritySettings() {
  const { language } = useLanguageStore()
  const t = translations[language]
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false)
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false)
  
  const defaultValues: Partial<PasswordFormValues> = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues,
  })
  
  function onSubmit(data: PasswordFormValues) {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: t.passwordUpdated,
        description: t.yourPasswordHasBeenSuccessfullyUpdated,
      })
      form.reset(defaultValues)
    }, 1000)
    
    console.log(data)
  }
  
  function handleResetPassword() {
    setIsResetPasswordSent(true)
    toast({
      title: t.resetPasswordEmailSent,
      description: t.pleaseCheckYourEmailToResetYourPassword,
    })
  }
  
  function handleToggleTwoFactor() {
    setIsTwoFactorEnabled(!isTwoFactorEnabled)
    toast({
      title: isTwoFactorEnabled ? t.twoFactorDisabled : t.twoFactorEnabled,
      description: isTwoFactorEnabled ? t.twoFactorAuthenticationIsNowDisabled : t.twoFactorAuthenticationIsNowEnabled,
    })
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">{t.securitySettings}</h3>
        <p className="text-sm text-muted-foreground">
          {t.manageYourSecuritySettings}
        </p>
      </div>
      
      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5" />
            {t.changePassword}
          </CardTitle>
          <CardDescription>
            {t.updateYourPasswordToASecureOne}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.currentPassword}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.newPassword}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.confirmPassword}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t.updating : t.updatePassword}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Reset Password */}
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
      
      {/* Two Factor Authentication */}
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
              <FormDescription>
                {t.twoFactorDescription}
              </FormDescription>
            </div>
            <Switch
              id="two-factor"
              checked={isTwoFactorEnabled}
              onCheckedChange={handleToggleTwoFactor}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
