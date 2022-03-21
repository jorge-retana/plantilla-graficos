import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import auth from 'application/use-cases/auth'
import useCookie from 'presentation/hooks/useCookie'
import { setToken as setUseCasesToken } from 'application/use-cases'
import Loading from 'presentation/components/common/Loading'

const COOKIE_NAME = 'auth-token'

type Props = { children: ReactNode }

const useAuth = () => {
  const [token, setToken, deleteToken] = useCookie(COOKIE_NAME, '')
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const isAuthed = Boolean(token) && isVerified

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true)
      const token = await auth.login(email, password)
      setIsVerified(true)
      setToken(token)
      setIsLoading(false)
    },
    [setToken],
  )

  const logout = deleteToken

  useEffect(() => {
    if (isVerified) {
      setUseCasesToken(token)
    } else if (token) {
      setIsLoading(true)
      auth
        .verify(token)
        .then(success => {
          if (!success) deleteToken()
          setIsVerified(true)
        })
        .finally(() => setIsLoading(false))
    }
  }, [isVerified, token, deleteToken])

  return { isAuthed, isLoading, login, logout }
}

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null)

const AuthProvider = ({ children }: Props) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
      {auth.isLoading && <Loading fullWidth />}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === null)
    throw new Error('useAuthContext must be used within a AuthProvider')

  return context
}

export default AuthProvider
