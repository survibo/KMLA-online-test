import {
  baseGroupPostMockData,
  baseGroupPostPrimaryPostId,
  createGroupPostMockData,
} from "@/blocks/group-post/mock"

import type {
  GroupPostDetailCommentData,
  GroupPostDetailData,
} from "./types"
import {
  createGroupPostDetailComments,
  createGroupPostDetailCommentsFromMockData,
  createGroupPostDetailPost,
  createGroupPostDetailPostFromMockData,
} from "./mock"

export type GroupPostDetailScenario = {
  id: string
  label: string
  description: string
  post: GroupPostDetailData
  commentItems: GroupPostDetailCommentData[]
}

const heavyDiscussionMockData = createGroupPostMockData({
  posts: baseGroupPostMockData.posts.map((post) =>
    post.id === baseGroupPostPrimaryPostId
      ? { ...post, comment_count: 2, reaction_count: 8 }
      : post
  ),
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

const missingCacheMockData = createGroupPostMockData({
  posts: baseGroupPostMockData.posts.map((post) =>
    post.id === baseGroupPostPrimaryPostId
      ? { ...post, comment_count: undefined, reaction_count: undefined }
      : post
  ),
  post_comments: baseGroupPostMockData.post_comments.map((comment) =>
    comment.post_id === baseGroupPostPrimaryPostId && comment.parent_id === null
      ? { ...comment, reply_count: undefined }
      : comment
  ),
})

export const groupPostDetailDefaultScenario: GroupPostDetailScenario = {
  id: "default",
  label: "기본",
  description: "현재 샘플과 동일한 기본 상세 상태",
  post: createGroupPostDetailPost(),
  commentItems: createGroupPostDetailComments(),
}

export const groupPostDetailNoImagesScenario: GroupPostDetailScenario = {
  id: "no-images",
  label: "이미지 없음",
  description: "텍스트만 있는 게시글 레이아웃 확인용",
  post: createGroupPostDetailPost(baseGroupPostPrimaryPostId, {
    posts: baseGroupPostMockData.posts.map((post) =>
      post.id === baseGroupPostPrimaryPostId
        ? {
            ...post,
            title: "학생회비 사용 내역 안내",
            content:
              "이번 달 학생회비 사용 내역을 정리했습니다.\n첨부 이미지는 없고 텍스트 흐름만 확인하는 시나리오입니다.",
          }
        : post
    ),
    post_images: [],
  }),
  commentItems: createGroupPostDetailComments(),
}

export const groupPostDetailHeavyDiscussionScenario: GroupPostDetailScenario = {
  id: "heavy-discussion",
  label: "댓글 많은 글",
  description: "최상위 댓글과 답글이 더 많은 상태를 보는 시나리오",
  post: createGroupPostDetailPostFromMockData(
    baseGroupPostPrimaryPostId,
    heavyDiscussionMockData
  ),
  commentItems: createGroupPostDetailCommentsFromMockData(
    baseGroupPostPrimaryPostId,
    heavyDiscussionMockData
  ),
}

export const groupPostDetailMissingCacheScenario: GroupPostDetailScenario = {
  id: "missing-cache-counts",
  label: "캐시 없음",
  description: "count 캐시 없이 fallback 렌더링을 확인하는 시나리오",
  post: createGroupPostDetailPostFromMockData(
    baseGroupPostPrimaryPostId,
    missingCacheMockData
  ),
  commentItems: createGroupPostDetailCommentsFromMockData(
    baseGroupPostPrimaryPostId,
    missingCacheMockData
  ),
}

export const groupPostDetailScenarios: GroupPostDetailScenario[] = [
  groupPostDetailDefaultScenario,
  groupPostDetailNoImagesScenario,
  groupPostDetailHeavyDiscussionScenario,
  groupPostDetailMissingCacheScenario,
]

export const activeGroupPostDetailScenarioIndex = 3 // 0 ~ 3, total 4 scenarios

export const activeGroupPostDetailScenario =
  groupPostDetailScenarios[activeGroupPostDetailScenarioIndex]
