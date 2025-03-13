
import { useLanguageStore, translations } from '@/lib/i18n'

interface NoRequestsMessageProps {
  messageKey: 'noPastRequests' | 'noTodayRequests' | 'noFutureRequests'
}

export const NoRequestsMessage = ({ messageKey }: NoRequestsMessageProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return (
    <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
      <p className="text-gray-500 dark:text-gray-300">{t[messageKey]}</p>
    </div>
  )
}
