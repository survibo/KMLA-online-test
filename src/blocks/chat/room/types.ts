import type { ChatMessageThreadData } from "@/blocks/chat/message/types"
import type { ChatUser } from "@/blocks/chat/types"

export type ChatRoomScreenData = ChatMessageThreadData & {
  participant: ChatUser
}
