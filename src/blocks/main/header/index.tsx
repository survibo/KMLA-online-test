import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { MainHeaderData } from "./types"

type MainHeaderProps = {
  data: MainHeaderData
  className?: string
}

export function MainHeader({ data, className }: MainHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 border-b border-border/60 bg-card/95 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm",
        className
      )}
    >
      <div className="px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {data.showBackButton ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-text-faint hover:bg-muted hover:text-text-strong"
              aria-label="Go back"
            >
              <ArrowLeft className="size-5" strokeWidth={2.35} />
            </Button>
          ) : null}

          <h1 className="truncate text-[1.45rem] leading-none font-semibold tracking-tight text-text-strong">
            {data.title}
          </h1>
        </div>
      </div>
    </header>
  )
}
