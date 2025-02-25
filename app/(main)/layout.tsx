// src/app/(main)/layout.tsx
"use client"

import React, { useEffect } from "react"
import { LeftSidebar } from "@/components/left-sidebar"
import { TrendingSection } from "@/components/trending-section"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Client-side redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  // Don't render anything until we check authentication
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <LeftSidebar />
      <main className="flex-1 border-x border-border">
        {children}
      </main>
      <TrendingSection />
    </div>
  )
}