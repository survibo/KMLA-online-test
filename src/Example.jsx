import { MainFooter } from "@/blocks/main/footer"
import { activeMainFooterScenario } from "@/blocks/main/footer/mock.scenarios"

export function Example() {
  return <MainFooter data={activeMainFooterScenario.data} />
}
