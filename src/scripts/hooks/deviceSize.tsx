import { useEffect, useState } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

const screenSizeMap : Record<ScreenSize, number> = {
    "xs": 576,
    "sm": 768,
    "md": 992,
    "lg": 1200,
    "xl": 1440,
};


export default function useDeviceSize() {
    const getScreenSize = () => Object.keys(screenSizeMap).find(size => window.innerWidth < screenSizeMap[size as ScreenSize]) as ScreenSize || "xl";
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
