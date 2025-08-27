
import React from 'react';
import AppIcon from '../components/appIcon';
import HomeGrid from '../components/homeGrid';
import HomeText from '../components/homeText';
import { Link } from 'react-router-dom';
import { Linkbacks } from '../components/linkbacks';

export function Home() {
  return (
    <main className="home-bg">
      <h1>My Projects:</h1>
      <HomeGrid />
      <Linkbacks />
    </main>
  );
}

export function About() {
  return <HomeText
    title="Hi!"
    text={
      <>
        <p>I'm Jaycie, a Research Software Engineer at (and 2023 graduate of) the University of Cambridge. I specialise in frontend development with React, with nearly 2 years of professional experience and many more in education and working on personal projects.</p>

        <p className="qna">What are you up to at the moment?</p>
        <p className="inset">
          I currently work for the <a href="https://isaacscience.org">Isaac</a> and <a href="https://adacomputerscience.org">Ada CS</a> platforms, a pair of online STEM learning platforms aimed at students in secondary school — I love it! I work mainly on the (<a href="https://github.com/isaacphysics/isaac-react-app">open source</a>!) frontend of the platform, building the site and the tools that teachers and students use on a daily basis. It's very fulfilling — I get to see the impact of my work on a daily basis, and I'm working with a great team of people who are all passionate about what they do.
          I also supervise the first-year Algorithms course (parts <a href="https://www.cl.cam.ac.uk/teaching/2425/Algorithm1/">1</a> and <a href="https://www.cl.cam.ac.uk/teaching/2425/Algorithm2/">2</a>) at the uni; a special hello if you're one of my students :)
        </p>
        <p className="qna">Where have you worked previously?</p>
        <div className="inset">
          <p>In the summer of 2022 I undertook an internship at <a href="https://umbrella.cisco.com/">Cisco Umbrella</a>, working on their <a href="https://umbrella.cisco.com/products/data-loss-prevention-dlp">Data Loss Prevention solution</a> (in short, a cloud-based network traffic analysis engine that prevents data leaks by scanning data sent through a secure web gateway). I coded in Java, mainly developing a user-facing application for encrypting customer data, though there were several instances where I branched out to other areas of the product, both to suggest and implement improvements, and to learn — one such example being how I saved almost 80% of program runtime in the worst scenario after finding a subtle problem in a library I was working with.</p>
          <p>(<Link to="/cv">Looking for a CV?</Link> &ndash; last updated 05/08/25)</p>
        </div>

        {/* <p className="qna">What's an ideal job for you?</p>
        <p className="inset">
          I've always wanted to work in the intersection of computer science and other fields, such as medicine, education, or the arts. I have experience in a wide range of areas, from web and mobile development to backend and machine learning, and from solo projects to industry-standard software suites — something where I can apply a range of what I've picked up would be amazing. I've always wanted to make a difference with the work I do, and doing so with equally passionate people would be a dream come true.
        </p> */}

        {/* <p>Aside from projects and work, I have a lot of interests within compsci, my favourite probably being algorithmic design; it shows up everywhere, from data science to computer architecture to graphics, and you can really appreciate the effort people have put into designing algorithms for efficiency. There's often a great accompanying story to these algorithms too, such as the development of the Ford-Fulkerson algorithm (it maximises flow through a graph), used to calculate both the maximum capacity of the Soviet rail system during the Cold War, and to see which "railway division" would be the most impactful to attack to reduce the Soviet's ability to transport troops or supplies (see the latter half of <a href="https://homepages.cwi.nl/~lex/files/histtrpclean.pdf">this</a> for more).</p> */}
        
        <p className="qna">What other hobbies do you have?</p>
        <p className="inset">I love cycling, music, pixel art, movies, gaming and travel. I recently fulfilled a huge dream of mine to tour Scandinavia, doing a loop around Sweden, Norway and Denmark. It was such an incredible experience — the Swedish I've been learning paid off, and I have memories to last a lifetime. I'd love to go back and see the northernmost parts at some point to see the Northern Lights at their greatest!</p>

        <p className="qna">Biggest claim to fame?</p>
        <p className="inset">Greeted the King and made friends with a Lord. Homerton was great!</p>
      </>
    }
    />;
}

export function Contacts() {
  return <HomeText
    title="Contacts"
    center={true}
    text={
      <>
        <p className="text-center">I'm happy to have a chat about anything, work-related or not — just drop me a message!</p>
        <div className="contactIconsContainer"> 
          <AppIcon href="https://www.linkedin.com/in/jaycie-bn/" image={"/assets/contacts/linkedin.svg"} />
          <AppIcon href="https://github.com/jacbn" image={"/assets/contacts/github.svg"} />
          <AppIcon hoverText="hello@jaycie.me" href="mailto:hello@jaycie.me" image={"/assets/contacts/email.svg"} />
          <AppIcon href="https://m.me/100054856335934" image={"/assets/contacts/messenger.svg"} />
          <AppIcon href="https://open.spotify.com/user/h8eggwh6qh1yei8m3dopgyek0" image={"/assets/contacts/spotify.svg"} />
          <AppIcon hoverText="@jzabn" image={"/assets/contacts/discord.svg"} />
          <AppIcon hoverText="SW-0524-5461-9909" image={"/assets/contacts/switch.svg"} />
        </div>
        <p className="small text-muted mt-5"><em>some of these links are still in my deadname. i'm working on it 😭 please use jaycie if you reach out :) thanks!</em></p>
      </>
    }
  />;
}
