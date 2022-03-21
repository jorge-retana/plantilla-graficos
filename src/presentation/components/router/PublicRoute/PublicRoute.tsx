import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthContext } from 'presentation/contexts/AuthContext'
import { HOME } from '../routes'

type Props = {
  children: ReactNode
}

const PublicRoute = ({ children }: Props) => {
  const { isAuthed } = useAuthContext()

  return isAuthed ? <Navigate to={HOME} /> : <>{children}</>
}

export default PublicRoute
