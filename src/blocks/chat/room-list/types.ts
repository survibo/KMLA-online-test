import type { ChatRoomCardRoom } from "@/blocks/chat/room-card/types"

export type ChatRoomListData = {
  title: string
  subtitle: string
  current_user_id: string
  rooms: ChatRoomCardRoom[]
}
