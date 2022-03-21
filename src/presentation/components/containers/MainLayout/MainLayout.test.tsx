import { render, screen } from '@testing-library/react'

import Footer from 'presentation/components/containers/Footer'
import Header from 'presentation/components/containers/Header'
import Sidebar from 'presentation/components/containers/Sidebar'

import MainLayout from './MainLayout'

jest.mock('presentation/components/containers/Footer', () => jest.fn(() => null))
jest.mock('presentation/components/containers/Header', () => jest.fn(() => null))
jest.mock('presentation/components/containers/Sidebar', () => jest.fn(() => null))

describe('MainLayout', () => {
  it('should render', () => {
    render(<MainLayout>This is a test</MainLayout>)

    screen.getByText(/this is a test/i)
    expect(Footer).toHaveBeenCalled()
    expect(Header).toHaveBeenCalled()
    expect(Sidebar).toHaveBeenCalled()
  })
})
