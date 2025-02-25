// src/app/page.tsx
"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'

export default function RootPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.push('/(main)')
    } else {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Show nothing while redirecting
  return null
}