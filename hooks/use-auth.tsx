// hooks/use-auth.tsx
"use client" // Important to mark as client component

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state
  login: (username: string, password: string) => Promise<boolean>; // Make async
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
  const router = useRouter()
  
  useEffect(() => {
    // Check auth status when component mounts
    const checkAuth = () => {
      try {
        const auth = localStorage.getItem('auth')
        setIsAuthenticated(auth === 'true')
      } catch (error) {
        console.error('Error accessing localStorage:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false) // Mark loading as complete regardless of outcome
      }
    }
    
    checkAuth()
  }, [])
  
  const login = async (username: string, password: string) => {
    // Add a slight delay to mimic network request
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // Hardcoded credentials for demo purposes
        if (username === 'iamchinabingbong' && password === 'random') {
          try {
            localStorage.setItem('auth', 'true')
            setIsAuthenticated(true)
            resolve(true)
          } catch (error) {
            console.error('Error setting auth in localStorage:', error)
            resolve(false)
          }
        } else {
          resolve(false)
        }
      }, 500)
    })
  }
  
  const logout = () => {
    try {
      localStorage.removeItem('auth')
      setIsAuthenticated(false)
      router.push('/login')
    } catch (error) {
      console.error('Error removing auth from localStorage:', error)
    }
  }
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}