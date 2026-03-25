import {
  compareAsc,
  compareDesc,
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  format,
  isAfter,
  isSameDay,
  isValid,
  parseISO,
} from "date-fns"
import { ko } from "date-fns/locale"

function parseIsoDate(isoString: string) {
  const date = parseISO(isoString)

  if (!isValid(date)) {
    return null
  }

  return date
}

export function formatIsoDateTime(isoString: string) {
  const date = parseIsoDate(isoString)

  if (!date) return isoString

  return format(date, "yyyy.MM.dd HH:mm")
}

export function formatIsoTime(isoString: string) {
  const date = parseIsoDate(isoString)

  if (!date) return isoString

  return format(date, "HH:mm")
}

export function formatIsoMeridiemTime(isoString: string) {
  const date = parseIsoDate(isoString)

  if (!date) return isoString

  return format(date, "a hh:mm", { locale: ko })
}

export function formatIsoMonthDayMeridiemTime(isoString: string) {
  const date = parseIsoDate(isoString)

  if (!date) return isoString

  return format(date, "M월 d일 a hh:mm", { locale: ko })
}

export function formatRelativeTime(isoString: string, now = new Date()) {
  const target = parseIsoDate(isoString)

  if (!target) return isoString

  const diffMinutes = differenceInMinutes(now, target)

  if (diffMinutes < 1) return "방금 전"

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`
  }

  const diffHours = differenceInHours(now, target)

  if (diffHours < 24) {
    return `${diffHours}시간 전`
  }

  const diffDays = differenceInDays(now, target)

  return `${diffDays}일 전`
}

export function getIsoTimestamp(isoString: string) {
  const date = parseIsoDate(isoString)

  if (!date) return null

  return date.getTime()
}

export function compareIsoAsc(leftIsoString: string, rightIsoString: string) {
  const leftDate = parseIsoDate(leftIsoString)
  const rightDate = parseIsoDate(rightIsoString)

  if (!leftDate || !rightDate) return 0

  return compareAsc(leftDate, rightDate)
}

export function compareIsoDesc(leftIsoString: string, rightIsoString: string) {
  const leftDate = parseIsoDate(leftIsoString)
  const rightDate = parseIsoDate(rightIsoString)

  if (!leftDate || !rightDate) return 0

  return compareDesc(leftDate, rightDate)
}

export function isSameIsoDay(
  leftIsoString: string | undefined,
  rightIsoString: string | undefined
) {
  if (!leftIsoString || !rightIsoString) return false

  const leftDate = parseIsoDate(leftIsoString)
  const rightDate = parseIsoDate(rightIsoString)

  if (!leftDate || !rightDate) return false

  return isSameDay(leftDate, rightDate)
}

export function isIsoAfterDate(leftIsoString: string, rightIsoString: string) {
  const leftDate = parseIsoDate(leftIsoString)
  const rightDate = parseIsoDate(rightIsoString)

  if (!leftDate || !rightDate) return false

  return isAfter(leftDate, rightDate)
}

export function getIsoDifferenceInMilliseconds(
  leftIsoString: string | undefined,
  rightIsoString: string | undefined
) {
  if (!leftIsoString || !rightIsoString) return null

  const leftDate = parseIsoDate(leftIsoString)
  const rightDate = parseIsoDate(rightIsoString)

  if (!leftDate || !rightDate) return null

  return differenceInMilliseconds(leftDate, rightDate)
}
