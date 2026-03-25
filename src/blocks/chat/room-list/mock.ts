import {
  baseChatCurrentUserId,
  baseChatMockData,
  createChatMockData,
  type ChatMockData,
} from "@/blocks/chat/mock"
import { createChatRoomCardRoomFromMockData } from "@/blocks/chat/room-card/mock"
import { compareIsoDesc } from "@/lib/datetime"

import type { ChatRoomListData } from "./types"

export const baseChatRoomListTitle = "채팅"
export const baseChatRoomListSubtitle = "최근기록"

export function createChatRoomListDataFromMockData(
  data: ChatMockData = baseChatMockData,
  currentUserId = baseChatCurrentUserId
): ChatRoomListData {
  const rooms = data.rooms
    .map((room) => createChatRoomCardRoomFromMockData(room.id, currentUserId, data))
    .sort((a, b) => {
      const aCreatedAt = a.preview_message?.created_at ?? a.created_at
      const bCreatedAt = b.preview_message?.created_at ?? b.created_at

      return compareIsoDesc(aCreatedAt, bCreatedAt)
    })

  return {
    title: baseChatRoomListTitle,
    subtitle: baseChatRoomListSubtitle,
    current_user_id: currentUserId,
    rooms,
  }
}

export const baseChatRoomListData = createChatRoomListDataFromMockData()

export function createChatRoomListData(
  overrides: Partial<ChatMockData> = {},
  currentUserId = baseChatCurrentUserId
): ChatRoomListData {
  const data = createChatMockData(overrides)

  return createChatRoomListDataFromMockData(data, currentUserId)
}
