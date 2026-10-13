import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface TypedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: string;
}

const MS_PER_CHAR = 75;

export const TypedText = ({ children, className, ...props }: TypedTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [ref, inView] = useInView({
        threshold: 1,
        triggerOnce: true,
    });

    useEffect(() => {
        if (!inView) return;
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < children.length) {
                setDisplayedText(children.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, MS_PER_CHAR);

        return () => clearInterval(interval);
    }, [children, inView]);

    const cursor = <span className={classNames("typed-text-cursor text-muted", {"blinking": inView && displayedText.length === children.length})}>|</span>;

    return <div className="d-inline-block position-relative">
        <span ref={ref} {...props} className={classNames(className, "position-absolute")}>{displayedText}{cursor}</span>
        <span className="opacity-0 pointer-none">{children}|</span>
    </div>;
};
