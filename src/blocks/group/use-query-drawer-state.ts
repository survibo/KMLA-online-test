import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

type QueryDrawerStateOptions = {
  queryKey: string
}

export function useQueryDrawerState({ queryKey }: QueryDrawerStateOptions) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const openId = searchParams.get(queryKey)
  const drawerHistoryStateKey = `__drawer_${queryKey}`

  function getNextState(nextId: string | null) {
    const nextState =
      location.state && typeof location.state === "object"
        ? { ...location.state }
        : {}

    if (nextId) {
      nextState[drawerHistoryStateKey] = true
      return nextState
    }

    delete nextState[drawerHistoryStateKey]

    return Object.keys(nextState).length > 0 ? nextState : null
  }

  function updateQuery(nextId: string | null, replace = false) {
    const nextSearchParams = new URLSearchParams(searchParams)

    if (nextId) {
      nextSearchParams.set(queryKey, nextId)
    } else {
      nextSearchParams.delete(queryKey)
    }

    const nextSearch = nextSearchParams.toString()

    navigate(
      {
        pathname: location.pathname,
        search: nextSearch ? `?${nextSearch}` : "",
      },
      {
        replace,
        state: getNextState(nextId),
      }
    )
  }

  function open(nextId: string) {
    if (openId === nextId) return

    updateQuery(nextId)
  }

  function close() {
    if (!openId) return

    if (location.state?.[drawerHistoryStateKey] === true) {
      navigate(-1)
      return
    }

    updateQuery(null, true)
  }

  return {
    openId,
    open,
    close,
  }
}
