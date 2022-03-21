import { AuthProvider } from './auth'

type Provider = {
  auth: AuthProvider
}

let provider: Provider
let token: string

export const getProviders = (): Provider => {
  if (!provider) throw new Error('Provider is not initialized')

  return provider
}

export const initProviders = (newProvider: Provider): void => {
  if (provider) throw new Error('Provider is already initialized')

  provider = newProvider
}

export const setToken = (newToken: string): void => {
  token = newToken
}

export const getToken = (): string => token
