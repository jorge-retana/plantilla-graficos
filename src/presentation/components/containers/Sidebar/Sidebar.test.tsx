import { render, screen } from '@testing-library/react'

import Sidebar from './Sidebar'

let mockedIsAuthed: boolean

jest.mock('presentation/contexts/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isAuthed: mockedIsAuthed })),
}))

describe('Sidebar', () => {
  beforeEach(() => (mockedIsAuthed = false))

  it('should render if authenticated', () => {
    mockedIsAuthed = true
    render(<Sidebar />)
    screen.getByText('Sidebar')
  })

  it('should not render if no authenticated', () => {
    render(<Sidebar />)
    expect(screen.queryByText('Sidebar')).toBeNull()
  })
})
