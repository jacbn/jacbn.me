import { Link, useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";
import 'material-icons/iconfont/material-icons.css';
import useDeviceSize, { below } from '../scripts/hooks/deviceSize';

export function NavBox({text, href, active}: {text: string, href: string, active?: boolean}) {
  return (
    <Link className={`navBox ${active ? 'activeNavBox' : ''}`} to={href}>{text}</Link>
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

interface NavBarProps {
  showName: boolean;
}

export const NavBar = ({showName} : NavBarProps) => {

  const deviceSize = useDeviceSize();
  const location = useLocation();

  return (
    <nav>
      {showName && (
        <Link to="/" className="mx-3 nav-name">
          jaycie
        </Link>
      )}
      <div className="d-flex flex-row ms-auto">
        {below["sm"](deviceSize) ? (
          <HamburgerBox />
        ) : (
          <>
            <NavBox text="Home" href="/" active={location.pathname === '/'} />
            <NavBox text="Blog" href="/blog" active={location.pathname === '/blog'} />
            <NavBox text="About Me" href="/about" active={location.pathname === '/about'} />
            <NavBox text="Contacts" href="/contacts" active={location.pathname === '/contacts'} />
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
