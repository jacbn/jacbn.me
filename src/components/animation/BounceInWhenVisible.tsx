import { HTMLElements, HTMLMotionProps, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect } from "react";

interface BounceInWhenVisibleProps extends HTMLMotionProps<keyof HTMLElements> {
    Tag?: React.ElementType;
    delay?: number;
}

export const BounceInWhenVisible = ({Tag=motion.div, delay=0, ...rest}: BounceInWhenVisibleProps) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return <Tag 
        ref={ref}
        initial="hidden"
        animate={controls}
        transition={{
            duration: 0.5,
            delay,
            type: "spring",
            stiffness: 5000,  // Higher numbers = stiffer, faster spring
            damping: 200,     // Lower numbers = more bouncy, oscillates longer
            mass: 10,         // Higher numbers = heavier feeling, moves slower
            opacity: {
                duration: 0.2,
                delay,
                ease: "easeOut"
            }
        }}        
        variants={{
            visible: { x: 0, y: 0, opacity: 1 },
            hidden: { x: -20, y: -80, opacity: 0 }
        }}
        {...rest} 
    />;
};
