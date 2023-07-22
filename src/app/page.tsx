'use client'

import styles from '@/styles/home.module.css'
import Title from '@/components/title'
import MainGrid from '@/components/mainGrid'
import NavBar from '@/components/navbar'
import HomeText from '@/components/homeText'
import AppIcon from '@/components/appIcon'
import ScrollTop from '@/components/scrollTop'
import React, { PureComponent } from 'react'

import im_discord from './assets/discord.svg'
import im_github from './assets/github.svg'
import im_linkedin from './assets/linkedin.svg'
import im_messenger from './assets/messenger.svg'
import im_spotify from './assets/spotify.svg'
import im_switch from './assets/switch.svg'
import im_twitter from './assets/twitter.svg'

export function Home() {
  return (
    <>
      <ScrollTop />
      <h1>My Projects:</h1>
      <MainGrid />
    </>
  )
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
            <p className={styles.inset}>I finished my finals last month, so I'm currently enjoying a small break. I've been getting on with a few projects that I had to put off for uni, including updating this website (now in React!). I've also been working with my diss supervisor to extend the work I did there and write up a full paper, which we've now completed and submitted to the SmartWear 2023 Workshop on Smart Wearable Systems and Applications! Then lastly, as ever, I'm on the lookout for a new job. If you're interested in hiring me, please do get in touch!</p>

            <p className={styles.qna}>Where have you worked previously?</p>
            <p className={styles.inset}>In the summer of 2022 I undertook an internship at <a href="https://umbrella.cisco.com/">Cisco Umbrella</a>, working on their <a href="https://umbrella.cisco.com/products/data-loss-prevention-dlp">Data Loss Prevention solution</a> (in short, a cloud-based network traffic analysis engine that prevents data leaks by scanning data sent through a secure web gateway). I coded in Java, mainly developing a user-facing application for encrypting customer data, though there were several instances where I branched out to other areas of the product, both to suggest and implement improvements, and to learn — one such example being how I saved almost 80% of program runtime in the worst scenario after finding a subtle problem in a library I was working with.</p>

            <p className={styles.qna}>What's an ideal job for you?</p>
            <p className={styles.inset}>
              I've always wanted to work in the intersection of computer science and other fields, such as medicine, education, or the arts. I have experience in a wide range of areas, from web and mobile development to backend and machine learning, and from solo projects to industry-standard software suites — something where I can apply a range of what I've picked up would be amazing. I've always wanted to make a difference with the work I do, and doing so with equally passionate people would be a dream come true.
            </p>

            {/* <p>Aside from projects and work, I have a lot of interests within compsci, my favourite probably being algorithmic design; it shows up everywhere, from data science to computer architecture to graphics, and you can really appreciate the effort people have put into designing algorithms for efficiency. There's often a great accompanying story to these algorithms too, such as the development of the Ford-Fulkerson algorithm (it maximises flow through a graph), used to calculate both the maximum capacity of the Soviet rail system during the Cold War, and to see which "railway division" would be the most impactful to attack to reduce the Soviet's ability to transport troops or supplies (see the latter half of <a href="https://homepages.cwi.nl/~lex/files/histtrpclean.pdf">this</a> for more).</p> */}
            
            <p className={styles.qna}>What other hobbies do you have?</p>
            <p className={styles.inset}>I love cycling, listening to music, watching movies, gaming and travel. It's a bit of a dream of mine to tour Scandinavia one day, especially the northernmost parts to see the Northern Lights at their greatest. I'm learning Swedish so I won't be completely lost — det är ett vackart språk! </p>

            <p className={styles.qna}>Biggest claim to fame?</p>
            <p className={styles.inset}>Greeted the King and made friends with a Lord. Homerton was great!</p>
          </>
        }
        />
      </>
  )
}

export function Contact() {
  return (
    <>
    <ScrollTop />
      <HomeText
        title="Contacts"
        center={true}
        text={
          <>
            <p>I'm happy to have a chat about anything, work-related or not -- just drop me a message!</p>
              <div> 
                <AppIcon href="https://www.linkedin.com/in/jacob-ea-brown/" image={im_linkedin.src} />
                <AppIcon href="https://github.com/jacbn" image={im_github.src} />
                <AppIcon href="https://m.me/100054856335934" image={im_messenger.src} />
                <AppIcon href="https://twitter.com/jcbbn" image={im_twitter.src} />
                <AppIcon href="https://open.spotify.com/user/h8eggwh6qh1yei8m3dopgyek0" image={im_spotify.src} />
                <AppIcon hoverText="@jzabn" image={im_discord.src} />
                <AppIcon hoverText="SW-0524-5461-9909" image={im_switch.src} />
              </div>
          </>
        }
      />
    </>
  )
}

export class Page extends PureComponent<{}, { page : React.JSX.Element }> {
  constructor(props : any) {
    super(props);
    this.state = {page: <Home />}
  }

  switchToPage(pageName : string) {
    switch (pageName) {
      case 'about':
        this.setState({page: <About />})
        break;
      case 'contact':
        this.setState({page: <Contact />})
        break;
      default:
        this.setState({page: <Home />})
        break;
    }
  }

  render() {
    return (
      <main>
        <Title />
        <NavBar showName={false} onClickFunction={(pageName : string) => this.switchToPage(pageName)} />
        {this.state.page}
      </main> 
    )
  }
}

export default Page;
