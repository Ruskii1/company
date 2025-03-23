
import { OrderTable } from '@/components/OrderTable'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Request } from '@/types/request'

interface RequestsTabProps {
  requests: Request[]
  tabType: 'past' | 'today' | 'future'
}

export const RequestsTab = ({ requests, tabType }: RequestsTabProps) => {
  const { language } = useLanguageStore()
  const t = translations[language]

  const getEmptyMessage = () => {
    switch (tabType) {
      case 'past':
        return t.noPastRequests
      case 'today':
        return t.noTodayRequests
      case 'future':
        return t.noFutureRequests
      default:
        return t.noRequests
    }
  }

  const getTabTitle = () => {
    switch (tabType) {
      case 'past':
        return t.pastRequests
      case 'today':
        return t.todaysRequests
      case 'future':
        return t.futureRequests
      default:
        return ''
    }
  }

  return (
    <>
      {requests.length > 0 ? (
        <OrderTable orders={requests.map(req => ({
          id: req.id,
          taskId: req.taskId,
          companyName: 'Company ' + req.id,
          employeeName: 'Employee ' + req.id,
          serviceType: req.serviceType,
          pickupTime: req.pickupTime,
          pickupLocation: req.pickupLocation,
          dropoffLocation: req.dropoffLocation,
          notes: req.notes,
          status: req.status
        }))} />
      ) : (
        <div className="border rounded-md p-4 bg-white dark:bg-gray-700">
          <h3 className="font-medium text-lg mb-2">{getTabTitle()}</h3>
          <p className="text-gray-500 dark:text-gray-300">{getEmptyMessage()}</p>
        </div>
      )}
    </>
  )
}
