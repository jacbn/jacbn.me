import styles from '../page.module.css'
import GridImage from "./gridImage";
import { GridImageProps } from "./gridImage";

export interface GridSquareProps {
  title: string;
  description: string;
  year: number;
  lang: string;
  colour: string;
  image: GridImageProps;
  link: string;
  podiumNum?: number;
}

export default function GridSquare({title, description, year, lang, colour, image, link, podiumNum = 0} : GridSquareProps) {
  // let cardClass = "card transition" + (podiumNum == 0 ? "" : " podium" + podiumNum);
  const cardClass = `${styles.card} ${styles.transition} ${podiumNum == 0 ? "" : styles.podium + podiumNum}`
  return (
    <li className={cardClass} data-href={link}>
      <div className={styles.cardTop} style={{backgroundColor: colour}}>
        <GridImage path={image.path} alt={image.alt} />
      </div>
      <div className={styles.cardBase}>
        <h2 className={styles.cardTitle} style={{color: colour}}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <p className={styles.projectInfoText}>
        {year} &#183; {lang}
      </p>
    </li>
  )
}