import styles from '../page.module.css'
import GridSquare from './gridSquare';

// import greenMapsLogo from ;

export default function MainGrid() {
  return (
    <ol className={styles.grid}>
      <GridSquare 
        title="Green Maps"
        description="reducing vehicle emissions through&nbsp;smarter navigation"
        year={2022}
        lang="Dart"
        colour="wheat"
        image={{
          path: "./assets/index/logo-green-maps.svg",
          alt: "A leaf on a wheat background, the logo of the Green Maps project."
        }}
        link="./projects/greenmaps/"
        podiumNum={1}
      />
    </ol>
  )
}