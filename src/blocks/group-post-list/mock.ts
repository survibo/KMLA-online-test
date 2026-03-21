import { sampleGroupPostCardPost } from "@/blocks/group-post-card/mock"
import type { GroupPostListGroup } from "./types"

function clonePostForList(id: string, createdAt: string) {
  return {
    ...sampleGroupPostCardPost,
    id,
    created_at: createdAt,
    author: { ...sampleGroupPostCardPost.author },
    post_images: sampleGroupPostCardPost.post_images?.map((image) => ({
      ...image,
      id: `${image.id}-${id}`,
      post_id: id,
    })),
    post_reactions: sampleGroupPostCardPost.post_reactions?.map((reaction) => ({
      ...reaction,
      id: `${reaction.id}-${id}`,
      post_id: id,
    })),
  }
}

export const sampleGroupPostListGroup: GroupPostListGroup = {
  id: "6f6e9a30-6078-4f80-99e7-42f6d4f6b0c7",
  name: "행정위원회",
  description: "기숙사 운영과 생활 공지를 관리하는 공식 그룹",
  is_official: true,
  is_personal: false,
  created_at: "2026-03-01T09:00:00+09:00",
  posts: [
    clonePostForList("24ba4ff5-0b6d-49cd-8de7-93f7659b92eb", "2026-03-21T00:03:00+09:00"),
    clonePostForList("712c98eb-e5f8-4f0f-a7df-0fca91e277cb", "2026-03-20T14:55:00+09:00"),
    clonePostForList("0f29f5de-28c0-46be-9274-f8ba70e8e428", "2026-03-19T10:15:00+09:00"),
    clonePostForList("d969b2ea-c27a-43aa-b809-fcb67948320a", "2026-03-18T08:30:00+09:00"),
  ],
}
