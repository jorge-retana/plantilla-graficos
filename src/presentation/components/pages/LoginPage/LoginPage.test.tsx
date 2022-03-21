import { fireEvent, render, screen } from '@testing-library/react'

import LoginPage from './LoginPage'

const mockedLogin = jest.fn()

jest.mock('presentation/contexts/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ login: mockedLogin })),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly', () => {
    render(<LoginPage />)
    screen.getByText('LoginPage')
    screen.getByText(/^login$/i)
  })

  it('should perform login action', () => {
    render(<LoginPage />)
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: 'username' },
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByText(/^login$/i))
    expect(mockedLogin).toHaveBeenCalled()
  })
})
