# Profile

## Purpose

`Profile` block은 학생 프로필 상세 화면의 상단 hero, 아바타, 토글형 액션 행, 기본 연락처 정보를 한 번에 보여주는 UI 실험용 block이다.

첨부 시안의 `상단 여백 + 둥근 패널 + 겹치는 프로필 이미지` 구조를 기준으로 구현한다.

## Data Contract

- 입력 데이터: `ProfileData`
- raw user 데이터는 `users` 스키마 필드와 최대한 맞춘 `rawUser`에 둔다.
- `rawUser`는 `id`, `role`, `student_number`, `class_no`, `grade`, `gender`, `phone_number`, `img`, `birthday`, `description`, `status`, `room`, `created_at`를 포함하는 schema-aligned record를 유지한다.
- 실제 렌더링은 `displayName`, `bio`, `studentNumber`, `gradeLabel` 같은 projection 값을 사용한다.
- `displayName`은 raw user의 `name`을 그대로 사용하고, 6자리 학번과 기수는 `subtitle` 및 정보 탭 projection으로 분리한다.
- 탭 선택 상태는 현재 preview 기준으로 `data.activeAction`에서 시작한다.

## Rendering Rules

- 상단 hero는 비어 있는 여백이 아니라 은은한 gradient surface로 처리한다.
- 아바타는 패널 위로 겹치게 배치하고, 즐겨찾기 상태는 우하단 배지로만 표현한다.
- 액션 행은 `shadcn/ui`의 `Tabs`를 사용한다.
- 탭 내용은 `content.tsx` 안에서 `TabsContent`로 관리한다.
- 소개는 이름 바로 아래에 라벨 없이 노출한다.
- `대화하기`, `글 목록` 탭은 현재 단계에서 placeholder content를 사용한다.
- 프로필 본문과 이후 탭별 내용 영역은 `content.tsx`에서 분리 관리한다.
- hero gradient처럼 JSX에 두면 읽기 어려운 긴 표현은 `styles.css`로 분리할 수 있다.

## Files

- `index.tsx`: 프로필 상세 block 본체
- `content.tsx`: 프로필 본문과 이후 탭 내용 확장용 영역
- `mock.ts`: schema-aligned raw user와 projection helper
- `mock.scenarios.ts`: 기본 시나리오
- `types.ts`: raw data와 렌더링용 projection 타입
- `styles.css`: hero gradient처럼 긴 시각 표현 전용 스타일
