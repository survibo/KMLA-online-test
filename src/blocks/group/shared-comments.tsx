import { memo, useMemo, useRef, useState } from "react"
import { MessageCircle, SendHorizontal, ThumbsUp } from "lucide-react"

import "./styles.css"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  createGroupCardCommentThread,
  type GroupCommentMeta,
} from "@/blocks/group/comment-thread"
import { GroupPostAvatar } from "@/blocks/group/shared"
import { formatRelativeTime } from "@/lib/datetime"
import { cn } from "@/lib/utils"
import type { GroupComment } from "@/blocks/group/types"

const COMMENT_REVEAL_BASE_DELAY_MS = 60
const COMMENT_REVEAL_STEP_MS = 45
const COMMENT_REVEAL_MAX_STEPS = 6

function getCommentRevealDelay(index: number) {
  return `${
    COMMENT_REVEAL_BASE_DELAY_MS +
    Math.min(index, COMMENT_REVEAL_MAX_STEPS) * COMMENT_REVEAL_STEP_MS
  }ms`
}

type GroupCommentRowProps = GroupCommentMeta & {
  postAuthorId?: string
  onReplyClick?: () => void
}

function GroupCommentRow({
  item,
  depth,
  replyCount,
  parentAuthorName,
  postAuthorId,
  onReplyClick,
}: GroupCommentRowProps) {
  const likes = item.comment_reactions?.length ?? 0
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
        <div className="flex flex-wrap items-center gap-0.5 -ml-1.5 text-sm text-text-faint">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-brand-green-strong hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-brand-green dark:hover:bg-emerald-400/12 dark:hover:text-emerald-300"
          >
            <ThumbsUp className="size-4" strokeWidth={2.2} />
            <span>{likes}</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 justify-start gap-1 px-1.5 py-0 text-text-faint hover:bg-muted hover:text-text-strong"
            onClick={onReplyClick}
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {depth === 0 ? <span>{replyCount}</span> : null}
          </Button>
        </div>
      </div>
    </div>
  )
}

function GroupReplyToggle({
  replyCount,
  expanded,
  onToggle,
}: {
  replyCount: number
  expanded: boolean
  onToggle: () => void
}) {
  if (replyCount <= 0) {
    return null
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="mt-1 h-7 px-0 text-sm font-medium text-text-faint hover:bg-transparent hover:text-text-strong"
      onClick={onToggle}
    >
      {expanded ? "답글 숨기기" : `답글 보기 ${replyCount}`}
    </Button>
  )
}

export function GroupCommentsThread({
  commentItems = [],
  postAuthorId,
  className,
  revealMode = "none",
}: {
  commentItems?: GroupComment[]
  postAuthorId?: string
  className?: string
  revealMode?: "none" | "stagger"
}) {
  const { topLevelComments, directRepliesByParentId } = useMemo(
    () => createGroupCardCommentThread(commentItems),
    [commentItems]
  )
  const [expandedCommentIds, setExpandedCommentIds] = useState<Set<string>>(
    () => new Set<string>()
  )

  if (topLevelComments.length === 0) return null

  function toggleReplies(commentId: string) {
    setExpandedCommentIds((currentIds) => {
      const nextIds = new Set(currentIds)

      if (nextIds.has(commentId)) {
        nextIds.delete(commentId)
      } else {
        nextIds.add(commentId)
      }

      return nextIds
    })
  }

  function openReplies(commentId: string) {
    setExpandedCommentIds((currentIds) => {
      if (currentIds.has(commentId)) return currentIds

      const nextIds = new Set(currentIds)
      nextIds.add(commentId)

      return nextIds
    })
  }

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {topLevelComments.map(({ item, ...meta }, index) => {
        const isExpanded = expandedCommentIds.has(item.id)
        const directReplies = directRepliesByParentId.get(item.id) ?? []

        return (
          <div
            key={item.id ?? `${item.author.name}-${index}`}
            className={cn(revealMode === "stagger" && "group-comments-entry")}
            style={
              revealMode === "stagger"
                ? { animationDelay: getCommentRevealDelay(index) }
                : undefined
            }
          >
            <GroupCommentRow
              item={item}
              postAuthorId={postAuthorId}
              onReplyClick={
                meta.replyCount > 0 ? () => openReplies(item.id) : undefined
              }
              {...meta}
            />
            <GroupReplyToggle
              replyCount={meta.replyCount}
              expanded={isExpanded}
              onToggle={() => toggleReplies(item.id)}
            />
            {directReplies.length > 0 ? (
              <div
                className={cn(
                  "group-comments-replies grid transition-[grid-template-rows,opacity,transform] duration-250 ease-out",
                  isExpanded
                    ? "mt-3 grid-rows-[1fr] opacity-100 translate-y-0"
                    : "grid-rows-[0fr] opacity-0 -translate-y-1"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-5 pt-0.5">
                    {directReplies.map(
                      ({ item: replyItem, ...replyMeta }, replyIndex) => (
                        <div
                          key={replyItem.id ?? `${replyItem.author.name}-${replyIndex}`}
                          className={cn(
                            revealMode === "stagger" &&
                              isExpanded &&
                              "group-comments-entry"
                          )}
                          style={
                            revealMode === "stagger" && isExpanded
                              ? {
                                  animationDelay: getCommentRevealDelay(
                                    index + replyIndex + 1
                                  ),
                                }
                              : undefined
                          }
                        >
                          <GroupCommentRow
                            item={replyItem}
                            postAuthorId={postAuthorId}
                            {...replyMeta}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export const GroupCommentsEmptyState = memo(function GroupCommentsEmptyState() {
  return (
    <div className="px-4 py-6 text-center text-sm text-text-faint">
      아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
    </div>
  )
})

export function GroupCommentComposer({
  className,
}: {
  className?: string
}) {
  const composerRef = useRef<HTMLDivElement | null>(null)
  const [draftComment, setDraftComment] = useState("")
  const [isComposerActive, setIsComposerActive] = useState(false)
  const shouldShowSubmitButton =
    isComposerActive && draftComment.trim().length > 0

  return (
    <div
      ref={composerRef}
      className={cn(className)}
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
      <div className="rounded-[1.5rem] border border-border bg-muted px-4 py-2.5 shadow-none">
        <Textarea
          placeholder="댓글을 입력하세요..."
          value={draftComment}
          onChange={(event) => setDraftComment(event.target.value)}
          className="min-h-[2rem] resize-none border-0 bg-transparent px-0 py-0 text-sm text-text-strong shadow-none placeholder:text-text-faint focus-visible:ring-0"
        />
        <div className="mt-1.5 flex min-h-8 items-center justify-end">
          {shouldShowSubmitButton ? (
            <Button
              type="button"
              size="icon"
              className="size-8 rounded-full bg-brand-green-strong text-brand-green-foreground shadow-none hover:bg-emerald-600 dark:bg-brand-green-strong dark:text-brand-green-foreground dark:hover:bg-emerald-400"
              aria-label="댓글 전송"
            >
              <SendHorizontal className="size-4.5" strokeWidth={2.2} />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
