export type ChatUser = {
  id: string
  name: string
  img: string | null
}

export type ChatMessageReaction = {
  id: string
  message_id: string
  user_id: string
  type: "like" | "love" | "laugh" | "wow" | "sad" | "angry"
  created_at: string
}

export type ChatMessageRead = {
  message_id: string
  user_id: string
  created_at: string
}

export type ChatRoomRecord = {
  id: string
  name: string | null
  is_group: boolean
  created_at: string
}

export type ChatRoomMemberRecord = {
  room_id: string
  user_id: string
  joined_at: string
  last_read_message_id: string | null
  last_read_at: string | null
}

export type ChatMessageRecord = {
  id: string
  room_id: string
  sender_id: string
  parent_id: string | null
  content: string
  is_edited: boolean
  edited_at: string | null
  deleted_at: string | null
  created_at: string
}

export type ChatRoomMember = ChatRoomMemberRecord & {
  user: ChatUser
}

export type ChatMessage = ChatMessageRecord & {
  sender: ChatUser
  message_reactions?: ChatMessageReaction[]
  message_reads?: ChatMessageRead[]
}

export type ChatRoom = ChatRoomRecord & {
  members: ChatRoomMember[]
  messages?: ChatMessage[]
}
