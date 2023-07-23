import styles from '@/styles/home.module.css'

export default function Title() {
    return (
        <div className={styles.titleContainer}>
            <div className={styles.titleBackground}></div>
            <svg className={styles.titleSVG}>
                <symbol id="s-text">
                    <text x="48%" y="59%" textAnchor='middle'>Jacob</text>
                </symbol>
                <symbol id="s-text2">
                    <text x="52%" y="99%" textAnchor='middle'>Brown</text>
                </symbol>
                <mask id="mask">
                    <rect width="100%" height="100%" fill="white" />
                    <use xlinkHref="#s-text" className={`${styles.titleText} ${styles.titleMask}`} />
                    <use xlinkHref="#s-text2" className={`${styles.titleText} ${styles.titleMask}`} />
                </mask>
                <g>
                    <use xlinkHref="#s-text2" className={`${styles.titleText} ${styles.titleStrokeAnimation} ${styles.titleSecondaryStroke}`} mask='url(#mask)'></use>
                    <use xlinkHref="#s-text2" className={`${styles.titleText} ${styles.titleFillAnimation} ${styles.titleSecondaryFill}`} mask='url(#mask)'></use>
                    <use xlinkHref="#s-text" className={`${styles.titleText} ${styles.titleStrokeAnimation} ${styles.titlePrimaryStroke}`} mask='url(#mask)'></use>
                    <use xlinkHref="#s-text" className={`${styles.titleText} ${styles.titleFillAnimation} ${styles.titlePrimaryFill}`} mask='url(#mask)'></use>
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