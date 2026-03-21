# Chat Message

## Purpose

`message` block은 채팅 화면 전체가 아니라 메시지 박스 배열 영역만 표현하는 block이다.

## Rule

- 기본 규칙은 `chat` 도메인 공용 타입과 UI 조각을 따른다.
- 다만 이 block은 긴 대화 데이터 확인이 중요하므로 mock 길이에 한해 예외를 둔다.
- 즉, `message/mock.ts`는 다른 block보다 데이터가 길어져도 괜찮다.
- 이 예외는 `message` block 전용 규칙이며 전역 mock 규칙을 바꾸지 않는다.
- 상단 헤더와 하단 입력창은 이 block 책임에 포함하지 않는다.
- 시간 문자열은 raw ISO를 직접 노출하지 않고 formatter로 보여준다.
