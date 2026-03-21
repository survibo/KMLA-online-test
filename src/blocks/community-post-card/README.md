# Community Post Card

## Purpose

`CommunityPostCard`는 커뮤니티 게시글 목록에서 사용하는 요약형 block이다.

이 block은 게시글의 핵심 정보만 보여준다.

- 작성자
- 작성 시각
- 제목
- 본문 일부
- 대표 이미지 1장
- 반응 수와 댓글 수

## Data Contract

이 block은 `CommunityPost` 기반 데이터를 받는다.

현재 기준:

- `post.reaction_count`가 있으면 좋아요 수는 그 값을 우선 사용한다.
- `post.comment_count`가 있으면 댓글 수는 그 값을 사용한다.
- 대표 이미지는 `post_images` 중 첫 번째 항목을 사용한다.

권장:

- `post_images`는 mock/API에서 미리 `sort_order asc` 기준으로 정렬되어 있거나,
- 필요하면 렌더링 직전에 정렬해서 사용한다.

## What Stays Local To This Block

아래 규칙은 이 block 가까이에 유지한다.

- 목록 카드에서 보여줄 정보 범위
- 대표 이미지 선택 방식
- 목록 카드의 타이포 밀도
- 목록용 mock data shape

이 규칙들은 공통 가이드가 아니라 이 block 문서에서 관리한다.

## Files

- `index.tsx`: 목록 카드 본체
- `mock.ts`: 목록 카드용 샘플 데이터
- `types.ts`: 목록 카드용 타입 alias

## Example

```tsx
import { CommunityPostCard } from "@/blocks/community-post-card"
import { sampleCommunityPostCardPost } from "@/blocks/community-post-card/mock"

export function Example() {
  return <CommunityPostCard post={sampleCommunityPostCardPost} />
}
```
