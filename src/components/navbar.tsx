import '@/app/globals.css'
import styles from '@/styles/projects.module.css'

import Link from 'next/link'

export function NavBox({text, href, active}: {text: string, href: string, active: boolean}) {
  return (
    <Link className={`${styles.navBox} ${(active) ? styles.activeNavBox : ''}`} href={href}>{text}</Link>
  )
}

export default function NavBar({showName, activePage}: {showName: boolean, activePage?: string}) {
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
        <NavBox text="Contacts" href="/contacts" active={activePage === '/contacts'} />
        <NavBox text="About Me" href="/about" active={activePage === '/about'} />
        <NavBox text="Home" href="/" active={activePage === '/'} />
      </div>
    </nav>
  )
}