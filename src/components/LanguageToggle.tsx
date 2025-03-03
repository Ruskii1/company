
import { Globe } from 'lucide-react'
import { Button } from './ui/button'
import { useLanguageStore } from '@/lib/i18n'

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageStore()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      title={language === 'en' ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}
