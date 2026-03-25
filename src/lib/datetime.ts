function getDateParts(isoString: string) {
  const date = new Date(isoString)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  const rawHours = date.getHours()
  const meridiem = rawHours < 12 ? "오전" : "오후"
  const displayHour = rawHours % 12 || 12

  return {
    year: date.getFullYear(),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
    hours: String(date.getHours()).padStart(2, "0"),
    meridiem,
    meridiemHours: String(displayHour).padStart(2, "0"),
    minutes: String(date.getMinutes()).padStart(2, "0"),
  }
}

export function formatIsoDateTime(isoString: string) {
  const parts = getDateParts(isoString)

  if (!parts) return isoString

  return `${parts.year}.${parts.month}.${parts.day} ${parts.hours}:${parts.minutes}`
}

export function formatIsoTime(isoString: string) {
  const parts = getDateParts(isoString)

  if (!parts) return isoString

  return `${parts.hours}:${parts.minutes}`
}

export function formatIsoMeridiemTime(isoString: string) {
  const parts = getDateParts(isoString)

  if (!parts) return isoString

  return `${parts.meridiem} ${parts.meridiemHours}:${parts.minutes}`
}

export function formatIsoMonthDayMeridiemTime(isoString: string) {
  const parts = getDateParts(isoString)

  if (!parts) return isoString

  return `${Number(parts.month)}월 ${Number(parts.day)}일 ${parts.meridiem} ${parts.meridiemHours}:${parts.minutes}`
}

export function formatRelativeTime(isoString: string, now = new Date()) {
  const target = new Date(isoString)

  if (Number.isNaN(target.getTime())) {
    return isoString
  }

  const diffMs = now.getTime() - target.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diffMs < minute) return "방금 전"

  if (diffMs < hour) {
    return `${Math.floor(diffMs / minute)}분 전`
  }

  if (diffMs < day) {
    return `${Math.floor(diffMs / hour)}시간 전`
  }

  return `${Math.floor(diffMs / day)}일 전`
}
