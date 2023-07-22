import styles from "@/styles/home.module.css"

export default function AppIcon({image, href, hoverText} : {image: string, href?: string, hoverText?: string}) {
  const containerStyle = `${styles.iconContainer} ${(hoverText) ? styles.tooltip : ''}`;
  return (
    <>
      <a className={containerStyle} href={href}>
        <img className={`${styles.icon} ${styles.filterWhite}`} src={image} />
        {(hoverText) && <span className={styles.tooltipText}>{hoverText}</span>}
      </a>
    </>
  )
}