import styles from '../styles/home.module.css'

export default function Title() {
    return (
        <div className={styles.titleContainer}>
            <svg className={styles.titleSVG}>
                <symbol id="s-text">
                    <text x="48%" y="59%" textAnchor='middle'>Jacob</text>
                </symbol>
                <symbol id="s-text2">
                    <text x="52%" y="99%" textAnchor='middle'>Brown</text>
                </symbol>
                <g>
                    <use xlinkHref="#s-text2" className={`${styles.titleText} ${styles.titleSecondaryStroke}`}></use>
                    <use xlinkHref="#s-text2" className={`${styles.titleText} ${styles.titleFade} ${styles.titleSecondaryFill}`}></use>
                    <use xlinkHref="#s-text" className={`${styles.titleText} ${styles.titlePrimaryStroke}`}></use>
                    <use xlinkHref="#s-text" className={`${styles.titleText} ${styles.titleFade} ${styles.titlePrimaryFill}`}></use>
                </g>
            </svg>
            <h3 className={styles.roller}>
                <span className={styles.rollerText}>
                    Software Engineer
                    <br />
                    Python &#183; Java &#183; Flutter &#183; React
                </span>
            </h3>
        </div>
    )
}