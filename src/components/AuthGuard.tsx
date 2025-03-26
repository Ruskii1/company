
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

interface AuthGuardProps {
  children: ReactNode
  type: 'customer' | 'employee'
}

export function AuthGuard({ children, type }: AuthGuardProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  useEffect(() => {
    const isCustomerAuthenticated = localStorage.getItem('customerAuthenticated') === 'true'
    
    if (type === 'customer' && !isCustomerAuthenticated) {
      navigate('/signin/customer')
    } else if (type === 'employee' && !user?.isAuthenticated) {
      navigate('/signin/employee')
    }
  }, [navigate, type, user])
  
  return <>{children}</>
}
