import type { CommunityPost } from "@/blocks/community-post-types"

export type CommunityPostListData = CommunityPost[]

export type CommunityPostListGroup = {
  id: string
  name: string
  description: string | null
  is_official: boolean
  is_personal: boolean
  created_at: string
  posts: CommunityPostListData
}
