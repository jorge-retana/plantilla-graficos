import { render, screen } from '@testing-library/react'
import { Navigate } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

let mockedIsAuthed: boolean

jest.mock('presentation/contexts/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isAuthed: mockedIsAuthed })),
}))

jest.mock('react-router-dom', () => ({
  Navigate: jest.fn(() => null),
}))

describe('PrivateRoute', () => {
  beforeEach(() => {
    mockedIsAuthed = false
    jest.clearAllMocks()
  })

  it('should redirect if there is no token', () => {
    render(<PrivateRoute>PrivateRoute</PrivateRoute>)

    expect(Navigate).toHaveBeenCalledWith({ to: '/login' }, {})
    expect(screen.queryByText('PrivateRoute')).toBeNull()
  })

  it('should render if there is token', () => {
    mockedIsAuthed = true
    render(<PrivateRoute>PrivateRoute</PrivateRoute>)

    expect(Navigate).not.toHaveBeenCalled()
    screen.getByText('PrivateRoute')
  })
})
