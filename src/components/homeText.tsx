import styles from '@/styles/home.module.css'

export interface HomeTextProps {
  title: string
  center?: boolean
  text: any
}

export default function HomeText(props : HomeTextProps) {
    return (
      <main className={styles.homeTextContainer}>
        <h1>{props.title}</h1> 
        <div className={styles.homeTextBody} style={{textAlign: (props.center) ? 'center' : 'justify'}}>
          {props.text}
        </div>
      </main>
    )
}