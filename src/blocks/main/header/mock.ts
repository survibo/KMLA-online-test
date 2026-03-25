import type { MainHeaderData } from "./types"

export const baseMainHeaderData: MainHeaderData = {
  title: "행정위원회",
  showBackButton: true,
}

export function createMainHeaderData(
  overrides: Partial<MainHeaderData> = {}
): MainHeaderData {
  return {
    ...baseMainHeaderData,
    ...overrides,
  }
}
