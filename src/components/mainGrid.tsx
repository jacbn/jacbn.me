import styles from '../styles/home.module.css'
import GridSquare from './gridSquare';

// todo: fill alt text of svgs

export default function MainGrid() {
  return (
    <ol className={styles.grid}>
      <GridSquare 
        title="Green Maps"
        description="reducing vehicle emissions through&nbsp;smarter navigation"
        year="2022"
        lang="Dart"
        colour="wheat"
        image={{
          src: "/assets/index/logo-green-maps.svg",
          alt: "A leaf on a wheat background, the logo of the Green Maps project."
        }}
        link="/projects/greenmaps/"
        podiumNum={2}
      />
      <GridSquare 
        title="Yawning Detection"
        description="applying deep learning to safety-critical environments"
        year="2022-2023"
        lang="Python, Dart"
        colour="lightgreen"
        image={{
          src: "/assets/index/logo-yawnn.svg",
          alt: ""
        }}
        link="/projects/yawnn/"
        podiumNum={1}
      />
      <GridSquare 
        title="Maths Art"
        description="exploring geometry at its finest"
        year="2016 onwards"
        lang="JS, Python"
        colour="lightblue"
        image={{
          src: "/assets/index/logo-maths-art.svg",
          alt: ""
        }}
        link="/maths-art/"
        podiumNum={3}
      />
      <GridSquare 
        title="jCompiler"
        description="lexing and parsing an arbitrary input given a grammar"
        year="2021-2022"
        lang="OCaml, Java"
        colour="#F9D1DA"
        image={{
          src: "",
          alt: ""
        }}
        link="/projects/jcompiler/"
        podiumNum={0}
      />
      <GridSquare 
        title="Sentiment Classifier"
        description="interpreting the emotion of reviews using various models"
        year="2021"
        lang="Java"
        colour="#6EB5FF"
        image={{
          src: "",
          alt: ""
        }}
        link="/projects/sentiment/"
        podiumNum={0}
      />
      <GridSquare 
        title="Pandemic Analysis"
        description="simulating a pandemic and analysing real Covid data"
        year="2020-2021"
        lang="Python"
        colour="lightcoral"
        image={{
          src: "",
          alt: ""
        }}
        link="/projects/pandemic/"
        podiumNum={0}
      />
      <GridSquare 
        title="Hexad"
        description="reaching for high scores by constructing hexagons"
        year="2017-2019"
        lang="Python"
        colour="#C3B1E1"
        image={{
          src: "",
          alt: ""
        }}
        link="https://play.google.com/store/apps/details?id=com.JBLabs.Hexad"
        podiumNum={0}
      />
    </ol>
  )
}