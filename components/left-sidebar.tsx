"use client"

import { Bell, Home, MessageCircle, Plus, User, Wallet, MoreHorizontal, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SettingsDialog } from "@/components/settings-dialog"
import { NewPostModal } from "@/components/new-post-modal"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: MessageCircle },
  { name: "Subscriptions", href: "/subscriptions", icon: Users },
  { name: "Payments", href: "/payments", icon: Wallet },
  { name: "Profile", href: "/profile", icon: User },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "pt", name: "Brazilian Portuguese", flag: "🇧🇷" },
]

export function LeftSidebar() {
  const pathname = usePathname()
  const [showSettings, setShowSettings] = useState(false)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  return (
    <div className="w-16 md:w-[300px] p-2 md:p-4 sticky top-0 h-screen flex flex-col items-center md:items-stretch border-r border-border bg-background">
      <div className="space-y-6 w-full">
        <Link href="/" className="flex items-center space-x-2 justify-center md:justify-start">
          <Avatar className="h-8 w-8 transition-transform hover:scale-110">
            <AvatarImage src="/placeholder.svg" alt="Logo" />
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
          <span className="text-xl font-bold hidden md:inline">Playmate</span>
        </Link>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center justify-center md:justify-start space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/50 dark:hover:text-purple-400",
                pathname === item.href
                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                  : "text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700"
            size="lg"
            onClick={() => setShowNewPostModal(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Mobile New Post Button */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <Button
            className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700"
            size="icon"
            onClick={() => setShowNewPostModal(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <div className="pt-4 mt-4 border-t border-border">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center md:justify-start space-x-3 w-full hover:bg-accent p-3 rounded-lg transition-colors"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="hidden md:inline">More</span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start mt-2">
                <Globe className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">
                  {selectedLanguage.flag} {selectedLanguage.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setSelectedLanguage(lang)}>
                  {lang.flag} {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <SettingsDialog open={showSettings} onClose={() => setShowSettings(false)} />
      <NewPostModal isOpen={showNewPostModal} onClose={() => setShowNewPostModal(false)} />
    </div>
  )
}

