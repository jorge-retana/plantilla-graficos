import { useAuthContext } from 'presentation/contexts/AuthContext'

import styles from './Header.module.css'

const Header = () => {
  const { isAuthed, logout } = useAuthContext()

  return (
    <header className={styles.container}>
      <span>Header</span>
      {isAuthed && <button onClick={logout}>logout</button>}
    </header>
  )
}

export default Header
