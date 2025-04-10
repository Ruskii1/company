
import { ConversationComponent } from '@/components/customer/ConversationComponent'

interface ConversationTabProps {
  conversation?: Array<{
    id: string
    sender: string
    message: string
    timestamp: string
  }>
  onSendNote: (note: string) => void
}

export const ConversationTab = ({ conversation, onSendNote }: ConversationTabProps) => {
  // Format conversation data for the ConversationComponent
  const formattedConversation = conversation?.map(item => ({
    id: item.id,
    sender: item.sender === 'customer' ? 'customer' : 'employee',
    message: item.message,
    timestamp: item.timestamp,
    senderName: item.sender === 'customer' ? 'You' : 'Support'
  })) || []
  
  return (
    <ConversationComponent 
      conversation={formattedConversation} 
      onSendNote={onSendNote} 
    />
  )
}
