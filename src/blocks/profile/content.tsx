import { TabsContent } from "@/components/ui/tabs"

import type { ProfileData } from "./types"

type ProfileContentProps = {
  data: ProfileData
}

export function ProfileContent({ data }: ProfileContentProps) {
  return (
    <>
      <TabsContent value="info" className="mt-8 flex-1">
        <div className="grid gap-8">
          <ProfileField label="학번" value={data.studentNumber} />
          <ProfileField label="기수" value={data.gradeLabel} />
        </div>
      </TabsContent>

      <TabsContent value="conversation" className="mt-8 flex-1">
        <section className="space-y-2">
          <h2 className="text-[1.15rem] font-semibold tracking-tight text-text-strong">
            대화하기
          </h2>
          <p className="text-lg leading-7 text-text-soft">
            대화 시작 버튼, 최근 대화 상태, 안내 문구 같은 항목이 이 영역에 들어올 수 있습니다.
          </p>
        </section>
      </TabsContent>

      <TabsContent value="posts" className="mt-8 flex-1">
        <section className="space-y-2">
          <h2 className="text-[1.15rem] font-semibold tracking-tight text-text-strong">
            글 목록
          </h2>
          <p className="text-lg leading-7 text-text-soft">
            사용자가 작성한 글 목록, pinned post, 최근 활동 요약이 이 영역에 들어올 수 있습니다.
          </p>
        </section>
      </TabsContent>
    </>
  )
}

function ProfileField({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-[1.15rem] font-semibold tracking-tight text-text-strong">{label}</h2>
      <p className="text-lg leading-7 text-text-soft">{value}</p>
    </section>
  )
}
