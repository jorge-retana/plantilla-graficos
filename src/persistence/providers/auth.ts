import { AuthProvider } from 'application/use-cases/auth'
import { LOGIN, VALIDATE } from 'persistence/endpoints'
import fetcher from 'persistence/fetcher'

const authProvider: AuthProvider = {
  login: async (email: string, password: string) => {
    /*const response = await fetcher.post(LOGIN, { email, password })
    if (typeof response !== 'object' || !response.token)
      throw new Error('Invalid response')

    return response.token as string*/
    return "g";
  },

  validate: async (token: string) => {
    const response = await fetcher.post(VALIDATE, { token })
    if (typeof response !== 'object') throw new Error('Invalid response')

    return Boolean(response.validated)
  },
}

export default authProvider
