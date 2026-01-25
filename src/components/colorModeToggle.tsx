import React, { useCallback, useContext, useEffect, useState } from "react";

type ThemeLightness = 'light' | 'dark';
type ThemeStyle = 'modern' | 'sunset';

export const useTheme = (initialStyle?: ThemeStyle, initialLightness?: ThemeLightness) : [ThemeStyle, ThemeLightness, (themeStyle: ThemeStyle, themeLightness: ThemeLightness) => void] => {
    const [themeStyle, setThemeStyleState] = useState<ThemeStyle>(initialStyle ?? 'modern');
    const [themeLightness, setThemeLightnessState] = useState<ThemeLightness>(initialLightness ?? 'dark');

    const setTheme = useCallback((themeStyle : ThemeStyle, themeLightness : ThemeLightness) => {
        setThemeLightnessState(themeLightness);
        setThemeStyleState(themeStyle);
        document.documentElement.setAttribute('data-bs-theme', `${themeStyle}-${themeLightness}`);
        localStorage.setItem('themeLightness', themeLightness);
        localStorage.setItem('themeStyle', themeStyle);
    }, []);

    useEffect(() => {
        const storedThemeStyle = localStorage.getItem('themeStyle') as ThemeStyle | null;
        const storedThemeLightness = localStorage.getItem('themeLightness') as ThemeLightness | null;
        if (storedThemeStyle && storedThemeLightness) {
            setTheme(storedThemeStyle, storedThemeLightness);
        } else {
            setTheme('sunset', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (themeLightness !== 'light' && themeLightness !== 'dark') {
                setTheme('sunset', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            }
        });
    }, []);

    return [themeStyle, themeLightness, setTheme];
};

export const ColorModeContext = React.createContext<{
    themeStyle: ThemeStyle;
    themeLightness: ThemeLightness;
    setTheme: (themeStyle: ThemeStyle, themeLightness: ThemeLightness) => void;
}>({
    themeStyle: 'sunset',
    themeLightness: 'light',
    setTheme: () => {}
});

export const ColorModeContextProvider = (props: React.HTMLAttributes<HTMLElement>) => {
    const [themeStyle, themeLightness, setTheme] = useTheme();
    return <ColorModeContext.Provider value={{themeStyle, themeLightness, setTheme}} {...props}/>;
};

const ColorModeToggle = (props : React.HTMLProps<HTMLInputElement>) => {

    const {themeStyle, themeLightness, setTheme} = useContext(ColorModeContext);

    return <div className="bd-theme no-print" id="bd-theme">
        <label className="styled-toggle">
            <input type="checkbox" {...props} checked={themeLightness === 'light'} onChange={(e) => {
                if (e.target.checked) {
                    setTheme(themeStyle, 'light');
                } else {
                    setTheme(themeStyle, 'dark');
                }
            }}/>
            <span><img src="/assets/components/moon.svg"/></span>
            <span><img src="/assets/components/sun.svg"/></span>
        </label>
    </div>;
};

export default ColorModeToggle;
