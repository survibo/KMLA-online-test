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
  group: FileText,
  chat: MessageCircleMore,
  profile: CircleUserRound,
}

export function MainFooter({
  data,
  className,
}: MainFooterProps) {
  return (
    <section
      className={cn(
        "border-t border-border/70 bg-background px-3 pt-1 pb-2 text-foreground sm:px-4",
        className
      )}
    >
      <div className="flex w-full flex-col">
        <div>
          <nav
            aria-label="Main footer navigation"
            className="h-13 w-full bg-transparent px-1 text-foreground"
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
          isActive
            ? "bg-secondary/80 text-text-strong"
            : "text-text-faint hover:text-text-soft"
        )}
        aria-pressed={isActive}
      >
        <span className="relative inline-flex">
          <Icon className="size-8" strokeWidth={2.0} />

          {tab.hasIndicator ? (
            <span className="absolute top-0 right-0 size-2 rounded-full bg-brand-green ring-2 ring-card" />
          ) : null}

          {tab.badgeCount ? (
            <span className="absolute -top-1.5 left-[55%] inline-flex min-w-5 items-center justify-center rounded-full bg-brand-green px-1.5 py-0.5 text-[0.68rem] font-semibold leading-none text-brand-green-foreground ring-2 ring-card">
              {tab.badgeCount}
            </span>
          ) : null}
        </span>
      </button>
    </li>
  )
}
