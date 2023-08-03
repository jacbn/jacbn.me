import CanvasProject from "@/components/canvasProject";
import styles from "@/styles/mathsart.module.css";
import { runApollo } from "@/scripts/maths-art/apollo.js"

import RangeSlider from "@/components/rangeSlider";
import CanvasScript from "./canvasScript";

export default function Apollo() {
  return (
    <CanvasProject 
      title="Apollonian Gaskets"
      description={
        <>
            <h4>What are Apollonian Gaskets?</h4>
            <p>An Apollonian Gasket is a circular fractal generated from a triad of "kissing" circles (a pair of circles are kissing if they are tangential in exactly one place; a triad of circles are kissing if each circle is once tangential to each other circle in the triad). An Apollonian Gasket is formed by iteratively constructing more kissing circles. (Try adjusting the "iterations" slider on the right!)</p>
            <h4>Are there always more kissing circles?</h4>
            <p>Yes! This was proven by Descartes in his famous <a href="https://en.wikipedia.org/wiki/Descartes%27_theorem">theorem</a>. This also defines a quadratic equation linking the curvatures of the four circles, so given three it is possible to find the fourth.</p>
            <h4>What about the positions of these circles?</h4>
            <p>In 2001, a <a href="https://arxiv.org/pdf/math/0101066v1.pdf">paper</a> was published showing the relationship between Descartes' Theorem and complex numbers. The paper goes on to prove similar relationships between spheres and even generalises to n dimensions, but for our purposes we need only the 2D case. It is proven that Descartes' Theorem holds not only for curvatures, but also for circle centres (as a complex number) multiplied by their curvatures. Therefore, using both the original Descartes' Theorem and the complex extension, we can calculate the centres.</p>
            <h4>I'm getting some graphical glitches when adjusting the sliders.</h4>
            <p>Yeah, there's a few reasons for these. It could be something specific to the browser you're using; most of the issues I've found so far are such and are weirdly specific, e.g. on Firefox drawing circles clockwise seems to not close some circles, but counter-clockwise is fine (??). Another cause might be the coding shortcuts I made to make it run fast, but these should only cause tiny floating-point errors. Do let me know if you can figure any bugs out!</p>
        </>
      }
      script={<CanvasScript startFunction={runApollo} />}
      controls={
        <>
          <div className={styles.sliderOptions}>
            <h4>Circle Ratio</h4>
            <RangeSlider {...{min: "1", max: "100", value: "50", id: "ratioSlider"}} />
          </div>
          <div className={styles.sliderOptions}>
            <h4>Offset</h4>
            <RangeSlider {...{min: "0", max: "180", value: "0", id: "offsetSlider"}} />
          </div>
          <div className={styles.sliderOptions}>
            <h4>Rotation</h4>
            <RangeSlider {...{min: "0", max: "359", value: "0", id: "rotationSlider"}} />
          </div>
          <div className={styles.sliderOptions}>
            <h4>Iterations</h4>
            <RangeSlider {...{min: "0", max: "9", value: "6", id: "iterationSlider"}} />
          </div>
        </>
      }
    />
  )
}