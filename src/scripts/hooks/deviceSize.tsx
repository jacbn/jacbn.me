import { useEffect, useState } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

const screenSizeMap : Record<ScreenSize, number> = {
    "xs": 375,
    "sm": 576,
    "md": 768,
    "lg": 992,
    "xl": 1200,
};

const getScreenSize = () => typeof window !== "undefined" && Object.keys(screenSizeMap).find(size => window.innerWidth < screenSizeMap[size as ScreenSize]) as ScreenSize || "xl";

export default function useDeviceSize() {
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
    xs: (size: ScreenSize) => screenSizeMap[size] <= screenSizeMap["xs"],
    sm: (size: ScreenSize) => screenSizeMap[size] <= screenSizeMap["sm"],
    md: (size: ScreenSize) => screenSizeMap[size] <= screenSizeMap["md"],
    lg: (size: ScreenSize) => screenSizeMap[size] <= screenSizeMap["lg"],
    xl: (size: ScreenSize) => screenSizeMap[size] <= screenSizeMap["xl"],
};

export const above = {
    xs: (size: ScreenSize) => screenSizeMap[size] >= screenSizeMap["xs"],
    sm: (size: ScreenSize) => screenSizeMap[size] >= screenSizeMap["sm"],
    md: (size: ScreenSize) => screenSizeMap[size] >= screenSizeMap["md"],
    lg: (size: ScreenSize) => screenSizeMap[size] >= screenSizeMap["lg"],
    xl: (size: ScreenSize) => screenSizeMap[size] >= screenSizeMap["xl"],
};