import type {
  ChatMessage,
  ChatMessageRecord,
  ChatRoom,
  ChatRoomMember,
  ChatRoomMemberRecord,
  ChatRoomRecord,
  ChatUser,
} from "./types"

export type ChatMockData = {
  current_user_id: string
  users: ChatUser[]
  rooms: ChatRoomRecord[]
  room_members: ChatRoomMemberRecord[]
  messages: ChatMessageRecord[]
}

export const baseChatCurrentUserId = "52a1fb2e-b7a9-4f8f-b75c-e14a4e0df6cc"
export const baseChatChoiUserId = "2f30f324-f46d-4494-bd27-1c1952004eb0"
export const baseChatJeonUserId = "f9972e58-aac9-4349-b973-af93ffbccda9"

export const baseChatRoomWithChoiId = "49d1454c-b5b8-4fcf-917f-e98165692453"
export const baseChatRoomWithJeonId = "037d07f1-a5d7-4763-a0ff-0f8b29bb8186"

export const baseChatUsers: ChatUser[] = [
  {
    id: baseChatCurrentUserId,
    name: "김민준",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
  },
  {
    id: baseChatChoiUserId,
    name: "최정욱",
    img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=240&q=80",
  },
  {
    id: baseChatJeonUserId,
    name: "전지강",
    img: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=240&q=80",
  },
]

function findUserInUsers(users: ChatUser[], userId: string) {
  const user = users.find((item) => item.id === userId)

  if (!user) {
    throw new Error(`Missing chat user for ${userId}`)
  }

  return user
}

export const baseChatRooms: ChatMockData["rooms"] = [
  {
    id: baseChatRoomWithChoiId,
    name: null,
    is_group: false,
    created_at: "2026-03-21T09:00:00+09:00",
  },
  {
    id: baseChatRoomWithJeonId,
    name: null,
    is_group: false,
    created_at: "2026-03-21T09:00:00+09:00",
  },
]

export const baseChatRoomMembers: ChatRoomMemberRecord[] = [
  {
    room_id: baseChatRoomWithChoiId,
    user_id: baseChatCurrentUserId,
    joined_at: "2026-03-21T09:00:00+09:00",
    last_read_message_id: "m-choi-2",
    last_read_at: "2026-03-21T09:05:00+09:00",
  },
  {
    room_id: baseChatRoomWithChoiId,
    user_id: baseChatChoiUserId,
    joined_at: "2026-03-21T09:00:00+09:00",
    last_read_message_id: null,
    last_read_at: null,
  },
  {
    room_id: baseChatRoomWithJeonId,
    user_id: baseChatCurrentUserId,
    joined_at: "2026-03-21T09:00:00+09:00",
    last_read_message_id: "m-jeon-3",
    last_read_at: "2026-03-21T09:11:00+09:00",
  },
  {
    room_id: baseChatRoomWithJeonId,
    user_id: baseChatJeonUserId,
    joined_at: "2026-03-21T09:00:00+09:00",
    last_read_message_id: "m-jeon-3",
    last_read_at: "2026-03-21T09:11:00+09:00",
  },
]

