import { ReactChild } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthContext } from 'presentation/contexts/AuthContext'
import { LOGIN } from '../routes'

type Props = {
  children: ReactChild
}

const PrivateRoute = ({ children }: Props) => {
  const { isAuthed } = useAuthContext()

  return isAuthed ? <>{children}</> : <Navigate to={LOGIN} />
}

export default PrivateRoute
