import styles from '../styles/home.module.css'
import Title from '../components/title'
import MainGrid from '../components/mainGrid'

export default function Home() {
  return (
    <main>
      <Title />
        <div className={styles.subtitle}>
          My Projects:
        </div>
      <MainGrid />
    </main> 
  )
}
