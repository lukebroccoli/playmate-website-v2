// src/hooks/use-auth.ts
"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    // Check authentication on component mount
    const auth = localStorage.getItem('auth')
    setIsAuthenticated(auth === 'true')
  }, [])
  
  const login = (username: string, password: string) => {
    // Hardcoded credentials for demo purposes
    if (username === 'iamchinabingbong' && password === 'random') {
      localStorage.setItem('auth', 'true')
      setIsAuthenticated(true)
      return true
    }
    return false
  }
  
  const logout = () => {
    localStorage.removeItem('auth')
    setIsAuthenticated(false)
    router.push('/login')
  }
  
  return { isAuthenticated, login, logout }
}