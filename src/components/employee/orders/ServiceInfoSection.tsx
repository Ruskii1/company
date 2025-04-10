
import { useLanguageStore, translations } from "@/lib/i18n"
import { formatDateTime } from "@/utils/formatters"

interface ServiceInfoSectionProps {
  serviceType: string
  pickupTime: string
}

export const ServiceInfoSection = ({ serviceType, pickupTime }: ServiceInfoSectionProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]
  
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-1">{t.serviceType}</h3>
        <p>{serviceType}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-1">{t.pickupTime}</h3>
        <p>{formatDateTime(pickupTime)}</p>
      </div>
    </>
  )
}
