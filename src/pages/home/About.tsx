
import React from 'react';
import HomeText from '../../components/homeText';
import { Link } from 'react-router';

export function About() {
  return <HomeText
    title="About me"
    text={
      <>
        <p>
          I'm Jaycie, a Research Software Engineer at (and 2023 graduate of) the University of Cambridge. My work focuses on frontend development with React, though my biggest passion is UI/UX — in designing everything from individual components to extended user flows, in beautifying the user experience without sacrificing accessibility, and in understanding the psychology behind how people interact with a site.
        </p>

        <h3 className="text-highlight">What are you up to at the moment?</h3>
        <div className="inset">
          <p>
            I currently work for the <a href="https://isaacscience.org">Isaac</a> and <a href="https://adacomputerscience.org">Ada CS</a> platforms, a pair of online STEM learning platforms aimed at students in secondary school — I love it! I work mainly on the (<a href="https://github.com/isaacphysics/isaac-react-app">open source</a>!) frontend of the platform, building the site and the tools that teachers and students use on a daily basis. It's very fulfilling — I get to see the impact of my work on a daily basis, and I'm working with a great team of people who are all passionate about what they do.
          </p>
          <p>
            I also supervise the first-year Algorithms course (parts <a href="https://www.cl.cam.ac.uk/teaching/2425/Algorithm1/">1</a> and <a href="https://www.cl.cam.ac.uk/teaching/2425/Algorithm2/">2</a>) at the uni, and have run both real admissions interviews and prep sessions for them; a special hello if you're one of my students :)
          </p>
        </div>
        <h3 className="text-highlight">Where have you worked previously?</h3>
        <div className="inset">
          <p>In the summer of 2022 I undertook an internship at <a href="https://umbrella.cisco.com/">Cisco Umbrella</a>, working on their <a href="https://umbrella.cisco.com/products/data-loss-prevention-dlp">Data Loss Prevention solution</a> (in short, a cloud-based network traffic analysis engine that prevents data leaks by scanning data sent through a secure web gateway). I coded in Java, mainly developing a user-facing application for encrypting customer data, though there were several instances where I branched out to other areas of the product, both to suggest and implement improvements, and to learn — one such example being how I saved almost 80% of program runtime in the worst scenario after finding a subtle problem in a library I was working with.</p>
          <p>(<Link to="/cv">Looking for a CV?</Link> &ndash; last updated 05/08/25)</p>
        </div>

        {/* <p className="qna">What's an ideal job for you?</p>
        <p className="inset">
          I've always wanted to work in the intersection of computer science and other fields, such as medicine, education, or the arts. I have experience in a wide range of areas, from web and mobile development to backend and machine learning, and from solo projects to industry-standard software suites — something where I can apply a range of what I've picked up would be amazing. I've always wanted to make a difference with the work I do, and doing so with equally passionate people would be a dream come true.
        </p> */}

        {/* <p>Aside from projects and work, I have a lot of interests within compsci, my favourite probably being algorithmic design; it shows up everywhere, from data science to computer architecture to graphics, and you can really appreciate the effort people have put into designing algorithms for efficiency. There's often a great accompanying story to these algorithms too, such as the development of the Ford-Fulkerson algorithm (it maximises flow through a graph), used to calculate both the maximum capacity of the Soviet rail system during the Cold War, and to see which "railway division" would be the most impactful to attack to reduce the Soviet's ability to transport troops or supplies (see the latter half of <a href="https://homepages.cwi.nl/~lex/files/histtrpclean.pdf">this</a> for more).</p> */}
        
        <h3 className="text-highlight">What other hobbies do you have?</h3>
        <p className="inset">Cross stitch, music, pixel art, drawing, movies, gaming and, of course, travel. I recently fulfilled a huge dream of mine to tour Scandinavia, doing a loop around Sweden, Norway and Denmark. It was such an incredible experience — the Swedish I've been learning paid off, and I have memories to last a lifetime. I'd love to go back and see the northernmost parts at some point to see the Northern Lights at their greatest!</p>

        <h3 className="text-highlight">Biggest claim to fame?</h3>
        <p className="inset">Greeted the King and made friends with a Lord. Homerton was great!</p>
      </>
    }
    />;
}
