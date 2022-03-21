import { useCallback, useState } from 'react'
import Cookies from 'js-cookie'

const useCookie = <T>(
  cookieName: string,
  initialValue: (() => T) | T,
): [T, (value: T) => void, () => void] => {
  const [value, setValue] = useState<T>(() => {
    const cookieValue = Cookies.get(cookieName)
    if (cookieValue) return JSON.parse(cookieValue) as T

    const newValue =
      typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
    Cookies.set(cookieName, JSON.stringify(newValue))

    return newValue
  })

  const updateCookie = useCallback(
    (nextValue: ((value: T) => T) | T) => {
      Cookies.set(cookieName, JSON.stringify(nextValue))
      setValue(nextValue)
    },
    [cookieName],
  )

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName)
    setValue(initialValue)
  }, [cookieName, initialValue])

  return [value, updateCookie, deleteCookie]
}

export default useCookie
