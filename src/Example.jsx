import {
  defaultGroupPostDetailScenario,
} from "@/blocks/group-post-detail/mock.scenarios"
import { GroupPostDetail } from "@/blocks/group-post-detail"

export function Example() {
  return (
    <GroupPostDetail
      post={defaultGroupPostDetailScenario.post}
      commentItems={defaultGroupPostDetailScenario.commentItems}
    />
  )
}
