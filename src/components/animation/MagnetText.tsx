// text that uses mouse acceleration to wiggle using spring mechanics when hovered

import classNames from "classnames";
import { HTMLElements, HTMLMotionProps, motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface WiggleTextProps extends HTMLMotionProps<keyof HTMLElements>{
    children: string;
    Tag?: React.ElementType;
}

interface MagnetLetterProps extends HTMLMotionProps<"div"> {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

const MagnetLetter = ({mouseX, mouseY, ...rest}: MagnetLetterProps) => {
    const magnetDx = useSpring(0, {stiffness: 200, damping: 25, mass: 2});
    const magnetDy = useSpring(0, {stiffness: 200, damping: 25, mass: 2});
    const selfRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateMagnet = () => {
            const rect = selfRef.current?.getBoundingClientRect();
            if (!rect) return;

            if (mouseX.get() === Infinity || mouseY.get() === Infinity) {
                magnetDx.set(0);
                magnetDy.set(0);
                return;
            }

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = mouseX.get() - centerX;
            const dy = mouseY.get() - centerY;

            const distance = Math.sqrt(dx * dx + dy * dy);

            const radius = 250;
            if (distance < radius) {
                const force = (radius - distance) / radius;
                magnetDx.set(dx * force * 0.2);
                magnetDy.set(dy * force * 0.2);
            } else {
                magnetDx.set(0);
                magnetDy.set(0);
            }
        };
        
        updateMagnet();

        const unsubscribeX = mouseX.on("change", updateMagnet);
        const unsubscribeY = mouseY.on("change", updateMagnet);
        return () => {
            unsubscribeX();
            unsubscribeY();
        };
    }, [mouseX, mouseY, magnetDx, magnetDy]);


    return <motion.div
        className="d-inline-block"
        ref={selfRef}
        style={{x: magnetDx, y: magnetDy}}
        {...rest}
    />;
};

export const MagnetText = ({Tag = motion.div, className, children, ...rest}: WiggleTextProps) => {
    const mouseX = useMotionValue(Infinity);
    const mouseY = useMotionValue(Infinity);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
        mouseX.set(Infinity);
        mouseY.set(Infinity);
    };

    return <Tag
        {...rest}
        className={classNames("d-inline-block", className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
        {children.split("").map((char, index) => {
            return <MagnetLetter key={index} mouseX={mouseX} mouseY={mouseY}>{char}</MagnetLetter>;
        })}
    </Tag>;
};
