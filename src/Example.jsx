import {
  activeChatRoomScenario,
} from "@/blocks/chat/room/mock.scenarios"
import { ChatRoom } from "@/blocks/chat/room"

export function Example() {
  return <ChatRoom data={activeChatRoomScenario.data} />
}
