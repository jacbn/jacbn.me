
import React, { useEffect } from 'react';
import AppIcon from '../../components/appIcon';
import { FeaturedProjectsGrid, WorkGrid } from '../../components/homeGrid/homeGrids';
import { Linkbacks } from '../../components/linkbacks';
import { Title } from '../../components/title';
import { Link, useLocation } from 'react-router';
import { scrollIntoView } from '../../utils/scroll';
import NavBar from '../../components/navbar';
import { FadeInWhenVisible } from '../../components/animation/fadeInWhenVisible';

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.slice(1);
    scrollIntoView(hash);
  }, [location.hash]);

  return <>
    <header>
        <Title full />
    </header>
    <main className="home-bg">
      <section id="intro" className="home-container-thin">
        <FadeInWhenVisible>
          <div className="intro-pg mt-9 mb-0 mb-md-9 w-100 w-sm-75">
            <div className="text-highlight font-title font-size-display mb-3 ms-lg-n6">⋅ hi! ⋅</div>
            <p className="font-size-title font-title">i&apos;m <span className="text-highlight">jaycie</span>, a frontend developer and aspiring designer with a passion for crafting meaningful experiences for real people.</p>
          </div>
        </FadeInWhenVisible>
      </section>
      
      <NavBar onHome={true} className="mt-5 mb-2 mb-sm-5" />

      <div className="title-base-wrapper w-100">
        <img src="/assets/home/sunset-base.gif" className="w-100 pixelated-icon mt-md-9" alt="" />
      </div>

      <section id="work" className="container-fluid g-9 pt-9">
          <h2 className="mb-4 mb-md-6 text-dark text-shadow-light">⋅ work ⋅</h2>
          <FadeInWhenVisible>
            <WorkGrid />
          </FadeInWhenVisible>
      </section>

      <section id="projects" className="container-fluid g-9 pt-7 pb-9">
        <h2 className="mb-4 mb-md-6 text-dark text-shadow-light">⋅ featured personal projects ⋅</h2>
        <FadeInWhenVisible>
          <FeaturedProjectsGrid />
        </FadeInWhenVisible>
        <FadeInWhenVisible className="d-flex justify-content-center home-links text-dark mt-7 mb-9">
          <Link to="/projects" className="font-size-title">See more</Link>
        </FadeInWhenVisible>
      </section>

      <section id="looking-for-work" className="container-fluid text-dark text-center g-9 pb-9">
        <FadeInWhenVisible>
          <h2>i'm currently looking for work!</h2>
        </FadeInWhenVisible>
        <FadeInWhenVisible>
          <p className="font-size-label">
            Like what you see and want to talk? I'm particularly interested in contract work, but will consider all opportunities.
          </p>
          <p className="font-size-label">
            You can find my full CV or get in touch with the links below.
            Formal and informal queries are equally welcome!
          </p>
          <div className="d-flex justify-content-center mt-3">
            <a href="/assets/cv/tech.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary shadow-light border-4 rounded-5">
              View my CV
            </a>
          </div>
        </FadeInWhenVisible>
      </section>

      <img src="/assets/home/sunset-sep.png" className="w-100 pixelated-image mb-9" alt="" />

      <section id="contacts" className="container-fluid g-9 pb-9 mb-9">
        <FadeInWhenVisible>
          {/* <p className="text-center mb-5">i'm happy to have a chat about anything, work-related or not — just drop me a message!</p> */}
          <p className="text-center mb-5">my links:</p>
          <Contacts />
        </FadeInWhenVisible>
      </section>
    </main>
    <footer className="mt-9 d-flex align-items-center justify-content-end gap-2 font-title text-highlight">
      <Link to="/demos/ada-double-back" className="nav-link px-3 py-1 text-decoration-underline">play a game</Link>
      <div className="flex-grow-1" />
      <Linkbacks />
    </footer>
  </>;
};

export const Contacts = () => {
  return <div className="d-flex justify-content-center flex-wrap"> 
    <AppIcon href="https://www.linkedin.com/in/jaycie-bn/" icon="linkedin" aria-label="LinkedIn" />
    <AppIcon href="https://github.com/jacbn" icon="github" aria-label="GitHub" />
    <AppIcon hoverText="hello@jaycie.me" href="mailto:hello@jaycie.me" icon="email" aria-label="Email" />
    <AppIcon href="https://m.me/100054856335934" icon="messenger" aria-label="Messenger" />
    <AppIcon hoverText="@jzabn" icon="discord" aria-label="Discord" />
    <AppIcon href="https://open.spotify.com/user/h8eggwh6qh1yei8m3dopgyek0" icon="spotify" aria-label="Spotify" />
    <AppIcon hoverText="SW-0524-5461-9909" icon="switch" aria-label="Nintendo Switch" />
  </div>;
};
