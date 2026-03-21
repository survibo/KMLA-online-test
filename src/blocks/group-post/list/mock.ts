import {
  baseGroupPostListGroupId,
  createGroupPostMockData,
  getGroupPostListGroupById,
  type GroupPostMockData,
} from "@/blocks/group-post/mock"

import type { GroupPostListGroup } from "./types"

export const baseGroupPostListGroup =
  createGroupPostListGroupFromMockData(baseGroupPostListGroupId)
export const baseGroupPostListPosts = baseGroupPostListGroup.posts

export function createGroupPostListGroupFromMockData(
  groupId = baseGroupPostListGroupId,
  data?: GroupPostMockData
): GroupPostListGroup {
  return getGroupPostListGroupById(groupId, data)
}

export function createGroupPostListGroup(
  groupId = baseGroupPostListGroupId,
  overrides: Partial<GroupPostMockData> = {}
): GroupPostListGroup {
  return createGroupPostListGroupFromMockData(
    groupId,
    createGroupPostMockData(overrides)
  )
}
