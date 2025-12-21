import React, { useEffect, useState } from "react";

export const BlogErrorBoundary = ({children} : {children: React.ReactNode}) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            setHasError(true);
            console.error("Error caught by ErrorBoundary: ", error);
        };

        window.addEventListener("error", handleError);

        return () => {
            window.removeEventListener("error", handleError);
        };
    }, []);

    if (hasError) {
        return <div className="mt-5 text-center">
            Something went wrong. There's probably no blog at this URL.
            <br/><br/>
            Try searching through <a href="/blog">the list of blogs</a> instead!
        </div>;
    }

  return <>{children}</>;
};

export const ProjectErrorBoundary = ({children} : {children: React.ReactNode}) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error: ErrorEvent) => {
            setHasError(true);
            console.error("Error caught by ErrorBoundary: ", error);
        };

        window.addEventListener("error", handleError);

        return () => {
            window.removeEventListener("error", handleError);
        };
    }, []);

    if (hasError) {
        return <div className="mt-5 text-center">
            Something went wrong. There's probably no project at this URL.
            <br/><br/>
            Try searching through <a href="/projects">the list of projects</a> instead!
        </div>;
    }

  return <>{children}</>;
};
