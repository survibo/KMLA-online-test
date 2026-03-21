import {
  baseGroupPostMockData,
  baseGroupPostPrimaryPostId,
  createGroupPostMockData,
  getGroupPostById,
  type GroupPostMockData,
} from "@/blocks/group-post/mock"

import type { GroupPostCardData } from "./types"

function countTopLevelComments(postComments: GroupPostCardData["post_comments"] = []) {
  return postComments.filter((comment) => comment.parent_id === null).length
}

function getCardPreviewComments(postComments: GroupPostCardData["post_comments"] = []) {
  const firstRootComment = postComments.find((comment) => comment.parent_id === null)

  if (!firstRootComment) return []

  return postComments.filter(
    (comment) =>
      comment.id === firstRootComment.id || comment.parent_id === firstRootComment.id
  )
}

export const baseGroupPostCardPost = createGroupPostCardPostFromMockData()

export function createGroupPostCardPostFromMockData(
  postId = baseGroupPostPrimaryPostId,
  data: GroupPostMockData = baseGroupPostMockData
): GroupPostCardData {
  const post = getGroupPostById(postId, data)

  return {
    ...post,
    post_images: post.post_images?.slice(0, 1),
    post_comments: getCardPreviewComments(post.post_comments),
    comment_count: countTopLevelComments(post.post_comments),
  }
}

export function createGroupPostCardPost(
  postId = baseGroupPostPrimaryPostId,
  overrides: Partial<GroupPostMockData> = {}
): GroupPostCardData {
  return createGroupPostCardPostFromMockData(
    postId,
    createGroupPostMockData(overrides)
  )
}
