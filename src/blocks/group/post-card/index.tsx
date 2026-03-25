import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import { cn } from "@/lib/utils"
import type { GroupPost } from "@/blocks/group/types"
import {
  GroupPostSummary,
} from "@/blocks/group/shared"

import { GroupPostCommentsDrawer } from "./comments-drawer"

type GroupPostCardProps = {
  post: GroupPost
  timeVariant?: "absolute" | "relative"
  className?: string
}

export function GroupPostCard({
  post,
  timeVariant = "absolute",
  className,
}: GroupPostCardProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const commentItems = post.post_comments ?? []
  const openCommentsPostId = searchParams.get("comments")
  const isCommentsOpen = openCommentsPostId === post.id

  function updateCommentsQuery(nextPostId: string | null, replace = false) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextPostId) {
      nextSearchParams.set("comments", nextPostId)
    } else {
      nextSearchParams.delete("comments")
    }

    const nextSearch = nextSearchParams.toString()

    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      {
        replace,
        state: nextPostId
          ? {
              ...location.state,
              commentsDrawerSourcePath: `${location.pathname}${location.search}`,
              commentsDrawerPostId: nextPostId,
            }
          : location.state,
      }
    )
  }

  function handleCommentsOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      if (!isCommentsOpen) {
        updateCommentsQuery(post.id)
      }

      return
    }

    if (!isCommentsOpen) return

    const sourcePath =
      typeof location.state?.commentsDrawerSourcePath === "string"
        ? location.state.commentsDrawerSourcePath
        : null
    const currentPath = `${location.pathname}${location.search}`

    if (sourcePath && sourcePath !== currentPath) {
      navigate(-1)
      return
    }

    updateCommentsQuery(null, true)
  }

  return (
    <>
      <article
        className={cn(
          "w-full border-b-2 border-border bg-background text-foreground",
          className
        )}
      >
        <div className="mx-auto w-full max-w-4xl px-4 pt-3 sm:px-6">
          <GroupPostSummary
            post={post}
            timeVariant={timeVariant}
            onCommentClick={() => handleCommentsOpenChange(true)}
          />
        </div>
      </article>

      <GroupPostCommentsDrawer
        open={isCommentsOpen}
        onOpenChange={handleCommentsOpenChange}
        commentItems={commentItems}
        postAuthorId={post.author_id}
      />
    </>
  )
}
