'use client';

import { useEffect, useState } from "react";
import { useIsClient } from "./isClient";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

const screenSizeMap : Record<ScreenSize, number> = {
    "xs": 375,
    "sm": 576,
    "md": 768,
    "lg": 992,
    "xl": 1200,
};


export default function useDeviceSize() {
    const isClient = useIsClient();
    const getScreenSize = () => isClient && Object.keys(screenSizeMap).find(size => window.innerWidth < screenSizeMap[size as ScreenSize]) as ScreenSize || "xl";
    const [screenSize, setScreenSize] = useState(getScreenSize());

    useEffect(() => {
        const onResize = () => {
            setScreenSize(getScreenSize());
        };

        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);
    
    return screenSize;
}

export const below = {
    xs: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] <= screenSizeMap["xs"],
    sm: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] <= screenSizeMap["sm"],
    md: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] <= screenSizeMap["md"],
    lg: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] <= screenSizeMap["lg"],
    xl: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] <= screenSizeMap["xl"],
};

export const above = {
    xs: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] >= screenSizeMap["xs"],
    sm: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] >= screenSizeMap["sm"],
    md: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] >= screenSizeMap["md"],
    lg: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] >= screenSizeMap["lg"],
    xl: (size: ScreenSize | string) => screenSizeMap[size as ScreenSize] >= screenSizeMap["xl"],
};