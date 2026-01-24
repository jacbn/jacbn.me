
import React, { useEffect } from 'react';
import AppIcon from '../../components/appIcon';
import { FeaturedProjectsGrid, WorkGrid } from '../../components/homeGrid/homeGrids';
import { Linkbacks } from '../../components/linkbacks';
import { Title } from '../../components/title';
import { Link, useLocation } from 'react-router-dom';
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
          <div className="intro-pg my-9 w-100 w-sm-75">
            <h1 className="text-highlight font-size-display mb-3 ms-lg-n6">⋅ hi! ⋅</h1>
            <p className="font-size-title">i&apos;m <span className="text-highlight">jaycie</span>, a frontend developer and aspiring designer with a passion for crafting meaningful experiences for real people.</p>
          </div>
        </FadeInWhenVisible>
      </section>
      
      <NavBar onHome={true} className="my-5" />

      <img src="/assets/home/sunset-base.gif" className="w-100 pixelated-image mt-9" alt="" />

      <section id="work" className="container-fluid g-9 pt-9">
          <h1 className="mb-8 text-dark">⋅ work ⋅</h1>
          <FadeInWhenVisible>
            <WorkGrid />
          </FadeInWhenVisible>
      </section>

      <section id="projects" className="container-fluid g-9 pt-7 pb-9">
        <h1 className="mb-4 text-dark">⋅ featured projects ⋅</h1>
        <FadeInWhenVisible>
          <FeaturedProjectsGrid />
        </FadeInWhenVisible>
        <FadeInWhenVisible className="d-flex justify-content-center home-links text-dark mt-7 mb-9">
          <Link to="/projects" className="font-size-title">See more</Link>
        </FadeInWhenVisible>
      </section>

      <img src="/assets/home/sunset-sep.png" className="w-100 pixelated-image mb-9" alt="" />

      <section id="contacts" className="home-container-thin pb-9 mb-9">
        <FadeInWhenVisible>
          <p className="text-center mb-5">i'm happy to have a chat about anything, work-related or not — just drop me a message!</p>
          <Contacts />
        </FadeInWhenVisible>
      </section>
    </main>
    <footer className="mt-9">
      <Linkbacks />
    </footer>
  </>;
};

export const Contacts = () => {
  return <div className="d-flex justify-content-center flex-wrap gap-3"> 
    <AppIcon href="https://www.linkedin.com/in/jaycie-bn/" image={"/assets/contacts/linkedin.svg"} />
    <AppIcon href="https://github.com/jacbn" image={"/assets/contacts/github.svg"} />
    <AppIcon hoverText="hello@jaycie.me" href="mailto:hello@jaycie.me" image={"/assets/contacts/email.svg"} />
    <AppIcon href="https://m.me/100054856335934" image={"/assets/contacts/messenger.svg"} />
    <AppIcon hoverText="@jzabn" image={"/assets/contacts/discord.svg"} />
    <AppIcon href="https://open.spotify.com/user/h8eggwh6qh1yei8m3dopgyek0" image={"/assets/contacts/spotify.svg"} />
    <AppIcon hoverText="SW-0524-5461-9909" image={"/assets/contacts/switch.svg"} />
  </div>;
};
