"use client"

import { Search, Plus, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const filters = [
  { label: "All", count: 0 },
  { label: "Active", count: 0 },
  { label: "Expired", count: 0 },
  { label: "Attention required", count: 0 },
]

const lists = [
  { title: "Fans", count: 0 },
  { title: "Following", count: 0 },
  { title: "Restricted", count: 0 },
  { title: "Blocked", count: 0 },
]

export default function SubscriptionsPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">COLLECTIONS</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 w-[200px]" placeholder="Search collections" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Tabs defaultValue="lists" className="px-4">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger value="lists" className="rounded-none data-[state=active]:border-b-2">
              USER LISTS
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="rounded-none data-[state=active]:border-b-2">
              BOOKMARKS
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-none data-[state=active]:border-b-2">
              USERS
            </TabsTrigger>
            <TabsTrigger value="posts" className="rounded-none data-[state=active]:border-b-2">
              POSTS
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-6">
          {filters.map((filter) => (
            <Button key={filter.label} variant="outline" className="text-sm" size="sm">
              {filter.label} {filter.count}
            </Button>
          ))}
        </div>
        <div className="space-y-4">
          {lists.map((list) => (
            <div key={list.title} className="p-4 rounded-lg border bg-card">
              <h3 className="font-medium">{list.title}</h3>
              <p className="text-sm text-muted-foreground">empty</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

