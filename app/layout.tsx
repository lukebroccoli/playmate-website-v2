// app/layout.tsx
import { ClientProvider } from "@/components/client-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { Toaster } from "@/components/ui/toaster"
import { LayoutWrapper } from "@/components/layout-wrapper"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </ClientProvider>
      </body>
    </html>
  )
}