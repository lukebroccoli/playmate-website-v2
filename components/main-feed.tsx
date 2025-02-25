"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share2, ImageIcon, Link2, Smile } from "lucide-react"
import { NewPostModal } from "@/components/new-post-modal"

export function MainFeed() {
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false)
  const [initialPostType, setInitialPostType] = useState<"text" | "poll" | "quiz" | "image">("text")

  const openNewPostModal = (type: "text" | "poll" | "quiz" | "image") => {
    setInitialPostType(type)
    setIsNewPostModalOpen(true)
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="mb-8 border-none shadow-none">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10 transition-transform hover:scale-110">
              <AvatarImage src="/placeholder.svg" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input className="bg-muted" placeholder="What's on your mind?" onClick={() => openNewPostModal("text")} />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => openNewPostModal("image")}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Image
              </Button>
              <Button variant="ghost" size="sm">
                <Link2 className="h-4 w-4 mr-2" />
                Link
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4 mr-2" />
                Emoji
              </Button>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => openNewPostModal("text")}>
              Post
            </Button>
          </div>
        </CardHeader>
      </Card>

      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="mb-4 border-none shadow-none">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 transition-transform hover:scale-110">
                <AvatarImage src="/placeholder.svg" alt="@username" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">Username</div>
                <div className="text-sm text-gray-500">2 hours ago</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              This is a sample post content. It could be much longer and contain multiple paragraphs of text.
            </p>
            <img
              src="/placeholder.svg"
              alt="Post image"
              className="mt-4 rounded-lg w-full object-cover"
              height={300}
              width={500}
            />
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-4 text-gray-500">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                24
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                12
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}

      <NewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        initialPostType={initialPostType}
      />
    </div>
  )
}

