'use client';

import Link from 'next/link';
import React, { useState, useRef, useEffect } from "react";
import 'material-icons/iconfont/material-icons.css';
import useDeviceSize, { below } from '@/scripts/hooks/deviceSize';

export function NavBox({text, href, active}: {text: string, href: string, active?: boolean}) {
  return (
    <Link className={`navBox ${active ? 'activeNavBox' : ''}`} href={href}>{text}</Link>
  );
}

export function HamburgerBox() {
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event : any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={`navBox ${open ? 'activeNavBox' : ''}`} onClick={() => setOpen(b => !b)} ref={ref}>
      <span className="material-icons-round">menu</span>
      {(open) && (
        <section className="hamburgerMenu">
          <NavBox text="Home" href="/" />
          <NavBox text="About Me" href="/about" />
          <NavBox text="Contacts" href="/contacts" />
        </section>
      )}
    </div>
  );
}

// extends React.Component<{showName: boolean, activePage?: string}, {windowWidth : number}> {

interface NavBarProps {
  showName: boolean;
  activePage?: string;
}

export const NavBar = ({showName, activePage} : NavBarProps) => {

  const deviceSize = useDeviceSize();

  const onMainPages = activePage === '/' || activePage === '/about' || activePage === '/contacts';
  return (
    <nav>
      <div className="myName">
        {/* do not move conditional outside, empty div keeps the rest right-floating */}
        {showName && (
          <Link href="/">
            <span className="titlePrimary">Jacob </span> 
            <span className="titleSecondary"> Brown</span>
          </Link>
        )}
      </div>
      <div>
        {((onMainPages && below["xs"](deviceSize)) || (!onMainPages && below["sm"](deviceSize))) ? (
          <HamburgerBox />
        ) : (
          <>
            <NavBox text="Contacts" href="/contacts" active={activePage === '/contacts'} />
            <NavBox text="About Me" href="/about" active={activePage === '/about'} />
            <NavBox text="Home" href="/" active={activePage === '/'} />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
