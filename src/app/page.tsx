import styles from '../styles/home.module.css'
import Title from '../components/title'
import MainGrid from '../components/mainGrid'
import NavBar from '@/components/navbar'

export default function Home() {
  return (
    <main>
      <Title />
      <NavBar showName={false} />
      <div className={styles.subtitle}>
        My Projects:
      </div>
      <MainGrid />
    </main> 
  )
}
