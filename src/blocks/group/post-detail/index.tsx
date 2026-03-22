import { useRef, useState } from "react"
import { MessageCircle, ThumbsUp } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type { GroupComment, GroupPost } from "@/blocks/group/types"
import {
  createGroupDetailCommentThread,
  type GroupCommentMeta,
} from "@/blocks/group/comment-thread"
import {
  GroupPostAvatar,
  GroupPostSummary,
} from "@/blocks/group/shared"

type GroupPostDetailProps = {
  post: GroupPost
  commentItems?: GroupComment[]
  className?: string
}

type GroupCommentRowProps = GroupCommentMeta & {
  postAuthorId?: string
}

function GroupCommentRow({
  item,
  depth,
  replyCount,
  parentAuthorName,
  postAuthorId,
}: GroupCommentRowProps) {
  const isPostAuthor = item.author_id === postAuthorId

  return (
    <div className={cn("flex gap-2.5", depth > 0 && "ml-7")}>
      <div className="pt-1">
        <GroupPostAvatar author={item.author} size={depth > 0 ? "xs" : "sm"} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="py-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <p className="font-semibold text-text-strong">{item.author.name}</p>
            {isPostAuthor ? (
              <span className="text-[0.8125rem] font-medium text-text-faint">
                작성자
              </span>
            ) : null}
            <span className="text-[0.8125rem] text-text-faint">
              {formatRelativeTime(item.created_at)}
            </span>
          </div>
          <p className="mt-0.5 whitespace-pre-line text-text-strong">
            {parentAuthorName ? (
              <span className="mr-1.5 font-medium text-sky-600 dark:text-sky-400">
                @{parentAuthorName}
              </span>
            ) : null}
            {item.content}
          </p>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-0.5 -ml-1.5 text-sm text-text-faint">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{item.comment_reactions?.length ?? 0}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-text-faint hover:bg-muted hover:text-text-strong"
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
  postAuthorId,
}: {
  commentItems?: GroupComment[]
  postAuthorId?: string
}) {
  const flattenedComments = createGroupDetailCommentThread(commentItems)

  if (flattenedComments.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      {flattenedComments.map(({ item, ...meta }, index) => (
        <GroupCommentRow
          key={item.id ?? `${item.author.name}-${index}`}
          item={item}
          postAuthorId={postAuthorId}
          {...meta}
        />
      ))}
    </div>
  )
}

export function GroupPostDetail({
  post,
  commentItems = [],
  className,
}: GroupPostDetailProps) {
  const composerRef = useRef<HTMLDivElement | null>(null)
  const [draftComment, setDraftComment] = useState("")
  const [isComposerActive, setIsComposerActive] = useState(false)
  const shouldShowSubmitButton =
    isComposerActive && draftComment.trim().length > 0

  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="mx-auto w-full max-w-4xl px-4 py-4 pb-28 sm:px-6 sm:pb-32">
          <GroupPostSummary
            post={post}
          />

          <div className="space-y-5">
            <Separator className="bg-border" />
            {commentItems.length > 0 ? (
              <GroupCommentThread
                commentItems={commentItems}
                postAuthorId={post.author_id}
              />
            ) : (
              <div className="px-4 py-6 text-center text-sm text-text-faint">
                아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
              </div>
            )}
          </div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
        <div className="mx-auto w-full max-w-4xl px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6">
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
              className="min-h-10 rounded-2xl border-border bg-muted px-4 py-3 text-sm text-text-strong shadow-none placeholder:text-text-faint focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            <div className="flex min-h-9 justify-end">
              {shouldShowSubmitButton ? (
                <Button
                  type="button"
                  className="rounded-full bg-emerald-500 px-4 text-white shadow-none hover:bg-emerald-600 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400"
                >
                  댓글 작성
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
