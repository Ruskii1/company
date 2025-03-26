
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define the user roles
export type UserRole = 'admin' | 'employee';

// Define the user object structure
export interface User {
  username: string;
  role: UserRole;
  idNumber: string;
  isAuthenticated: boolean;
}

// Define some mock users for testing
const MOCK_USERS = [
  { username: 'admin', password: 'admin123', idNumber: 'A-1234', role: 'admin' as UserRole },
  { username: 'employee1', password: 'emp123', idNumber: 'E-1001', role: 'employee' as UserRole },
  { username: 'employee2', password: 'emp456', idNumber: 'E-1002', role: 'employee' as UserRole },
];

// Create the auth context
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, idNumber: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isEmployee: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  // Navigate is not available at the top level with this structure
  // We'll handle redirects differently

  // Check for existing user session on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('employeeAuthenticated') === 'true';
    const storedUser = localStorage.getItem('currentUser');
    
    if (isAuthenticated && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  const login = async (username: string, password: string, idNumber: string): Promise<boolean> => {
    // In a real app, this would be an API call to your backend
    const matchedUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password && u.idNumber === idNumber
    );

    if (matchedUser) {
      const userData = {
        username: matchedUser.username,
        role: matchedUser.role,
        idNumber: matchedUser.idNumber,
        isAuthenticated: true
      };
      
      setUser(userData);
      localStorage.setItem('employeeAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.username}!`,
      });
      
      return true;
    } else {
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('employeeAuthenticated');
    localStorage.removeItem('currentUser');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    // Instead of navigate, we'll use window.location for logout
    window.location.href = '/signin/employee';
  };

  // Role check functions
  const isAdmin = () => user?.role === 'admin';
  const isEmployee = () => user?.role === 'employee' || user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isEmployee }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
