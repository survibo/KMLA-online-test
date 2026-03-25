import type { MainFooterData } from "./types"
import { createMainFooterData, createMainFooterTabs } from "./mock"

export type MainFooterScenario = {
  id: string
  label: string
  description: string
  data: MainFooterData
}

export const mainFooterDefaultScenario: MainFooterScenario = {
  id: "default",
  label: "기본",
  description: "홈 탭이 활성화된 메인 화면 기본 상태",
  data: createMainFooterData(),
}

export const mainFooterChatScenario: MainFooterScenario = {
  id: "chat-active",
  label: "채팅 강조",
  description: "채팅 탭 badge가 보이고 채팅이 현재 탭인 상태",
  data: createMainFooterData({
    activeTabId: "chat",
    tabs: createMainFooterTabs("chat", {
      chat: { badgeCount: 4 },
      feed: { hasIndicator: true },
    }),
  }),
}

export const mainFooterProfileScenario: MainFooterScenario = {
  id: "profile-active",
  label: "프로필 탭",
  description: "메인 shell은 그대로 두고 프로필 탭 활성 상태만 확인하는 시나리오",
  data: createMainFooterData({
    activeTabId: "profile",
    tabs: createMainFooterTabs("profile", {
      chat: { badgeCount: 1 },
      feed: { hasIndicator: false },
    }),
  }),
}

export const mainFooterScenarios: MainFooterScenario[] = [
  mainFooterDefaultScenario,
  mainFooterChatScenario,
  mainFooterProfileScenario,
]

export const activeMainFooterScenarioIndex = 0 // 0 ~ 2, total 3 scenarios

export const activeMainFooterScenario =
  mainFooterScenarios[activeMainFooterScenarioIndex]
