import React, { useState } from 'react';

export default function Title() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button className={`titleContainer ${isOpen ? "expanded" : ""}`} onClick={() => setIsOpen(o => !o)}>
            <div className="titleBackground"/>
            <div className="titleShimmer"/>
            <svg className="titleSVG" viewBox="0 0 600 300">
                <symbol id="s-text">
                    <text x="44.2%" y="185" textAnchor='middle'>Jacob</text>
                </symbol>
                <symbol id="s-text2">
                    <text x="55.5%" y="275" textAnchor='middle'>Brown</text>
                </symbol>
                <mask id="mask">
                    <rect width="100%" height="100%" fill="white" />
                    <use xlinkHref="#s-text" className="titleText titleMask" />
                    <use xlinkHref="#s-text2" className="titleText titleMask" />
                </mask>
                <g>
                    <use xlinkHref="#s-text2" className="titleText titleStrokeAnimation titleSecondaryStroke" mask='url(#mask)'></use>
                    <use xlinkHref="#s-text2" className="titleText titleFillAnimation titleSecondaryFill" mask='url(#mask)'></use>
                    <use xlinkHref="#s-text" className="titleText titleStrokeAnimation titlePrimaryStroke" mask='url(#mask)'></use>
                    <use xlinkHref="#s-text" className="titleText titleFillAnimation titlePrimaryFill" mask='url(#mask)'></use>
                </g>
            </svg>
            <h3 className="roller">
                <span className="rollerText">
                    Software Engineer
                    <br />
                    React &#183;  Python &#183; Java &#183; Flutter
                </span>
            </h3>
            <div className="attribution">
                <span>"sorry i never got to say goodbye", 2024</span>
            </div>
        </button>
    );
}
