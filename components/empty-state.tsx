import { ImageIcon, FileText, AlertCircle } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: "posts" | "media" | "alert"
  className?: string
}

export function EmptyState({ title, description, icon = "alert", className = "" }: EmptyStateProps) {
  const icons = {
    posts: FileText,
    media: ImageIcon,
    alert: AlertCircle,
  }

  const Icon = icons[icon]

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className}`}>
      <div className="w-24 h-24 mb-4 text-muted-foreground">
        <Icon className="w-full h-full" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

