import MathsSquare from '@/components/mathsGrid/mathsSquare'
import NavBar from '@/components/navbar'
import styles from '@/styles/mathsart.module.css'
import bodyStyles from '@/styles/body.module.css'
import { useRouter } from 'next/router'
import Apollo from './_apollo'
import Radials from './_radials'
import Lotfollah from './_lotfollah'
import Link from 'next/link'
import 'material-icons/iconfont/material-icons.css'
import { useEffect } from 'react'
import CanvasScript from './canvasScript'

export function MathsArtDirectory() {
  return (
    <div className={bodyStyles.projectHomeContainer}>
      <CanvasScript startFunction={() => {}} /> {/* runs the colour scheme abort controller code */}
      <h1>Maths Art</h1> 
      <p className={styles.topText}>
        Initially to practice math modules in Python (e.g. NumPy and Matplotlib), and now mainly for fun, I've made several projects relating to making art using maths; I've ported some of my favourites to JavaScript so you can see a live preview. You can also find the JS and, where applicable, Python files on the respective pages.
      </p>
      <ol className={styles.mathsArtGrid}>
        <MathsSquare href="./maths-art/apollo" title="Apollonian Gaskets" image={{src: "/assets/maths/apollo.png", srcLight: "/assets/maths/apollo-light.png",  alt: "An image of an Apollonian Gasket."}} />
        <MathsSquare href="./maths-art/radials" title="Radial Circles" image={{src: "/assets/maths/radials.png", srcLight: "/assets/maths/radials-light.png", alt: "An image of a nested epicycloid."}} />
        <MathsSquare href="./maths-art/lotfollah" title="Lotfollah Mosque Dome" image={{src: "/assets/maths/lotfollah.png", srcLight: "/assets/maths/lotfollah-light.png", alt: "An image of a reconstruction of the Lotfollah Mosque Dome."}} />
      </ol>
    </div>
  )
}

export function BackToMathsDirectory() {
  return (
    <div className={styles.backToMathsDirectory}>
      <Link href="/maths-art">
        <span className="material-icons-round">arrow_back</span>
      </Link>
    </div>
  )
}

export function MathsArtPageContent({pageName} : {pageName : string }) {
  switch (pageName) {
    case '/maths-art/apollo':
      return (
        <>
          <BackToMathsDirectory />
          <Apollo />
        </>
      )
    case '/maths-art/lotfollah':
      return (
        <>
          <BackToMathsDirectory />
          <Lotfollah />
        </>
      )
    case '/maths-art/radials':
      return (
        <>
          <BackToMathsDirectory />
          <Radials />
        </>
      )
    default:
      return <MathsArtDirectory />
  }
}

export default function MathsArt() {
  const router = useRouter();
  return (
    <>
      <NavBar showName={true} />
      <main>
        <MathsArtPageContent pageName={router.asPath} />
      </main>
    </>
  )
}