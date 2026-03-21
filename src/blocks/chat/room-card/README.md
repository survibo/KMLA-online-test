# Chat Room Card

## Purpose

`room-card` block은 채팅 목록에서 한 개의 방을 보여주는 카드 단위다.

## Rule

- 데이터 shape는 `chat_rooms`, `chat_room_members`, `messages` 기준을 유지한다.
- block mock은 `src/blocks/chat/mock.ts`의 raw data를 source of truth로 사용한다.
- 목록 전용 상태인 `has_unread`, `preview_message`만 이 block 타입에서 추가한다.
- 최신 메시지는 room의 메시지 중 `created_at`이 가장 늦은 값을 사용한다.
- unread dot은 현재 유저의 `chat_room_members.last_read_at`과 최신 상대 메시지를 비교해 계산한다.
- 카드 전체는 방 진입을 위한 클릭 타겟으로 취급하고, 공통 인터랙션은 `shadcn/ui`의 `Button`을 사용한다.
- scenario는 raw data override를 만든 뒤 카드 projection을 다시 계산하는 방식으로 유지한다.
- 방 이름이 없으면 상대방 이름으로 카드 제목을 만든다.
