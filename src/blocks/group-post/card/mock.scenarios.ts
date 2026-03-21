import {
  baseGroupPostMockData,
  baseGroupPostPrimaryPostId,
  createGroupPostMockData,
} from "@/blocks/group-post/mock"

import type { GroupPostCardData } from "./types"
import {
  createGroupPostCardPost,
  createGroupPostCardPostFromMockData,
} from "./mock"

export type GroupPostCardScenario = {
  id: string
  label: string
  description: string
  post: GroupPostCardData
}

const busyDiscussionMockData = createGroupPostMockData({
  posts: baseGroupPostMockData.posts.map((post) =>
    post.id === baseGroupPostPrimaryPostId
      ? { ...post, comment_count: 2, reaction_count: 8 }
      : post
  ),
  post_images: [],
  post_comments: [
    ...baseGroupPostMockData.post_comments,
    {
      id: "6c8155aa-4350-4f8a-9f69-5a97828674cf",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "0859f193-a0f4-4eeb-b4dc-a3bc69980c49",
      parent_id: null,
      content: "현장 수령 가능한 날짜도 미리 알려 주시면 좋겠습니다.",
      reply_count: 1,
      created_at: "2026-03-20T15:21:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "ad67b8de-47e8-4d6d-9fb2-6dc60bc8c136",
      post_id: baseGroupPostPrimaryPostId,
      author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      parent_id: "6c8155aa-4350-4f8a-9f69-5a97828674cf",
      content: "수령 일정은 이번 주 금요일 공지로 따로 올리겠습니다.",
      reply_count: 0,
      created_at: "2026-03-20T15:24:00+09:00",
      updated_at: null,
      deleted_at: null,
    },
  ],
  post_reactions: [
    ...baseGroupPostMockData.post_reactions,
    {
      id: "1706dedb-3c52-4d76-b47f-d05059bca652",
      post_id: baseGroupPostPrimaryPostId,
      user_id: "c2ecfe2d-e2e2-4808-ac65-f2014cf03efa",
      type: "laugh",
      created_at: "2026-03-20T15:22:00+09:00",
    },
    {
      id: "cca1f973-7eca-41d5-ac1e-6a3d084ccf46",
      post_id: baseGroupPostPrimaryPostId,
      user_id: "890aa09e-7a2f-4963-bd48-e7214efd2a0d",
      type: "wow",
      created_at: "2026-03-20T15:23:00+09:00",
    },
  ],
})

export const groupPostCardWithImageScenario: GroupPostCardScenario = {
  id: "with-image",
  label: "이미지 있음",
  description: "대표 이미지와 최상위 댓글 1개가 함께 있는 기본 카드 상태",
  post: createGroupPostCardPost(),
}

export const groupPostCardBusyDiscussionScenario: GroupPostCardScenario = {
  id: "busy-discussion",
  label: "댓글 여러 개",
  description: "최상위 댓글 여러 개와 답글이 길게 이어지는 토론형 카드 상태",
  post: createGroupPostCardPostFromMockData(
    baseGroupPostPrimaryPostId,
    busyDiscussionMockData
  ),
}

export const groupPostCardWithoutCommentsScenario: GroupPostCardScenario = {
  id: "without-comments",
  label: "댓글 없음",
  description: "최신 댓글 미리보기 없이 카드만 보이는 상태",
  post: createGroupPostCardPost(baseGroupPostPrimaryPostId, {
    posts: baseGroupPostMockData.posts.map((post) =>
      post.id === baseGroupPostPrimaryPostId
        ? { ...post, comment_count: 0 }
        : post
    ),
    post_comments: baseGroupPostMockData.post_comments.filter(
      (comment) => comment.post_id !== baseGroupPostPrimaryPostId
    ),
  }),
}

export const groupPostCardWithoutImageWithoutCommentsScenario: GroupPostCardScenario = {
  id: "without-image-without-comments",
  label: "이미지도 없고 댓글도 없음",
  description: "대표 이미지와 최신 댓글 미리보기 없이 텍스트만 남는 카드 상태",
  post: createGroupPostCardPost(baseGroupPostPrimaryPostId, {
    posts: baseGroupPostMockData.posts.map((post) =>
      post.id === baseGroupPostPrimaryPostId
        ? { ...post, comment_count: 0 }
        : post
    ),
    post_images: [],
    post_comments: baseGroupPostMockData.post_comments.filter(
      (comment) => comment.post_id !== baseGroupPostPrimaryPostId
    ),
  }),
}

export const groupPostCardScenarios: GroupPostCardScenario[] = [
  groupPostCardWithImageScenario,
  groupPostCardBusyDiscussionScenario,
  groupPostCardWithoutCommentsScenario,
  groupPostCardWithoutImageWithoutCommentsScenario,
]

export const activeGroupPostCardScenarioIndex = 0 // 0 ~ 3, total 4 scenarios

export const activeGroupPostCardScenario =
  groupPostCardScenarios[activeGroupPostCardScenarioIndex]
