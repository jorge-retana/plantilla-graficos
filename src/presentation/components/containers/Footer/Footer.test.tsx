import { render, screen } from '@testing-library/react'

import Footer from './Footer'

describe('Footer', () => {
  it('should render', () => {
    render(<Footer />)
    screen.getByText('Footer')
  })
})
