
import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth'

interface AuthGuardProps {
  children: ReactNode
  type: 'customer' | 'employee'
}

export function AuthGuard({ children, type }: AuthGuardProps) {
  const location = useLocation()
  const { user } = useAuth()
  
  // Check if customer is authenticated for customer routes
  if (type === 'customer') {
    const isCustomerAuthenticated = localStorage.getItem('customerAuthenticated') === 'true'
    if (!isCustomerAuthenticated) {
      return <Navigate to="/signin/customer" state={{ from: location }} replace />
    }
  }
  
  // Check if employee is authenticated for employee routes
  if (type === 'employee' && !user?.isAuthenticated) {
    return <Navigate to="/signin/employee" state={{ from: location }} replace />
  }
  
  return <>{children}</>
}
