import CanvasProject from "@/components/canvasProject";
import { runLotfollahDome } from "@/scripts/maths-art/lotfollah.js"
import styles from "@/styles/mathsart.module.css";

import RangeSlider from "@/components/rangeSlider";
import CanvasScript from "./canvasScript";

export default function Lotfollah() {
  return (
    <CanvasProject 
    title="Lotfollah Mosque Dome"
    description={
      <>
        <h4>What is the Sheikh Lotfollah Mosque?</h4>
        <p>One of the most famous pieces of Iranian architecture, the Sheikh Lotfollah mosque was built in the early 17th century, under the Safavid Empire. </p>
        <h4>What does the program do, and how?</h4>
        <p>This program performs an iterative, simplified construction of the dome. Starting with a base circle, exactly 12 squares can be made to fit around it by drawing 6 other circles (the same size as, and passing through, the base) at the intersections of these circles with the base (with the first being placed anywhere), then joining up specific points to form squares. This process can then be repeated over and over to create layers of squares which spiral outwards, forming the basis for decoration.</p>
        <h4>What do the options do?</h4>
        <p>The scale and iterations sliders are fairly intuitive; the symmetry count slider controls how many shapes are fit around the circle. They all have the same height, so changing the slider distorts the shapes. I'd love to make an option that unfixes the height so the shapes remain squares all the time, perhaps to see if this would still create a similar pattern when iterating, unfortunately I haven't had the time recently.</p>
        <br/>
        <p>Lastly, many thanks to Joumana Medlej for creating <a href="https://design.tutsplus.com/tutorials/geometric-design-the-lotfallah-mosque-dome--cms-24859">this</a> amazing how-to-draw of the dome. It inspired this whole project!</p>
      </>
    }
    script={<CanvasScript startFunction={runLotfollahDome} />}
    controls={
      <>
        <div className={styles.sliderOptions}>
          <h4>Scale</h4>
          <RangeSlider {...{min: "1", max: "100", value: "20", id: "sizeSlider"}} />
        </div>
        <div className={styles.sliderOptions}>
          <h4>Symmetry Count</h4>
          <RangeSlider {...{min: "9", max: "16", value: "12", id: "symcountSlider"}} />
        </div>
        <div className={styles.sliderOptions}>
          <h4>Iterations</h4>
          <RangeSlider {...{min: "1", max: "10", value: "1", id: "iterationSlider"}} />
        </div>
      </>
    }
    />
  )
}