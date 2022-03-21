import { useState } from 'react'

import { useAuthContext } from 'presentation/contexts/AuthContext'
import { defaultPrevented, valuePicked } from 'presentation/utils/form'
import styles from './LoginPage.module.css'

const LoginPage = () => {
  const { login } = useAuthContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => login(username, password)

  return (
    <div className={styles.container}>
      <h1>LoginPage</h1>
      <form className={styles.loginForm} onSubmit={defaultPrevented(handleSubmit)}>
        <input
          value={username}
          onChange={valuePicked(setUsername)}
          placeholder="Username..."
          required
        />
        <input
          type="password"
          value={password}
          onChange={valuePicked(setPassword)}
          placeholder="Password..."
          required
        />
        <button>LOGIN</button>
      </form>
    </div>
  )
}

export default LoginPage
