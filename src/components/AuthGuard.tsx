
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthGuardProps {
  children: ReactNode
  type: 'customer' | 'employee'
}

export function AuthGuard({ children, type }: AuthGuardProps) {
  const navigate = useNavigate()
  
  useEffect(() => {
    const isCustomerAuthenticated = localStorage.getItem('customerAuthenticated') === 'true'
    const isEmployeeAuthenticated = localStorage.getItem('employeeAuthenticated') === 'true'
    
    if (type === 'customer' && !isCustomerAuthenticated) {
      navigate('/signin/customer')
    } else if (type === 'employee' && !isEmployeeAuthenticated) {
      navigate('/signin/employee')
    }
  }, [navigate, type])
  
  return <>{children}</>
}
