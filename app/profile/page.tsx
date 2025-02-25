import { ArrowLeft, Share2, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { SpotifyConnect } from "@/components/spotify-connect"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="flex items-center p-4 gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">james garfield</h1>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-b from-purple-600/20 to-background" />
        <div className="px-6">
          <div className="relative -mt-16">
            <div className="relative inline-block">
              <div className="h-32 w-32 rounded-full bg-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                JG
              </div>
              <div className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-green-500 border-4 border-background" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <h2 className="text-2xl font-bold">james garfield</h2>
            <p className="text-muted-foreground">@u481751723</p>
          </div>
          <div className="mt-4 flex gap-4">
            <Button variant="outline" className="flex-1">
              EDIT PROFILE
            </Button>
            <Button variant="outline">Available</Button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-6">
        <Tabs defaultValue="posts">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="posts"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 px-6"
            >
              NO POSTS
            </TabsTrigger>
            <TabsTrigger
              value="media"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-purple-600 px-6"
            >
              NO MEDIA
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="p-4">
            <EmptyState title="No posts yet" description="Share your first post with your followers" icon="posts" />
          </TabsContent>
          <TabsContent value="media" className="p-4">
            <EmptyState title="No media yet" description="Share photos and videos with your followers" icon="media" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Spotify Section - Only visible in right sidebar on larger screens */}
      <div className="p-4 lg:hidden">
        <SpotifyConnect />
      </div>
    </div>
  )
}

