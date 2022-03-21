import { getProviders } from '.'

export type AuthProvider = {
  login: (email: string, password: string) => Promise<string>
  validate: (token: string) => Promise<boolean>
}

const login = (email: string, password: string) => {
  const provider: AuthProvider = getProviders().auth
  return provider.login(email, password)
}

const verify = (token: string) => {
  const provider: AuthProvider = getProviders().auth
  return provider.validate(token)
}

export default {
  login,
  verify,
}
