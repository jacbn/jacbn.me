import "@/app/globals.css";
import React from "react";
import styles from "@/styles/mathsart.module.css";

export interface CanvasProjectProps {
  title: string;
  description: React.JSX.Element;
  script: React.JSX.Element;
  controls: React.JSX.Element;
}

export default function CanvasProject({title, description, script, controls} : CanvasProjectProps ) {
  return (
    <div className={styles.canvasProject}>
      <h2>{title}</h2>
      <div className={styles.canvasProject__mainContainer}>
        <div className={styles.canvasProject__description}>
          {description}
        </div>
        <div className={styles.canvasProject__canvasAndOptions}>
          <canvas id="mainCanvas" width="520" height="520"></canvas>
          {script}
          <div className={styles.canvasProject__options}>
            {controls}
          </div>
        </div>
      </div>
    </div>
  )
}