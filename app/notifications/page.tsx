import { Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"

const filters = ["All", "Tags", "Comments", "Mentions", "Subscriptions", "Promotions"]

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">NOTIFICATIONS</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto p-2 pb-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={filter === "All" ? "default" : "secondary"}
              className="rounded-full px-4 py-2"
              size="sm"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>
      <EmptyState
        title="No notifications currently!"
        description="When you get notifications, they'll show up here"
        className="mt-20"
      />
    </div>
  )
}

