import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function TrendingSection() {
  return (
    <div className="w-[350px] p-4 sticky top-0 h-screen hidden xl:block">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input className="pl-10" placeholder="Search" />
        </div>

        <Card className="p-4">
          <h2 className="font-semibold mb-4">Trending Topics</h2>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="text-sm text-gray-500">Trending in Technology</div>
                <div className="font-medium">#TrendingTopic{i + 1}</div>
                <div className="text-sm text-gray-500">1.2K posts</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold mb-4">Who to follow</h2>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 transition-transform hover:scale-110">
                  <AvatarImage src="/placeholder.svg" alt={`Suggested user ${i + 1}`} />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">Suggested User</div>
                  <div className="text-sm text-gray-500">@suggested{i + 1}</div>
                </div>
                <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

