import React from "react";

export interface CanvasProjectProps {
  title: string;
  description: React.JSX.Element;
  script: React.JSX.Element;
  controls: React.JSX.Element;
}

export default function CanvasProject({title, description, script, controls} : CanvasProjectProps ) {
  return (
    <div className="canvasProject">
      <h2>{title}</h2>
      <div className="canvasProject__mainContainer">
        <div className="canvasProject__description">
          {description}
        </div>
        <div className="canvasProject__canvasAndOptions">
          <canvas id="mainCanvas" width="520" height="520"></canvas>
          {script}
          <div className="canvasProject__options">
            {controls}
          </div>
        </div>
      </div>
    </div>
  );
}