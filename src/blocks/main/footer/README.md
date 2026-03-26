# Main Footer

## Purpose

`MainFooter`는 앱 메인 화면 shell 안에서만 쓰는 하단 footer-like navigation block이다.

이 block은 전역 footer를 앱 전체에 붙이는 대신, 메인 shell 안에서 조합되는 하단 bar 표현을 담당한다.

## Data Contract

- 입력 데이터: `MainFooterData`
- 하단 탭 정보: `MainFooterTab[]`

현재 기준:

- 하단 바는 메인 화면 내부 구조의 일부로 본다.
- 탭 badge, indicator 같은 파생 표현은 block data에서 직접 제어한다.
- 단독 preview block으로 다루지 않고, shell 조합 안에서만 사용한다.

## Rendering Rules

- 같은 background surface 위에 border와 spacing만 두고 붙는 하단 navigation으로 취급한다.
- 현재 활성 탭은 진한 색으로, 나머지 탭은 muted 톤으로 구분한다.

## Files

- `index.tsx`: 하단 footer-like navigation
- `mock.ts`: 기본 탭 데이터
- `types.ts`: 메인 footer block 타입
- `README.md`: block 목적과 로컬 규칙
