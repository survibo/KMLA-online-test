import { MessageCircle, ThumbsUp } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  CommunityAvatar,
  CommunityPostGallery,
  CommunityPostHeader,
  CommunityPostStats,
} from "@/blocks/community-post-shared"
import { cn } from "@/lib/utils"
import type {
  CommunityComment,
  CommunityPost,
} from "@/blocks/community-post-types"

type CommunityPostDetailProps = {
  post: CommunityPost
  commentItems?: CommunityComment[]
  className?: string
}

type CommentMeta = {
  item: CommunityComment
  depth: number
  replyCount: number
}

function CommentRow({
  item,
  depth,
  replyCount,
}: CommentMeta) {
  const likes = item.comment_reactions?.length ?? 0
  const showReplyCount = depth === 0

  return (
    <div className={cn("flex gap-3", depth > 0 && "ml-14")}>
      <CommunityAvatar author={item.author} size="sm" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="rounded-3xl bg-zinc-100 px-4 py-3">
          <p className="font-semibold text-zinc-900">{item.author.name}</p>
          <p className="whitespace-pre-line text-zinc-700">{item.content}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1 px-1 text-sm text-zinc-500">
          <span className="px-2 text-[0.8125rem]">{item.created_at}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 rounded-full px-2 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{likes}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 rounded-full px-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {showReplyCount ? <span>{replyCount}</span> : null}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CommunityPostDetail({
  post,
  commentItems = [],
  className,
}: CommunityPostDetailProps) {
  const images = post.post_images ?? []
  const sortedCommentItems = [...commentItems].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
  const commentMap = new Map(sortedCommentItems.map((item) => [item.id, item]))
  const childMap = new Map<string | null, CommunityComment[]>()

  function getTopLevelParentId(comment: CommunityComment) {
    let currentParentId = comment.parent_id ?? null

    while (currentParentId) {
      const parentComment = commentMap.get(currentParentId)
      if (!parentComment?.parent_id) return parentComment?.id ?? currentParentId
      currentParentId = parentComment.parent_id
    }

    return null
  }

  for (const item of sortedCommentItems) {
    const parentKey = getTopLevelParentId(item)
    const siblings = childMap.get(parentKey) ?? []
    siblings.push(item)
    childMap.set(parentKey, siblings)
  }

  const flattenedComments: CommentMeta[] = []

  function walkComments(parentId: string | null, actualDepth: number) {
    const children = childMap.get(parentId) ?? []

    for (const child of children) {
      const directReplies = child.reply_count ?? childMap.get(child.id)?.length ?? 0

      flattenedComments.push({
        item: child,
        depth: Math.min(actualDepth, 1),
        replyCount: directReplies,
      })

      walkComments(child.id, actualDepth + 1)
    }
  }

  walkComments(null, 0)

  return (
    <section className={cn("w-full bg-white", className)}>
      <div className="mx-auto w-full max-w-[560px]">
        <Card className="rounded-none border-0 bg-white py-0 shadow-none ring-0">
          <CardContent className="space-y-5 px-4 py-4 sm:px-6">
            <CommunityPostHeader
              author={post.author}
              createdAt={post.created_at}
              showMenu
            />

            {post.title || post.content ? (
              <div className="space-y-2.5">
                {post.title ? (
                  <h2 className="text-[1.5rem] leading-[1.08] font-bold tracking-[-0.03em] text-zinc-950">
                    {post.title}
                  </h2>
                ) : null}
                {post.content ? (
                  <p className="whitespace-pre-line break-keep text-zinc-600">
                    {post.content}
                  </p>
                ) : null}
              </div>
            ) : null}

            <CommunityPostGallery images={images} />

            <CommunityPostStats post={post} />

            {commentItems.length > 0 ? (
              <div className="space-y-5">
                <Separator className="bg-zinc-200" />
                {flattenedComments.map(({ item, ...meta }, index) => (
                  <CommentRow
                    key={item.id ?? `${item.author.name}-${index}`}
                    item={item}
                    {...meta}
                  />
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
