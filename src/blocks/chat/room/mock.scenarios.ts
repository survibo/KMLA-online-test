import type { ChatRoomScreenData } from "./types"
import {
  baseChatRoomScreenData,
  createChatRoomScreenData,
} from "./mock"

export type ChatRoomScenario = {
  id: string
  label: string
  description: string
  data: ChatRoomScreenData
}

export const chatRoomDefaultScenario: ChatRoomScenario = {
  id: "default",
  label: "기본",
  description: "메시지 block을 재사용한 기본 채팅방 화면",
  data: createChatRoomScreenData(),
}

export const chatRoomRecentScenario: ChatRoomScenario = {
  id: "recent",
  label: "최근만",
  description: "최신 메시지 구간만 남겨 room 화면 밀도를 확인하는 상태",
  data: createChatRoomScreenData({
    messages: baseChatRoomScreenData.messages.slice(-24),
  }),
}

export const chatRoomScenarios: ChatRoomScenario[] = [
  chatRoomDefaultScenario,
  chatRoomRecentScenario,
]

export const activeChatRoomScenarioIndex = 0 // 0 ~ 1, total 2 scenarios

export const activeChatRoomScenario =
  chatRoomScenarios[activeChatRoomScenarioIndex]
