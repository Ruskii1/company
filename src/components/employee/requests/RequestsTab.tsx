
import { OrderTable } from '@/components/OrderTable'
import { useLanguageStore, translations } from '@/lib/i18n'
import { Request } from '@/types/request'
import { mapDatabaseToStatus } from '@/types/orderStatus'

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
        return t.noPastRequests || 'No past requests'
      case 'today':
        return t.noTodayRequests || 'No requests for today'
      case 'future':
        return t.noFutureRequests || 'No future requests'
      default:
        return t.noOrders || 'No requests'
    }
  }

  const getTabTitle = () => {
    switch (tabType) {
      case 'past':
        return t.pastRequests || 'Past Requests'
      case 'today':
        return t.todaysRequests || 'Today\'s Requests'
      case 'future':
        return t.futureRequests || 'Future Requests'
      default:
        return ''
    }
  }

  // Ensure future requests are displayed with standardized status
  const processRequestStatus = (request: Request, tabType: string) => {
    // For future requests, legacy "Pending" status should be "Scheduled"
    if (tabType === 'future' && request.status === 'Pending') {
      return 'Scheduled';
    }
    return mapDatabaseToStatus(request.status);
  };

  return (
    <>
      {requests.length > 0 ? (
        <OrderTable orders={requests.map(req => ({
          id: req.id,
          taskId: req.taskId || req.id,
          companyName: req.companyName || 'Company ' + req.id,
          employeeName: req.employeeName || 'Employee ' + req.id,
          serviceType: req.serviceType,
          pickupTime: req.pickupTime,
          pickupLocation: req.pickupLocation,
          dropoffLocation: req.dropoffLocation,
          notes: req.notes || '',
          status: processRequestStatus(req, tabType)
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
