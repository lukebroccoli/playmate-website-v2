// app/layout.tsx
import { ClientProvider } from "@/components/client-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playmate", // main title in browser tab
  description: "Playmate.ink - find your playmate today!", 
  icons: {
    icon: './icon.ico', 
  },
  metadataBase: new URL('https://playmate.ink'), // base URL for metadata
  openGraph: {
    title: 'Playmate',
    description: 'Playmate.ink - find your playmate today!',
    url: 'https://www.playmate.ink',
    siteName: 'Playmate',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientProvider>
            <AuthProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
              <Toaster />
            </AuthProvider>
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
