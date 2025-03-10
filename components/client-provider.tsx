// src/components/client-provider.tsx
"use client"

import { ReactNode, useEffect, useState } from "react"
import LoadingScreen from "./loading-screen"

// This component ensures localStorage is only accessed on the client side
export function ClientProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingScreen/>
    // return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return <>{children}</>
}