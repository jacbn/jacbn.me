import '@/app/globals.css'
import styles from '@/styles/projects.module.css'

import Link from 'next/link'
import React, { useState, useRef, useEffect } from "react";
import 'material-icons/iconfont/material-icons.css'


export function NavBox({text, href, active}: {text: string, href: string, active?: boolean}) {
  return (
    <Link className={`${styles.navBox} ${(active) ? styles.activeNavBox : ''}`} href={href}>{text}</Link>
  )
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
    <div className={`${styles.navBox} ${open ? styles.activeNavBox : ''}`} onClick={() => setOpen(b => !b)} ref={ref}>
      <span className="material-icons-round">menu</span>
      {(open) && (
        <section className={styles.hamburgerMenu}>
          <NavBox text="Home" href="/" />
          <NavBox text="About Me" href="/about" />
          <NavBox text="Contacts" href="/contacts" />
        </section>
      )}
    </div>
  )
}

export default class NavBar extends React.Component<{showName: boolean, activePage?: string}, {windowWidth : number}> {
  constructor(props: any) {
    super(props)
    this.state = {windowWidth: window.innerWidth}
  }

  componentDidMount(): void {
    window.addEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this))
  }

  updateWindowDimensions(): void {
    this.setState({windowWidth: window.innerWidth})
  }

  render(): JSX.Element {
    const onMainPages = this.props.activePage === '/' || this.props.activePage === '/about' || this.props.activePage === '/contacts';
    return (
      <nav>
        <div className={styles.myName}>
        {/* do not move conditional outside, empty div keeps the rest right-floating */}
        {this.props.showName && (
          <Link href="/">
            <span className={styles.titlePrimary}>Jacob </span> 
            <span className={styles.titleSecondary}> Brown</span>
          </Link>
        )}
        </div>
        <div>
          {((onMainPages && this.state.windowWidth < 300) || (!onMainPages && this.state.windowWidth < 600)) ? (
            <HamburgerBox />
          ) : (
            <>
              <NavBox text="Contacts" href="/contacts" active={this.props.activePage === '/contacts'} />
              <NavBox text="About Me" href="/about" active={this.props.activePage === '/about'} />
              <NavBox text="Home" href="/" active={this.props.activePage === '/'} />
            </>
          )}
        </div>
      </nav>
    );
  }
}
