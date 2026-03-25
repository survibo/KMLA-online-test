export type MainFooterTabId =
  | "home"
  | "cube"
  | "group"
  | "chat"
  | "profile"

export type MainFooterTab = {
  id: MainFooterTabId
  label: string
  badgeCount?: number
  hasIndicator?: boolean
}

export type MainFooterData = {
  tabs: MainFooterTab[]
  activeTabId: MainFooterTabId
}
