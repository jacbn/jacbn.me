import Image from 'next/image'
import styles from './page.module.css'
import Title from './components/title'
import MainGrid from './components/mainGrid'

export default function Home() {
  return (
    <main className={styles.main}>
      <Title />
      <div className={styles.subtitle}>
        My Projects:
      </div>
      <MainGrid />
    </main> 
  )
}
