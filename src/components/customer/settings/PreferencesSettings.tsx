
import { useLanguageStore, translations } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Sun, Moon } from "lucide-react"

export function PreferencesSettings() {
  const { language, setLanguage } = useLanguageStore()
  const { theme, setTheme } = useTheme()
  const t = translations[language]
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium">{t.preferences}</h3>
        <p className="text-sm text-muted-foreground">
          {t.customizeYourUserExperience}
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            {t.appearance}
          </CardTitle>
          <CardDescription>
            {t.chooseHowTheApplicationLooks}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              variant={theme === "light" ? "default" : "outline"}
              onClick={() => setTheme("light")}
              className="flex items-center gap-2"
            >
              <Sun className="h-4 w-4" />
              {t.light}
            </Button>
            <Button 
              variant={theme === "dark" ? "default" : "outline"}
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2"
            >
              <Moon className="h-4 w-4" />
              {t.dark}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t.language}
          </CardTitle>
          <CardDescription>
            {t.selectYourPreferredLanguage}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              variant={language === "en" ? "default" : "outline"}
              onClick={() => setLanguage("en")}
            >
              English
            </Button>
            <Button 
              variant={language === "ar" ? "default" : "outline"}
              onClick={() => setLanguage("ar")}
            >
              العربية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
