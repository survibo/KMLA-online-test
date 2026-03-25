import { createMainHeaderData } from "./mock"
import type { MainHeaderData } from "./types"

export type MainHeaderScenario = {
  id: string
  label: string
  description: string
  data: MainHeaderData
}

export const mainHeaderDefaultScenario: MainHeaderScenario = {
  id: "default",
  label: "기본",
  description: "뒤로가기 아이콘과 제목만 있는 메인 헤더 기본 상태",
  data: createMainHeaderData(),
}

export const mainHeaderNoBackScenario: MainHeaderScenario = {
  id: "no-back",
  label: "뒤로가기 없음",
  description: "같은 헤더 톤을 유지하되 뒤로가기 아이콘만 숨긴 상태",
  data: createMainHeaderData({
    showBackButton: false,
  }),
}

export const mainHeaderAlternateScenario: MainHeaderScenario = {
  id: "alternate",
  label: "다른 제목",
  description: "조금 더 긴 제목 길이를 확인하는 메인 헤더 상태",
  data: createMainHeaderData({
    title: "학생자치기구 공지",
  }),
}

export const mainHeaderScenarios: MainHeaderScenario[] = [
  mainHeaderDefaultScenario,
  mainHeaderNoBackScenario,
  mainHeaderAlternateScenario,
]

export const activeMainHeaderScenarioIndex = 0 // 0 ~ 2, total 3 scenarios

export const activeMainHeaderScenario =
  mainHeaderScenarios[activeMainHeaderScenarioIndex]
