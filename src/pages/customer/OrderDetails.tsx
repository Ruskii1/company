
import { useParams } from 'react-router-dom'
import { useOrderDetails } from '@/hooks/useOrderDetails'
import { useOrderCancellation } from '@/hooks/useOrderCancellation'
import { OrderDetailsCard } from '@/components/customer/order-details/OrderDetailsCard'
import { OrderDetailsTabs } from '@/components/customer/order-details/OrderDetailsTabs'
import { LoadingState } from '@/components/customer/order-details/LoadingState'
import { NotFoundState } from '@/components/customer/order-details/NotFoundState'

const CustomerOrderDetails = () => {
  const { taskId } = useParams()
  const { order, loading, addNoteToConversation, updateOrderStatus } = useOrderDetails(taskId)
  const { canCancelOrder, handleCancelOrder } = useOrderCancellation(order, updateOrderStatus)

  if (loading) {
    return <LoadingState />
  }

  if (!order) {
    return <NotFoundState />
  }

  return (
    <OrderDetailsCard order={order}>
      <OrderDetailsTabs 
        order={order} 
        canCancelOrder={canCancelOrder} 
        handleCancelOrder={handleCancelOrder} 
        addNoteToConversation={addNoteToConversation} 
      />
    </OrderDetailsCard>
  )
}

export default CustomerOrderDetails
