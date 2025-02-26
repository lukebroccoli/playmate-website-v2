"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { HelpCircle, LogOut, Moon, Settings, Sun, User, Wallet } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface SettingsDialogProps {
  open: boolean
  onClose: () => void
}

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-background">
      <DialogTitle className="sr-only">Settings and User Profile</DialogTitle>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              JG
            </div>
            <div>
              <h2 className="font-semibold">james garfield</h2>
              <p className="text-sm text-muted-foreground">@u481751723</p>
            </div>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="mr-4">0 Fans</span>
            <span>0 Following</span>
          </div>
        </div>
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
            <User className="mr-2 h-4 w-4" />
            My profile
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
            <Wallet className="mr-2 h-4 w-4" />
            Your cards
            <span className="ml-2 text-xs text-muted-foreground">(to subscribe)</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={onClose}>
            <HelpCircle className="mr-2 h-4 w-4" />
            Help and support
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            {theme === "dark" ? "Light" : "Dark"} mode
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

