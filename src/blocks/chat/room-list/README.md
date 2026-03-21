# Chat Room List

## Purpose

`room-list` block은 채팅방 목록 화면 전체를 담당한다.

## Rule

- block mock은 `src/blocks/chat/mock.ts`의 raw data를 source of truth로 사용한다.
- 목록 아이템은 `room-card` block projection을 그대로 재사용한다.
- 목록 정렬은 최신 메시지의 `created_at` 내림차순을 기본으로 둔다.
- scenario는 raw data override 후 목록 projection을 다시 계산하는 방식으로 유지한다.
