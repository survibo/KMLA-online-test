# Main Header

## Purpose

`MainHeader`는 메인 화면 상단 헤더 영역을 담당하는 block이다.

`GroupPostList` 헤더의 상단 surface와 제목 배치를 참고하되, 검색창과 정렬 dropdown 없이 `뒤로가기 + 제목`만 보여주는 단순 헤더로 사용한다.

## Data Contract

- 입력 데이터: `MainHeaderData`
- 제목: 화면 제목
- 선택 옵션: 뒤로가기 아이콘 노출 여부

## Rendering Rules

- 헤더는 상단에 붙는 surface로 렌더링한다.
- `group/post-list` 헤더처럼 좌측에 뒤로가기 버튼, 옆에 제목을 배치한다.
- 검색창, 정렬 dropdown, 우측 액션 버튼은 현재 block에 넣지 않는다.
- 현재 단계에서는 클릭 동작 없이 UI 구조 확인을 우선한다.

## Files

- `index.tsx`: 메인 화면 상단 헤더
- `mock.ts`: 기본 제목 데이터
- `mock.scenarios.ts`: 제목 길이와 뒤로가기 노출 시나리오
- `types.ts`: 메인 헤더 block 타입
- `README.md`: block 목적과 로컬 규칙
