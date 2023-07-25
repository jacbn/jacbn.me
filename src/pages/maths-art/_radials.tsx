import CanvasProject from "@/components/canvasProject";
import styles from "@/styles/mathsart.module.css";
import { runRadials } from "@/scripts/maths-art/radials.js"

import RangeSlider from "@/components/rangeSlider";
import TeX from '@matejmazur/react-katex';
import { useEffect } from "react";

export function ApolloScript() {
  useEffect(() => runRadials(), []);
  return <></>;
}

export default function Radials() {
  return (
    <CanvasProject
      title="Radial Circles"
      description={
        <>
          <h4>What's going on?</h4>
          <p>We have a super simple setup: there's a starting circle <TeX math='C_0' /> and a pointer that rotates around this at a constant speed, drawing a path as it goes. The path of the pointer does nothing interesting yet; it just follows the circle. But, we can add a second circle <TeX math='C_1' /> in place of the pointer and have the pointer rotate around this circle instead.</p>
          <br/>
          <p>Click the "Add Circle" button to see what happens!</p>

          <h4>Can we change the shapes that are made?</h4>
          <p>Sure! The circles' relative radii and rotation speeds both change the shapes produced. In theory, any continuous curve can be produced given enough circles*. There's a number of nice examples in the examples tab, but it's great fun to experiment (make sure to try negative speeds)!</p>  
          <br/>
          <p>*I'm not sure this JS simulation will quite have the precision for works of art, though!</p>

          <h4>What is this, mathematically?</h4>
          <p>The shapes made between two circles are called <a href="https://en.wikipedia.org/wiki/Epicycloid">epicycloids</a>, and when there are multiple circles it's called a <i>nested epicycloid</i>.</p>
          <br/>
          <h4>Challenges!</h4>
          <p>1. Here's something I stumbled over while coding this: how many rotations will each circle do around its parent circle before everything returns to its original position?</p>
          <br/>
          <details>
            <summary>Answer</summary>
            Each circle <TeX math='i' /> will go through <TeX math="\big\lvert \frac{speeds_i}{\text{hcf(}speeds\text{)}} \big\rvert" /> rotations!
            <br/>
            Isn't it surprising how a seemingly completely unrelated function shows up in a problem like this?
          </details>
          <br/>
          <p>2. Do all shapes necessarily have a line of symmetry?</p>
          <br/>
          <details>
            <summary>Answer</summary>
            <b>Yes.</b> All circles start and end one cycle being aligned vertically. Consider what happens from this state after one timestep; call this state <TeX math='A' /> Then, consider what happened one timestep <i>before</i> being aligned; call this state <TeX math='B' />. Since the speeds are constant, <TeX math='A' /> and <TeX math='B'/> are surely mirror images of each other. This reasoning can continue until some timestep where the circles are aligned again, in which case the same reasoning applies.
            <br/><br/>
            I'll emphasise the word <i>some</i> in that last sentence. If the speeds are such that the circles align <TeX math='n'/> times in one cycle, you'll get <TeX math='n'/> lines of symmetry. So how, you ask, do you get the circles to align several times? 
            <br/><br/>
            We'll start by setting the speed of the first circle to 1, for simplicity. We'll want the second circle to do one rotation to match the first, plus <TeX math='k'/> more for the symmetry. For example, with <TeX math='k=3'/>, the speeds should be 1 and 4 (see the 3-Leaf Clover example). Any more circles we add must be symmetrical in the same <TeX math='k'/> axes (i.e. subdivide this symmetry) so 6-, 9-, 12-symmetry etc. (i.e. speeds of 7, 10, 13...) will all work in the <TeX math='k=3'/> case. In general, a circle must have <TeX math='kn'/>-symmetry (<TeX math='n \in \mathbb{Z}'/>).
            <br/><br/>
            And that's about it! You can keep adding circles with <TeX math='kn'/>-symmetry to get more complex shapes with <TeX math='k'/> lines of symmetry. If you want to change the speed of the first circle, by the way, you can multiply all circles' speeds by some constant.
            <br/><br/>
            <button type="button" id="unlockButton" className={styles.radialsButton}>Add more examples!</button>
          </details>
        </>
      }
      script={ <ApolloScript /> }
      controls={
        <div className={styles.canvasProject__columnFlex}>
          <div className={styles.canvasProject__options}>
            <div className={styles.canvasProject__columnFlex}>
              <button type="button" id="addCircle" className={styles.radialsButton}>Add Circle</button>
              <button type="button" id="removeCircle" className={styles.radialsButton}>Remove Circle</button>
            </div>
            <div>
              <h4>Simulation Speed</h4>
              <RangeSlider {...{min: "0", max: "30", value: "5", id: "speedSlider"}} />
            </div>
            <div className={styles.canvasProject__columnFlex}>
              <button type="button" id="changeRollType" className={styles.radialsButton}>Change Style</button>
              <select name="examples" id="examples">
                <option value="empty" disabled selected hidden>Examples</option>
                <option value="3clover">3-Leaf Clover</option>
                <option value="triangle">Triangle</option>
                <option value="club">Club</option>
                <option value="powersOfTwo">Powers of Two</option>
                <option className="hidden" value="pentagon" hidden>Pentagon</option>
              </select>
            </div>
          </div>
          <ul id="circlesOptions" style={{listStyle: 'none', marginTop: '2%'}}>
            <li className={styles.canvasProject__rowFlex}>
              <div>Sizes</div>
              <div>Speeds</div>
            </li>
          </ul>
        </div>
      }
      />
  );
}