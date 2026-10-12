import React from "react";
import { Link } from "react-router";
import { GridSquareProps } from "./gridSquareTypes";
import { Image } from "../animatedImage";
import classNames from "classnames";

export const FlatGridSquare = ({title, className, description, year, lang, colour, imageProps, link, ...rest} : GridSquareProps) => {
    return <Link to={link ?? "./"} {...rest} className={classNames(className, imageProps ? "card-image-square" : "card-no-image-square")}>
        {imageProps && <Image {...imageProps} />}
        <div className="card-base p-2">
            <h3 className="font-size-headline" style={{color: colour}}>{title}</h3>
            <p>{description}</p>
            <span className="project-info-text">
                {year} {year && lang && <>&#183;</>} {lang}
            </span>
        </div>
    </Link>;
};
