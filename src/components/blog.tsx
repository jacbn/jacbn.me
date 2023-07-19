import styles from '../styles/projects.module.css'

export interface BlogProps {
  title: string
  image?: {
    src: string
    alt: string
  }
  colour: string
  text: any
}

export default function Blog(props : BlogProps) {
    return (
      <main className={styles.blog}>
        <h1 className={styles.blogTitle}>{props.title}</h1> 
        <div className={styles.blogBody}>
          {props.image !== undefined && (
          <div className={styles.blogImage} style={{backgroundColor: props.colour}}>
            <img src={props.image?.src} alt={props.image?.alt}/> 
          </div>
          )}
          <div className={styles.blogText}>
            {props.text}
          </div>
        </div>
        
      </main>
    )
}