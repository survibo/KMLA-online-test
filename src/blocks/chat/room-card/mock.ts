import {
  baseChatCurrentUserId,
  baseChatRoomWithChoiId,
  baseChatRoomWithJeonId,
  baseChatMockData,
  createChatMockData,
  getChatRoomById,
  getChatRoomUnreadState,
  getLatestChatRoomMessage,
  type ChatMockData,
} from "@/blocks/chat/mock"

import type { ChatRoomCardRoom } from "./types"

export const baseChatRoomCardCurrentUserId = baseChatCurrentUserId
export const baseChatRoomCardDefaultRoomId = baseChatRoomWithChoiId
export const baseChatRoomCardReadRoomId = baseChatRoomWithJeonId

export function createChatRoomCardRoomFromMockData(
  roomId: string,
  currentUserId = baseChatCurrentUserId,
  data: ChatMockData = baseChatMockData
): ChatRoomCardRoom {
  const room = getChatRoomById(roomId, data)

  return {
    ...room,
    has_unread: getChatRoomUnreadState(roomId, currentUserId, data),
    preview_message: getLatestChatRoomMessage(roomId, data),
  }
}

export const baseChatRoomCardRoom = createChatRoomCardRoomFromMockData(
  baseChatRoomCardDefaultRoomId
)

export function createChatRoomCardRoom(
  roomId = baseChatRoomCardDefaultRoomId,
  overrides: Partial<ChatMockData> = {},
  currentUserId = baseChatCurrentUserId
): ChatRoomCardRoom {
  const data = createChatMockData(overrides)

  return createChatRoomCardRoomFromMockData(roomId, currentUserId, data)
}
