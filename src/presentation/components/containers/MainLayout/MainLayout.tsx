import { ReactNode } from 'react'

import Footer from 'presentation/components/containers/Footer'
import Header from 'presentation/components/containers/Header'
import Sidebar from 'presentation/components/containers/Sidebar'

import styles from './MainLayout.module.css'

type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => (
  <div className={styles.container}>
    <Header />
    <div className={styles.center}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
    <Footer />
  </div>
)

export default MainLayout
