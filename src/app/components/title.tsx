import styles from '../page.module.css'

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
                    <use xlinkHref="#s-text2" className={styles.titleText} stroke='#a0a0a0'></use>
                    <use xlinkHref="#s-text2" className={styles.titleTextFadeG}></use>
                    <use xlinkHref="#s-text" className={styles.titleText} stroke='white'></use>
                    <use xlinkHref="#s-text" className={styles.titleTextFadeW}></use>
                </g>
            </svg>
            <h2 className={styles.roller}>
                <span className={styles.rollerText}>
                    Software Engineer
                    <br />
                    Python &#183; Java &#183; Flutter &#183; React
                </span>
            </h2>
        </div>
    )
}