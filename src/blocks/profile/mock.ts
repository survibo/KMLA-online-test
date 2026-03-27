import type {
  ProfileActionId,
  ProfileData,
  ProfileUserRecord,
} from "./types"

export const baseProfileUser: ProfileUserRecord = {
  id: "7c2f2a32-ecb9-4db7-8ba1-708c4b7495ad",
  name: "박광현",
  role: "user",
  student_number: 281401,
  class_no: 1,
  grade: 28,
  gender: "male",
  phone_number: "010-1234-5678",
  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  birthday: "2008-05-14",
  description: "안녕하세요 28기 박광현입니다.",
  status: "accepted",
  room: 304,
  created_at: "2026-03-10T09:00:00+09:00",
}

export function createProfileData({
  user = {},
  activeAction = "info",
}: {
  user?: Partial<ProfileUserRecord>
  activeAction?: ProfileActionId
} = {}): ProfileData {
  const rawUser = {
    ...baseProfileUser,
    ...user,
  }

  return {
    rawUser,
    displayName: rawUser.name,
    subtitle:
      rawUser.student_number !== null
        ? `${rawUser.student_number} / ${rawUser.grade ?? "-"}기`
        : null,
    avatarUrl: rawUser.img,
    bio: rawUser.description ?? "소개가 아직 없습니다.",
    studentNumber:
      rawUser.student_number !== null
        ? `${rawUser.student_number}`
        : "등록된 학번이 없습니다.",
    gradeLabel:
      rawUser.grade !== null ? `${rawUser.grade}기` : "등록된 기수가 없습니다.",
    activeAction,
  }
}

export const baseProfileData = createProfileData()
