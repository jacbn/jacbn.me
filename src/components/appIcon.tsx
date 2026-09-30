import classNames from 'classnames';
import React from 'react';
import { useState } from "react";

interface AppIconProps extends React.HTMLAttributes<HTMLAnchorElement> {
  image: string;
  href?: string;
  hoverText?: string;
}

export default function AppIcon({image, href, hoverText, ...rest} : AppIconProps) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  return <a href={href} 
    className={classNames({"contact-icon-tooltip-container": hoverText})} 
    onMouseEnter={() => setHover(true)} 
    onMouseLeave={() => setHover(false)}
    {...rest}
  >
    <img className={`contact-icon contactIconFilter`} src={image} onClick={() => setActive(a => !a)} />
    {hoverText && <span className={classNames({"hidden": !(hover || active)})}>{hoverText}</span>}
  </a>;
}
