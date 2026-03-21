import { CommunityPostDetail } from "@/blocks/community-post-detail";
import {
  sampleCommunityPostDetailComments,
  sampleCommunityPostDetailPost,
} from "@/blocks/community-post-detail/mock";

function App() {
  return (
    <CommunityPostDetail
      post={sampleCommunityPostDetailPost}
      commentItems={sampleCommunityPostDetailComments}
    />
  );
}

export default App;
