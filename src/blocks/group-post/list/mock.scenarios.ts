import {
  baseGroupPostLatestPostId,
  baseGroupPostListGroupId,
  baseGroupPostMockData,
  baseGroupPostSecondPostId,
} from "@/blocks/group-post/mock"

import type { GroupPostListGroup } from "./types"
import {
  createGroupPostListGroup,
  createGroupPostListGroupFromMockData,
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
  description: "도메인 raw mock에서 최신 글 순으로 projection한 기본 목록 상태",
  group: createGroupPostListGroup(),
}

export const groupPostListSparseScenario: GroupPostListScenario = {
  id: "sparse",
  label: "게시글 적음",
  description: "게시글 수가 적은 목록 밀도를 확인하는 상태",
  group: createGroupPostListGroup(baseGroupPostListGroupId, {
    posts: baseGroupPostMockData.posts.filter(
      (post) =>
        post.group_id !== baseGroupPostListGroupId ||
        post.id === baseGroupPostLatestPostId ||
        post.id === baseGroupPostSecondPostId
    ),
  }),
}

export const groupPostListScenarios: GroupPostListScenario[] = [
  groupPostListDefaultScenario,
  groupPostListSparseScenario,
]

export const activeGroupPostListScenarioIndex = 0 // 0 ~ 1, total 2 scenarios

export const activeGroupPostListScenario =
  groupPostListScenarios[activeGroupPostListScenarioIndex]
