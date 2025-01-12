import React, { useCallback, useContext, useEffect, useState } from "react";

export const useTheme = (initial?: string) : [string, (theme: string) => void] => {
    const [theme, setThemeState] = useState(initial ?? 'dark');

    const setTheme = useCallback((theme : string) => {
        setThemeState(theme);
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (theme !== 'light' && theme !== 'dark') {
                setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            }
        });
    }, []);

    return [theme, setTheme];
};

export const ColorModeContext = React.createContext<{
    theme: string;
    setTheme: (theme: string) => void;
}>({
    theme: 'light', 
    setTheme: () => {}
});

export const ColorModeContextProvider = (props: React.HTMLAttributes<HTMLElement>) => {
    const [theme, setTheme] = useTheme();
    return <ColorModeContext.Provider value={{theme, setTheme}} {...props}/>;
};

const ColorModeToggle = (props : React.HTMLProps<HTMLInputElement>) => {

    const {theme, setTheme} = useContext(ColorModeContext);

    return <div className="bd-theme" id="bd-theme">
        <label className="styled-toggle">
            <input type="checkbox" {...props} checked={theme === 'light'} onChange={(e) => {
                if (e.target.checked) {
                    setTheme('light');
                } else {
                    setTheme('dark');
                }
            }}/>
            <span><img src="/assets/components/moon.svg"/></span>
            <span><img src="/assets/components/sun.svg"/></span>
        </label>
    </div>;
};

export default ColorModeToggle;
