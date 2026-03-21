import { useRef, useState } from "react"
import { MessageCircle, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type { GroupComment, GroupUser } from "@/blocks/group-post/types"

type GroupPostCommentsDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentItems?: GroupComment[]
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function GroupCommentAvatar({
  author,
  size = "sm",
}: {
  author: GroupUser
  size?: "xs" | "sm"
}) {
  const className = size === "xs" ? "size-7" : "size-9"

  return (
    <Avatar size="default" className={cn(className, "shrink-0")}>
      <AvatarImage src={author.img} alt={author.name} />
      <AvatarFallback className="bg-gradient-to-b from-zinc-100 to-zinc-300 font-semibold text-zinc-600">
        {getInitials(author.name)}
      </AvatarFallback>
    </Avatar>
  )
}

type GroupCommentMeta = {
  item: GroupComment
  depth: number
  replyCount: number
  parentAuthorName: string | null
}

function countDirectReplies(commentItems: GroupComment[], parentId: string) {
  return commentItems.filter((item) => item.parent_id === parentId).length
}

function flattenGroupComments(commentItems: GroupComment[]) {
  const sortedCommentItems = [...commentItems].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )
  const commentMap = new Map(sortedCommentItems.map((item) => [item.id, item]))
  const childMap = new Map<string | null, GroupComment[]>()

  function getTopLevelParentId(comment: GroupComment) {
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

  const flattenedComments: GroupCommentMeta[] = []

  function walkComments(parentId: string | null, actualDepth: number) {
    const children = childMap.get(parentId) ?? []

    for (const child of children) {
      flattenedComments.push({
        item: child,
        depth: Math.min(actualDepth, 1),
        replyCount:
          child.reply_count ?? countDirectReplies(sortedCommentItems, child.id),
        parentAuthorName: child.parent_id
          ? commentMap.get(child.parent_id)?.author.name ?? null
          : null,
      })

      walkComments(child.id, actualDepth + 1)
    }
  }

  walkComments(null, 0)

  return flattenedComments
}

function GroupCommentRow({
  item,
  depth,
  replyCount,
  parentAuthorName,
}: GroupCommentMeta) {
  const likes = item.comment_reactions?.length ?? 0

  return (
    <div className={cn("flex gap-2.5", depth > 0 && "ml-7")}>
      <div className="pt-1">
        <GroupCommentAvatar author={item.author} size={depth > 0 ? "xs" : "sm"} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="py-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="font-semibold text-zinc-900">{item.author.name}</p>
            <span className="text-[0.8125rem] text-zinc-400">
              {formatRelativeTime(item.created_at)}
            </span>
          </div>
          <p className="mt-0.5 whitespace-pre-line text-zinc-700">
            {parentAuthorName ? (
              <span className="mr-1.5 font-medium text-sky-700">
                {parentAuthorName}
              </span>
            ) : null}
            {item.content}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-0.5 -ml-1.5 text-sm text-zinc-500">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{likes}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {depth === 0 ? <span>{replyCount}</span> : null}
          </Button>
        </div>
      </div>
    </div>
  )
}

function GroupCommentThread({
  commentItems = [],
}: {
  commentItems?: GroupComment[]
}) {
  const flattenedComments = flattenGroupComments(commentItems)

  if (flattenedComments.length === 0) return null

  return (
    <div className="flex flex-col gap-5">
      {flattenedComments.map(({ item, ...meta }, index) => (
        <GroupCommentRow
          key={item.id ?? `${item.author.name}-${index}`}
          item={item}
          {...meta}
        />
      ))}
    </div>
  )
}

export function GroupPostCommentsDrawer({
  open,
  onOpenChange,
  commentItems = [],
}: GroupPostCommentsDrawerProps) {
  const composerRef = useRef<HTMLDivElement | null>(null)
  const [draftComment, setDraftComment] = useState("")
  const [isComposerActive, setIsComposerActive] = useState(false)
  const shouldShowSubmitButton =
    isComposerActive && draftComment.trim().length > 0

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto flex w-full max-w-[800px] flex-col rounded-t-[1.75rem] bg-white">
        <DrawerHeader className="px-4 pb-3 pt-5 text-left sm:px-6">
          <DrawerTitle className="text-lg font-semibold text-zinc-950">
            댓글
          </DrawerTitle>
        </DrawerHeader>

        <Separator className="bg-zinc-200" />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {commentItems.length > 0 ? (
            <GroupCommentThread commentItems={commentItems} />
          ) : (
            <div className="rounded-2xl bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-500">
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
            </div>
          )}
        </div>

        <div className="border-t border-zinc-200 px-4 py-4 sm:px-6">
          <div
            ref={composerRef}
            className="flex flex-col gap-3"
            onFocusCapture={() => setIsComposerActive(true)}
            onBlurCapture={(event) => {
              const nextFocusedElement = event.relatedTarget as Node | null

              if (nextFocusedElement && composerRef.current?.contains(nextFocusedElement)) {
                return
              }

              if (!draftComment.trim()) {
                setIsComposerActive(false)
              }
            }}
          >
            <Textarea
              placeholder="이 게시글에 댓글 남기기"
              value={draftComment}
              onChange={(event) => setDraftComment(event.target.value)}
              className="min-h-10 rounded-2xl border-zinc-200 bg-zinc-50 px-4 py-3 text-sm shadow-none focus-visible:border-zinc-300 focus-visible:ring-2 focus-visible:ring-zinc-200"
            />
            {shouldShowSubmitButton ? (
              <div className="flex justify-end">
                <Button
                  type="button"
                  className="rounded-full bg-emerald-500 px-4 text-white hover:bg-emerald-600"
                >
                  댓글 작성
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
