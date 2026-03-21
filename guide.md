# Project Guide

## Purpose

이 문서는 프로젝트 전체의 작업 흐름과 일관성 기준을 위한 공통 가이드다.

세부 기능 규칙은 여기에 계속 누적하지 않는다. 공통 가이드는 얇게 유지하고, 기능별 세부 합의는 해당 기능 가까이에 둔다.

## What Belongs Here

이 문서에는 아래 내용만 둔다.

- 프로젝트 전반의 작업 원칙
- 파일 구조 규칙
- 타입, mock, 문서화 기준
- UI 구성 기준
- 스키마 변경 시 따라야 할 절차
- block 수정 시 공통 점검 항목

이 문서에 넣지 않을 것:

- 특정 기능 하나에만 적용되는 상세 정책
- 특정 화면의 임시 의사결정
- 일회성 메모

그런 내용은 별도 문서로 분리한다.

## Documentation Rule

작업 중 합의가 생기면 가장 가까운 위치의 md 파일에 남긴다.

권장 위치:

- block 전용 규칙: `src/blocks/<block-name>/README.md`
- 여러 block이 공유하는 도메인 규칙: 루트의 별도 md 파일
- 전체 프로젝트 공통 규칙: `guide.md`
- 데이터 구조 기준: `scheme.md`

판단 기준:

- 여러 기능에 공통이면 `guide.md`
- 특정 도메인에만 해당하면 도메인 문서
- 특정 block에만 해당하면 해당 block의 `README.md`

## Working Style

작업은 아래 순서를 기본으로 한다.

1. 현재 코드와 관련 문서를 먼저 본다.
2. 스키마나 구조 기준이 있으면 그것을 우선한다.
3. 공통 컴포넌트로 해결 가능한지 먼저 본다.
4. 서비스 고유 표현이면 block 단위로 구현한다.
5. 변경 후에는 타입, mock, 문서까지 함께 맞춘다.

즉, 화면만 고치고 끝내지 않는다.

## Schema First

데이터 shape는 가능하면 `scheme.md`를 우선 기준으로 삼는다.

원칙:

- 컬럼명은 스키마와 최대한 맞춘다.
- 시간 필드는 `created_at`, `updated_at`, `deleted_at` 같은 이름을 유지한다.
- 스키마에 있는 캐시 컬럼은 프론트에서도 그 의미를 존중한다.
- 화면 전용 계산값은 raw data와 분리해서 다룬다.

`dbdiagram`으로 표현하기 어려운 제약은 `scheme.md`의 `Note`에 남기고, 실제 구현 단계에서 보완한다.

## TypeScript Rule

TypeScript는 유지한다.

이유:

- 스키마 기준 구조와 UI 전용 계산값을 구분하기 쉽다.
- mock data와 실제 응답 구조의 차이를 빨리 발견할 수 있다.
- 리팩터링 시 깨지는 지점을 빨리 찾을 수 있다.

권장 방향:

- schema-aligned type
- API DTO type
- UI ViewModel

처음부터 완벽히 분리하지 않아도 되지만, 새 기능을 만들수록 이 방향으로 가까워지게 한다.

## Data and Mock Rule

mock data는 단순 샘플이 아니라 실제 응답을 흉내 내는 테스트 데이터로 본다.

원칙:

- 실제 API 응답처럼 작성한다.
- 가능한 한 id를 포함한다.
- 정렬 기준이 필요한 필드는 mock에도 넣는다.
- 스키마에 있는 캐시 컬럼은 mock에도 반영한다.
- 화면 로직이 그 mock만 보고도 실제 흐름을 검증할 수 있어야 한다.

mock을 점검해야 하는 경우:

- 스키마가 바뀐 경우
- 타입이 바뀐 경우
- 렌더링 로직이 새 필드를 기대하는 경우

## UI Rule

`shadcn/ui`는 공통 인터랙션 레이어로 사용한다.

우선 검토 대상:

- `Button`
- `Avatar`
- `Card`
- `DropdownMenu`
- `Dialog`
- `Drawer`
- `Tabs`
- `Popover`
- `Separator`
- `Input`
- `Textarea`

직접 구현이 더 적절한 경우:

- 서비스 고유 레이아웃
- block 중심 화면
- 표현 자체가 중요한 UI

기준은 단순하다.

- 범용 상호작용은 `shadcn/ui`
- 서비스 표현은 block 조합

## Block Structure

block은 아래 구조를 기본으로 한다.

```text
src/blocks/<block-name>/
  index.tsx
  mock.ts
  types.ts
  README.md
```

역할:

- `index.tsx`: block 본체
- `mock.ts`: 샘플 데이터
- `types.ts`: block 전용 타입
- `README.md`: 이 block의 규칙, 사용법, 결정사항

공통 타입이나 공용 조각은 block 바깥으로 분리할 수 있다.

## Block Change Rule

`src/blocks` 아래 파일을 수정할 때는, 관련된 아래 항목을 항상 함께 점검한다.

- `types.ts`
- `mock.ts`
- `README.md`

의미는 다음과 같다.

- 타입이 현재 props와 데이터 shape를 아직 설명하는가
- mock이 새 구조와 새 규칙을 반영하는가
- README가 현재 동작과 결정사항을 설명하는가

즉, block 변경은 `index.tsx`만 수정하고 끝내지 않는다.

## When A Decision Is Local

작업 중 특정 기능에만 적용되는 규칙이 생기면 이 문서에 추가하지 말고 해당 위치에 문서화한다.

예:

- 댓글 depth 처리 방식
- 특정 카드의 이미지 정책
- 특정 block의 카운트 계산 방식
- 특정 mock의 데이터 의미

이런 내용은 해당 block의 `README.md`에 적는다.

필요하면 루트에 별도 문서를 만든다.

예:

- `community-guidelines.md`
- `chat-guidelines.md`
- `data-contracts.md`

## When Updating Schema

`scheme.md`가 바뀌면 아래를 같이 점검한다.

1. 공통 타입
2. block 타입
3. mock data
4. 렌더링 로직
5. 관련 문서

스키마 변경은 문서 한 파일 수정으로 끝내지 않는다.

## Before Finishing Work

가능하면 아래를 확인한다.

- build가 통과하는가
- 타입과 mock이 맞는가
- 문서가 현재 합의와 어긋나지 않는가
- block을 수정했다면 관련 `types.ts`, `mock.ts`, `README.md`를 확인했는가

## Summary

이 문서는 전체 흐름을 위한 공통 가이드다.

세부 정책은 작업할 때마다 관련 위치의 md 파일에 남긴다. 앞으로 새로운 기능 규칙을 추가할 때는 먼저 이렇게 판단한다.

- 이 규칙이 프로젝트 전반에 공통인가
- 아니면 특정 도메인, 특정 block에만 해당하는가

후자라면 `guide.md`가 아니라 해당 기능 문서에 적는다.
