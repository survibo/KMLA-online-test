import type { CommunityPostCardData } from "./types"

const POST_ID = "dfb5a0a2-5ef8-4be2-87d5-3ebc4a2370a1"

export const baseCommunityPostCardPost: CommunityPostCardData = {
  id: POST_ID,
  group_id: "c108d2a4-1f4d-4db5-bd75-5b413d4e6a29",
  author_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
  author: {
    id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
    name: "28기 이주형",
    img: null,
  },
  created_at: "2026-03-20T14:55:00+09:00",
  updated_at: null,
  deleted_at: null,
  title: "민사관 의류장 납품 안내",
  content:
    "안녕하세요. 38대 학생자치회입니다.\n의류장 비용 납품 관련 안내드립니다.",
  comment_count: 1,
  reaction_count: 3,
  post_images: [
    {
      id: "f29e9590-8e2c-4758-b0a2-67d9e413bb11",
      post_id: POST_ID,
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
      sort_order: 0,
      alt: "흰 반팔 티셔츠 전면 사진",
      width: 1200,
      height: 1600,
      created_at: "2026-03-20T14:55:00+09:00",
    },
  ],
  post_reactions: [
    {
      id: "22b4f681-bde1-4d9b-b655-b08dc3a728d6",
      post_id: POST_ID,
      user_id: "1d41df50-5d98-4e37-b12e-e9d830f04f34",
      type: "like",
      created_at: "2026-03-20T15:00:00+09:00",
    },
    {
      id: "90d828c1-cd3b-45ae-b793-d544c6db63da",
      post_id: POST_ID,
      user_id: "fe40d832-dab0-48fd-82ea-5e28d8d2ff67",
      type: "love",
      created_at: "2026-03-20T15:01:00+09:00",
    },
    {
      id: "87ec1b2d-7be0-4f06-9540-7b8d7719617d",
      post_id: POST_ID,
      user_id: "77709928-52dc-4f5f-ae81-dc18edb641e6",
      type: "like",
      created_at: "2026-03-20T15:03:00+09:00",
    },
  ],
}

export function createCommunityPostCardPost(
  overrides: Partial<CommunityPostCardData> = {}
): CommunityPostCardData {
  return {
    ...baseCommunityPostCardPost,
    ...overrides,
    author: { ...(overrides.author ?? baseCommunityPostCardPost.author) },
    post_images: (overrides.post_images ?? baseCommunityPostCardPost.post_images)?.map(
      (image) => ({ ...image })
    ),
    post_reactions: (
      overrides.post_reactions ?? baseCommunityPostCardPost.post_reactions
    )?.map((reaction) => ({ ...reaction })),
  }
}

export const sampleCommunityPostCardPost = createCommunityPostCardPost()
