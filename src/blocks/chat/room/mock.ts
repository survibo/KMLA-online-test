import {
  baseChatMessageThreadData,
  createChatMessageThreadData,
} from "@/blocks/chat/message/mock"

import type { ChatRoomScreenData } from "./types"

function getParticipant(data: typeof baseChatMessageThreadData) {
  return (
    data.messages.find((message) => message.sender_id !== data.current_user_id)?.sender ??
    data.messages[0]?.sender
  )
}

export const baseChatRoomScreenData: ChatRoomScreenData = {
  ...baseChatMessageThreadData,
  participant: getParticipant(baseChatMessageThreadData)!,
}

export function createChatRoomScreenData(
  overrides: Partial<ChatRoomScreenData> = {}
): ChatRoomScreenData {
  const messageData = createChatMessageThreadData(overrides)

  return {
    ...messageData,
    ...overrides,
    participant: overrides.participant ?? getParticipant(messageData)!,
  }
}
