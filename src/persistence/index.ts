import { initProviders } from 'application/use-cases'
import authProvider from 'persistence/providers/auth'

const initPersistence = () => {
  initProviders({ auth: authProvider })
}

export default initPersistence
