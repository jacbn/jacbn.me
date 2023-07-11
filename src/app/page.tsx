import Image from 'next/image'
import styles from './page.module.css'
import MainGrid from './components/mainGrid'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.subtitle}>
        My Projects:
      </div>
      <MainGrid />
    </main> 
  )
}
