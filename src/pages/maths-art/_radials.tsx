import React from 'react';
import CanvasProject from "@/components/canvasProject";
import { runRadials } from "@/scripts/maths-art/radials.js";

import RangeSlider from "@/components/rangeSlider";
import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import CanvasScript from "./canvasScript";

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
          <br/>
          <h4>Can we change the shapes that are made?</h4>
          <p>Sure! The circles' relative sizes, rotation speeds and starting offset all change the shapes produced. In theory, any continuous curve can be constructed given enough circles*. There's a number of nice examples in the examples tab, but it's great fun to experiment (make sure to try negative speeds)!</p>  
          <br/>
          <p>*I'm not sure this JS simulation will quite have the precision for works of art, though!</p>
          <br/>
          <h4>What is this, mathematically?</h4>
          <p>All shapes made are <a href="https://en.wikipedia.org/wiki/Roulette_(curve)"><i>roulettes</i></a>, but the exact type depends on the rolling style. If the shape is made by two circles rolling around each other, it's an <a href="https://en.wikipedia.org/wiki/Epicycloid"><i>epicycloid</i></a> (or a <i>nested epicycloid</i> with more); if the circles are instead rolling inside each other, the shape is known as a <i><a href="https://en.wikipedia.org/wiki/Hypocycloid"><i>hypocycloid</i></a>.</i></p>
          <br/>
          <h4>Challenges!</h4>
          <p>1. Here's something I stumbled over while coding this: how many rotations will each circle do around its parent circle before everything returns to its original position?</p>
          <br/>
          <details>
            <summary>Answer</summary>
            <div className="detailsIndent">
              Each circle <TeX math='i' /> will go through <TeX math="\big\lvert \frac{speeds_i}{\text{hcf(}speeds\text{)}} \big\rvert" /> rotations!
              <br/>
              Isn't it surprising how a seemingly completely unrelated function shows up in a problem like this?
            </div>
          </details>
          <br/>
          <p>2. With no offsets, do all shapes necessarily have a line of symmetry?</p>
          <br/>
          <details>
            <summary>Answer</summary>
            <div className="detailsIndent">
              <b>Yes.</b> Without offset, all circles start/end each cycle being aligned vertically. Consider what happens from this state after one timestep; call this state <TeX math='A' />. Then, consider what happened one timestep <i>before</i> being aligned; call this state <TeX math='B' />. Since the speeds are constant, <TeX math='A' /> and <TeX math='B'/> are surely mirror images of each other. This reasoning continues all the way up to some timestep where the circles are aligned again.
              <br/><br/>
              I'll emphasise the word <i>some</i> in that last sentence. If the speeds are such that the circles align <TeX math='n'/> times in one cycle, you'll get <TeX math='n'/> lines of symmetry. So how, you ask, do you get the circles to align several times? 
              <br/><br/>
              We'll start by setting the speed of the first circle to 1, for simplicity. We'll want the second circle to do one rotation to match the first, plus <TeX math='k'/> more for the symmetry. For example, with <TeX math='k=3'/>, the speeds should be 1 and 4 (see the 3-Leaf Clover example). Any more circles we add must be symmetrical in the same <TeX math='k'/> axes (i.e. subdivide this symmetry) so 6-, 9-, 12-symmetry etc. (i.e. speeds of 7, 10, 13...) will all work in the <TeX math='k=3'/> case. In general, a circle must have <TeX math='kn'/>-symmetry, <TeX math='n \in \mathbb{Z}'/>.
              <br/><br/>
              And that's about it! You can keep adding circles with <TeX math='kn'/>-symmetry to get more complex shapes with <TeX math='k'/> lines of symmetry. If you want to change the speed of the first circle, by the way, you can multiply all circles' speeds by some constant.
              <br/><br/>
              <button style={{width: '40%', height: '2rem', margin: '1% 30% 3%'}} type="button" id="unlockButton" className="radialsButton">Add more examples!</button>
            </div>
          </details>
          <br/>
          <p>3. With offsets, what conditions are required for rotational symmetry?</p>
          <br/>
          <details>
            <summary>I'm leaving this one to you. Let me know what you come up with!</summary>
            <div className="detailsIndent">
              If you want a hint though, it's closely related to reflective symmetry :)
            </div>
          </details>
        </>
      }
      script={ <CanvasScript startFunction={runRadials} /> }
      controls={
        <div className="canvasProject__columnFlex">
          <div className="canvasProject__options">
            <div className="canvasProject__columnFlex">
              <button type="button" id="addCircle" className="radialsButton">Add Circle</button>
              <button type="button" id="removeCircle" className="radialsButton">Remove Circle</button>
            </div>
            <div>
              <h4 className="canvasProject__columnFlex">Simulation Speed</h4>
              <RangeSlider {...{min: "0", max: "30", value: "5", id: "speedSlider"}} />
            </div>
            <div className="canvasProject__columnFlex">
              <button type="button" id="changeRollType" className="radialsButton">Change Style</button>
              <select name="examples" id="examples" className="radialsButton" defaultValue={'empty'}>
                <option value="empty" disabled hidden>Examples</option>
                <option value="3clover">3-Leaf Clover</option>
                <option value="triangle">Triangle</option>
                <option value="club">Club</option>
                <option value="powersOfTwo">Powers of Two</option>
                <option className="symmetryHidden" value="pentagon" hidden>Pentagon</option>
                <option className="symmetryHidden" value="8-flower" hidden>8-Flower</option>
              </select>
            </div>
          </div>
          <ul id="circlesOptions" style={{listStyle: 'none', marginTop: '2%', width: '400px'}}>
            <li className="canvasProject__rowFlex">
              <div>Sizes</div>
              <div>Speeds</div>
              <div className="offsetHidden" hidden>Offsets</div>
            </li>
          </ul>
          <div className="canvasProject__columnFlex" style={{marginTop: '2rem'}}>
            <div>
              <input type="checkbox" id="toggleOffsets" name="toggleOffsets" />
              <label htmlFor="toggleOffsets"> Enable Offsets</label>
            </div>
            <select name="offsetUnit" id="offsetUnit" disabled className="offsetDisabled" style={{marginTop: '0.4rem'}}>
              <option value="degrees">Degrees</option>
              <option value="radians">Radians</option>
            </select>
          </div>
        </div>
      }
      />
  );
}