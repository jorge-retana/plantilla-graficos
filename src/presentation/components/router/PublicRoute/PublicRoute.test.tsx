import { render, screen } from '@testing-library/react'
import { Navigate } from 'react-router-dom'

import PublicRoute from './PublicRoute'

let mockedIsAuthed: boolean

jest.mock('presentation/contexts/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isAuthed: mockedIsAuthed })),
}))

jest.mock('react-router-dom', () => ({
  Navigate: jest.fn(() => null),
}))

describe('PublicRoute', () => {
  beforeEach(() => {
    mockedIsAuthed = false
    jest.clearAllMocks()
  })

  it('should redirect if there is token', () => {
    mockedIsAuthed = true
    render(<PublicRoute>PublicRoute</PublicRoute>)

    expect(Navigate).toHaveBeenCalledWith({ to: '/' }, {})
    expect(screen.queryByText('PublicRoute')).toBeNull()
  })

  it('should render if there is no token', () => {
    render(<PublicRoute>PublicRoute</PublicRoute>)

    expect(Navigate).not.toHaveBeenCalled()
    screen.getByText('PublicRoute')
  })
})
