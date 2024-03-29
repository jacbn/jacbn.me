'use client';

import '@/app/globals.css';
import React from 'react';
import styles from '@/styles/home.module.css';
import Title from '@/components/title';
import HomeGrid from '@/components/homeGrid';
import NavBar from '@/components/navbar';
import HomeText from '@/components/homeText';
import AppIcon from '@/components/appIcon';
import ScrollTop from '@/components/scrollTop';
import { useEffect } from 'react';
import { animationOnLoad } from '@/scripts/animatedImages';

import { useRouter } from 'next/router';

export function HomeScript() {
  useEffect(() => animationOnLoad([
    {
      hoverId: '#cardYawningDetection', 
      imageId: '#gridImageYawningDetection',
      srcStatic: '/assets/home/logo-yawnn-static.png', 
      srcAnimated: '/assets/home/logo-yawnn.gif'
    }
  ]), []);
  return <></>;
}

export function Home() {
  return (
    <>
      <ScrollTop />
      <HomeScript />
      <h1>My Projects:</h1>
      <HomeGrid />
    </>
  );
}

export function About() {
  return (
    <>
      <ScrollTop />
      <HomeText
        title="Hi!"
        text={
          <>
            <p>I'm Jacob, a 2023 graduate of Computer Science at the University of Cambridge. I love to code, especially small projects — you can find a few of my favourites on the homepage.</p>

            <p className={styles.qna}>What are you up to at the moment?</p>
            <p className={styles.inset}>
              I started as an EdTech Software Engineer for the <a href="https://isaacphysics.org">Isaac Platform</a> (including <a href="https://adacomputerscience.org">Ada CS</a> and others to come) in September, and I'm loving it! I'm mostly working on the frontend of the platform, building the site and the tools that teachers and students use on a daily basis. It's very fulfilling — I get to see the impact of my work on a daily basis, and I'm working with a great team of people who are all passionate about what they do. Elsewhere, my work on yawning detection has been paying off — my dissertation recently won the CST Department Prize for a Highly Commended Dissertation, and the presentation for our paper took place recently; the published paper is available <a href="https://dl.acm.org/doi/10.1145/3615592.3616854">here</a>!
            </p>

            <p className={styles.qna}>Where have you worked previously?</p>
            <p className={styles.inset}>In the summer of 2022 I undertook an internship at <a href="https://umbrella.cisco.com/">Cisco Umbrella</a>, working on their <a href="https://umbrella.cisco.com/products/data-loss-prevention-dlp">Data Loss Prevention solution</a> (in short, a cloud-based network traffic analysis engine that prevents data leaks by scanning data sent through a secure web gateway). I coded in Java, mainly developing a user-facing application for encrypting customer data, though there were several instances where I branched out to other areas of the product, both to suggest and implement improvements, and to learn — one such example being how I saved almost 80% of program runtime in the worst scenario after finding a subtle problem in a library I was working with.</p>

            {/* <p className={styles.qna}>What's an ideal job for you?</p>
            <p className={styles.inset}>
              I've always wanted to work in the intersection of computer science and other fields, such as medicine, education, or the arts. I have experience in a wide range of areas, from web and mobile development to backend and machine learning, and from solo projects to industry-standard software suites — something where I can apply a range of what I've picked up would be amazing. I've always wanted to make a difference with the work I do, and doing so with equally passionate people would be a dream come true.
            </p> */}

            {/* <p>Aside from projects and work, I have a lot of interests within compsci, my favourite probably being algorithmic design; it shows up everywhere, from data science to computer architecture to graphics, and you can really appreciate the effort people have put into designing algorithms for efficiency. There's often a great accompanying story to these algorithms too, such as the development of the Ford-Fulkerson algorithm (it maximises flow through a graph), used to calculate both the maximum capacity of the Soviet rail system during the Cold War, and to see which "railway division" would be the most impactful to attack to reduce the Soviet's ability to transport troops or supplies (see the latter half of <a href="https://homepages.cwi.nl/~lex/files/histtrpclean.pdf">this</a> for more).</p> */}
            
            <p className={styles.qna}>What other hobbies do you have?</p>
            <p className={styles.inset}>I love cycling, listening to music, watching movies, gaming and travel. It's a bit of a dream of mine to tour Scandinavia one day, especially the northernmost parts to see the Northern Lights at their greatest. I've been learning Swedish for almost two years now, in the hope of not being completely lost — det är ett vackart språk! </p>

            <p className={styles.qna}>Biggest claim to fame?</p>
            <p className={styles.inset}>Greeted the King and made friends with a Lord. Homerton was great!</p>
          </>
        }
        />
      </>
  );
}

export function Contacts() {
  return (
    <>
    <ScrollTop />
      <HomeText
        title="Contacts"
        center={true}
        text={
          <>
            <p style={{textAlign: 'center'}}>I'm happy to have a chat about anything, work-related or not — just drop me a message!</p>
              <div className={styles.contactIconsContainer}> 
                <AppIcon href="https://www.linkedin.com/in/jacob-ea-brown/" image={"/assets/contacts/linkedin.svg"} />
                <AppIcon href="https://github.com/jacbn" image={"/assets/contacts/github.svg"} />
                <AppIcon hoverText="jacob@jacbn.me" href="mailto:jacob@jacbn.me" image={"/assets/contacts/email.svg"} />
                <AppIcon href="https://m.me/100054856335934" image={"/assets/contacts/messenger.svg"} />
                <AppIcon href="https://twitter.com/jcbbn" image={"/assets/contacts/twitter.svg"} />
                <AppIcon href="https://open.spotify.com/user/h8eggwh6qh1yei8m3dopgyek0" image={"/assets/contacts/spotify.svg"} />
                <AppIcon hoverText="@jzabn" image={"/assets/contacts/discord.svg"} />
                <AppIcon hoverText="SW-0524-5461-9909" image={"/assets/contacts/switch.svg"} />
              </div>
          </>
        }
      />
    </>
  );
}

export function PageContent({pageName} : {pageName : string }) {
  switch (pageName) {
    case '/about':
      return <About />;
    case '/contacts':
      return <Contacts />;
    default:
      return <Home />;
  }
}

export default function Page() {
  const router = useRouter();
  return (
    <main>
      <Title />
      <NavBar showName={false} activePage={router.asPath} />
      <PageContent pageName={router.asPath} />
    </main> 
  );
}