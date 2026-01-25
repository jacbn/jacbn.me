import React from "react";
import { Link } from "react-router-dom";
import { GridSquareProps } from "./gridSquareTypes";
import { Image } from "../animatedImage";

export const FlatGridSquare = ({title, description, year, lang, colour, imageProps, link, ...rest} : GridSquareProps) => {
    return <Link to={link ?? "./"} {...rest} className={imageProps ? "card-image-square" : "card-no-image-square"}>
        {imageProps && <Image {...imageProps} />}
        <div className="card-base p-2">
            <h2 style={{color: colour}}>{title}</h2>
            <p>{description}</p>
            <span className="project-info-text">
                {year} &#183; {lang}
            </span>
        </div>
    </Link>;
};