export const baseChatMessages: ChatMessageRecord[] = [
  {
    id: "m-self-1",
    room_id: baseChatRoomWithChoiId,
    sender_id: baseChatCurrentUserId,
    parent_id: null,
    content: "오늘도 버텼다",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:01:00+09:00",
  },
  {
    id: "m-self-2",
    room_id: baseChatRoomWithJeonId,
    sender_id: baseChatCurrentUserId,
    parent_id: null,
    content: "점심 먹었어?",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:06:00+09:00",
  },
  {
    id: "m-self-3",
    room_id: baseChatRoomWithChoiId,
    sender_id: baseChatCurrentUserId,
    parent_id: null,
    content: "오늘 끝나고 쉬자",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:05:00+09:00",
  },
  {
    id: "m-choi-1",
    room_id: baseChatRoomWithChoiId,
    sender_id: baseChatChoiUserId,
    parent_id: null,
    content: "아침부터 회의였어",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:02:00+09:00",
  },
  {
    id: "m-choi-2",
    room_id: baseChatRoomWithChoiId,
    sender_id: baseChatChoiUserId,
    parent_id: null,
    content: "그래도 이제 끝났어",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:04:00+09:00",
  },
  {
    id: "m-choi-3",
    room_id: baseChatRoomWithChoiId,
    sender_id: baseChatChoiUserId,
    parent_id: null,
    content: "피곤하다",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:10:00+09:00",
  },
  {
    id: "m-jeon-1",
    room_id: baseChatRoomWithJeonId,
    sender_id: baseChatJeonUserId,
    parent_id: null,
    content: "사진 전달했어",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:03:00+09:00",
  },
  {
    id: "m-jeon-2",
    room_id: baseChatRoomWithJeonId,
    sender_id: baseChatJeonUserId,
    parent_id: null,
    content: "확인 부탁",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:08:00+09:00",
  },
  {
    id: "m-jeon-3",
    room_id: baseChatRoomWithJeonId,
    sender_id: baseChatJeonUserId,
    parent_id: null,
    content: "👍",
    is_edited: false,
    edited_at: null,
    deleted_at: null,
    created_at: "2026-03-21T09:09:00+09:00",
  },
]

export const baseChatMockData: ChatMockData = {
  current_user_id: baseChatCurrentUserId,
  users: baseChatUsers,
  rooms: baseChatRooms,
  room_members: baseChatRoomMembers,
  messages: baseChatMessages,
}

export function createChatMockData(
  overrides: Partial<ChatMockData> = {}
): ChatMockData {
  return {
    current_user_id: overrides.current_user_id ?? baseChatMockData.current_user_id,
    users: (overrides.users ?? baseChatMockData.users).map((user) => ({ ...user })),
    rooms: (overrides.rooms ?? baseChatMockData.rooms).map((room) => ({ ...room })),
    room_members: (overrides.room_members ?? baseChatMockData.room_members).map((member) => ({
      ...member,
    })),
    messages: (overrides.messages ?? baseChatMockData.messages).map((message) => ({
      ...message,
    })),
  }
}

export function getChatRoomMembers(roomId: string, data: ChatMockData) {
  return data.room_members
    .filter((member) => member.room_id === roomId)
    .map((member) => ({
      ...member,
      user: findUserInUsers(data.users, member.user_id),
    }))
}

export function getChatRoomMessages(roomId: string, data: ChatMockData) {
  return data.messages
    .filter((message) => message.room_id === roomId && !message.deleted_at)
    .map((message) => ({
      ...message,
      sender: findUserInUsers(data.users, message.sender_id),
      message_reactions: [],
      message_reads: [],
    }))
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
}

export function getLatestChatRoomMessage(roomId: string, data: ChatMockData) {
  const roomMessages = getChatRoomMessages(roomId, data)

  return roomMessages[roomMessages.length - 1] ?? null
}

export function getChatRoomUnreadState(
  roomId: string,
  currentUserId: string,
  data: ChatMockData
) {
  const currentMember = getChatRoomMembers(roomId, data).find(
    (member) => member.user_id === currentUserId
  )

  if (!currentMember) return false

  const roomMessages = getChatRoomMessages(roomId, data)

  return roomMessages.some((message) => {
    if (message.sender_id === currentUserId) return false

    if (currentMember.last_read_at) {
      return (
        new Date(message.created_at).getTime() >
        new Date(currentMember.last_read_at).getTime()
      )
    }

    if (currentMember.last_read_message_id) {
      return message.id !== currentMember.last_read_message_id
    }

    return true
  })
}

export function getChatRoomById(roomId: string, data: ChatMockData): ChatRoom {
  const room = data.rooms.find((item) => item.id === roomId)

  if (!room) {
    throw new Error(`Missing chat room for ${roomId}`)
  }

  return {
    ...room,
    members: getChatRoomMembers(roomId, data),
    messages: getChatRoomMessages(roomId, data),
  }
}
