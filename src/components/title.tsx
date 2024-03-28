import React from 'react';

export default function Title() {
    return (
        <div className="titleContainer">
            <div className="titleBackground"></div>
            <svg className="titleSVG">
                <symbol id="s-text">
                    <text x="48.2%" y="60%" textAnchor='middle'>Jacob</text>
                </symbol>
                <symbol id="s-text2">
                    <text x="51.5%" y="98%" textAnchor='middle'>Brown</text>
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
        </div>
    )
}