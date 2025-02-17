
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
      className="bg-white hover:bg-gray-100"
    >
      <Globe className="h-5 w-5" />
    </Button>
  )
}
