// src/app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'
import '@/app/globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from "@/hooks/use-auth"
import { ClientProvider } from "@/components/client-provider"


export const metadata: Metadata = {
  title: 'Playmate',
  description: 'Social media platform for creators and fans',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <ThemeProvider defaultTheme="light" attribute="class">
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  )
}