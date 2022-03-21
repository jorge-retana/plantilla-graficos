import { act, renderHook } from '@testing-library/react-hooks'
import Cookies from 'js-cookie'

import useCookie from './useCookie'

jest.mock('js-cookie')

const setReturnValue = (value: any) => {
  const mockedCookies = Cookies as jest.Mocked<typeof Cookies>
  mockedCookies.get.mockImplementationOnce((key?: string) =>
    typeof key === 'string' ? JSON.stringify(value) : {},
  )
}

describe('useCookie', () => {
  beforeEach(() => jest.resetModules())

  it('should return and store initial value', () => {
    const { result } = renderHook(() => useCookie('test', 'bar'))

    expect(result.current[0]).toEqual('bar')
    expect(Cookies.get).toHaveBeenCalledWith('test')
    expect(Cookies.set).toHaveBeenCalledWith('test', JSON.stringify('bar'))
  })

  it('should return stored value', () => {
    setReturnValue({ foo: 'buz' })

    const { result } = renderHook(() => useCookie('foo', { foo: 'bar' }))

    expect(result.current[0]).toEqual({ foo: 'buz' })
    expect(Cookies.get).toHaveBeenCalledWith('foo')
  })

  it('should store a new value', () => {
    const { result } = renderHook(() => useCookie('foo', 'bar'))

    act(() => result.current[1]('buz'))

    expect(result.current[0]).toEqual('buz')
    expect(Cookies.get).toHaveBeenCalledWith('foo')
  })

  it('should remove stored value', () => {
    const { result } = renderHook(() => useCookie('foo', 'bar'))

    act(() => result.current[1]('buz'))
    act(() => result.current[2]())

    expect(result.current[0]).toEqual('bar')
    expect(Cookies.remove).toHaveBeenCalledWith('foo')
  })
})
