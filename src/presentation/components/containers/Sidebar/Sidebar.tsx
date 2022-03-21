import { useAuthContext } from 'presentation/contexts/AuthContext'
import styles from './Sidebar.module.css'

const Sidebar = () => {
  const { isAuthed } = useAuthContext()

  if (!isAuthed) return null

  return (
    <aside className={styles.container}>
      <nav>Sidebar</nav>
    </aside>
  )
}

export default Sidebar
