import {
  CircleUserRound,
  FileText,
  Home,
  MessageCircleMore,
  Package,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { MainFooterData, MainFooterTab, MainFooterTabId } from "./types"

type MainFooterProps = {
  data: MainFooterData
  className?: string
}

const tabIconById: Record<MainFooterTabId, typeof Home> = {
  home: Home,
  cube: Package,
  feed: FileText,
  chat: MessageCircleMore,
  profile: CircleUserRound,
}

export function MainFooter({ data, className }: MainFooterProps) {
  return (
    <section
      className={cn(
        "min-h-screen bg-[#f6f6f4] px-0 py-0 text-slate-900",
        className
      )}
    >
      <div className="mx-auto flex min-h-screen w-ful flex-col">
        <div className="flex-1 bg-transparent" />

        <div>
          <nav
            aria-label="Main footer navigation"
            className="h-20 w-full rounded-t-[1.5rem] bg-white px-4 py-3 shadow-[0_-6px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80"
          >
            <ul className="grid h-full grid-cols-5 items-center gap-1">
              {data.tabs.map((tab) => (
                <MainFooterNavItem
                  key={tab.id}
                  tab={tab}
                  isActive={tab.id === data.activeTabId}
                />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

function MainFooterNavItem({
  tab,
  isActive,
}: {
  tab: MainFooterTab
  isActive: boolean
}) {
  const Icon = tabIconById[tab.id]

  return (
    <li>
      <button
        type="button"
        className={cn(
          "group flex w-full flex-col items-center justify-center rounded-[1.1rem] px-1 py-2 transition-colors",
          isActive ? "text-black" : "text-[#74819b] hover:text-[#5f6c85]"
        )}
        aria-pressed={isActive}
      >
        <span className="relative inline-flex">
          <Icon className="size-8" strokeWidth="2.2" />

          {tab.hasIndicator ? (
            <span className="absolute top-0 right-0 size-2 rounded-full bg-[#7ac7a5] ring-2 ring-white" />
          ) : null}

          {tab.badgeCount ? (
            <span className="absolute -top-1.5 left-[55%] inline-flex min-w-5 items-center justify-center rounded-full bg-[#7ac7a5] px-1.5 py-0.5 text-[0.68rem] font-semibold leading-none text-white ring-2 ring-white">
              {tab.badgeCount}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  )
}
