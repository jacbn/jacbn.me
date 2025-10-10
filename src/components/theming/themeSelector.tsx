import React, { JSX, useEffect, useLayoutEffect } from 'react';

// This mess enables scoping global CSS files to a <ThemeSelector/> component.
// Usually, once a CSS file is loaded it remains active globally until a hard refresh.
// This instead forcibly disables the stylesheets that aren't part of the current theme.

// *Why not just use CSS modules?*
// I was originally, but they're super clunky alongside global stylesheets, and I much prefer the global syntax
// (className="this" over className={styles.this}). It keeps the generated HTML significantly more legible, and I
// can just write overrides for e.g. h1 at the top level of the scoped CSS file.

const PaperTheme = React.lazy(() => import('./paperTheme'));
const CVTheme = React.lazy(() => import('./cvTheme'));

type Theme = 'paper' | 'cv';

const themeMap: Record<Theme, React.LazyExoticComponent<() => JSX.Element>> = {
    paper: PaperTheme,
    cv: CVTheme,
};

interface ThemeSelectorProps {
    themes?: Theme[];
    children: React.ReactNode;
}

const ThemeSelector = (props: ThemeSelectorProps) => {
    const { themes, children } = props;

    useEffect(() => {
        // set the theme-name of the initial (global) stylesheets
        Array.from(document.styleSheets).forEach(stylesheet => {
            const ownerNode = stylesheet.ownerNode as Element;
            if (!ownerNode.getAttribute('theme-name')) {
                ownerNode.setAttribute('theme-name', "global");
                stylesheet.disabled = false;
            }
        });

        return () => {
            // on unmount, disable all stylesheets that belong to the current theme(s)
            Array.from(document.styleSheets).forEach(stylesheet => {
                const themeNames = themes?.map(theme => `theme-selector-${theme}`);
                if (themeNames?.includes((stylesheet.ownerNode as Element).getAttribute('theme-name') ?? "")) {
                    stylesheet.disabled = true;
                };
            });
        };
    }, []);

    const assignStylesheets = () => {
        // This function gets run once the lazy components have been loaded.
        // We scan all active stylesheets. There are two relevant cases:
        // 1. new stylesheets that have been added since loading the page will not yet be marked with a theme-name attribute.
        //    we assign them a theme-name attribute. (it will be enabled by default)
        // 2. if we have come back to a page with the same theme(s) as before, the stylesheets will still exist,
        //    but they will have been disabled. we re-enable them.

        if (!themes) return;
        for (let i = 0, c = 0; i < themes.length && c < document.styleSheets.length; c++) {
            const stylesheet = document.styleSheets[document.styleSheets.length - 1 - c];
            const stylesheetTheme = (stylesheet.ownerNode as Element).getAttribute('theme-name');
            const themeId = `theme-selector-${themes[i]}`;
            if (!stylesheetTheme) {
                // case 1
                (stylesheet.ownerNode as Element).setAttribute('theme-name', themeId);
                i++;
            } else if (stylesheetTheme === themeId) {
                // case 2
                stylesheet.disabled = false;
                i++;
            }
        }
    };

    const OnLoad = () => {
        useLayoutEffect(() => {
            assignStylesheets();
        }, []);
        return <></>;
    };

    return <>
        <React.Suspense fallback={null}>
            {themes?.map(theme => {
                const ThemeComponent = themeMap[theme];
                return <ThemeComponent key={theme} />;
            })}
            <OnLoad />
        </React.Suspense>
        {children}
    </>;
};

export default ThemeSelector;
