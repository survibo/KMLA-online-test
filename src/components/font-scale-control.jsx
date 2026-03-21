import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

const FONT_SCALE_STORAGE_KEY = "app-font-scale"

const fontScaleOptions = [
  { value: 0.94, label: "A-" },
  { value: 1, label: "A" },
  { value: 1.08, label: "A+" },
]

function applyFontScale(scale) {
  document.documentElement.style.setProperty("--app-font-scale", String(scale))
}

export function FontScaleControl() {
  const [fontScale, setFontScale] = useState(1)

  useEffect(() => {
    const storedScale = window.localStorage.getItem(FONT_SCALE_STORAGE_KEY)
    const parsedScale = storedScale ? Number(storedScale) : 1
    const nextScale = Number.isFinite(parsedScale) ? parsedScale : 1

    setFontScale(nextScale)
    applyFontScale(nextScale)
  }, [])

  function handleChange(nextScale) {
    setFontScale(nextScale)
    applyFontScale(nextScale)
    window.localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(nextScale))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/95 p-1.5 shadow-lg backdrop-blur">
        {fontScaleOptions.map((option) => (
          <Button
            key={option.label}
            type="button"
            variant={fontScale === option.value ? "default" : "ghost"}
            size="sm"
            className="rounded-full px-3"
            onClick={() => handleChange(option.value)}
            aria-pressed={fontScale === option.value}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
