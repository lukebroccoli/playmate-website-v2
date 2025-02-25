// components/layout-wrapper.tsx
"use client"

import { ReactNode } from "react"
import { LeftSidebar } from "@/components/left-sidebar"
import { TrendingSection } from "@/components/trending-section"
import { usePathname } from "next/navigation"

export function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  // Don't apply the layout to the login page
  if (pathname === "/login") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <LeftSidebar />
      <main className="flex-1">
        {children}
      </main>
      <TrendingSection />
    </div>
  )
}