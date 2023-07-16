import '../app/globals.css'
import styles from '../styles/projects.module.css'

import Link from 'next/link'

export default function NavBar({showName}: {showName: boolean}) {
  return (
    <nav>
      {showName && (
      <div className={styles.myName}>
        <Link href="/">
          <span className={styles.titlePrimary}>Jacob </span> 
          <span className={styles.titleSecondary}> Brown</span>
        </Link>
      </div>
      )}
      <div>
        <Link className={styles.navBox} href="/contact">Contact</Link>
        <Link className={styles.navBox} href="/about">About</Link>
        <Link className={styles.navBox} href="/">Home</Link>
      </div>
    </nav>
  )
}