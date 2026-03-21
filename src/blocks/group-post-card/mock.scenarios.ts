import type { GroupPostCardData } from "./types"
import { createGroupPostCardPost } from "./mock"

export type GroupPostCardScenario = {
  id: string
  label: string
  description: string
  post: GroupPostCardData
}

export const groupPostCardScenarios: GroupPostCardScenario[] = [
  {
    id: "with-image",
    label: "이미지 있음",
    description: "대표 이미지가 포함된 기본 목록 카드 상태",
    post: createGroupPostCardPost({
      id: "group-post-card-with-image",
      reaction_count: 3,
      comment_count: 1,
    }),
  },
  {
    id: "without-image",
    label: "이미지 없음",
    description: "텍스트만 있는 목록 카드 레이아웃 확인용 상태",
    post: createGroupPostCardPost({
      id: "group-post-card-no-image",
      reaction_count: 7,
      comment_count: 4,
      post_images: [],
    }),
  },
]

export const groupPostCardScenarioIndex = 1

export const sampleGroupPostCardScenario =
  groupPostCardScenarios[groupPostCardScenarioIndex]
