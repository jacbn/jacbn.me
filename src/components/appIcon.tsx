import React from 'react';
import { useState } from "react";

export default function AppIcon({image, href, hoverText} : {image: string, href?: string, hoverText?: string}) {
  const containerStyle = `iconContainer ${(hoverText) ? "iconTooltip" : ''}`;
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <>
      <a className={containerStyle} href={href}>
        <img className={`icon contactIconFilter`} src={image} onClick={() => setActive(a => !a)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        />
        {(hoverText) && <span className={`tooltipText ${(hover || active) ? "tooltipVisible" : "tooltipHidden"}`}>{hoverText}</span>}
      </a>
    </>
  );
}
