import classNames from 'classnames';
import React from 'react';
import { useState } from "react";

type AppIconProps = React.HTMLAttributes<HTMLElement> & {
  icon: string;
  href?: string;
  hoverText?: string;
};

export default function AppIcon({icon, href, hoverText, ...rest} : AppIconProps) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const hoverProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => setActive(!active)
  };

  if (href) {
    return <a href={href} className={classNames({"contact-icon-tooltip-container": hoverText})} {...hoverProps} {...rest}>
      <i className={`icon icon-xxl icon-contact-${icon} position-absolute`} color="blue-secondary" style={{marginTop: "4px", marginLeft: "-4px"}} />
      <i className={`icon icon-xxl icon-contact-${icon}`} color={hover || active ? "pink-primary" : "white"} />
      {hoverText && <span className={classNames({"hidden": !(hover || active)})}>{hoverText}</span>}
    </a>;
  } else {
    return <div className={classNames({"contact-icon-tooltip-container": hoverText})} {...hoverProps} {...rest}>
      <i className={`icon icon-xxl icon-contact-${icon} position-absolute`} color="blue-secondary" style={{marginTop: "4px", marginLeft: "-4px"}} />
      <i className={`icon icon-xxl icon-contact-${icon}`} color={hover || active ? "pink-primary" : "white"} />
      {hoverText && <span className={classNames({"hidden": !(hover || active)})}>{hoverText}</span>}
    </div>;
  }
}
