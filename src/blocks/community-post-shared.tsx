import { EllipsisVertical, MessageCircle, ThumbsUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type {
  CommunityPost,
  CommunityPostImage,
  CommunityUser,
} from "./community-post-types"

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function CommunityAvatar({
  author,
  size = "md",
}: {
  author: CommunityUser
  size?: "sm" | "md"
}) {
  const avatarSize = size === "sm" ? "default" : "lg"
  const className = size === "sm" ? "size-9" : "size-10"

  return (
    <Avatar size={avatarSize} className={cn("shrink-0", className)}>
      <AvatarImage src={author.img} alt={author.name} />
      <AvatarFallback className="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-zinc-600">
        {getInitials(author.name)}
      </AvatarFallback>
    </Avatar>
  )
}

export function CommunityPostHeader({
  author,
  createdAt,
  showMenu = false,
}: {
  author: CommunityUser
  createdAt: string
  showMenu?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <CommunityAvatar author={author} size="md" />
        <div className="space-y-0.5">
          <p className="text-[1.05rem] leading-5 font-semibold tracking-tight text-zinc-900">
            {author.name}
          </p>
          <p className="text-[0.875rem] leading-5 font-medium text-zinc-500">
            {createdAt}
          </p>
        </div>
      </div>

      {showMenu ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              aria-label="More options"
            >
              <EllipsisVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Save</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  )
}

export function CommunityPostStats({
  post,
  className,
}: {
  post: CommunityPost
  className?: string
}) {
  const likes = post.reaction_count ?? post.post_reactions?.length ?? 0
  const comments = post.comment_count ?? 0

  return (
    <div className={cn("flex items-center gap-1 text-zinc-500", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 rounded-full px-2.5 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <ThumbsUp className="size-4.5" strokeWidth={2.2} />
        <span className="font-medium">{likes}</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 rounded-full px-2.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
      >
        <MessageCircle className="size-4.5" strokeWidth={2.2} />
        <span className="font-medium">{comments}</span>
      </Button>
    </div>
  )
}

export function CommunityPostGallery({
  images = [],
  className,
  altFallback = "Post attachment preview",
}: {
  images?: CommunityPostImage[]
  className?: string
  altFallback?: string
}) {
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order)
  const totalImageCount = sortedImages.length

  if (totalImageCount === 0) return null

  if (totalImageCount <= 3) {
    const featuredImage = sortedImages[0]

    return (
      <div className={cn("relative overflow-hidden rounded-[1.5rem] bg-zinc-100", className)}>
        <img
          src={featuredImage.url}
          alt={featuredImage.alt ?? altFallback}
          className="aspect-square w-full object-cover"
        />
        {totalImageCount > 1 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/28 text-6xl font-bold text-white">
            +{totalImageCount - 1}
          </div>
        ) : null}
      </div>
    )
  }

  const visibleImages = sortedImages.slice(0, 4)
  const hiddenCount = totalImageCount - 4

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {visibleImages.map((image, index) => {
        const showOverlay = index === 3 && hiddenCount > 0

        return (
          <div
            key={image.id ?? `${image.url}-${index}`}
            className="relative overflow-hidden rounded-[1.5rem] bg-zinc-100"
          >
            <img
              src={image.url}
              alt={image.alt ?? altFallback}
              className="aspect-square w-full object-cover"
            />
            {showOverlay ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/28 text-5xl font-bold text-white">
                +{hiddenCount}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
