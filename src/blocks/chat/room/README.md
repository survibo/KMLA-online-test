# Chat Room

## Purpose

`room` block은 채팅방 전체 화면을 담당한다.

## Rule

- 대화 내용 자체는 `message` block을 재사용한다.
- `room/mock.ts`는 `message/mock.ts`를 source of truth로 사용한다.
- room은 상단 header와 하단 입력 shell만 책임지고, 메시지 배치 로직은 `message` block에 두는 것을 우선한다.
