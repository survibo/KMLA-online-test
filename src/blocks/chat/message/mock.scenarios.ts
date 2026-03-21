import type { ChatMessageThreadData } from "./types"
import {
  baseChatMessageThreadData,
  createChatMessageThreadData,
} from "./mock"

export type ChatMessageScenario = {
  id: string
  label: string
  description: string
  data: ChatMessageThreadData
}

export const chatMessageDefaultScenario: ChatMessageScenario = {
  id: "default",
  label: "기본",
  description: "오전 시간대에 길게 이어지는 현실적인 1:1 대화 흐름",
  data: createChatMessageThreadData(),
}

export const chatMessageRecentOnlyScenario: ChatMessageScenario = {
  id: "recent-only",
  label: "최근만",
  description: "최근 메시지 몇 개만 남겼을 때 간격과 버블 밀도를 확인하는 상태",
  data: createChatMessageThreadData({
    messages: baseChatMessageThreadData.messages.slice(-6),
  }),
}

export const chatMessageScenarios: ChatMessageScenario[] = [
  chatMessageDefaultScenario,
  chatMessageRecentOnlyScenario,
]

export const activeChatMessageScenarioIndex = 0 // 0 ~ 1, total 2 scenarios

export const activeChatMessageScenario =
  chatMessageScenarios[activeChatMessageScenarioIndex]
