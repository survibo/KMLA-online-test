import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { GroupComment, GroupPost } from "@/blocks/group/types"
import {
  GroupCommentComposer,
  GroupCommentsEmptyState,
  GroupCommentsThread,
} from "@/blocks/group/shared-comments"
import { GroupPostSummary } from "@/blocks/group/shared"

type GroupPostDetailProps = {
  post: GroupPost
  commentItems?: GroupComment[]
  className?: string
}

export function GroupPostDetail({
  post,
  commentItems = [],
  className,
}: GroupPostDetailProps) {
  return (
    <section className={cn("w-full bg-background", className)}>
      <div className="mx-auto w-full max-w-4xl px-4 py-4 pb-28 sm:px-6 sm:pb-32">
          <GroupPostSummary
            post={post}
          />

          <div className="space-y-5">
            <Separator className="bg-border" />
            {commentItems.length > 0 ? (
              <GroupCommentsThread
                commentItems={commentItems}
                postAuthorId={post.author_id}
                className="gap-4"
              />
            ) : (
              <GroupCommentsEmptyState />
            )}
          </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
        <div className="mx-auto w-full max-w-4xl px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6">
          <GroupCommentComposer />
        </div>
      </div>
    </section>
  )
}
