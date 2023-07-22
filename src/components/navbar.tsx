import '../app/globals.css'
import styles from '../styles/projects.module.css'

import Link from 'next/link'

export default function NavBar({showName, onClickFunction}: {showName: boolean, onClickFunction: Function}) {
  return (
    <nav>
      <div className={styles.myName}>
      {/* do not move conditional outside, empty div keeps the rest right-floating */}
      {showName && (
        <Link href="/">
          <span className={styles.titlePrimary}>Jacob </span> 
          <span className={styles.titleSecondary}> Brown</span>
        </Link>
      )}
      </div>
      <div>
        <div className={styles.navBox} onClick={() => onClickFunction('contact')}>Contact</div>
        <div className={styles.navBox} onClick={() => onClickFunction('about')}>About Me</div>
        <div className={styles.navBox} onClick={() => onClickFunction('home')}>Home</div>
      </div>
    </nav>
  )
}