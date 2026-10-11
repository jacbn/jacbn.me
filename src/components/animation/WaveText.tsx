import classNames from "classnames";
import React from "react";

export const WaveText = ({Tag="span", children, className, delay = 0.1}: {Tag?: React.ElementType, children: string, className?: string, delay?: number}) => {
    return <Tag className={classNames(className, "wave-text")}>
        {children.split("").map((char, index) => {
            return <span key={index} style={{animationDelay: `${index * delay}s`}}>{char}</span>;
        })}
    </Tag>;
};
