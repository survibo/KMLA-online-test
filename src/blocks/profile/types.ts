export type ProfileActionId = "info" | "conversation" | "posts"

export type ProfileUserRecord = {
  id: string
  name: string
  role: "user" | "admin"
  student_number: number | null
  class_no: number | null
  grade: number | null
  gender: "male" | "female" | null
  phone_number: string | null
  img: string | null
  birthday: string | null
  description: string | null
  status: "none" | "pending" | "accepted" | "rejected"
  room: number | null
  created_at: string
}

export type ProfileData = {
  rawUser: ProfileUserRecord
  displayName: string
  subtitle?: string | null
  avatarUrl: string | null
  bio: string
  studentNumber: string
  gradeLabel: string
  activeAction: ProfileActionId
}
