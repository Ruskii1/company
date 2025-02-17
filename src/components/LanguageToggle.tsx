
import { Globe } from 'lucide-react'
import { Button } from './ui/button'
import { useLanguageStore } from '@/lib/i18n'

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="fixed top-4 right-4 z-50"
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}
