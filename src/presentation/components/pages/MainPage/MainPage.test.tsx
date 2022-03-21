import { render, screen } from '@testing-library/react'

import MainPage from './MainPage'

describe('MainPage', () => {
  it('should render init message', () => {
    render(<MainPage />)
    screen.getByText('Hello, MMG!')
  })
})
