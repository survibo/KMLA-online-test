import type { ChatMessage, ChatRoom } from "@/blocks/chat/types"

export type ChatRoomCardRoom = ChatRoom & {
  has_unread: boolean
  preview_message: ChatMessage | null
}
