import React, { useState } from 'react';

export default function Title() {
    const [isOpen, setIsOpen] = useState(false);

    return <div className={`title-container ${isOpen ? "expanded" : ""}`}>
        <button onClick={() => setIsOpen(o => !o)}>
            <div className="titleBackground"/>
            <div className="titleShimmer"/>
            <svg className="titleSVG" viewBox="0 0 800 300">
                <symbol id="s-text">
                    <text x="50%" y="185" textAnchor='middle'>jaycie</text>
                </symbol>
                {/* <symbol id="s-text-2">
                    <text x="89%" y="185" textAnchor='middle'>.me</text>
                </symbol> */}
                <g>
                    <use xlinkHref="#s-text" className="title-text title-draw-animation"></use>
                    {/* <use xlinkHref="#s-text-2" className="title-text-small titleFillAnimation"></use> */}
                </g>
            </svg>
            <h4 className="roller">
                <span className="rollerText">
                    Frontend software engineer
                    <br />
                    React &#183; TS &#183; SCSS &#183; Python
                </span>
            </h4>
            <div className="attribution">
                <span>"sorry i never got to say goodbye", 2024</span>
            </div>
        </button>
    </div>;
}
