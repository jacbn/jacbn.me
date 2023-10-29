import React from 'react';
import styles from "@/styles/home.module.css";
import { useState } from "react";

export default function AppIcon({image, href, hoverText} : {image: string, href?: string, hoverText?: string}) {
  const containerStyle = `${styles.iconContainer} ${(hoverText) ? styles.tooltip : ''}`;
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <>
      <a className={containerStyle} href={href}>
        <img className={`${styles.icon} ${styles.contactIconFilter}`} src={image} onClick={() => setActive(a => !a)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        />
        {(hoverText) && <span className={`${styles.tooltipText} ${(hover || active) ? styles.tooltipVisible : styles.tooltipHidden}`}>{hoverText}</span>}
      </a>
    </>
  )
}