import MathsSquare from '@/components/mathsGrid/mathsSquare'
import NavBar from '@/components/navbar'
import styles from '@/styles/mathsart.module.css'
import Apollo from './_apollo'
import { useRouter } from 'next/router'
import Radials from './_radials'
import Lotfollah from './_lotfollah'

export function MathsArtDirectory() {
  return (
    <div className={styles.bodyContainer}>
      <h1>Maths Art</h1> 
      <p style={{width: "65%", textAlign: 'center'}}>
        Initially to practice math modules in Python (e.g. NumPy and Matplotlib), and now mainly for fun, I've made several projects relating to making art using maths; I've ported some of my favourites to JavaScript so you can see a live preview. You can also find the JS and, where applicable, Python files on the respective pages.
      </p>
      <ol className={styles.mathsArtGrid}>
        <MathsSquare href="./maths-art/apollo" title="Apollonian Gaskets" image={{src: "/assets/maths/apollo.png", alt: "An image of an Apollonian Gasket."}} />
        <MathsSquare href="./maths-art/lotfollah" title="Lotfollah Mosque Dome" image={{src: "/assets/maths/lotfollah.png", alt: "An image of a reconstruction of the Lotfollah Mosque Dome."}} />
        <MathsSquare href="./maths-art/radials" title="Radial Circles" image={{src: "/assets/maths/radials.png", alt: "An image of a nested epicycloid."}} />
      </ol>
    </div>
  )
}

export function MathsArtPageContent({pageName} : {pageName : string }) {
  switch (pageName) {
    case '/maths-art/apollo':
      return <Apollo />
    case '/maths-art/lotfollah':
      return <Lotfollah />
    case '/maths-art/radials':
      return <Radials />
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