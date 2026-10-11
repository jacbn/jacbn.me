import classNames from "classnames";
import React from "react";

export const WaveText = ({children, className}: {children: string, className?: string}) => {
    return <span className={classNames(className, "wave-text")}>
        {children.split("").map((char, index) => {
            return <span key={index} style={{animationDelay: `${index * 0.1}s`}}>{char}</span>;
        })}
    </span>;
};
