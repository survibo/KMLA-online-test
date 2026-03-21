import type { ChatMessage } from "@/blocks/chat/types"

export type ChatMessageThreadData = {
  current_user_id: string
  room_name: string
  messages: ChatMessage[]
}
