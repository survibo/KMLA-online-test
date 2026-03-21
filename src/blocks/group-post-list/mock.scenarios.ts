import type { GroupPostListGroup } from "./types"
import {
  createGroupPostListGroup,
  createGroupPostListPostFromCard,
} from "./mock"

export type GroupPostListScenario = {
  id: string
  label: string
  description: string
  group: GroupPostListGroup
}

export const groupPostListDefaultScenario: GroupPostListScenario = {
  id: "default",
  label: "기본",
  description: "같은 카드 데이터를 여러 개 쌓아 보는 기본 목록 상태",
  group: createGroupPostListGroup(),
}

export const groupPostListSparseScenario: GroupPostListScenario = {
  id: "sparse",
  label: "게시글 적음",
  description: "게시글 수가 적은 목록 밀도 확인용 상태",
  group: createGroupPostListGroup({
    posts: [
      createGroupPostListPostFromCard(
        "24ba4ff5-0b6d-49cd-8de7-93f7659b92eb",
        "2026-03-21T00:03:00+09:00"
      ),
      createGroupPostListPostFromCard(
        "712c98eb-e5f8-4f0f-a7df-0fca91e277cb",
        "2026-03-20T14:55:00+09:00"
      ),
    ],
  }),
}

export const groupPostListScenarios: GroupPostListScenario[] = [
  groupPostListDefaultScenario,
  groupPostListSparseScenario,
]

export const activeGroupPostListScenarioIndex = 0 // 0 ~ 1, total 2 scenarios

export const activeGroupPostListScenario =
  groupPostListScenarios[activeGroupPostListScenarioIndex]
