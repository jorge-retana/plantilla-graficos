import { render, screen } from '@testing-library/react'

import Header from './Header'

let mockedIsAuthed: boolean

jest.mock('presentation/contexts/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isAuthed: mockedIsAuthed })),
}))

describe('Header', () => {
  beforeEach(() => (mockedIsAuthed = false))

  it('should render', () => {
    render(<Header />)
    screen.getByText('Header')
    expect(screen.queryByText('logout')).toBeNull()
  })

  it('should render with logout button', () => {
    mockedIsAuthed = true
    render(<Header />)
    screen.getByText('Header')
    screen.getByText('logout')
  })
})
