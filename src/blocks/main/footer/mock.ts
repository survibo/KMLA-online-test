import type { MainFooterData, MainFooterTab, MainFooterTabId } from "./types"

export const baseMainFooterTabs: MainFooterTab[] = [
  { id: "home", label: "홈" },
  { id: "cube", label: "보관함" },
  { id: "group", label: "게시물", hasIndicator: true },
  { id: "chat", label: "채팅", badgeCount: 2 },
  { id: "profile", label: "프로필" },
]

export const baseMainFooterData: MainFooterData = {
  tabs: baseMainFooterTabs,
  activeTabId: "home",
}

export function createMainFooterData(
  overrides: Partial<MainFooterData> = {}
): MainFooterData {
  return {
    ...baseMainFooterData,
    ...overrides,
    tabs: overrides.tabs ?? baseMainFooterTabs,
    activeTabId: overrides.activeTabId ?? baseMainFooterData.activeTabId,
  }
}

export function createMainFooterTabs(
  activeTabId: MainFooterTabId,
  overridesById: Partial<Record<MainFooterTabId, Partial<MainFooterTab>>> = {}
) {
  return baseMainFooterTabs
    .map((tab) => ({
      ...tab,
      ...(overridesById[tab.id] ?? {}),
      id: tab.id,
    }))
    .map((tab) => ({
      ...tab,
      hasIndicator: tab.id === activeTabId ? false : tab.hasIndicator,
    }))
}
