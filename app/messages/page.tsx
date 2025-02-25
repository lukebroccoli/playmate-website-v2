import { Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/empty-state"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">MESSAGES</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 w-[200px] bg-background" placeholder="Search messages" />
            </div>
          </div>
          <Button size="icon" variant="ghost">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-4 pb-2">
          <Button variant="ghost" className="text-sm">
            NEWEST FIRST
          </Button>
        </div>
      </div>
      <EmptyState title="Please subscribe to a creator to access this feature." className="mt-20" />
    </div>
  )
}

