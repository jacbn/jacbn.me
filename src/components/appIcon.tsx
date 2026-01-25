import classNames from 'classnames';
import React from 'react';
import { useState } from "react";

export default function AppIcon({image, href, hoverText} : {image: string, href?: string, hoverText?: string}) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <>
      <a className={classNames({"contact-icon-tooltip-container": hoverText})} href={href} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img className={`contact-icon contactIconFilter`} src={image} onClick={() => setActive(a => !a)} />
        {(hoverText) && <span className={classNames({"hidden": !(hover || active)})}>{hoverText}</span>}
      </a>
    </>
  );
}
