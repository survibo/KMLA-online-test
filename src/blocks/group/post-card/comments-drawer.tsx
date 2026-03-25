import { memo } from "react"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"
import {
  GroupCommentComposer,
  GroupCommentsEmptyState,
  GroupCommentsThread,
} from "@/blocks/group/shared-comments"
import type { GroupComment } from "@/blocks/group/types"

type GroupPostCommentsDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  commentItems?: GroupComment[]
  postAuthorId?: string
}

export const GroupPostCommentsDrawer = memo(function GroupPostCommentsDrawer({
  open,
  onOpenChange,
  commentItems = [],
  postAuthorId,
}: GroupPostCommentsDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto flex w-full flex-col rounded-t-[1.75rem] bg-background data-[vaul-drawer-direction=bottom]:min-h-[60vh] data-[vaul-drawer-direction=bottom]:max-h-[90vh]">
        <DrawerHeader className="px-4 pb-3 pt-5 text-left sm:px-6">
          <DrawerTitle className="text-lg font-semibold text-text-strong">
            댓글
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            게시글의 댓글과 답글을 확인하고 새 댓글을 작성할 수 있는 패널
          </DrawerDescription>
        </DrawerHeader>

        <Separator className="bg-border" />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-7 pt-4 sm:px-6 sm:pb-8">
          {commentItems.length > 0 ? (
            <GroupCommentsThread
              commentItems={commentItems}
              postAuthorId={postAuthorId}
            />
          ) : (
            <GroupCommentsEmptyState />
          )}
        </div>

        <div className="border-t border-border bg-background px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6">
          <GroupCommentComposer />
        </div>
      </DrawerContent>
    </Drawer>
  )
})
