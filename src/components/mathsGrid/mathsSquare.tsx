import styles from '@/styles/mathsart.module.css'
import Link from 'next/link'

export default function MathsSquare({href, title, image}: {href: string, title: string, image: {src: string, alt: string}}) {
  return (
    <>
      <Link className={styles.mathsArtGridSquare} href={href}>
        <h2>{title}</h2> 
        <img src={image.src} alt={image.alt} />
      </Link>
    </>
  )
}