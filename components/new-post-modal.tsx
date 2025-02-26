"use client";

import type React from "react";

import {
  ImageIcon,
  BarChart2,
  HelpCircle,
  Type,
  Plus,
  Minus,
  MoreVertical,
  GripVertical,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPostType: PostType;
}

type PostType = "text" | "poll" | "quiz" | "image";

interface PollOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

function SortableOption({
  option,
  index,
  postType,
  onRemove,
  onChange,
  onCorrectChange,
}: {
  option: PollOption;
  index: number;
  postType: PostType;
  onRemove: () => void;
  onChange: (text: string) => void;
  onCorrectChange: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 mb-2"
    >
      <div {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
      </div>
      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
        {index + 1}
      </div>
      <Input
        value={option.text}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Option ${index + 1}`}
        className="flex-1"
      />
      {postType === "quiz" && (
        <Button
          variant={option.isCorrect ? "default" : "outline"}
          size="sm"
          onClick={onCorrectChange}
        >
          Correct
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={onRemove}
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function NewPostModal({
  isOpen,
  onClose,
  initialPostType,
}: NewPostModalProps) {
  const [postType, setPostType] = useState<PostType>(initialPostType);
  const [postContent, setPostContent] = useState("");
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: "1", text: "" },
    { id: "2", text: "" },
  ]);
  const [pollDuration, setPollDuration] = useState("7");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, { id: String(Date.now()), text: "" }]);
    }
  };

  const handleRemoveOption = (id: string) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((option) => option.id !== id));
    }
  };

  const handleOptionChange = (id: string, text: string) => {
    setPollOptions(
      pollOptions.map((option) =>
        option.id === id ? { ...option, text } : option
      )
    );
  };

  const handleCorrectAnswerChange = (id: string) => {
    setPollOptions(
      pollOptions.map((option) =>
        option.id === id
          ? { ...option, isCorrect: true }
          : { ...option, isCorrect: false }
      )
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setPollOptions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    // Here you would typically send the post to your backend
    console.log("Submitting post:", {
      postType,
      postContent,
      pollOptions,
      selectedImage,
    });
    setPostContent("");
    setPollOptions([
      { id: "1", text: "" },
      { id: "2", text: "" },
    ]);
    setPostType("text");
    setSelectedImage(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogTitle className="sr-only">New Post</DialogTitle>
        <div className="border-b p-4 flex items-center justify-between">
          <Tabs
            value={postType}
            onValueChange={(value) => setPostType(value as PostType)}
          >
            <TabsList className="grid grid-cols-4 h-9">
              <TabsTrigger value="text" className="text-xs">
                Post
              </TabsTrigger>
              <TabsTrigger value="poll" className="text-xs">
                Poll
              </TabsTrigger>
              <TabsTrigger value="quiz" className="text-xs">
                Quiz
              </TabsTrigger>
              <TabsTrigger value="image" className="text-xs">
                Image
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="p-4 space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 text-lg p-0"
          />

          {(postType === "poll" || postType === "quiz") && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={pollOptions.map((option) => option.id)}
                strategy={verticalListSortingStrategy}
              >
                {pollOptions.map((option, index) => (
                  <SortableOption
                    key={option.id}
                    option={option}
                    index={index}
                    postType={postType}
                    onRemove={() => handleRemoveOption(option.id)}
                    onChange={(text) => handleOptionChange(option.id, text)}
                    onCorrectChange={() => handleCorrectAnswerChange(option.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}

          {(postType === "poll" || postType === "quiz") &&
            pollOptions.length < 4 && (
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={handleAddOption}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            )}

          {(postType === "poll" || postType === "quiz") && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Duration:</span>
              <select
                value={pollDuration}
                onChange={(e) => setPollDuration(e.target.value)}
                className="bg-transparent border rounded p-1 text-sm"
              >
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
              </select>
            </div>
          )}

          {postType === "image" && (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {selectedImage && (
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Selected image: {selectedImage.name}
                  </p>
                  <img
                    src={
                      URL.createObjectURL(selectedImage) || "/placeholder.svg"
                    }
                    alt="Selected"
                    className="mt-2 max-h-[200px] object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ImageIcon className="h-5 w-5 text-blue-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <BarChart2 className="h-5 w-5 text-green-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <HelpCircle className="h-5 w-5 text-purple-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Type className="h-5 w-5 text-orange-500" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              className={cn(
                "bg-purple-600 hover:bg-purple-700",
                (!postContent && postType === "text") ||
                  ((postType === "poll" || postType === "quiz") &&
                    pollOptions.some((opt) => !opt.text)) ||
                  (postType === "image" && !selectedImage)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              )}
              disabled={
                (!postContent && postType === "text") ||
                ((postType === "poll" || postType === "quiz") &&
                  pollOptions.some((opt) => !opt.text)) ||
                (postType === "image" && !selectedImage)
              }
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
