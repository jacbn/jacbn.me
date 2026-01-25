import React from "react";
import { HTMLElements, HTMLMotionProps, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export const FadeInWhenVisible = ({Tag=motion.div, ...rest}: { Tag?: any } & HTMLMotionProps<keyof HTMLElements>) => {
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

    return (
        <Tag
            ref={ref}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5, ease: "easeOut" }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 40 }
            }}
            {...rest}
        />
    );
};
