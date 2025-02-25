// src/app/(main)/page.tsx
import { MainFeed } from "@/components/main-feed"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <MainFeed />
    </div>
  )
}