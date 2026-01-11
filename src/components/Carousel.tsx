import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import classNames from "classnames";

interface DraggableCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  elementWidth: string;
}

const CarouselItem = (props: { children: React.ReactNode; carouselX: any; centredOffset: number; rotDist: number }) => {
  const { children, carouselX, centredOffset, rotDist } = props;
  // const rotateY = useTransform(carouselX, [centredOffset - rotDist, centredOffset, centredOffset + rotDist], [10, 0, -10]);
  const opacity = useTransform(carouselX, [centredOffset - 2 * rotDist, centredOffset - rotDist, centredOffset, centredOffset + rotDist, centredOffset + 2 * rotDist], [0, 0.8, 1, 0.8, 0]);
  const scale = useTransform(carouselX, [centredOffset - rotDist, centredOffset, centredOffset + rotDist], [0.7, 1, 0.7]);
  const pointerEvents = useTransform(opacity, (o) => (o < 0.9 ? "none" : "auto"));

  return <motion.li className="w-100 flex-shrink-0 px-5" style={{ scale, opacity, pointerEvents }}>
    {children}
  </motion.li>;
};

export const DraggableCarousel = (props: DraggableCarouselProps) => {
  const { children, className } = props;

  const items = React.Children.toArray(children);
  const base = items.length;

  // If no items, render nothing
  if (base === 0) {
    return <></>;
  }

  // Tripled list to allow seamless wrap while reusing the same React elements
  const extended = [...items, ...items, ...items];

  const [index, setIndex] = useState<number>(0);
  const [_, setRecentre] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const perspectiveOrigin = useTransform(x, (v) => {
    return -v + (containerRef?.offsetWidth || 0) / 2 + "px center";
  });
  const backgroundX = useTransform(x, (v) => -v - (containerRef?.offsetWidth || 0));

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // on resize, we need to update the state to rerender, then set x to correct position
      setRecentre((r) => !r);
      x.jump(index * -(containerRef?.offsetWidth ?? 1), true);
    });

    if (containerRef) {
      resizeObserver.observe(containerRef);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  useEffect(() => {
    if (!isDragging && containerRef) {
      const containerWidth = containerRef.offsetWidth || 1;
      const targetX = -index * containerWidth;

      // if in the middle batch, animate normally
      if (index >= base && index < 2 * base) {
        animate(x, targetX, {
          type: "spring",
          stiffness: 300,
          damping: 25,
        });
      } else {
        // recentre to the middle batch, with the same offset
        const newIndex = ((index % base) + base) % base + base;
        x.jump(x.get() + (index - newIndex) * containerWidth, true);
        setIndex(newIndex);
      }
    }
  }, [index, isDragging, base]);

  const handleDragEnd = (e: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsDragging(false);
    const containerWidth = containerRef?.offsetWidth || 1;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let newIndex = index;

    // Fast swipe -> use velocity
    if (Math.abs(velocity) > 500) {
      newIndex = velocity > 0 ? index - 1 : index + 1;
    }
    // Otherwise use offset threshold (~20% of container width)
    else if (Math.abs(offset) > containerWidth * 0.2) {
      newIndex = offset > 0 ? index - 1 : index + 1;
    }

    setIndex(newIndex);
  };

  useEffect(() => {
    setIndex(base);
  }, [!!containerRef]);

  // Current dot based on modulo of the base list
  const activeDot = ((index % base) + base) % base;

  return (
    <div className={classNames("carousel", className)}>
      <div className="d-flex flex-column gap-3 overflow-hidden pb-5">
        <div className="position-relative m-auto" style={{width: props.elementWidth || "50%"}} ref={setContainerRef}>
          <motion.ol
            className="d-flex list-unstyled"
            drag="x"
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            style={{ x, perspective: 800, perspectiveOrigin }}
          >
            <motion.div className="position-absolute h-100" style={{ width: "300%", x: backgroundX }}></motion.div>
            {containerRef && extended.map((item, i) => {
              const centredOffset = -(containerRef?.offsetWidth || 0) * i;
              const rotDist = containerRef?.offsetWidth || 0;
              return <CarouselItem key={i} carouselX={x} centredOffset={centredOffset} rotDist={rotDist}>{item}</CarouselItem>;
            })}
          </motion.ol>

          {/* Prev Button */}
          <motion.button
            onClick={() => setIndex((i) => i - 1)}
            className={`prev-button`}
          >
            <i className="icon icon-xxl icon-chevron-left" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            onClick={() => setIndex((i) => i + 1)}
            className={`next-button`}
          >
            <i className="icon icon-xxl icon-chevron-right" />
          </motion.button>

          {/* Progress Indicator */}
          <div className="position-absolute d-flex gap-2 progress-indicator">
            {Array.from({ length: base }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(base + i)} // jump to middle batch
                className={classNames({ "active": i === activeDot })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
