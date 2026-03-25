# Main Footer

## Purpose

`MainFooter`는 앱 메인 화면에서만 쓰는 하단 footer-like UI를 포함한 화면 shell block이다.

이 block은 전역 footer를 앱 전체에 붙이는 대신, 메인 화면 안에서만 본문과 하단 바를 함께 렌더링한다.

## Data Contract

- 입력 데이터: `MainFooterData`
- 하단 탭 정보: `MainFooterTab[]`

현재 기준:

- 하단 바는 메인 화면 내부 구조의 일부로 본다.
- 탭 badge, indicator 같은 파생 표현은 block data에서 직접 제어한다.
- 본문은 비워 두고, 배경과 하단 바 위치만 먼저 확인한다.

## Rendering Rules

- 화면은 모바일 앱 메인처럼 보이는 단일 shell로 렌더링한다.
- 본문은 별도 콘텐츠 없이 비워 둔 background 영역으로 유지한다.
- 하단 바는 흰색 rounded surface와 옅은 shadow를 사용해 mock image와 비슷한 인상을 만든다.
- 하단 바는 전역 fixed footer가 아니라 block 내부 하단 영역에 붙은 UI로 취급한다.
- 현재 활성 탭은 진한 색으로, 나머지 탭은 muted 톤으로 구분한다.

## Files

- `index.tsx`: 메인 화면 shell + 하단 footer-like navigation
- `mock.ts`: 기본 탭 데이터
- `mock.scenarios.ts`: 탭 상태 실험용 시나리오
- `types.ts`: 메인 footer block 타입
- `README.md`: block 목적과 로컬 규칙
