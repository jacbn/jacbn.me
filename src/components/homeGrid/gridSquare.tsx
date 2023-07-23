import styles from '@/styles/home.module.css'

import Link from 'next/link'

export interface GridSquareProps {
  title: string;
  description: string;
  year: string;
  lang: string;
  colour: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  podiumNum?: number;
}

const podiumClasses : {[id: number]: string} = {
  0: "",
  1: styles.podium1,
  2: styles.podium2,
  3: styles.podium3
}

export function CardTop({colour, image, podiumNum} : {colour: string, image: {src: string; alt: string;}, podiumNum: number}) {
  if (podiumNum > 0) {
    return (
      <div className={styles.cardTop} style={{backgroundColor: colour}}>
        <img
          className={styles.gridImage}
          src={image.src}
          alt={image.alt}
        />
      </div>
    )
  } else {
    return <></>
  }
}

export default function GridSquare({title, description, year, lang, colour, image, link, podiumNum = 0} : GridSquareProps) {
  // let cardClass = "card transition" + (podiumNum == 0 ? "" : " podium" + podiumNum);
  const cardClass = `${styles.card} ${styles.transition} ${podiumClasses[podiumNum]}`
  return (
    <Link href={link} className={cardClass}>
      <CardTop colour={colour} image={image} podiumNum={podiumNum}/>
      <div className={styles.cardBase}>
        <h2 style={{color: colour}}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <p className={styles.projectInfoText}>
        {year} &#183; {lang}
      </p>
    </Link> 
  )
}